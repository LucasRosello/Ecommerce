var express = require('express');
var router = express.Router();
var autentication = require('../controllers/autentication');

router.get('/getall', autentication.getAll);
router.post('/registrar', autentication.save);
router.post('/login', autentication.login);
router.get('/confirm/:userId', autentication.confirm);
//router.put('/update/:userId', autentication.update);

module.exports = router;  