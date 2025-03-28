import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { CreateProjectDto } from 'src/dtos/project.dto';

@Injectable()
export class ProjectRepository {
  constructor(@InjectRepository(Project) private readonly repo: Repository<Project>) {}

  async findById(id: number): Promise<Project | null> {
    return await this.repo.findOne({ where: { id } });
  }
   async createProject(projectData: CreateProjectDto): Promise<Project> {
      const project = this.repo.create(projectData);
      return await this.repo.save(project);
    }
    async findByName(name: string): Promise<Project | null> {
      return await this.repo.findOne({ where: { name } });
  
       
  }
}
