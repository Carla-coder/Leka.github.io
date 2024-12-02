const express = require('express');
const router = express.Router();

const Middleware = require('./middleware/middleware');
const Usuario = require('./controllers/usuario');
const Resumo = require('./controllers/resumo');

router.post('/signup', Usuario.create);
router.post('/login', Usuario.login);
router.get('/perfil', Middleware.validaAcesso, Usuario.perfil);
router.put('/usuarios/:id', Middleware.validaAcesso, Usuario.update);
router.delete('/usuarios/:id', Middleware.validaAcesso, Usuario.del);
router.get('/usuarios/:id', Usuario.read);
router.get('/usuarios', Usuario.read);  


router.get('/resumos', Resumo.getSummaries);
router.get('/resumos/:id', Resumo.getSummaryById);
router.post('/resumos',  Resumo.createSummary);
router.put('/resumos/:id',Resumo.updateSummary);
router.delete('/resumos/:id',Resumo.deleteSummary);

module.exports = router;


router.get('/', (req, res) => { 

    return res.json("API respondendo"); 

});

module.exports = router;