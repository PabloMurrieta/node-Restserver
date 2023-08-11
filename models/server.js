import express from 'express';
import cors from 'cors';


import { router } from '../routes/userRoutes.js';
import routerLogin  from '../routes/auth.js'
import routerCategories from '../routes/categoriesRoutes.js';
import { routerProducts } from '../routes/productsRoutes.js';
import { routerBuscar } from '../routes/buscarRoutes.js';

import { dbConnection } from '../db/config.js';


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:'/api/auth',
            buscar:'/api/buscar',
            categories:'/api/categories',
            usuarios:'/usuarios/api',
            products:'/api/products',

        }
        

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
        this.app.use(this.paths.auth, routerLogin);
        this.app.use(this.paths.categories, routerCategories);
        this.app.use(this.paths.usuarios, router);
        this.app.use(this.paths.products, routerProducts);
        this.app.use(this.paths.buscar, routerBuscar);





    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto:', this.port);
        });
    }
}

export default Server;