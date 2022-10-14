import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Paper, Box, AppBar, Container, Toolbar, Typography,FormControl,InputLabel,Select,MenuItem} from '@mui/material/';
import { conseguirActividadesParaTabla, conseguirHistoriasDeActividadesParaLosEstados} from '../../../servicios/TablaServicio';
import TutorActividadTableRow from './TutorActividadTableRow';
import fondoActividadTutor from '../../../imagenes/fondoActividadTutor.svg';
import { Link } from "react-router-dom";
import { conseguirTodosLosHijos } from '../../../servicios/HijoServicio';

const TutorActividadTable = ({usuario}) => {
  const [tablaDeActividades, ponerTablaDeActividades] = useState([]);
  const [actividadesPorConfimar,ponerActividadesPorConfimar] = useState({});
  const [hijos,setHijos]=useState([]);
  const [hijoSelecionado, setHijoSeleccionado] = useState(0);
  const [nombreHijo,setNombreHijo]=useState('');
  const [reload, setReload]= useState(false);

  const theme = createTheme({
    typography: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
    },
});

  const conseguirInformacionDeLosHijos = async () =>{
    const filtros = { 'tutor': usuario.id.toString() };
    return await conseguirTodosLosHijos(filtros);
  }

  useEffect(() => {
    const conseguirDatosTabla = async () => {
      if(hijoSelecionado !== 0){
        const actividades = await conseguirActividadesParaTabla(hijoSelecionado);
        ponerTablaDeActividades(actividades);
        const confimarActividad = await conseguirHistoriasDeActividadesParaLosEstados(hijoSelecionado);
        ponerActividadesPorConfimar(confimarActividad);
      }
      const informacionDeHijos = await conseguirInformacionDeLosHijos();
      setHijos(informacionDeHijos);
    }
    conseguirDatosTabla();
  }, [hijoSelecionado, reload]);
  const manejarDropDown = (event) => {
    const id = event.explicitOriginalTarget.id;
    const value=event.target.value;
    
    setNombreHijo(value);
    setHijoSeleccionado(id);
  };
  return (
    <ThemeProvider theme={theme}>
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

      <Stack marginLeft={10}  marginTop={4} sx={{ width: '150px'}}>
      <Link to='crear/'>
      <Button variant="contained" sx={{ backgroundColor: '#64C6FF', maxWidth: '200px' }} >Agregar</Button>
      </Link>

      <FormControl sx={{ m: 1, width: 300 ,backgroundColor: 'White'}}>
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
      </FormControl>
      </Stack>
      <Grid container direction="column"  alignItems="center">
      <Box border={2} borderRadius={20} color="#B4B1B1" sx={{ backgroundColor: 'White', maxHeight: '60px'}}> 
      <Typography  variant="h4" color="#B4B1B1" margin={1}>Actividades Semanales</Typography>
      </Box> 

      <Stack justifyContent={"center"} alignItems="center" sx={{ maxWidth: 1050, border: "4px solid #6DCBC4",borderRadius:2 }} marginTop={3} flex={1}>
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
              ) : (tablaDeActividades.map((el) => <TutorActividadTableRow key={el.id} el={el} historiaActividad={actividadesPorConfimar[el.id]} reload={reload} setReload={setReload} />)
              )}
            </TableBody>

          </Table>
        </TableContainer>
      </Stack>
      </Grid>
      </Grid>
    </Box>
    </Box>
    </ThemeProvider>
  )
}
export default TutorActividadTable