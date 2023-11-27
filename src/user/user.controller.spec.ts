import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'benjamin',
        username: 'ben',
        email: 'benjamin@gmail.com"',
        age: 25,
        password: 'Password',
        gender: 'm'
      };

      // Mock the UserService's createUser method
      jest.spyOn(userService, 'createUser').mockResolvedValue({ id: 2,
        name: 'Benjamin',
        username: 'Ben14',
        email: 'benjamin@gmail.com',
        age: 13,
        password: 'Benjamin',
        gender: 'm' } as User);

      const result = await userController.create(createUserDto);

      expect(result).toEqual({ /* mock created user data */ });
    });

    it('should handle conflict when creating a user with an existing username', async () => {
      const createUserDto: CreateUserDto = {
      
        name: 'Benjamin',
        username: 'Ben14',
        email: 'benjamin@gmail.com',
        age: 13,
        password: 'Benjamin',
        gender: 'm'
      };

     
      jest.spyOn(userService, 'createUser').mockRejectedValue(new ConflictException('Username already exists'));

      
      await expect(userController.create(createUserDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('validateUser', () => {
    it('should validate user credentials', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Benjamin',
        username: 'Ben14',
        email: 'benjamin@gmail.com',
        age: 13,
        password: 'Benjamin',
        gender: 'm'
      };

      // Mock the UserService's validateUser method
      jest.spyOn(userService, 'validateUser').mockResolvedValue({ id: 2,
        name: 'Benjamin',
        username: 'Ben14',
        email: 'benjamin@gmail.com',
        age: 13,
        password: 'Benjamin',
        gender: 'm' } as User);

      const result = await userController.validateUser(createUserDto);

      expect(result).toEqual({ id: 2,
        name: 'Benjamin',
        username: 'Ben14',
        email: 'benjamin@gmail.com',
        age: 13,
        password: 'Benjamin',
        gender: 'm' });
    });

    it('should handle unauthorized when validating with incorrect credentials', async () => {
      const createUserDto: CreateUserDto = {
        
        name: 'Benjamin',
        username: 'Ben14',
        email: 'benjamin@gmail.com',
        age: 13,
        password: 'Benjamin',
        gender: 'm'
      };

      // Mock the UserService's validateUser method to throw an UnauthorizedException
      jest.spyOn(userService, 'validateUser').mockRejectedValue(new UnauthorizedException('Invalid credentials'));

      // Assert that calling validateUser with incorrect credentials throws an UnauthorizedException
      await expect(userController.validateUser(createUserDto)).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      // Mock the UserService's findAllUsers method
      jest.spyOn(userService, 'findAllUsers').mockResolvedValue([{ id: 2,
        name: 'Benjamin',
        username: 'Ben14',
        email: 'benjamin@gmail.com',
        age: 13,
        password: 'Benjamin',
        gender: 'm' }] as User[]);

      const result = await userController.findAll();

      expect(result).toEqual([{ 
        name: 'Benjamin',
        username: 'Ben14',
        email: 'benjamin@gmail.com',
        age: 13,
        password: 'Benjamin',
        gender: 'm' }]);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const userId = '1';

      // Mock the UserService's viewUser method
      jest.spyOn(userService, 'viewUser').mockResolvedValue({ id: 2,
        name: 'Benjamin',
        username: 'Ben14',
        email: 'benjamin@gmail.com',
        age: 13,
        password: 'Benjamin',
        gender: 'm' } as User);

      const result = await userController.findOne(userId);

      expect(result).toEqual({ 
        name: 'Benjamin',
        username: 'Ben14',
        email: 'benjamin@gmail.com',
        age: 13,
        password: 'Benjamin',
        gender: 'm'});
    });

    it('should handle not found when retrieving a non-existing user', async () => {
      const userId = '999';

      // Mock the UserService's viewUser method to throw a NotFoundException
      jest.spyOn(userService, 'viewUser').mockRejectedValue(new NotFoundException('User not found'));

      // Assert that calling findOne with a non-existing user ID throws a NotFoundException
      await expect(userController.findOne(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = '1';
      const updateUserDto: UpdateUserDto = {
        
        name: 'Benjamin',
        username: 'Ben14',
        email: 'benjamin@gmail.com',
        age: 13,
        password: 'Benjamin',
        gender: 'm'
      };

      // Mock the UserService's updateUser method
      jest.spyOn(userService, 'updateUser').mockResolvedValue({ id: 2,
        name: 'Benjamin',
        username: 'Ben14',
        email: 'benjamin@gmail.com',
        age: 13,
        password: 'Benjamin',
        gender: 'm' } as User);

      const result = await userController.update(userId, updateUserDto);

      expect(result).toEqual({ 
        name: 'Benjamin',
        username: 'Ben14',
        email: 'benjamin@gmail.com',
        age: 13,
        password: 'Benjamin',
        gender: 'm'});
    });
  });
});
