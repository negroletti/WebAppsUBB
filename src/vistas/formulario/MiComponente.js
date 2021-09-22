import React,{Fragment,useState} from 'react'

const MiComponente = () => {
    const[nombre,setNombre] = useState("")
    const[apellido,setApellido] = useState("")

    const handleInputChangeNombre = (event) => 
    {
        //console.log(event.target.value)
         setNombre(event.target.value)
    }
    
    const handleInputChangeApellido = (event) => 
    {
        //console.log(event.target.value)
        setApellido(event.target.value)

    }

    const enviarDatos = ()=>{
       // alert("Entro aqui")
        // console.log("Enviando datos nombre:"+nombre+" y apellido:"+apellido)
        console.log(`Enviando datos nombre:${nombre} y apellido:${apellido}`)
    }

    return(
        <Fragment>
            <h1>Formulario</h1>
            <div>
                <div>
                    <input type="text" placeholder="Nombre" name="nombre" onChange={handleInputChangeNombre} ></input>
                </div>

                <div>
                    <input type="text" placeholder="Apellido" name="apellido" onChange={handleInputChangeApellido}></input>
                </div>
                <button onClick={enviarDatos}>Enviar</button>

                <label>Nombre:{nombre}</label>
                <label>Apellido:{apellido}</label>
                

            </div>


        </Fragment>

    )
}
export default MiComponente