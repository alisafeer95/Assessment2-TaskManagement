import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsArray()
  @IsOptional()
  taskIds?: number[];
}