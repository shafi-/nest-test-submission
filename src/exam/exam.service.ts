import { HttpStatus, Injectable } from '@nestjs/common';
import { Answer } from '../dto/submission.dto';
import { Submission } from './entities/SubmissionEntity';
import * as fs from 'fs';
import * as parse from 'csv-parse';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmissionRepo } from './repo/submission.repo';
import { groupBy, keyBy, removeFile } from '../utils';
import { AppError } from '../exceptions';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(SubmissionRepo) private submissionRepo: SubmissionRepo
  ) {}

  getAllSubmissions(examId: string) {
    return this.submissionRepo.find({ exam: examId });
  }

  async calculateResult(examId: string, answers: Answer[]) {
    let submissions: Submission[] = await this.submissionRepo.find({ exam: examId });

    const map: Map<string, Answer> = keyBy(answers, 'question');

    let result = submissions.map(submission => {
      let answer = map.get(submission.question);
      // @ts-ignore
      submission.isCorrect = answer && submission.selectedAnswer == answer.answer;
      return submission;
    });

    return groupBy(result, 'name');
  }

  parseSubmissionCSVFile(file: fs.PathLike, removeFileAfterRead = false): Promise<Submission[]> {
    try {
      return new Promise((resolve, reject) => {
        const submissions = [];

        fs.createReadStream(file, { encoding: 'utf8' })
          .pipe(parse())
          .on('data', (submission) => {
            try {
              // TODO :: data type validation
              submissions.push({
                name: submission[0],
                question: submission[1],
                selectedAnswer: submission[2],
              });
            } catch (err) {
              throw new AppError('Invalid data in csv', HttpStatus.UNPROCESSABLE_ENTITY);
            }
          })
          .on('end', () => {
            resolve(submissions);
            if (removeFileAfterRead && typeof file === 'string') {
              removeFile(file);
            }
          })
          .on('error', (err) => {
            reject(new AppError(err, HttpStatus.UNPROCESSABLE_ENTITY));
          });
      });
    } catch (err) {
      console.log('Error in reading csv');
      return Promise.reject(err);
    }
  }

  saveExamSubmissions(examId: string, submissions: Submission[]) {
    // return this.submissionRepo.saveSubmissions(examId, submissions);
    return this.submissionRepo.upsertSubmissions(examId, submissions);
  }

  removeSubmissions(examId: string) {
    return this.submissionRepo.delete({ exam: examId });
  }
}
