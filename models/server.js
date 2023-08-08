import express from 'express';
import cors from 'cors';
import { router } from '../routes/userRoutes.js';
import routerLogin  from '../routes/auth.js'
import { dbConnection } from '../db/config.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/usuarios/api';
        this.authPath = '/api/auth';

        //Conectar a base de datos 
        this.conectarDB();

        //Middlewares
        this.middleware();

        //Rutas de mi aplicacion
        this.routes();
    }


    async conectarDB(){
        await dbConnection();
    }

    middleware() {
        //cors
        this.app.use(cors());
        //Parseo  lectura del body

        this.app.use(express.json());
        
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, routerLogin);
        this.app.use(this.usuariosPath, router);

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto:', this.port);
        });
    }
}

export default Server;