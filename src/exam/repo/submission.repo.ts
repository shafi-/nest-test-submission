import { EntityRepository, Repository } from "typeorm";
import { Submission } from "../entities/SubmissionEntity";

@EntityRepository(Submission)
export class SubmissionRepo extends Repository<Submission> {

  async getSubmissionByExamId(examId: string) {
    return this.find({ exam: examId });
  }

  async upsertSubmissions(examId: string, submissions: Submission[]) {
    let preparedSubmissions = this.create(submissions.map(submission => ({ ...submission, exam: examId })));

    return Promise.all(
      preparedSubmissions.map(
        submission => this.upsert(
          submission,
          { conflictPaths: ['name', 'exam', 'question'] }
        )
      )
    );
  }

  async saveSubmissions(examId: string, submissions: Submission[]) {
    let preparedSubmissions = this.create(submissions.map(submission => ({ ...submission, exam: examId })));
    return this.insert(preparedSubmissions);
  }
}
