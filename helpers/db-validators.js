import Role from '../models/rol.js';
import Usuario from '../models/usuario.js';


//El argumento rol recibe por default u string vacio para que no truene en el caso de que no envien nada, esto lo reccibira custom
//para su verificacion.
const esRolValido = async(rol = '') =>{
    //la constante exiteRol esperara para ver si encuentra el valor seleccionado con el uso de la funcion findOne y en el caso de que sea true se hara la validacion
    const exiteRol = await Role.findOne({rol});
    if(!exiteRol){
        throw new  Error(`El rol ${ rol} no esta registrado en la base de datos`);
    }
}


const emailExiste = async (email)  =>{

     //Verificar si el correo existe
     const existeEmail = await Usuario.findOne({email});

         if(existeEmail){
            throw new  Error(`El email: ${ email} ya esta registrado en la base de datos`);
        }
     
}


const existeUsuarioPorId = async (id) =>{

     //Verificar si el id  existe
     //Al hacer este cambio, el método findById buscará el documento en la base de datos usando el ID proporcionado en lugar de buscar un documento con el campo _id igual a { id: valor }
     const existeUsuario = await Usuario.findById(id);

         if(!existeUsuario){
            throw new  Error(`El id: ${ id} no existe`);
        }
}

export {
    esRolValido,
    emailExiste,
    existeUsuarioPorId

}

