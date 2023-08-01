import express from 'express';
import cors from 'cors';
import { router } from '../routes/user.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/usuarios/api';

        //Middlewares
        this.middleware();

        //Rutas de mi aplicacion
        this.routes();
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
        this.app.use(this.usuariosPath, router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto:', this.port);
        });
    }
}

export default Server;