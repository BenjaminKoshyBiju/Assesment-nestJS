import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should return an array of users', async ()=>{
    const mockUsers: User[]=[
    {
      id: 2,
      name: 'Benjamin',
      username: 'Ben14',
      email: 'benjamin@gmail.com',
      age: 13,
      password: 'Benjamin',
      gender: 'm',
    },
  ];
    jest.spyOn(service['userRepository'], 'find').mockResolvedValue(mockUsers)

    const result = await service.findAllUsers()
    expect(result).toEqual(mockUsers);
  })


});


describe('createUser', () => {
  let service: UserService;
  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Benjamin',
      age: 25,
      email: 'ben@example.com',
      username: 'ben10',
      password: 'password123',
      gender: 'm',
    };

    
    jest.spyOn(service['userRepository'], 'findOneBy').mockResolvedValue(null);

  
    const createdUser: User = {
      "id": 4,
      "name": "Kobe",
      "username": "kob14",
      "email": "kobe@gmail.com",
      "age": 43,
      "password": "Basketball",
      "gender": "m"
  };
    jest.spyOn(service['userRepository'], 'save').mockResolvedValue(createdUser);

    const result = await service.createUser(createUserDto, createUserDto.username);

    expect(result).toEqual(createdUser);
  });

  it('should throw ConflictException if username already exists', async () => {
    const createUserDto: CreateUserDto = { "name": "Benjamin",
    "username": "Ben14",
    "email": "benjamin@gmail.com",
    "age": 13,
    "password": "Benjamin",
    "gender": "m"
      // ... mock user data
    };

    // Mock the repository's findOneBy method to simulate an existing user
    jest.spyOn(service['userRepository'], 'findOneBy').mockResolvedValue({ id: 1,
      name: 'benjamin',
      username: 'ben',
      email: 'benjamin@gmail.com"',
      age: 25,
      password: 'Password',
      gender: 'm',

    } as User);

    // Assert that calling createUser with an existing username throws ConflictException
    await expect(service.createUser(createUserDto, createUserDto.username)).rejects.toThrowError('Username already exists');
  });

  describe('validateUser', () => {
    let userService: UserService;
    it('should validate user credentials', async () => {
      const createUserDto: CreateUserDto = { "name": "Benjamin",
      "username": "Ben14",
      "email": "benjamin@gmail.com",
      "age": 13,
      "password": "Benjamin",
      "gender": "m"
        // ... mock user data
      }

      const loginUsername = 'john.doe';
      const loginPassword = 'password123';

      // Mock the repository's findOneBy method to simulate an existing user
      const existingUser: User = {id: 1,
        name: 'benjamin',
        username: 'ben',
        email: 'benjamin@gmail.com"',
        age: 25,
        password: 'Password',
        gender: 'm' };
      jest.spyOn(userService['userRepository'], 'findOneBy').mockResolvedValue(existingUser);

      // Mock bcrypt.compare to always return true (matching password)
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await userService.validateUser(createUserDto, loginUsername, loginPassword);

      expect(result).toEqual(existingUser);
    });

    it('should throw UnauthorizedException if user not found or password does not match', async () => {
      const createUserDto: CreateUserDto = {
        name: 'benjamin',
        username: 'ben',
        email: 'benjamin@gmail.com"',
        age: 25,
        password: 'Password', 
        gender: 'm'
      };

      const loginUsername = 'benjamin';
      const loginPassword = 'password123';

      
      jest.spyOn(userService['userRepository'], 'findOneBy').mockResolvedValue(null);

      // Mock bcrypt.compare to always return false (non-matching password)
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      
      await expect(userService.validateUser(createUserDto, loginUsername, loginPassword)).rejects.toThrow('Invalid credentials');
    });
  });
});




