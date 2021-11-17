//controller marca
var Marca = require('../modelos/marca.js');   


     
function guardar(req,res){

    try{
      
        let marca = new Marca()
        marca.nombre = req.body.nombre
        marca.save((err, marcastore) => {
    
            if (err) return res.status(400).send({mensaje:`Error al intentar guardar en base de datos> ${err}`})
    
            res.status(200).send({ marca: marcastore })
    
        })
    } catch (error) {
        res.status(500).send({ mensaje: `error:` + error })
    }
    }

    function listar(req,res)
    {
     Marca.find({}, (err, marcas) => {
            if (err) return res.status(500).send({ message: 'error al realizar la peticion' })
            res.status(200).send({ marcas })
        })
    }
    function eliminar(req,res)
    {
        let id = req.params.id
        Marca.findByIdAndRemove(id, (err, marca) => {
            if (err) return res.status(500).send({ message: 'error al realizar la peticion' })
            res.status(200).send({ marca })
        })
    }
    
    module.exports = {
        guardar,
        listar,
        eliminar
    };