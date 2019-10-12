var express = require('express');
var transporter = require('../bin/mail');
var router = express.Router();
const bcrypt = require('bcrypt');
var autenticationModel = require('../models/autenticationModel');
const jwt = require('jsonwebtoken');



module.exports = {
//falta update

  save: async function(req, res, next)
  {
    try
    {
      var data = await autenticationModel.create({ phone: req.body.phone, name: req.body.name, mail: req.body.mail, password: req.body.password});
      let info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: req.body.mail,
        subject: "Bienvenido "+req.body.name,
        text: 'Bienvenido a mi web',
        html: 'Bienvenido a mi Web, para verificar tu cuenta entra <a href="http://localhost:3000/users/confirm/'+data._id+'">acá</a>'
      });
      console.log();
      res.status(200).json({status: "success", message: "Usuario añadido con exito", data: data});
    }
    catch(err)
    {
      next(err)
    }
  },



  login: async function(req, res, next)
  {
    try
    {
      var usuario = await autenticationModel.findOne({usuario:req.body.usuario});
      if (usuario)
        {
          if(bcrypt.compareSync(req.body.password, usuario.password))
          {
            const token = jwt.sign({id: usuario._id}, req.app.get('secretKey'), { expiresIn: '1h'});
            console.log(token,usuario);
            res.json({status: "success", message:"Usuario Encontrado", data:{user: usuario, token: token}});
          }
          else
          {
            res.json({status:"not_found", message:"Usuario No Encontrado", data:null});
          }
        }
    }
    catch(err)
    {
      next(err);
    }
  },



  getAll: async function(req, res, next) {
    try{
        var usuarios = await autenticationModel.find({});
        res.status(200).json({status: "success", message: "ok", data: usuarios});
    }
    catch(err)
    {
        next(err);
    }  
  },



  confirm: async function(req, res, next)
  {
    try
    {
      id = req.params.userId
      var data = await autenticationModel.updateOne(
       { "_id":id},
       { $set: {"verificado":true}}
       );
      res.status(200).json({status: "success", message: "Usuario activado con exito", data: data});
    }
    catch(err)
    {
      next(err);
    }
  },


  delete: async function(req, res, next){
    try
    {
        var id = req.params.userId;
        var result = await autenticationModel.deleteOne(
            {"_id":id}
        );
        if(result.deletedCount > 0)
        {
            res.status(200).json({status: "success", message: "Usuario eliminado con exito", data: result});
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
