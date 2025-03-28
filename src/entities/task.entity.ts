import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.tasks,{ nullable: false, onDelete: 'CASCADE' })
  @IsNotEmpty()
  user: User;

  @ManyToOne(() => Project, (project) => project.tasks,{ nullable: false, onDelete: 'CASCADE' })
  @IsNotEmpty()
  project: Project;
}