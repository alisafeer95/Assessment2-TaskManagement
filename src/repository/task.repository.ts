import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { Project } from 'src/entities/project.entity';
import { CreateTaskDto, UpdateTaskDto } from 'src/dtos/task.dto';

@Injectable()
export class TaskRepository {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>) {}

  async createTask(taskData: CreateTaskDto): Promise<Task> {
    const task = this.repo.create(taskData);
    return await this.repo.save(task);
  }

  async findById(taskId: number): Promise<Task | null> {
    return await this.repo.findOne({ where: { id: taskId }, relations: ['user', 'project'] });
  }
  async updateUserTasks(user: User, project: Project, tasks: UpdateTaskDto[]): Promise<void> {
    for (const taskDto of tasks) {
      const task = await this.repo.findOne({ where: { id: taskDto.id,user,project } });

      if (!task) throw new NotFoundException(`Task with ID: ${taskDto.id}, user: ${user.name}, project:${project.name} not found`);


      //throw new NotFoundException(`Task with ID ${taskDto.id} not found`);
      task.title = taskDto.title ?? task.title;
      task.description = taskDto.description ?? task.description;

      await this.repo.save(task);
    }
}
}
