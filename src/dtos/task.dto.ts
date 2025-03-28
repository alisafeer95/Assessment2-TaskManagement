import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  user:User

  @IsNumber()
  @IsOptional()
  project:Project
}

export class UpdateTaskDto {
    id: number;
    title?: string;
    description?: string;
  }
