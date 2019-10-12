const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;
const datosProducto = new Schema({

    name: {
        type: String,
        trim: true,  
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    sku: {
        type: String,
        trim: true,
        required: true
    },
        price: {
        type: Number,
        trim: true,
        required: true
    },
        quantity: Number,
        destacado: Boolean,
        feliminado: Date/*,
    categoria: {type:Schema.ObjectId, ref:"categorias"}*/
       
});


const ComprasSchema = new Schema({
    
    fecha: {//y hora?
        type: Date,
        default: Date.now
    },

    estadoPago: {
        type: Boolean,
        default: false
    },

    quantity: Number,

    userId: {
        type:Schema.ObjectId,
        ref:"usuarios",
        default: "5d8ec8e3642b540744a2b14c"
    },

    producto: [datosProducto]

});

module.exports  =  mongoose.model('compras', ComprasSchema);
