
import { Schema, model } from "mongoose";
import {Category} from "../models/index.js"

const ProductScehma = Schema({

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
    },
    precio:{
        type: Number,
        default:0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Category',
        require : true
    },
    descripcion:{type:String},
    disponible:{type: Boolean, default:true}

    
});

ProductScehma.methods.toJSON = function () {
    const { __v, Estado, ...data } = this.toObject();
    return data;
 }


export default model ('Product', ProductScehma);