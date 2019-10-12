var mongoose = require('mongoose');
//importa mongoose
var mongoosePaginate = require('mongoose-paginate-v2');

mongoose.connect('mongodb://localhost/productos', { useNewUrlParser: true, useUnifiedTopology: true }, function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
   }
});


mongoosePaginate.paginate.options = 
{
   lean: true,
   limit: 2
};


mongoose.mongoosePaginate = mongoosePaginate
module.exports = mongoose; 