import React, { useEffect, useState } from 'react';
import { FormControl,InputLabel,Select,MenuItem, Typography, DateRangePicker, TextField, Box} from '@mui/material/';
import { conseguirTodosLosHijos } from '../../../servicios/HijoServicio';

const FiltroDeMonitoreoDeHijo = ({ usuario, setHijoSeleccionado }) => {
    const [value, setValue] = useState("");
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
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
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
            <Typography sx={{ mt: 2, mb: 1 }}>Dias</Typography>
            <DateRangePicker
            calendars={1}
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
                <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
                </React.Fragment>
            )}
            />
            </FormControl>
        </div>
    )
}

export default FiltroDeMonitoreoDeHijo