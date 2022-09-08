import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, Paper, Box } from '@mui/material/';
import { conseguirTodasActividades } from '../../../servicios/ActividadServicio';
import TutorActividadTableRow from './TutorActividadTableRow';
import fondoActividadTutor from '../../../imagenes/fondoActividadTutor.png';

const TutorActividadTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const conseguirDatosTabla = async () => {
      const semana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
      const diaDeLaSemana = semana[new Date().getDay()];
      const filtros = { "hijos": 1, "dias": diaDeLaSemana };
      const datos = await conseguirTodasActividades(filtros);
      setData(datos);
    }
    conseguirDatosTabla();
  }, []);
  return (
    <Box
      class="fondoActividadTutor"
      style={{
        backgroundImage: `url(${fondoActividadTutor})`,
        backgroundSize: "cover",
        height: "100vh",
      }}>

      <h3>Actividades Semanales</h3>
      <Button variant="outlined" href="crear/">Agregar</Button>
      <br/>
      <Grid container direction="column"  alignItems="center">
      <Stack justifyContent={"center"} alignItems="center" sx={{ maxWidth: 700, border: "3px solid #6DCBC4" }}  flex={1}>
        <TableContainer component={Paper} >
          <Table aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Nombre</b></TableCell>
                <TableCell align="center"><b>Hora</b></TableCell>
                <TableCell align="center"><b>Acciones</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                >
                  <TableCell component="th" scope="row">
                  </TableCell>
                  <TableCell align="right" colSpan="3">Sin Actividades Registradas</TableCell>
                </TableRow >
              ) : (data.map((el) => <TutorActividadTableRow key={el.id} el={el} />)
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      </Grid>
    </Box>
  )
}
export default TutorActividadTable