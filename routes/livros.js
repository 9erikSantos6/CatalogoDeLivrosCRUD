const express = require('express');
const router = express.Router();
const livrosModel = require('../models/livrosModel')

router.get('/', (req, res) => {
    livrosModel.mostrar(req, res);
});

router.get('/adicionar', (req, res) => {
    res.render('livros/adicionar', {
        nome: '',
        autor: ''
    });
});

router.post('/adicionar', (req, res) => {
    livrosModel.adicionar(req, res);
});


router.get('/editar/:id', (req, res) => {
    livrosModel.editar(req, res);
});

router.post('/atualizar/:id', (req, res) => {
    livrosModel.atualizar(req, res);
});

router.get('/delete/(:id)', (req, res) => {
    livrosModel.deletar(req, res)
});

module.exports = router;