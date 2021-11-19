import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createDbConfig } from './config';
import { Submission } from './exam/entities/SubmissionEntity';
import { ExamModule } from './exam/exam.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [createDbConfig]
    }),
    TypeOrmModule.forRoot(createDbConfig([Submission])),
    ExamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
