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
import { conseguirTodasSugerencias } from '../../../servicios/SugerenciasServicio';
import SugerenciaTableRow from './SugerenciaTableRow';
import fondoLoginTutor from '../../../imagenes/fondoLoginTutor.png';
import { Link } from "react-router-dom";
import { conseguirTodosLosHijos } from '../../../servicios/HijoServicio';

const SugerenciaTable = ({usuario}) => {
  const [tablaDeSugerencias, ponerTablaDeSugerencias] = useState([]);
  const [hijos,setHijos]=useState([]);
  const [hijoSelecionado, setHijoSeleccionado] = useState(0);
  const [nombreHijo,setNombreHijo]=useState('');
  const [hijoEdad,setHijoEdad]=useState(0);

  const conseguirInformacionDeLosHijos = async () =>{
    const filtros = { 'tutor': usuario.id.toString() };
    return await conseguirTodosLosHijos(filtros);
  }

  useEffect(() => {
    const conseguirDatosTabla = async () => {
      if(hijoSelecionado !== 0){
        const filtros = {edad: hijoEdad};
        const sugerencias = await conseguirTodasSugerencias(filtros);
        ponerTablaDeSugerencias(sugerencias);
      }
      const informacionDeHijos = await conseguirInformacionDeLosHijos();
      setHijos(informacionDeHijos);
    }
    conseguirDatosTabla();
  }, [hijoEdad]);
  const manejarDropDown = (event) => {
    const id = event.explicitOriginalTarget.id;
    const value=event.target.value;
    const edad = event.explicitOriginalTarget.title;
    
    setNombreHijo(value);
    setHijoSeleccionado(id);
    setHijoEdad(edad);
  };
  return (
    <Box>
      <AppBar position="static"  style={{
                backgroundColor: "White"
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters  >
                        <Stack direction="row" alignItems="center"  justifyContent="space-between" width="100%">
                            <img
                            src={require('../../../imagenes/logoWiseTime2.png')}
                            width="130" height="35"
                            alt='Logo' />
                            <Link to='/actividades'>
                            <Button  variant="contained" sx={{ backgroundColor: '#64C6FF', maxWidth: '300px' }} >volver</Button>
                            </Link>
                        </Stack>
                    </Toolbar>
                    
                </Container>
        </AppBar>
    <Box
      class="fondoActividadTutor"
      style={{
        backgroundImage: `url(${fondoLoginTutor})`,
        backgroundSize: "cover",
        height: "100vh",
      }}>

      
      
      <Grid container direction="column">

      <Stack marginLeft={10}  marginTop={4} sx={{ width: '150px'}}>

      <FormControl sx={{ m: 1, width: 300 ,backgroundColor: 'White'}}>
        <InputLabel color="secondary" id="demo-multiple-name-label">Nombre</InputLabel>
        <Select
          color="secondary"
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={nombreHijo}
          label="Hijo"
          onChange={manejarDropDown}
        >
          {hijos.map((hijo) => (<MenuItem id={hijo.usuario} title={hijo.edad} value={hijo.nombre} key={hijo.usuario} >{hijo.nombre}</MenuItem>))}
        </Select>
      </FormControl>
      </Stack>
      <Grid container direction="column"  alignItems="center">
      <Box border={2} borderRadius={20} color="#7560AB" sx={{ backgroundColor: 'White', maxHeight: '60px'}}> 
      <Typography  variant="h4" color="Black"  margin={1}>Sugerencias</Typography>
      </Box> 

      <Stack justifyContent={"center"} alignItems="center" sx={{ maxWidth: 1050, border: "4px solid #7560AB",borderRadius:2 }} marginTop={3} flex={1}>
        <TableContainer component={Paper} >
          <Table aria-label="simple table" >

            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Nombre</b></TableCell>
                <TableCell align="center"><b>Descripción</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tablaDeSugerencias.length === 0 ? (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                >
                  <TableCell component="th" scope="row">
                  </TableCell>
                  <TableCell align="right" colSpan="3">Sin Sugerencias Registradas</TableCell>
                </TableRow >
              ) : (tablaDeSugerencias.map((el) => <SugerenciaTableRow key={el.id} el={el} />)
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
export default SugerenciaTable