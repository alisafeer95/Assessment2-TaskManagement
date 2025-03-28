import { Controller,Post,Body, ConflictException } from '@nestjs/common';
import { CreateProjectDto } from 'src/dtos/project.dto';
import { ProjectService } from 'src/services/project/project.service';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService){}

     @Post()
      async create(@Body() createProject: CreateProjectDto) {
        const existingProject = await this.projectService.findByName(createProject.name);
        if(existingProject!=null) throw new ConflictException(`Project with name ${createProject.name} already exists`);
        return await this.projectService.createProject(createProject);
      }
}
