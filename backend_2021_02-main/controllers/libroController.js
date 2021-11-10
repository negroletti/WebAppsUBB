//Controller de libro
var Libro = require('../models/libro');

const guardar = (req,res) => {
    try{
        let libro = new Libro();
        libro.nombre= req.body.nombre;
        libro.anio = req.body.anio;
        libro.autor = req.body.autor;
        libro.idioma = req.body.idioma;

        libro.save((err,libroGuardado)=>{
            if(err){
                res.status(500).send({message: 'Error al guardar el libro'});
            }
            res.status(200).send({libro: libroGuardado});
        })
    }catch(error){
        res.status(500).send({message: 'Error al guardar el libro'});
    }
}
const listar = (req,res)=> {
    try{
        Libro.find({},(err,libros)=>{
            if(err){
                res.status(500).send({message: 'Error al listar los libros'});
            }
            res.status(200).send({libros: libros});
        })
    }catch(error){
        res.status(500).send({message: 'Error al listar los libros'});
    }
}
//listar solo un libro
const listarUno = (req,res)=> {
    try{
        Libro.findById(req.params.id,(err,libro)=>{
            if(err){
                res.status(500).send({message: 'Error al listar el libro'});
            }
            res.status(200).send({libro: libro});
        })
    }catch(error){
        res.status(500).send({message: 'Error al listar el libro'});
    }
}
//modificar libro
const modificar = (req,res)=> {
    try{
        Libro.findByIdAndUpdate(req.params.nombre,req.body,(err,libro)=>{
            if(err){
                res.status(500).send({message: 'Error al modificar el libro'});
            }
            res.status(200).send({libro: libro});
        })
    }catch(error){
        res.status(500).send({message: 'Error al modificar el libro'});
    }
}
//eliminar libro
const eliminar = (req,res)=> {
    try{
        Libro.findByIdAndDelete(req.params.id,(err,libro)=>{
            if(err){
                res.status(500).send({message: 'Error al eliminar el libro'});
            }
            res.status(200).send({libro: libro});
        })
    }catch(error){
        res.status(500).send({message: 'Error al eliminar el libro'});
    }
}
module.exports = {
    guardar,
    listar,
    listarUno,
    modificar,
    eliminar
}