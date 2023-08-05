import bcryptjs from 'bcryptjs'
import {  response } from "express";
import Usuario from "../models/usuario.js";


const usuariosGet = async (req = request, res = response) => {

   //con el **{limit = 5(el calor es 5 por default)}***estamos desustructurando el numero de objetos solicitados mediante la url, para posteriormente ser pasado la funcio limit 
   //que se encarga de esta funcion, solo que limit ocupara Number para convertir el valor a numerico
   const {limit = 5, desde = 0} = req.query;
   //query verifica que este activo el usuario

   const query = {Estado : true};

    //al me ejecutara las promesas al mismo tiempo lo que hara que las consultas no demores demasiado tiempo y en el caso de que una de error todo dara error
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
         //Para el lmite
        .skip(Number(desde))
        .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
    });
 }


 const usuariosPut = async (req, res = response) => {

    const {id} = req.params;
    //Extraigo lo que no quiero y envio lo que quiero a resto para usarlo hacer input
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO validar conta bse de datos
    if(password){

    const salt = bcryptjs.genSaltSync();//se le asigna con esta funcion
    resto.password = bcryptjs.hashSync( password, salt );  //el has es para encriptar en una sola via (lo que quieres, el salt)

    }

    //Estás usando Usuario.findByIdAndUpdate para buscar el documento por su ID (id) y luego actualizar solo los campos presentes en el objeto resto.
    //{ new: true } asegura que después de la actualización, la variable usuario contendrá el documento actualizado. Si no incluyes { new: true }, la variable usuario contendría el documento antes de la actualización.
    const usuario = await Usuario.findByIdAndUpdate(id, { $set: resto }, { new: true });

    res.json(usuario);
 }


 const usuariosPost = async (req, res = response) => {
    

    const {name, email, password, rol} = req.body;
    const usuario = new Usuario({name, email, password, rol});


    //Encriptar la contraseña
   //--SALT es el numero de vueltas para hacer mas compricada la incriptacion (El valor 10 esta por defecto) 
   const salt = bcryptjs.genSaltSync();//se le asigna con esta funcion
   usuario.password = bcryptjs.hashSync( password, salt );  //el has es para encriptar en una sola via (lo que quieres, el salt)

   //Guardar en BD
    await usuario.save();


    res.json({
        msg: 'Post API-Controller',
        usuario    
    });
 }


 const usuariosDelete = async (req, res = response) => {


    const {id} = req.params;

    //Fisicamente
   // const usuario = await Usuario.findByIdAndDelete(id);
//Se cambia a false su estado para mantener la integridad referencial
   const usuario = await Usuario.findByIdAndUpdate(id, { Estado: false } );
    res.json({
       usuario
    });
 }


 const usuariosPath = (req, res = response) => {

    res.json({
        msg: 'Path API-Controller'
    });
 }


 export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPath
 }