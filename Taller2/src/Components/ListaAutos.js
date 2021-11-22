import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import { useNavigate } from "react-router-dom";

const ListaAutos = () => {
    const [datos, setDatos] = useState([]);
    const { REACT_APP_API } = process.env;

    const toast = useRef(null);
    const navigate = useNavigate();

    const getDatos = async () => {
        setDatos([]);
        const response = await fetch(`http://${REACT_APP_API}autos`);
        let data = await response.json();
        for (const elem of data) {
            try {
                var nombreMarca = await getMarcas(elem.marcaId);
                setDatos((datos) => [
                    ...datos,
                    {
                        id: elem.id,
                        patente: elem.patente,
                        anio: elem.anio,
                        marcaNombre: nombreMarca,
                    },
                ]);
            } catch (e) {
                console.log(e);
            }
        }
    };
    const getMarcas = async (id) => {
        let marcas = await fetch(`http://${REACT_APP_API}marcas/${id}`);
        let data = await marcas.json();
        return data;
    };

    useEffect(() => {
        getDatos();
    }, []);

    const columns = [
        { field: "marcaNombre", header: "Marca" },
        { field: "patente", header: "Patente" },
        { field: "anio", header: "Año" },
    ];

    const dynamicColumns = columns.map((col, i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    const deleteAuto = (idC) => {
        fetch(`http://${REACT_APP_API}autos/${idC}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then((response) => {
            if (response.status === 204) {
                toast.current.show({
                    severity: "success",
                    summary: "Auto eliminado con exito",
                    life: 1000,
                });
            } else {
                toast.current.show({
                    severity: "error",
                    summary: "Error al eliminar el auto",
                    life: 1000,
                });
            }
        });
    };
    const confirm2 = (idC) => {
        confirmDialog({
            message: "¿Seguro que quieres eliminar este auto?",
            header: "Confirmar eliminación",
            icon: "pi pi-exclamation-triangle",
            position: "top",
            acceptClassName: "p-button-outlined p-button-danger",
            rejectClassName: "p-button-outlined",
            acceptLabel: "Sí",
            accept: () => deleteAuto(idC),
        });
    };

    const buttonEdit = (rowData) => {
        return (
            <Button
                label="Editar Auto"
                className="p-button-outlined"
                style={{ width: "100%" }}
                onClick={() => navigate(`/editar/${rowData.id}`)}
                disabled
            />
        );
    };

    const buttonRemove = (rowData) => {
        return (
            <Button
                label="Eliminar Auto"
                className="p-button-outlined p-button-danger"
                style={{ width: "100%" }}
                onClick={() => confirm2(rowData.id)}
                disabled
            />
        );
    };

    const tituloCard = () => {
        return (
            <div>
                Lista de Autos
                <Button
                    label="Agregar Auto"
                    className="p-button-outlined p-button-success"
                    onClick={() => navigate(`/agregar`)}
                    style={{
                        width: "20%",
                        marginLeft: "62%",
                    }}
                />
            </div>
        );
    };

    return (
        <div>
            <Toast ref={toast} onHide={() => getDatos()} />
            <Card
                title={tituloCard}
                style={{
                    width: "65%",
                    margin: "4% 17% 0",
                    boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                }}
            >
                <DataTable
                    value={datos}
                    size="small"
                    responsiveLayout="scroll"
                    showGridlines
                >
                    {dynamicColumns}
                    <Column
                        field=""
                        header="Editar"
                        body={buttonEdit}
                        style={{ width: "16%" }}
                    ></Column>
                    <Column
                        field=""
                        header="Eliminar"
                        body={buttonRemove}
                        style={{ width: "16%" }}
                    ></Column>
                </DataTable>
            </Card>
        </div>
    );
};
export default ListaAutos;
