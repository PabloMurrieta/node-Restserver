import {response} from 'express';
import { check } from 'express-validator';
import bcryptjs from 'bcryptjs'

import Usuario from '../models/usuario.js';
import { generarJWT } from '../helpers/generarJWT.js';

const login = async (req, res =response) =>{

    const {email, password} = req.body;

    try {

       // Verificar si el email existe
       const usuario = await Usuario.findOne({email});
       if(!usuario){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
        });
       }

       //Si el usuario esta activo
       if(!usuario.Estado){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado:false'
        });
       }

       //Verificar la contraseña
        const valiPassword = bcryptjs.compareSync(password, usuario.password);
        
        if(!valiPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password:false'
            });
        }
        
       //Generer JWT

       const token = await generarJWT(usuario.id)
       






        res.json({
           usuario,
           token
           
        })



    } catch (error) {
        console.error('Error en el controlador de login:', error); // Agrega esta línea para imprimir el error
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
  
}

export{
    login
}