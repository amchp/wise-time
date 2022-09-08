import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import HijoActividadTableRow from './HijoActividadTableRow';
import { Grid, Paper } from '@mui/material/';
import { conseguirTodasActividades } from '../../../servicios/ActividadServicio';

const HijoActividadTable = ({ usuario }) => {
    //Recorro arreglo de dias en cada actividad para filtrar :)
    const [data, setData] = useState([]);
    useEffect(() => {
        const conseguirDatosTabla = async () => {
            const semana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
            const currentDay = new Date();
            const diaDeLaSemana = semana[currentDay.getDay()];
            const filtros = { "hijo": usuario.id, "dias": diaDeLaSemana };
            const datos = await conseguirTodasActividades(filtros);
            setData(datos);
        }
        conseguirDatosTabla();
    }, []);
    return (
        <div>
            <h1>ACTIVIDADES</h1>
            <h3>Actividades del día</h3>
            <br />
            <Grid container direction="column"  alignItems="center">
            <Stack justifyContent={"center"} alignItems="center" sx={{ maxWidth: 650, border: "3px solid #6DCBC4" }} flex={1}>
                <TableContainer component={Paper} >
                    <Table aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><b>Nombre</b></TableCell>
                                <TableCell align="center"><b>Hora</b></TableCell>
                                <TableCell align="center"><b>Icono</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                    </TableCell>
                                    <TableCell align="right" colSpan="3">Sin Actividades Registradas</TableCell>
                                </TableRow >
                            ) : (data.map((el) => <HijoActividadTableRow key={el.id} el={el} />)
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
            </Grid>
        </div>
    )
}
export default HijoActividadTable;