import { Controller,Body,Post, BadRequestException } from '@nestjs/common';
import { CreateTaskDto } from 'src/dtos/task.dto';
import { Task } from 'src/entities/task.entity';
import { TaskService } from 'src/services/task/task.service';

@Controller('task')
export class TaskController {
constructor(private readonly taskService:TaskService){}
    @Post()
    async create(@Body() task:CreateTaskDto):Promise<Task>
    {
         return await this.taskService.createTask(task);

    }
}
