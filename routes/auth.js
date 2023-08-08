import { check } from 'express-validator';
import { Router } from 'express';
import { login } from '../controllers/authController.js';
import { validarCampos } from '../middlewares/validar-campos.js';



const routerLogin = Router();


routerLogin.post('/login',[
    
    check('email', 'El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos

],login);


export default routerLogin 