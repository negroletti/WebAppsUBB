import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialDatatable from "material-datatable";

const MiComponente = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [personas, setPersonas] = useState([]);
    const [idModificar, setIdModificar] = useState("");

    const handleInputChangeNombre = (event) => {
        setNombre(event.target.value);
    };

    const handleInputChangeApellido = (event) => {
        setApellido(event.target.value);
    };

    const enviarDatos = () => {
        console.log(`Enviando datos nombre:${nombre} y apellido:${apellido}`);
        guardarPersona();
    };

    useEffect(() => {
        getPersonas();
    }, []);

    async function getPersonas() {
        try {
            const response = await axios.get(
                "http://192.99.144.232:5000/api/personas?grupo=20"
            );
            if (response.status === 200) {
                setPersonas(response.data.persona);
                console.log(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function guardarPersona() {
        axios
            .post("http://192.99.144.232:5000/api/personas", {
                nombre: nombre,
                apellido: apellido,
                grupo: 20,
            })
            .then(function (response) {
                if (response.status === 200) {
                    alert("Registro correcto");
                    getPersonas();
                } else {
                    alert("Error al guardar");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const editarPersona = () => {
        axios
            .put(`http://192.99.144.232:5000/api/personas/${idModificar}`, {
                nombre: nombre,
                apellido: apellido,
            })
            .then(function (response) {
                if (response.status === 200) {
                    alert("Registro correcto");
                    setIdModificar("");
                    getPersonas();
                } else {
                    alert("Error al guardar");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const columns = [
        {
            name: "Nombre",
            field: "nombre",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "Apellido",
            field: "apellido",
            options: {
                filter: true,
                sort: false,
            },
        },
    ];

    const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData._id);
        setIdModificar(rowData._id);
        setNombre(rowData.nombre);
        setApellido(rowData.apellido);
    };
    const options = {
        filterType: "checkbox",
        onlyOneRowCanBeSelected: true,
        onRowClick: handleRowClick,
    };

    return (
        <>
            <h1>Formulario</h1>
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        onChange={handleInputChangeNombre}
                        value={nombre}
                    ></input>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Apellido"
                        name="apellido"
                        onChange={handleInputChangeApellido}
                        value={apellido}
                    ></input>
                </div>
                <button onClick={idModificar ? editarPersona : enviarDatos}>
                    Enviar
                </button>
            </div>
            <MaterialDatatable
                title={"Lista de trabajadores"}
                data={personas}
                columns={columns}
                options={options}
            />
        </>
    );
};
export default MiComponente;
