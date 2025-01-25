import express, { Router } from 'express';

interface Options{
    port?: number;
    routes: Router
}

export class Server {

    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor( options: Options ){
        // Clases deben estar abiertas a expansión, cerradas a modificación
        const {port = 3100, routes} = options;

        this.port = port;
        this.routes = routes;
    }

    async start(){

        // Middlewares: Funciones que se ejecutan antes de otras funciones
        this.app.use( express.json() ); // Como body
        this.app.use( express.urlencoded({ extended: true}));


        this.app.use( this.routes );

        this.app.listen( this.port , () =>{
            console.log(`Server running on port ${this.port}`)
        })

    }
}