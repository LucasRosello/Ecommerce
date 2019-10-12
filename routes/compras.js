var express = require('express');
var router = express.Router();
var compras = require('../controllers/compras');


router.get('/getall', compras.getAll);
router.post('/', compras.save);
router.get('/pdf', compras.pdf);
/*
router.post('/registrar', autentication.save);
router.post('/login', autentication.login);
router.get('/confirm/:userId', autentication.confirm);
//router.put('/update/:userId', autentication.update);
*/
module.exports = router;  