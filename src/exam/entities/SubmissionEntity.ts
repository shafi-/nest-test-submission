import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'

@Entity({ name: 'submissions' })
@Index(['exam', 'name', 'question'], { unique: true })
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exam: string;

  @Column()
  name: string;

  @Column()
  question: string;

  @Column()
  selectedAnswer: string;
}
