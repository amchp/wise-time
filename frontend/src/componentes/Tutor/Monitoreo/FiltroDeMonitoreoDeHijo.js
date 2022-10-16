import React, { useEffect, useState } from 'react';
import { FormControl,InputLabel,Select,MenuItem, Typography, TextField, } from '@mui/material/';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { conseguirTodosLosHijos } from '../../../servicios/HijoServicio';
import { Grid, Box, Container, Button, Stack, AppBar, Toolbar } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/';
import { Link } from "react-router-dom";
import fondoHome from '../../../imagenes/fondoHome.png';

const FiltroDeMonitoreoDeHijo = ({ usuario, setHijoSeleccionado, dias, setDias }) => {
    const [hijos, setHijos] = useState([]);
    
    const [nombreHijo,setNombreHijo]=useState('');
    useEffect(() => {
        const conseguirInformacionDeLosHijos = async () => {
            const filtros = { 'tutor': usuario.id.toString() };
            const informacionDeHijo = await conseguirTodosLosHijos(filtros);
            setHijos(informacionDeHijo);
        }
        conseguirInformacionDeLosHijos();
    }, []);
    const manejarDropDown = (event) => {
        const id = event.explicitOriginalTarget.id;
        const value = event.target.value;

        setNombreHijo(value);
        setHijoSeleccionado(id);
    };
    
    return (
        
            <Box>
        
        
    <Box>
        <Grid container direction="column">
             <Stack marginLeft={10}  marginTop={3}>
            <FormControl sx={{ m: 1, width: 300}}>
            <Stack sx={{ backgroundColor: 'White' }}>
            <InputLabel id="demo-multiple-name-label">Nombre</InputLabel>
            <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={nombreHijo}
            label="Hijo"
            onChange={manejarDropDown}
            >
            {hijos.map((hijo) => (<MenuItem id={hijo.usuario} value={hijo.nombre} key={hijo.usuario} >{hijo.nombre}</MenuItem>))}
            </Select>
            </Stack>
            <Typography sx={{ mt: 2, mb: 1 }}>Dias</Typography>
            <Stack sx={{ backgroundColor: 'White' }}>
            <DateRangePicker sx={{ backgroundColor: 'White' }} onChange={setDias} value={dias} />
            </Stack>
            </FormControl>
            </Stack>
            </Grid>
        </Box>
    
        </Box>
    )
}

export default FiltroDeMonitoreoDeHijo