import { Router } from "express";
import { AuthController } from "./controllers";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
    static get routes(): Router{
        
        const router = Router();
        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);
        const controller = new AuthController(authRepository);

        //Define rutas principales
        router.post('/login', controller.loginUser)
        router.post('/register', controller.registerUser)

        router.get('/', [AuthMiddleware.validateJWT] ,controller.getUsers)

        return router;
    }
}