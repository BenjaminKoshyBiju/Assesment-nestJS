import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './entities/user.entity'
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ){}

  async hashPassword(password:string): Promise<string>{
    const saltRounds=10;
    return bcrypt.hash(password,saltRounds)
  }


  async createUser(createUserDto: CreateUserDto,username:string): Promise<User> {       //registering and creating user then login then all other functions
    const existingUser= await this.userRepository.findOneBy({username});
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const user: User= new User();
    user.name=createUserDto.name;
    user.age = createUserDto.age
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = await this.hashPassword(createUserDto.password);
    user.gender = createUserDto.gender;
    return this.userRepository.save(user);
  }

  async validateUser(createUserDto: CreateUserDto,username:string,password:string): Promise<User> {  //implemented login
    const user= await this.userRepository.findOneBy({username})
    if (!user || await bcrypt.compare(password, createUserDto.password))
    {
      throw new UnauthorizedException('Invalid credentials');
    }
    
      
  
    return user ;
  }
  


  findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({id});
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user= new User()
    user.name=updateUserDto.name;
    user.age=updateUserDto.age;
    user.email=updateUserDto.email;
    user.username=updateUserDto.username;
    user.password=updateUserDto.password;
    user.gender=updateUserDto.gender
    user.id=id;
    return this.userRepository.save(user)
  }

  removeUser(id: number): Promise<{affected?:number}> {
    return this.userRepository.delete(id);
  }
}
