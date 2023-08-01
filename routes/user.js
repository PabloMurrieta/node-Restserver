import { Router } from 'express';
import { usuariosDelete,
         usuariosGet,
         usuariosPath,
         usuariosPost, 
         usuariosPut } from '../controllers/userControllers.js';
         
const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut)

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPath);

export {
    router
}