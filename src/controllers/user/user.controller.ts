import { Controller, Get, Post, Body, Param, Put, Delete, ConflictException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from 'src/dtos/task.dto';
import { CreateUserDto } from 'src/dtos/user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(createUserDto.email)
    if(existingUser!=null) throw new ConflictException(`User with email: ${createUserDto.email} already exists`);
    return await this.userService.createUser(createUserDto);
  }


  @Post('create-with-projects-tasks')
  async createWithProjectsAndTasks(
    @Body() body: {
      user: CreateUserDto;
      projectId: number;
      tasks: CreateTaskDto[];
    },
  ) {
    const existingUser = await this.userService.findByEmail(body.user.email)
    if(existingUser!=null) throw new ConflictException(`User with email: ${body.user.email} already exists`);
    return this.userService.createUserWithTasksAndProject(body.user, body.projectId, body.tasks);
  }

  @Post('assignUserToProject')
  async AssignUserToProjects(
    @Body() body: {
      userId: number;
      projectId: number;
    },
  ) {
    return await this.userService.assignUserToProject(body.userId, body.projectId);
  }

  @Post('UnassignUserFromProject')
  async UnAssignUserFromProjects(
    @Body() body: {
      userId: number;
      projectId: number;
    },
  ) {
    return await this.userService.unassignUserFromProject(body.userId, body.projectId);
  }

  @Post('UpdateUserTasks')
  async UpdateUserTasks(
    @Body() body: {
      userId: number;
      projectId: number;
      tasks:UpdateTaskDto[]
    },
  ) {
    return await this.userService.updateUserTasks(body.userId, body.projectId,body.tasks)
  }
}