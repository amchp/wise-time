import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, Paper, Box, AppBar, Container, Toolbar, Typography} from '@mui/material/';
import { conseguirActividadesParaTabla, conseguirHistoriasDeActividadesParaLosEstados} from '../../../servicios/TablaServicio';
import TutorActividadTableRow from './TutorActividadTableRow';
import fondoActividadTutor from '../../../imagenes/fondoActividadTutor.svg';
import { Link } from "react-router-dom";

const TutorActividadTable = ({usuario}) => {
  const [tablaDeActividades, ponerTablaDeActividades] = useState([]);
  const [actividadesPorConfimar,ponerActividadesPorConfimar] = useState({});

  useEffect(() => {
    const conseguirDatosTabla = async () => {
      const actividades = await conseguirActividadesParaTabla(3);
      ponerTablaDeActividades(actividades);
      const confimarActividad = await conseguirHistoriasDeActividadesParaLosEstados(3);
      ponerActividadesPorConfimar(confimarActividad);
    }
    conseguirDatosTabla();
  }, []);
  return (
    <Box>
      <AppBar position="static"  style={{
                backgroundColor: "White"
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters  >
                        <img
                            
                            src={require('../../../imagenes/logoWiseTime2.png')}
                            width="130" height="35"
                            alt='Logo' />
                    </Toolbar>
                </Container>
            </AppBar>
    <Box
      class="fondoActividadTutor"
      style={{
        backgroundImage: `url(${fondoActividadTutor})`,
        backgroundSize: "cover",
        height: "100vh",
      }}>

      
      
      <Grid container direction="column">

      <Stack marginLeft={10}  marginTop={8} sx={{ width: '150px'}}>
      <Link to='crear/'>
      <Button variant="contained" sx={{ backgroundColor: '#64C6FF', maxWidth: '200px' }} >Agregar</Button>
      </Link>
      </Stack>

      <Grid container direction="column"  alignItems="center">
      <Box border={2} borderRadius={20} color="#B4B1B1" sx={{ backgroundColor: 'White', maxHeight: '60px'}}> 
      <Typography  variant="h4" color="#B4B1B1" margin={1}>Actividades Semanales</Typography>
      </Box> 

      <Stack justifyContent={"center"} alignItems="center" sx={{ maxWidth: 1050, border: "4px solid #6DCBC4",borderRadius:2 }} marginTop={4} flex={1}>
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
              {tablaDeActividades.length === 0 ? (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                >
                  <TableCell component="th" scope="row">
                  </TableCell>
                  <TableCell align="right" colSpan="3">Sin Actividades Registradas</TableCell>
                </TableRow >
              ) : (tablaDeActividades.map((el) => <TutorActividadTableRow key={el.id} el={el} historiaActividad={actividadesPorConfimar[el.id]} />)
              )}
            </TableBody>

          </Table>
        </TableContainer>
      </Stack>
      </Grid>
      </Grid>
    </Box>
    </Box>
    
  )
}
export default TutorActividadTable