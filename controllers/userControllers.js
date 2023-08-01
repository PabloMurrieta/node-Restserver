import {  response } from "express";

const usuariosGet = (req = request, res = response) => {

    const {q, nombre='no name', apikey} = req.query;
    res.json({
        msg: 'Get API-Controller',
        q,
        nombre,
        apikey
    });
 }


 const usuariosPut = (req, res = response) => {

    const {id} = req.params;
    res.json({
        msg: 'Put API-Controller',
        id
    });
 }


 const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'Post API-Controller',
        nombre ,edad    
    });
 }


 const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'Delete API-Controller'
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