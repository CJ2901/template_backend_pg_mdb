import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/db";
import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDataSource{

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ){}

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto;

        try {
            // Verificar si el usuario ya existe
            const exists = await UserModel!.findOneBy({ email });
            if (exists) throw CustomError.badRequest('Email already in use.');
    
            // Crear instancia de la entidad
            const user = UserModel!.create({
                name,
                email,
                password: await this.hashPassword(password),
                roles: ["USER_ROLE"],
            });
    
            // Guardar en la base de datos
            const savedUser = await UserModel!.save(user);
    
            // Mapear y retornar la respuesta
            return UserMapper.userEntityFromObject(savedUser);
    
        } catch (error) {
            throw CustomError.badRequest('Error saving user: ' + error);
        }
        
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const {email,password} = loginUserDto;

        try {
            
            // Verificamos si el correo existe
            // const exists = await UserModel.findOne({email});
            const exists = await UserModel!.findOneBy({ email });

            if (!exists) throw CustomError.badRequest('Not correct. Please try again');           
            if( !this.comparePassword(password, exists.password) ) throw CustomError.badRequest('Incorrect password');

            return UserMapper.userEntityFromObject(exists);

        } catch (error) {
            if ( error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer('Internal server error');
        }
        
    }

}