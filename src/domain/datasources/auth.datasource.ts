import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

// Crea la clase que implementa el método de register que reciba DTO y regrese una instancia de UserEntity
export abstract class AuthDataSource {
    
    abstract register ( registerUserDto: RegisterUserDto ): Promise<UserEntity>
    abstract login ( loginUserDto: LoginUserDto): Promise<UserEntity>


}