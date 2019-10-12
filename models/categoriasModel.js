const mongoose = require('../bin/mongodb');
//¿Por que const?
//por que en app.js los requires son sin const?

const Schema = mongoose.Schema;
//Define el tipo de objeto "Schema"

const CategoriaSchema = new Schema({
 nombre: {
  type: String,   
  trim: true,     //Saca espacios
  required: true, //Lo hace obligatorio
 }
});
//Crea la constante "categoriaSchema" y define los atributos que tendra

module.exports  =  mongoose.model('categorias', CategoriaSchema);
//Exporta? el modelo nuevo, y lo asocia a la coleccion(Tabla) "categorias"
