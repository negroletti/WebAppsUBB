'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PersonaSchema = Schema(
    {
      nombre:{
        type:String,
        required: true,
        validate: {
          validator: function (v) {
   
            let isValid = false;
            const pattern = new RegExp('^[A-ZÁÉÍÓÚÑ ]+$', 'i');
            if (pattern.test(v)){
              isValid = true;
            }
            return isValid;
          },
          message: props => `nombre no tiene formato correcto`
      }
    },
      apellido:{
        type:String,
        required: true
      },
      rut:{
        type:String,
        required: true
      },
      edad:{type:Number, min: 5},
      sexo: {
        type: String,
        enum: ['H','M'],
        required: true

     }
      
    })

module.exports = mongoose.model('personas',PersonaSchema)    

