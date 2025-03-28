import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from 'src/controllers/task/task.controller';
import { Task } from 'src/entities/task.entity';
import { TaskRepository } from 'src/repository/task.repository';
import { TaskService } from 'src/services/task/task.service';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';

@Module({ imports: [TypeOrmModule.forFeature([ Task])],
  providers: [TaskRepository,TaskService],
  controllers:[TaskController],
  exports: [TaskRepository,TaskService],})
export class TaskModule {}
