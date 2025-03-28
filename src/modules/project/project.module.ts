import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from 'src/controllers/project/project.controller';
import { Project } from 'src/entities/project.entity';
import { ProjectRepository } from 'src/repository/project.repository';
import { ProjectService } from 'src/services/project/project.service';

@Module({ imports: [TypeOrmModule.forFeature([ Project])],
controllers:[ProjectController],
  providers: [ProjectRepository,ProjectService],
  exports: [ProjectService,ProjectRepository],})
export class ProjectModule {}
