import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/entities/user.entity';
import { UserController } from 'src/controllers/user/user.controller';
import { UserRepository } from 'src/repository/user.repository';
import { TaskModule } from '../task/task.module';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),TaskModule,ProjectModule],
  controllers:[UserController],
  providers: [UserRepository,UserService],
  exports: [UserService,UserRepository],
})
export class UserModule {}