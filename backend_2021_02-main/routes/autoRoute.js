'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var autoController = require('../controllers/autoController');


// Llamamos al router
var api = express.Router();
 
//  Guardar Persona
api.post('/autos', autoController.guardar);
api.get('/autos', autoController.listar);
 api.get('/auto/:id', autoController.recupera);



// Exportamos la confi,guración
module.exports = api;
