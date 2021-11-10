
 var Persona = require('../modelos/persona.js');    
     
function guardar(req,res){

try{
  
    let persona = new Persona()
    persona.nombre = req.body.nombre
    persona.apellido = req.body.apellido
    persona.rut = req.body.rut
    persona.edad = req.body.edad
    persona.sexo = req.body.sexo
    persona.save((err, personastore) => {

        if (err) return res.status(400).send({mensaje:`Error al intentar guardar en base de datos> ${err}`})

        res.status(200).send({ persona: personastore })

    })
} catch (error) {
    res.status(500).send({ mensaje: `error:` + error })
}
}   

function listar(req,res)
{
    Persona.find({}, (err, persona) => {
        if (err) return res.status(500).send({ message: 'error al realizar la peticion' })
        res.status(200).send({ persona })
    })
}

module.exports = {
    guardar,
    listar
};
