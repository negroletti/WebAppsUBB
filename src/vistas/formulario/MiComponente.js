import React, { Fragment, useState } from 'react'

const MiComponente = () => {
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [personas, setPersonas] = useState([])

    const handleInputChangeNombre = (event) => {
        //console.log(event.target.value)
        setNombre(event.target.value)
    }

    const handleInputChangeApellido = (event) => {
        //console.log(event.target.value)
        setApellido(event.target.value)

    }

    const enviarDatos = () => {
        // alert("Entro aqui")
        // console.log("Enviando datos nombre:"+nombre+" y apellido:"+apellido)
        console.log(`Enviando datos nombre:${nombre} y apellido:${apellido}`)

        let nuevo = {
            name: nombre,
            last: apellido
        }
        setPersonas(personas => [...personas, nuevo])
        setNombre("")
        setApellido("")
    }

    return (
        <Fragment>
            <h1>Formulario</h1>
            <div>
                <div>
                    <input type="text" placeholder="Nombre" name="nombre" onChange={handleInputChangeNombre} value={nombre} ></input>
                </div>

                <div>
                    <input type="text" placeholder="Apellido" name="apellido" onChange={handleInputChangeApellido} value={apellido}></input>
                </div>
                <button onClick={enviarDatos}>Enviar</button>


                <div className="users">
                    {personas.map((persona) => (
                 
                          <li>{persona.name} {persona.last}</li>
                    ))}
                </div>

            </div>


        </Fragment>

    )
}
export default MiComponente