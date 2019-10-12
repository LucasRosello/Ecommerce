const mongoose = require('../bin/mongodb');
const bcrypt = require('bcrypt');
var UsuariosSchemna = mongoose.Schema({
    name: { 
        type: String,
        trim: true,
        required: [true, "El nombre es obligatorio"],
        minlength: [2,"El telefono ingresado no es valido"],
        maxlength: [20,"El telefono ingresado no es valido"]
        },
    lastname: { 
        type: String,
        trim: true,
        required: [true, "El nombre es obligatorio"],
        minlength: [2,"El telefono ingresado no es valido"],
        maxlength: [20,"El telefono ingresado no es valido"]
        },
    mail: {
        type: String,
        required: [true,"El mail es obligatorio"],
        validate:{
            validator: function(mail){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
            }
        },
        minlength: [10,"El telefono ingresado no es valido"],
        maxlength: [40,"El telefono ingresado no es valido"]
    },
    verificado:{
        type:Boolean,
        default: false
    },
    phone:{
        type: Number,
        trim: true,
        required: [true, "El telefono es obligatorio"],
        minlength: [6,"El telefono ingresado no es valido"],
        maxlength: [16,"El telefono ingresado no es valido"]
    },
    password:{
        type: String,
        trim: true,
        required: [true,"La contraseña es obligatoria"],
        minlength: [8,"La contraseña debe tener minimo 8 caracteres"],
        maxlength: [16,"La contraseña debe tener maximo 16 caracteres"]
    }
});
UsuariosSchemna.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});
module.exports = mongoose.model('usuarios',UsuariosSchemna);