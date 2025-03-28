import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/dtos/task.dto';
import { Task } from 'src/entities/task.entity';
import { TaskRepository } from 'src/repository/task.repository';



@Injectable()
export class TaskService {
    constructor(private readonly taskRepo:TaskRepository){

    }

    async createTask(task:CreateTaskDto):Promise<Task>
    {
        
         return await this.taskRepo.createTask(task);
    }
}
