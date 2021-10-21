
import {useMediaQuery} from 'react-responsive';
import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialDatatable from "material-datatable";
import {Container, Grid, Button, Typography, TextField} from '@material-ui/core'
import Swal from 'sweetalert2';

const MiComponente = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [personas, setPersonas] = useState([]);
    const [idModificar, setIdModificar] = useState("");
    const [accion, SetAccion] = useState("Guardar");
    const isMobile = useMediaQuery({query: `(max-width: 760px)`});

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

    const guardarPersona = () => {
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
    const borrarPersona = () => {
        Swal.fire({
            title: '¿Quieres borrar a este usuario?',
            showDenyButton: true,
            confirmButtonText: 'Borrar',
            denyButtonText: `No Borrar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              axios
                .delete(`http://192.99.144.232:5000/api/personas/${idModificar}`, {
                nombre: nombre,
                apellido: apellido,
            })
            .then(function (response) {
                if (response.status === 200) {
                    Swal.fire('Usuario eliminado!', '', 'success')
                    setIdModificar("");
                    getPersonas();
                } else {
                    Swal.fire('Error al borrar!', '', 'info')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            } else if (result.isDenied) {
              Swal.fire('El usuario no fue borrado', '', 'info')
            }
          })
        
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
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6">
                        Personas
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} fullWidth>
                    <TextField id="nombre" label="Nombre" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="apellido" label="Apellido" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant="contained" onclick={idModificar ? editarPersona : enviarDatos} color="primary"  
                    fullWidth>{accion}</Button>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant="contained" disabled={idModificar ? false : true} onClick={borrarPersona} color="secondary" fullWidth>Eliminar</Button>
                </Grid>
            </Grid>

      
            <Grid item xs={12} md={12} className="tabla">
            <MaterialDatatable
                title={"Employee List"}
                data={personas}
                columns={columns}
                options={options}
            />
            
        </Grid>
      
        </Container>
    );
};
export default MiComponente;
