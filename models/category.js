


import { Schema, model } from "mongoose";

const CategoryScehma = Schema({

    name:{
        type: String,
        required : [true, 'El nombre es obligatorio'],
        unique: true
    },
    Estado:{
        type: Boolean,
        default:true,
        require:true
    },
    //El campo usuario hace referencia al usuario que creo la categoria o hizo algun cambio
    usuario:{
        //Conectamos con la tabla usuarios, por lo que debemos de conectar su dicho Schema
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        //requiere ser true porque cada categoria debe tener forzosamente el usuario que la creo
        require:true
    }

    
});

CategoryScehma.methods.toJSON = function () {
    const { __v, Estado, ...category } = this.toObject();
    return category;
 }


export default model ('Category', CategoryScehma);