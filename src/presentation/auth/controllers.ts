import {Request, Response} from 'express';
import { CustomError, RegisterUser, RegisterUserDto } from '../../domain';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/db';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { LoginUser } from '../../domain/use-cases/auth/login-user.use-case';

export class AuthController {
    //Inyeccion de Dependencias
    constructor(
        private readonly authRepository: AuthRepository,
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
    
        // Log detallado para errores no controlados
        console.error('Unhandled error:', error);
    
        // Respuesta genérica para errores inesperados
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    registerUser = ( req: Request, res: Response) => {

        try {
            const [error, registerUserDto] = RegisterUserDto.create(req.body);
            if (error) return res.status(400).json({ error });
    
            new RegisterUser(this.authRepository)
                .execute(registerUserDto!)
                .then(data => res.json(data))
                .catch(error => {
                    // Aquí delegamos al método `handleError`
                    this.handleError(error, res);
                });
    
        } catch (error) {
            this.handleError(error, res);
        }


        

        
        // this.authRepository.register( registerUserDto! )
        //     .then( async(user) => {
        //         res.json({
        //             user,
        //             token: await JwtAdapter.generateToken({id: user.id})
        //         });
        //     })
        //     .catch( error => res.status(500).json(error) )
    }

    loginUser = ( req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.login(req.body);
        if ( error ) return res.status(400).json({error});

        new LoginUser(this.authRepository)
            .execute( loginUserDto! )
            .then( data => res.json(data) )
            .catch( error => this.handleError(error,res) )
    }

    getUsers = ( req: Request, res: Response) => {
        UserModel!.find()
            .then( users => {
                res.json({
                    // users,
                    // token: req.body.payload
                    user: req.body.user
                })
            } )
            .catch( () => res.status(500).json({error: 'Internal server error'}) )
    }

    

}