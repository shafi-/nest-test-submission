import { Body, Controller, Get, Param, Post, Delete, UploadedFile, UseInterceptors, ValidationPipe, NotFoundException, HttpException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppError } from '../exceptions';
import { Answer } from '../dto/submission.dto';
import { ExamService } from './exam.service';

@Controller('exams/:id')
export class ExamController {
  constructor(private readonly appService: ExamService) {}

  @Get('submissions')
  async getAllSubmissions(@Param('id') examId: string) {
    const submissions = await this.appService.getAllSubmissions(examId);
    return {
      count: submissions.length,
      submissions,
    }
  }

  @Get('result')
  getResult(@Param('id') examId: string, @Body('answers') answers: Answer[]) {
    return this.appService.calculateResult(examId, answers);
  }

  @Post('submissions')
  @UseInterceptors(FileInterceptor('file', { dest: '../temp-upload' }))
  async submitExam(@Param('id') examId: string, @UploadedFile('file') file) : Promise<any> {
    try {
      if (!file) throw new NotFoundException(new Error('file is required'), 'file is required');
      const submissions = await this.appService.parseSubmissionCSVFile(file.path, true);
      return this.appService.saveExamSubmissions(examId, submissions);        
    } catch (err) {
      if (err instanceof AppError) {
        err = new HttpException(err, err.statusCode);
      } else if (!(err instanceof HttpException)) {
        err = new HttpException(err, 500);
      }

      throw err;
    }
  }

  @Delete('submissions')
  async deleteSubmissions(@Param('id') examId: string) {
    try {
      return await this.appService.removeSubmissions(examId);
    } catch (err) {
      throw new HttpException(err, err.message);
    }
  }
}
