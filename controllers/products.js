var productModel = require("../models/productsModel")
var categoriasModel = require("../models/categoriasModel")

module.exports = {
//falta create


    getAll: async function(req, res, next) {
        try{
            if(!req.query.page){req.query.page = 1}
            var producto = await productModel.paginate({
            
            },{
                populate: 'categoria',page:req.query.page
            });
            //var productoCompleto = await categoriasModel.populate(producto,{path:'categoria'});
            //console.log(productoCompleto);
            res.status(200).json({status: "success", message: "ok", data: producto});
        }
        catch(err)
        {
            next(err);
        }  
    },



    getById: function(req, res, next) {
        try
        {
            var id = req.params.productId;
            productModel.findById(id, function(err, data)
                {
                // if (err) {
                //     next(err);
                //     } else {
                    res.status(200).json({status: "success", message: "Producto encontrado", data: data});
                });
        }
        catch(err)
        {
            next(err);
        }
    },



    save: async function(req, res, next) {
        try
        {
            var result = await productModel.create({ 
                name: req.body.name, 
                sku: req.body.sku, 
                price: req.body.price,
                categoria:req.body.categoria
            });
            res.status(200).json({status: "success", message: "Producto añadido con exito", data: result});
        }
        catch(err)
        {
            next(err)
        }
    },



    update: async function(req, res, next) {
        try
        {
            //SOLO CAMBIA EL NOMBRE
            var id = req.params.productId;
            var nombre = req.body.name; 
            var result = await productModel.updateOne(
                { "_id":id},
                { $set: {"name":nombre}
            });
            res.status(200).json({status: "success", message: "Producto actualizado con exito", data: result});
        }
        catch(err)
        {
            next(err);
        }
    },



    delete: async function(req, res, next){
        try
        {
            var id = req.params.productId;
            var result = await productModel.deleteOne(
                {"_id":id}
            );
            if(result.deletedCount > 0)
            {
                res.status(200).json({status: "success", message: "Producto eliminado con exito", data: result});
            }
            else
            {
                res.status(404).json({status: "success", message: "No se encontro el producto", data: result});
            }
        }
        catch(err)
        {
            next(err);
        }
   }
}
