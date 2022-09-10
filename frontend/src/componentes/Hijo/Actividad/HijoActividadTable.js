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
import { Grid, Paper, Box } from '@mui/material/';
import { conseguirActividadesParaTabla, conseguirHistoriasDeActividadesParaLosEstados} from '../../../servicios/TablaServicio';
import fondoActividadHijo1 from '../../../imagenes/fondoActividadHijo1.svg';

const HijoActividadTable = ({ usuario }) => {
    const [tablaDeActividades, ponerTablaDeActividades] = useState([]);
    const [actividadesPorConfimar,ponerActividadesPorConfimar] = useState({});
    useEffect(() => {
        const conseguirDatosTabla = async () => {
            const actividades = await conseguirActividadesParaTabla(usuario.id);
            ponerTablaDeActividades(actividades);
            console.log(actividades);
            const confimarActividad = await conseguirHistoriasDeActividadesParaLosEstados(usuario.id);
            console.log(confimarActividad);
            ponerActividadesPorConfimar(confimarActividad);
        }
        conseguirDatosTabla();
    }, []);
    return (
        <Box
        class="fondoActividadHijo1"
        style={{
            backgroundImage: `url(${fondoActividadHijo1})`,
            backgroundSize: "cover",
            height: "100vh"}}>

        <Stack marginLeft={8} sx={{ width: '150px',}}>
            <h1>ACTIVIDADES</h1>
            <h3>Actividades del día</h3>
        </Stack>
        
            <Grid container direction="column"  alignItems="center" paddingTop={3}>
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
                            {tablaDeActividades.length === 0 ? (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                    </TableCell>
                                    <TableCell align="right" colSpan="3">Sin Actividades Registradas</TableCell>
                                </TableRow >
                            ) : (tablaDeActividades.map((el) => <HijoActividadTableRow usuario={usuario} key={el.id} el={el} historiaActividad={actividadesPorConfimar[el.id]}/>)
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
            </Grid>
            
        </Box>
    )
}
export default HijoActividadTable;