"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const libroSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El titulo es necesario"],
    },
    autor: {
        type: String,
        required: [true, "El autor es necesario"],
    },
    anio: {
        type: Number,
        required: [true, "El año es necesario"],
    },
    idioma: {
        type: String,
        required: [true, "El idioma es necesario"],
        enum: ["ESP", "ING"],
    },
});
module.exports = mongoose.model("libro", libroSchema);
