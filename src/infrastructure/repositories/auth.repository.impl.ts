import { AuthRepository, RegisterUserDto, UserEntity } from "../../domain";
import { AuthDataSource } from '../../domain/datasources/auth.datasource';
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthRepositoryImpl implements AuthRepository{
    
    constructor(
        private readonly authDataSource: AuthDataSource,
    ){}

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDataSource.register(registerUserDto); 
    }

    login(loginUserDto: LoginUserDto): Promise<UserEntity>{
        return this.authDataSource.login(loginUserDto);
    }

}