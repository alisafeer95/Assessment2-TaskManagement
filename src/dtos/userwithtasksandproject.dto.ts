import { CreateTaskDto } from "./task.dto";
import { CreateUserDto } from "./user.dto";
import { Type } from "class-transformer";
import { ValidateNested, IsNotEmpty, IsNumber, IsArray } from "class-validator";

export class userWithProjectTasks{
    @ValidateNested()
    @Type(() => CreateUserDto)
    @IsNotEmpty()
    user: CreateUserDto;
    @IsNotEmpty()
    @IsNumber()
    projectId:number;
    @ValidateNested({ each: true })
    @Type(() => CreateTaskDto)
    @IsArray()
    tasks:CreateTaskDto[];
}