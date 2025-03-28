import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from 'src/dtos/project.dto';
import { Project } from 'src/entities/project.entity';
import { ProjectRepository } from 'src/repository/project.repository';

@Injectable()
export class ProjectService {
    constructor( private readonly projectRepository: ProjectRepository){}
      async createProject(dto: CreateProjectDto): Promise<Project> {

        return await this.projectRepository.createProject(dto);

      }

async findByName(name: string): Promise<Project | null> {
    return await this.projectRepository.findByName(name);
    
}
async findById(id: number): Promise<Project | null> {
  return await this.projectRepository.findById(id);
  
}
}