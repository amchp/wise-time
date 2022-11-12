import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, Paper, Box, AppBar, Container, Toolbar, Typography,FormControl,InputLabel,Select,MenuItem} from '@mui/material/';
import LogrosTableRow from './LogrosTableRow';
import fondoLogros from '../../../imagenes/fondoLogros.svg';
import { Link } from "react-router-dom";
import Fab from '@mui/material/Fab';
import { conseguirHijo } from '../../../servicios/HijoServicio';


const LogrosTable = ({usuario}) => {
const [tablaDeLogros,setTablaDeLogros]=useState([]);
const [reload,setReload]= useState(false);
useEffect(()=>{
  const obtenerTabla=async()=>{
    const respuesta= await conseguirHijo(usuario.id);
    console.log(respuesta);
    setTablaDeLogros(respuesta.logros__descripcion);

  }
  obtenerTabla();
},[]);
return(
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
      class="fondoLogros"
      style={{
        backgroundImage: `url(${fondoLogros})`,
        backgroundSize: "cover",
          height: "100vh",
      }}>

      
      
      <Grid container direction="column">
      
      <Stack marginLeft={15}  marginTop={8} sx={{ width: '150px'}}>
      <Link to="/actividades">
      <Fab color="warning" sx={{ backgroundColor: '#FFB800' }}  aria-label="add" height="90"
          width="90" >
      <img width="50" height="50"src={require('../../../imagenes/volver.png')} alt="icono volver"/>
      </Fab>
      </Link>
      
      </Stack>
      <Grid container direction="column"  alignItems="center">
      <Box border={3} borderRadius={20} color="#6DCBC4" sx={{ backgroundColor: 'White', maxHeight: '60px'}}> 
      <Typography  variant="h4" color="Black"  margin={1}>Logros</Typography>
      </Box> 

      <Stack marginTop={4} justifyContent={"center"} alignItems="center" sx={{ maxWidth: 650, border: "4px solid #6DCBC4",borderRadius:2 }} flex={1}>
        <TableContainer component={Paper} >
          <Table aria-label="simple table" >

            <TableHead>
              <TableRow>
                <TableCell align="center"><b> </b></TableCell>
                <TableCell align="center"><b>Logros</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              
            {tablaDeLogros.length === 0 ? (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                        </TableCell>
                        <TableCell align="right" colSpan="3">Sin Actividades Registradas</TableCell>
                      </TableRow >
                    ) : (tablaDeLogros.map((logro) => <LogrosTableRow usuario={usuario} logro={logro} setReload={setReload} />)
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

export default LogrosTable;