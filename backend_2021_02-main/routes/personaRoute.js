'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var personaController = require('../controllers/personaController');


// Llamamos al router
var api = express.Router();
 
//  Guardar Persona
api.post('/personas', personaController.guardar);
api.get('/personas', personaController.listar);
// api.get('/personabyID/:id', personaController.buscarPorID);



// Exportamos la confi,guración
module.exports = api;
