import { body } from "express-validator";
import { Product } from "../models/index.js";
import { Query } from "mongoose";
import { response } from "express";



//Obtener Productos
const obtenerProducts = async (req, res = response) =>{

    const{limit = 5, desde= 0} = req.query;
    const query = {Estado :true};

    const [total, product] = await Promise.all([
            //Cuentame e numero de productos encontrados con la funcion Count
            Product.countDocuments(query),
            //Encuentrame los que entren dentro de lo que pde query
            Product.find( query)
                //Para el lmite y desde donde quieres(skip) - convertir el valor string a number que ocupan la funciones para funcionar
                .skip(Number(desde))
                .limit(Number(limit))
                //El populate saca la info de usuario que se guardo en el registro al hacer la creaicon de categoria
                .populate('usuario','name')
    ])

    res.json({
          total,
          product

    })

}

//Obtener producto por id
const obtenerProductById = async (req, res = response)=>{

    const {id} = req.params;

    const produc = await Product.findById(id);

    res.json({
        produc
    })
    
}

//Crear nuevo producto
const crearPorducto = async (req, res = response) => {
    try {
        const { name, Category } = req.body;

        // Volvemos mayúsculas el nombre del producto para que funcione la validación y choque con el otro valor en caso de que ya exista
        const productName = name.toUpperCase();

        // Verificar si el producto ya existe
        const producDB = await Product.findOne({ name: productName });

        if (producDB) {
            return res.status(400).json({
                msg: `El producto ${producDB.name} ya existe`
            });
        }

        // Generamos la data que se guardará
        const data = {
            name: productName,
            usuario: req.usuario._id,
            Category: Category // Asegúrate de que estás asignando correctamente la categoría
        };

        // Guardamos el objeto
        const product = new Product(data);
        await product.save();

        // Mandar info del estatus si es que sale bien
        res.status(201).json(product);
    } catch (error) {
        // Manejar otros errores aquí
        res.status(500).json({
            msg: 'Hubo un error en el servidor'
        });
    }
};

const ActulizarPorduct = async (req, res = response) =>{

   const {id} = req.params;
   const {Estado, usuario,...data} = req.body;

   data.name = data.name.toUpperCase();

   data.usuario = req.usuario._id;

   const product = await Product.findByIdAndUpdate(id,data,{new:true});

   res.json({
    product
   })


}

const borrarPorduct = async (req, res = response) =>{

    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id,{Estado:false}, {new:true});

    res.json({
        product
    })
}






export {

    ActulizarPorduct,
    crearPorducto,
    borrarPorduct,
    obtenerProducts,
    obtenerProductById,

}