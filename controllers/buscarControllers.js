import { json, response } from "express";
import { Types } from "mongoose";

import Usuario from "../models/usuario.js"
import Product from "../models/product.js"
import usuario from "../models/usuario.js";
import { Category } from "../models/index.js";

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuario = async (termino = '', res = response) => {

    // Aquí defines una función llamada buscarUsuario que 
     // toma un término de búsqueda (termino) y una respuesta (res) como parámetros. Verificas si el termino es un ID de MongoDB válido utilizando 
     // Types.ObjectId.isValid. Si es válido, usas el modelo Usuario para buscar un usuario por su ID y luego envías la respuesta JSON con el usuario encontrado.
    if (Types.ObjectId.isValid(termino)) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            //SI el usuario exite regreso un aarreglo con el usuario y si no un arreglo vacio, utilizando un ternalio
            result:(usuario) ? [usuario] : []
        });
    }

    //Expresion regular para que sea insensible a minusculas y mayusculas
    const regex = new RegExp (termino, 'i');

    const usuarios = await Usuario.find({

    // El or me permite hacer las condiciones que quiera definir, en este caso El campo que concida con la exprecion regular 
    //y espesificamos que en el campo Estadoo debe ser true (usuario activo)
        $or:[{name: regex},{email: regex}],
        $and:[{Estado:true}]
    });

    console.log(usuarios);
    res.json({
        result:usuarios,
        
    })
}

const buscarCategory = async (termino = '', res = response) =>{

    if(Types.ObjectId.isValid(termino)){

        const category = await Category.findById(termino);
        return res.json({
            result:(category) ? [category]: []
        });
    }


    const regex = new RegExp(termino,'i');

    const category = await Category.find({
        $or:[{name: regex}],
        $and:[{Estado:true}]
    });

    
    res.json({
        result:category,
        
    })

}


const buscarProducts = async (termino = '', res = response) =>{

    if(Types.ObjectId.isValid(termino)){

        const product = await Product.findById(termino);
        return res.json({
            result:(product) ? [product]: []
        });
    }


    const regex = new RegExp(termino,'i');

    const product = await Product.find({
        $or:[{name: regex}],
        $and:[{Estado:true}]
    });

    
    res.json({
        result:product,
        
    })

}







const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son : ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res);
            break;
        case 'categoria':
            // Aquí puedes agregar la lógica para buscar categorías
            buscarCategory(termino,res);

            break;
        case 'productos':
            // Aquí puedes agregar la lógica para buscar productos
            buscarProducts(termino,res);
            break;
        case 'roles':
            // Aquí puedes agregar la lógica para buscar roles
            break;
        default:
            // Lógica por defecto si no coincide ninguna colección
            break;
    }
}

export {
    buscar
};