import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

const EditarAutos = () => {
    const { id } = useParams();

    const [marcas, setMarcas] = useState([]);
    const [marca, setMarca] = useState();
    const [patente, setPatente] = useState("");
    const [anio, setAnio] = useState("");

    const navigate = useNavigate();
    const toastGuardar = useRef(null);
    const toastError = useRef(null);
    const { REACT_APP_API } = process.env;

    const getMarcas = async () => {
        const response = await fetch(`http://${REACT_APP_API}marcas`);
        let data = await response.json();
        data = data.marcas;
        Object.keys(data).map(function (key) {
            setMarcas((marcas) => [
                ...marcas,
                {
                    label: data[key].nombre,
                    value: data[key]._id,
                },
            ]);
        });
    };

    const updateCalle = () => {
        fetch(`http://${REACT_APP_API}calles/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                patente: patente,
                marca: marca,
                anio: anio,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((response) => {
            if (response.status === 201) {
                toastGuardar.current.show({
                    severity: "success",
                    summary: "Auto editado con exito",
                    life: 1500,
                });
            } else {
                toastError.current.show({
                    severity: "error",
                    summary: "Error al editar el auto",
                    life: 1500,
                });
            }
        });
    };

    const agregarAuto = () => {
        fetch(`http://${REACT_APP_API}autos`, {
            method: "POST",
            body: JSON.stringify({
                patente: patente,
                marca: marca,
                anio: anio,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((response) => {
            if (response.status === 201) {
                toastGuardar.current.show({
                    severity: "success",
                    summary: "Auto guardado con exito",
                    life: 1500,
                });
            } else {
                toastError.current.show({
                    severity: "error",
                    summary: "Error al guardar el auto",
                    life: 1500,
                });
            }
        });
    };

    const footer = (
        <span>
            <Button
                label={id === undefined ? "Guardar" : "Editar"}
                icon="pi pi-check"
                className="p-button-outlined p-button-success"
                onClick={id === undefined ? agregarAuto : updateCalle}
                style={{ width: "45%", marginRight: "3%" }}
            />
            <Button
                label="Cancelar"
                icon="pi pi-times"
                className="p-button-outlined p-button-danger"
                onClick={() => navigate(`/`)}
                style={{ width: "45%", marginLeft: "3%" }}
            />
        </span>
    );

    useEffect(() => {
        const getDatos = async () => {
            const response = await fetch(`http://${REACT_APP_API}autos/${id}`);
            const data = await response.json();
            setMarca(data._id);
        };
        if (id !== undefined) {
            getDatos();
        }
        getMarcas();
    }, []);

    return (
        <div>
            <Toast ref={toastGuardar} onHide={() => navigate(`/`)} />
            <Toast ref={toastError} />
            <Card
                title={id === undefined ? "Agregar Auto" : "Editar Auto"}
                style={{
                    width: "25%",
                    margin: "5% 37%",
                    boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                    textAlign: "center",
                }}
                footer={footer}
            >
                <h5 style={{ textAlign: "left", fontSize: "15px" }}>Patente</h5>
                <InputText
                    value={patente}
                    onChange={(e) => setPatente(e.target.value)}
                    style={{ width: "80%", margin: "0 10%", textAlign: "left" }}
                />
                <h5 style={{ textAlign: "left", fontSize: "15px" }}>Año</h5>
                <InputText
                    value={anio}
                    onChange={(e) => setAnio(e.target.value)}
                    style={{ width: "80%", margin: "0 10%", textAlign: "left" }}
                />
                <h5 style={{ textAlign: "left", fontSize: "15px" }}>Marca</h5>
                <Dropdown
                    value={marca}
                    options={marcas}
                    onChange={(e) => setMarca(e.target.value)}
                    placeholder="Elige una marca"
                    style={{ width: "80%", margin: "0 10%", textAlign: "left" }}
                />
            </Card>
        </div>
    );
};

export default EditarAutos;
