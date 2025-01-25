import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
    static get routes(): Router{
        
        const router = Router();

        //Define rutas principales
        router.use('/api/auth', AuthRoutes.routes)

        return router;
    }
}