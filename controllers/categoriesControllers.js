import { response } from "express";
import {Category} from  "../models/index.js";


//Obtener catgoria - Paginado - total - populate
const obtenerCategories = async (req, res = response) =>{

   const {limit = 5, desde = 0} = req.query;
   const query = {Estado : true};

   //Promise.all():
// Se utiliza Promise.all() para realizar dos consultas en paralelo:
// a. Category.countDocuments(query): Cuenta el total de documentos que cumplen con la consulta especificada. Esto te dará el número total de categorías que coinciden con el estado activo.
// b. Category.find(query): Recupera las categorías de la base de datos que cumplen con la consulta especificada. Se utiliza .skip(Number(desde)) y .limit(Number(limit)) para implementar la paginación, es decir, saltar las primeras desde categorías y limitar la cantidad de categorías recuperadas a limit.
    const [total, category] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
         //Para el lmite y desde donde quieres(skip) - convertir el valor string a number que ocupan la funciones para funcionar
        .skip(Number(desde))
        .limit(Number(limit))
        //El populate saca la info de usuario que se guardo en el registro al hacer la creaicon de categoria
        .populate('usuario','name')
    ])
    res.json({
        total,
        category
    })
    
}

//Obtene categoria -Populate {}
const obtenerCategoryById = async (req, res = response) =>{

const  {id} = req.params;
const category = await Category.findById(id).populate('usuario', 'name');

res.json({

    category
})
}



//Crear Categoria
const crearCategory = async (req, res = response) =>{

    //Uppercase paara que choque por la validacion en el caso de que ya exista
    const name = req.body.name.toUpperCase();

    //Encontrar concidencias con la BD
    const categoriaDb =  await Category.findOne({name});

    if(categoriaDb){
        return res.status(400).json({
            msg:`La categoia ${categoriaDb.name}, ya existe`
        });
    }


    //Generar la data a guardar

    const data = {
        name,
        usuario: req.usuario._id
    }

    // Mando a crear un nuevo objeto categoria insertando los valores que quiero al modelo
    const category = new Category(data)
    //Guardar
    await category.save();
    //Mandar info del estatus si es que sale bien
    res.status(201).json(category);

}

//Actualizar Categoria
const ActulizarCategory = async (req, res = response) =>{

    const {id} = req.params;

    const {Estado,usuario, ...data} = req.body;

    data.name = data.name.toUpperCase();

    //Aqui le doy el valor del usuario al nuevo usuario que hizo el update
    data.usuario = req.usuario._id;

    //{ new: true } asegura que después de la actualización, la variable usuario contendrá el documento actualizado. Si no incluyes { new: true }, la variable usuario contendría el documento antes de la actualización.
    const category = await Category.findByIdAndUpdate(id,{$set:data}, {new:true});

    res.json({
        category
    })
}

//Borrar categoria - estado : false


const borrarCategory = async (req, res = response) =>{

    const {id} = req.params;

    const category = await Category.findByIdAndUpdate(id,{Estado:false},{new:true});
    const usuarioAuntenticado = req.usuario;
    const { name,email,rol} = usuarioAuntenticado;

    res.json({
        category,
        name,email,rol
    })
}

export {
    crearCategory,
    obtenerCategories,
    obtenerCategoryById,
    ActulizarCategory,
    borrarCategory
}