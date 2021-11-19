## Description

A test to create apis based on [Nest](https://github.com/nestjs/nest) framework with TypeScript.

## Used technologies

 - Framework `NestJS`  
 - Database `postgresql`   
 - Language `Typescript`

## Installation

```bash
$ npm install
# or
$ yarn
```

## Running the app

```bash
# development
$ npm run start
# or
$ yarn start

# watch mode
$ npm run start:dev
# or
$ yarn start

# production mode
$ npm run start:prod
# or
$ yarn start
```

### API
  - Submit exam submissions   
  POST  /exams/:examId/submissions

  - Get the calculated result for `examId`  
  GET /exams/:examId/result

  - Get all submissions for  `examId`
  GET /exams/:examId/submissions

  - Delete all submissions for `examId`
  Delete /exam/:examId/submissions

## Stay in touch

- Author - [Md Abdullahil Shafi](mailto:shafi.cse.buet@gmail.com)
