import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { SubmissionRepo } from './repo/submission.repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubmissionRepo])
  ],
  controllers: [ExamController],
  providers: [ExamService],
})

export class ExamModule {}
