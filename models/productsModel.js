const mongoose = require('../bin/mongodb');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
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
ProductSchema.plugin(mongoose.mongoosePaginate);

module.exports  =  mongoose.model('productos', ProductSchema);
