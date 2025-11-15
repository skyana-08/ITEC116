import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Get user by ID
  @Get(':id')
  async getById(@Param('id') id: string) {
    const user = await this.usersService.findById(+id);
    if (!user) return { message: 'User not found' };
    return { id: user.id, name: user.name, email: user.email };
  }

  // Register new user
  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { name, email, password } = body;

    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new BadRequestException('Email already registered');

    const user = await this.usersService.create({ name, email, password });
    return { id: user.id, name: user.name, email: user.email };
  }
}
