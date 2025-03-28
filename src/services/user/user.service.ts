import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from 'src/dtos/user.dto';
import { CreateTaskDto, UpdateTaskDto } from 'src/dtos/task.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repository/user.repository';
import { ProjectRepository } from 'src/repository/project.repository';
import { TaskRepository } from 'src/repository/task.repository';
import { userWithProjectTasks } from 'src/dtos/userwithtasksandproject.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly taskRepository: TaskRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly dataSource: DataSource,
  ) {}
  //async createUserWithTasksAndProject(dto: CreateUserDto, projectId: number, tasks: CreateTaskDto[])
  async createUserWithTasksAndProject(userObject:userWithProjectTasks): Promise<User> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const user = await this.userRepository.createUser(userObject.user);
        if (!user) throw new InternalServerErrorException('Failed to create user');

        const project = await this.projectRepository.findById(userObject.projectId);
        if (!project) throw new NotFoundException(`Project with ID ${userObject.projectId} not found`);

        await manager.createQueryBuilder().relation(User, 'projects').of(user).add(project);

        for (const taskDto of userObject.tasks) {
            taskDto.user=user;
            taskDto.project=project;
          //const task = await this.taskRepository.createTask({ ...taskDto, user, project });
          const task = await this.taskRepository.createTask({ ...taskDto});
          if (!task) throw new InternalServerErrorException('Failed to create task');
        }

        return user;
      });
    } catch (error) {
      console.error('Transaction failed:', error);
      throw new InternalServerErrorException(`${error.message} while creating user ${userObject.user.name} with ${userObject.tasks.length} tasks for project.`);
    }
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(dto);
  }

  async assignUserToProject(userId: number, projectId: number): Promise<string> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
  
        const project = await this.projectRepository.findById(projectId);
        if (!project) throw new NotFoundException(`Project with ID ${projectId} not found`);
  
        await manager.createQueryBuilder().relation(User, 'projects').of(user).add(project);
  
        return `User ${userId} successfully assigned to project ${projectId}`;
      });      
    } catch (error) {
      console.error('Error while assigning user to objects');
      throw new BadRequestException(`${error.message} while assigning user to project`);
    }

  }

  async unassignUserFromProject(userId: number, projectId: number): Promise<string> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
  
        const project = await this.projectRepository.findById(projectId);
        if (!project) throw new NotFoundException(`Project with ID ${projectId} not found`);
  
        await manager.createQueryBuilder().relation(User, 'projects').of(user).remove(project);
  
        return `User ${userId} successfully unassigned from project ${projectId}`;
      });  
    } catch (error) {
      throw new BadRequestException(`${error.message} while removing user from project`);
    }
    
  }
  async updateUserTasks(userId: number, projectId: number, tasks: UpdateTaskDto[]): Promise<string> {
    try {
        return await this.dataSource.transaction(async (manager) => {
            const user = await this.userRepository.findById(userId);
            if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
        
            const project = await this.projectRepository.findById(projectId);
            if (!project) throw new NotFoundException(`Project with ID ${projectId} not found`);
        
            await this.taskRepository.updateUserTasks(user, project, tasks);
        
            return `Tasks for user ${userId} in project ${projectId} successfully updated`;
          });
    } catch (error) {
        console.log(error);
        throw new BadRequestException(`${error.message} while updating user tasks`);
    }
  

  }
  async findByEmail(email: string): Promise<User | null>{

    return await this.userRepository.findByEmail(email);
  }
  
  async findById(id: number): Promise<User | null>{

    return await this.userRepository.findById(id);
  }
}
