var createError = require('http-errors');    //Atrapa errores http(404, 500, 200) con express
var express = require('express');            //Importa Express
var path = require('path');                  //Sirve para manejar rutas
var cookieParser = require('cookie-parser'); //Sirve para manejar cookies  
var logger = require('morgan');              //Sirve para loguear
var jwt = require('jsonwebtoken');
require('dotenv').config()
var pdf = require("express-pdf");
var productosRouter = require('./routes/productos');
var autenticacionRouter = require('./routes/autentication');
var comprasRouter = require('./routes/compras');

//Hace las llamadas a las rutas y las guarda en una variable

var app = express();
//Llama a express y lo guarda en app

app.set('secretKey', 'contraseñadelservidor');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//El .set "setea"

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(pdf);
//REQUIRES, PONELE


app.use('/products', productosRouter);
app.use('/users', autenticacionRouter);
app.use('/compras', comprasRouter);
//Si el usuario ingresa estas url llama a las variables


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    //res.render('error');
    res.status(400).json({ message:err.message});
  });



function validateUser(req, res, next){
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded){
    if(err)
    {
      res.json({status:"error", message: err.message, data:null});
    }
    else
    {
      req.body.userId = decoded.id;
      next();
    }
  });
}


module.exports = app;
//Exporta la variable app que tiene el express