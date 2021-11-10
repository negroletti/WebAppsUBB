'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoSchema = Schema(
    {
    
      patente:{
        type:String,
        required: true
      },
      marca:{
        type:String,
        required: true
      },
      anio:{type:Number, min: 5},
      
    })

module.exports = mongoose.model('autos',AutoSchema)    

