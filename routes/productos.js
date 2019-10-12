var express = require('express');
var router = express.Router();
var productos = require("../controllers/products")
//Hace los llamados, guarda express.router() en la variable router


router.get('/', productos.getAll);
router.get('/:productId', productos.getById);
router.post('/', productos.save);
router.put('/update/:productId', productos.update);
router.delete('/delete/:productId', productos.delete);
//Las rutas

module.exports = router; 