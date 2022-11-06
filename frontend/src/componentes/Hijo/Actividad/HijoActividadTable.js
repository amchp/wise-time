import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from "react-router-dom";
import HijoActividadTableRow from './HijoActividadTableRow';
import { Grid, Paper, Box, Toolbar ,AppBar, Container ,Typography} from '@mui/material/';
import { conseguirActividadesParaTabla, conseguirHistoriasDeActividadesParaLosEstados } from '../../../servicios/TablaServicio';
import fondoActividadHijo1 from '../../../imagenes/fondoActividadHijo5.svg';

const HijoActividadTable = ({ usuario }) => {
  const [tablaDeActividades, ponerTablaDeActividades] = useState([]);
  const [actividadesPorConfimar, ponerActividadesPorConfimar] = useState({});
  const [reload, setReload]= useState(false);
  useEffect(() => {
    const conseguirDatosTabla = async () => {
      const actividades = await conseguirActividadesParaTabla(usuario.id,"hoy");
      ponerTablaDeActividades(actividades);
      console.log(actividades);
      const confimarActividad = await conseguirHistoriasDeActividadesParaLosEstados(usuario.id);
      console.log(confimarActividad);
      ponerActividadesPorConfimar(confimarActividad);
    }
    conseguirDatosTabla();
  }, [reload]);
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
        class="fondoActividadHijo1"
        style={{
          backgroundImage: `url(${fondoActividadHijo1})`,
          backgroundSize: "cover",
          height: "100vh",
          
        }}>


      <Grid container direction="column" alignItems="center" >
       <Box boxShadow={4}  marginTop={6} padding={3}sx={{ backgroundColor: 'White',borderRadius:2}} >
      <Stack alignItems="center" justifyContent="center" direction="row" spacing={3} marginBottom={4}>
        <Stack>
        <Link to="/mascota">
        <Button variant="contained" color="secondary" sx={{ backgroundColor: '#9D79FA' }} ><img width="60" height="65"src={require('../../../imagenes/fase1Mascota.gif')} alt="icono mascota"/></Button>
        </Link>
        <Typography  variant="subtitle2" color="White" sx={{borderRadius:2,border: "2px solid #9D79FA", minWidth:86,backgroundColor: '#9D79FA' }} marginTop={1}>‎ Ver Mascota </Typography>
        </Stack>
        <Stack>
        <Link to="/logros">
        <Button variant="contained"  sx={{ backgroundColor: '#64C6FF' }} ><img width="65" height="70"src={require('../../../imagenes/trofeo1.png')} alt="icono trofeo"/></Button>
        </Link>
        <Typography  variant="subtitle2" color="White" sx={{borderRadius:2,border: "2px solid #64C6FF", minWidth:86,backgroundColor: '#64C6FF' }} marginTop={1}>‎ ‎ Ver Logros </Typography>
        </Stack>
        <Stack>
        <Link to="/">
        <Button variant="contained" color="warning" sx={{ backgroundColor: '#FCA600' }} ><img width="60" height="65"src={require('../../../imagenes/campana.png')} alt="icono trofeo"/></Button>
        </Link>
        <Typography  variant="subtitle2" color="White" sx={{borderRadius:2,border: "2px solid #FCA600", minWidth:90,backgroundColor: '#FCA600' }} marginTop={1}>Notificaciones </Typography>
        </Stack>
      </Stack>
      
        <Stack justifyContent={"center"} alignItems="center" sx={{ maxWidth: 650, border: "4px solid #6DCBC4",borderRadius:2 }} flex={1}>
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
                ) : (tablaDeActividades.map((el) => <HijoActividadTableRow usuario={usuario} key={el.id} el={el} historiaActividad={actividadesPorConfimar[el.id]} reload={reload} setReload={setReload} />)
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        </Box> 
      </Grid>

    </Box>
        </Box >
    )
}
export default HijoActividadTable;