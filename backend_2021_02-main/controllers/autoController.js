var Auto = require('../modelos/auto.js');   


     
function guardar(req,res){

    try{
      
        let auto = new Auto()
        auto.patente = req.body.patente
        auto.marca = req.body.marca
        auto.anio = req.body.anio

        auto.save((err, autostore) => {
    
            if (err) return res.status(400).send({mensaje:`Error al intentar guardar en base de datos> ${err}`})
    
            res.status(200).send({ auto: autostore })
    
        })
    } catch (error) {
        res.status(500).send({ mensaje: `error:` + error })
    }
    }

    function listar(req,res)
    {
        Auto.find({}, (err, autos) => {
            if (err) return res.status(500).send({ message: 'error al realizar la peticion' })
            res.status(200).send({ autos })
        })
    }
    function recupera(req,res)
    {
        let idauto = req.params.id
        Auto.findById(idauto, (err, auto) => {
            if (err) return res.status(500).send({ message: 'error al realizar la peticion' })
            if (!auto) return res.status(404).send({ message: 'Error la persona no existe' })
    
            res.status(200).send({ auto })
        })
    }
    
    module.exports = {
        guardar,
        listar,
        recupera
    };