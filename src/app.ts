import { envs } from "./config";
import { MongoDatabase, PostgresDatabase, initializeUserModel } from "./data/db";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
    try {
        // Conectar a la base de datos
        await PostgresDatabase.connect({
            host: envs.HOST,
            port: envs.DB_PORT(),
            username: envs.USERNAME,
            password: envs.PSSW,
            database: envs.DB,
        });

        // Inicializar el modelo UserModel
        await initializeUserModel();

        // Iniciar el servidor
        const server = new Server({
            port: envs.PORT(),
            routes: AppRoutes.routes,
        });

        await server.start(); 
        console.log("Application started successfully!");
    } catch (error) {
        console.error("Failed to start application:", error);
        process.exit(1);
    }
})();