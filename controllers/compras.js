var compraModel = require("../models/compraModel");
var usuarioCompradorModel = require("../models/autenticationModel");
var productModel = require("../models/productsModel");

module.exports = {



    getAll: async function(req, res, next) {
        try{
            // if(!req.query.page){req.query.page = 1}
            // var producto = await productModel.paginate({
            
            // },{
            //     populate: 'categoria',page:req.query.page
            // });
            //var productoCompleto = await categoriasModel.populate(producto,{path:'categoria'});
            
            var compra = await compraModel.find({});
            res.status(200).json({status: "success", message: "ok", data: compra});
        }
        catch(err)
        {
            next(err);
        }  
    },
    save: async function(req, res, next)
    {
      try
      {
        let idProducto = "5d7da218a1e76ba13cd25987"//HARCODEADO 
        let producto = await productModel.findById(idProducto);
        var compra = await compraModel.create({ estadoPago: req.body.estadoPago, quantity: req.body.quantity, userId: req.body.userId});
        /*id = req.body.userId;
        let usuarioComprador = await usuarioCompradorModel.findById(id);
        

        let info = await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: usuarioComprador.mail,
          subject: "Gracias por tu compra "+req.body.name,
          text: 'Bienvenido a mi web',
          html: 'Muchas gracias por tu compra'
        });
        */
        res.status(200).json({status: "success", message: "Usuario añadido con exito", data: compra});
      }
      catch(err)
      {
        next(err)
      }
    },
    pdf: async function(req, res, next)
    {
        try
        {
            var id = "5d9150c9461f3623ecfc5f24"//HARCODEADO
            var idProducto = "5d7da218a1e76ba13cd25987"//HARCODEADO 
            var data = await compraModel.findById(id);
            var producto = await productModel.findById(idProducto);
            res.render('factura',{fecha:data.fecha,quantity:data["quantity"]},function(err,html){
                res.pdfFromHTML({
                    filename: "generated.pdf",
                    htmlContent: html
                });
            });
        }
        catch(err)
        {
            next(err)
        }
    }


/*
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
   }*/
}