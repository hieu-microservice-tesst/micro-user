import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'prisma/generated/user';
import { MessagePattern } from '@nestjs/microservices';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() data: { email: string; name: string; username: string; password: string }): Promise<User> {
     const user = this.userService.createUser(data);
     return (user)
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() data: Partial<User>): Promise<User> {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
  @MessagePattern({ cmd: 'get_user' })
  async getUser(userId: number): Promise<User | null> {
    return this.userService.getUserById(userId);
  }

}
