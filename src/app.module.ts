import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { UserService } from './services/user/user.service';
import { TaskService } from './services/task/task.service';
import { ProjectService } from './services/project/project.service';
import { UserController } from './controllers/user/user.controller';
import { ProjectController } from './controllers/project/project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './controllers/task/task.controller';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory:()=>({
    type:'postgres',
    host:'localhost',
    port:5433,
    username:'postgres',
    password:'admin',
    database:'taskmanagement',
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    })

  }),UserModule, ProjectModule, TaskModule],
  controllers: [AppController, UserController, ProjectController, TaskController],
  providers: [AppService, UserService, TaskService, ProjectService],
})
export class AppModule {}
