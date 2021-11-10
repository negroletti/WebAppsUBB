'use strict'

var express = require('express');
var libroController = require ('../controllers/libroController');



var api = express.Router();

api.post('/libros', libroController.guardar);
api.get('/libros', libroController.listar);
api.get('/libros/:id', libroController.listarUno);
api.put('/libros/:id', libroController.modificar);
api.delete('/libros/:id', libroController.eliminar);

module.exports = api;