import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';
import { conseguirActividad } from '../servicios/ActividadServicio';

const ActivityInfo = () => {
    const [actividad, setActividad] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const conseguirDatos = async () => {
            const data = await conseguirActividad(id);
            setActividad(data);
        };
        conseguirDatos();
    }, [])
    return (
        <Box sx={{borderRadius: '12%'}}>
            <h1>Información de las actividades</h1>
            <h2>Nombre: </h2><span>{actividad.nombre}</span>
            <h2>Descripcion: </h2><span>{actividad.descripcion}</span>
            <h2>Dias: </h2><span>{actividad.dias ? actividad.dias.toString() : ""}</span>
            <h2>Hora: </h2><span>{actividad.hora}</span>
        </Box>
    )
}
export default ActivityInfo;