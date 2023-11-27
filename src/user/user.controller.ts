import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

 
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto, createUserDto.username);
  }

  @Get('/login')
  validateUser(@Body() createUserDto: CreateUserDto) { 
    return this.userService.validateUser(createUserDto, createUserDto.username, createUserDto.password);
  }
  
 

  @Get()
  findAll() { 
    return this.userService.findAllUsers();
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.viewUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
