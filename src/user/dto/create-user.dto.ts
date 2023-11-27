import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength
} from 'class-validator'

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
    @IsString()
    @MinLength(2,{message:'Name must have atleast 2 characters'})
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(3,{message:'Username should have atleast 3 characters'})
    @IsAlphanumeric(null,{message:'Username should be only in Alpha-Numeric'})
    username: string;

    @IsNotEmpty()
    @IsEmail(null,{message:'Please provide a valid email'})
    email: string;

    @IsInt()        //later check and add a decorator if age returns negative
    age: number;

    @IsString()
    @IsEnum(['f','m','u'])
    gender: string

    @IsNotEmpty()
    @Matches(passwordRegEx,{message:'Password must contain Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and  one special character'})
    password: string;
}

