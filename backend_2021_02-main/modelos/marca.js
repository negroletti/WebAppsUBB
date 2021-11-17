//model marca
'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MarcaSchema = Schema(
    {
        'nombre': {
            type: String,
            required: true
        },
    });

module.exports = mongoose.model('marca', MarcaSchema)
