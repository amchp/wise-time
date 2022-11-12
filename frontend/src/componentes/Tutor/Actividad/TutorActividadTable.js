import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Notificaciones from './Notificaciones';
import { Grid, Paper, Box, Toolbar, Typography, FormControl, InputLabel, Select, MenuItem, OutlinedInput,Badge,Tooltip,Avatar,IconButton } from '@mui/material/';
import { conseguirActividadesParaTabla, conseguirHistoriasDeActividadesParaLosEstados } from '../../../servicios/TablaServicio';
import TutorActividadTableRow from './TutorActividadTableRow';
import fondoActividadTutor from '../../../imagenes/fondoActividadTutor.svg';
import { Link } from "react-router-dom";
import { conseguirTodosLosHijos } from '../../../servicios/HijoServicio';
import { cerrarSesion } from '../../../servicios/AuthenticacionServicio';
import { FaPowerOff} from "react-icons/fa";
import { BsFillGearFill} from "react-icons/bs";
import { AiFillFilter,AiOutlineLineChart,AiOutlineSchedule} from "react-icons/ai";
const TutorActividadTable = ({ usuario }) => {
  
  const [tablaDeActividades, ponerTablaDeActividades] = useState([]);
  const [actividadesPorConfimar, ponerActividadesPorConfimar] = useState({});
  const [hijos, setHijos] = useState([]);
  const [hijoSelecionado, setHijoSeleccionado] = useState(0);
  const [nombreHijo, setNombreHijo] = useState('');
  const [reload, setReload] = useState(false);
  const [completed, setCompleted] = useState(0)
  const [pendiente, setPendiente] = useState(0)
  const [dia, setDia] = useState('hoy');
  const [numeroNotificaciones,setNumeroNotificaciones]=useState(0);
  
  const conseguirInformacionDeLosHijos = async () => {

    const filtros = { 'tutor': usuario.id.toString() };
    return await conseguirTodosLosHijos(filtros);
  }

  useEffect(() => {
    const conseguirDatosTabla = async () => {
      if (hijoSelecionado !== 0) {
        const actividades = await conseguirActividadesParaTabla(hijoSelecionado, dia);
        ponerTablaDeActividades(actividades);
        const confimarActividad = await conseguirHistoriasDeActividadesParaLosEstados(hijoSelecionado);
        ponerActividadesPorConfimar(confimarActividad);
      }
      const informacionDeHijos = await conseguirInformacionDeLosHijos();
      setHijos(informacionDeHijos);
    }
    conseguirDatosTabla();
  }, [hijoSelecionado, reload, dia]);

  useEffect(() => {
    if (Object.values(actividadesPorConfimar).length > 0) {
      const completado = Object.values(actividadesPorConfimar).filter(activity => activity.confirmado === true).length
      const pendiente = Object.values(actividadesPorConfimar).filter(activity => activity.confirmado === false).length
      setCompleted(completado)
      setPendiente(pendiente)
    }

  }, [actividadesPorConfimar]);
 

  const manejarDropDown = (event) => {
    const id = event.explicitOriginalTarget.id;
    const value = event.target.value;

    setNombreHijo(value);
    setHijoSeleccionado(id);
  };
  const filtro = (event) => {
    const valor = event.target.value;
    setDia(valor);
  }
  return (

    <Box>
      <Toolbar disableGutters  >
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
          <Stack marginLeft={2} marginTop={2}>
            <Link to='/actividades/'>
            <img
              src={require('../../../imagenes/logoWiseTime2.png')}
              width="130" height="35"
              alt='Logo' 
              href
              />
            </Link>
            
            <Typography variant="h6" color="#545454" marginTop={2}>¡Bienvenid@ {usuario.nombre + " " + usuario.apellido}!</Typography>
          </Stack>
          <Stack direction="row" marginRight={3} spacing={3}>
         
            <Link to='/monitoreo'>
              <Button variant="contained" color="secondary" sx={{ backgroundColor: '#7560AB', maxWidth: '150px',height: 40  }} ><AiOutlineLineChart/>Monitoreo</Button>
            </Link>

            <Link to='/sugerencias'>
              <Button variant="contained" color="secondary" sx={{ backgroundColor: '#7560AB', maxWidth: '150px' ,height: 40 }} > <AiOutlineSchedule/>Sugerencias</Button>
            </Link>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Ajustes">
        <Link to='/configuraciones'>
          <IconButton
            size="small"
            >
            <Avatar sx={{ width: 45, height: 45 ,backgroundColor: '#7560AB' }}>< BsFillGearFill/></Avatar>
          </IconButton>
          </Link>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Cerrar Sesión">
        
          <IconButton
            size="small"
            onClick={() => { cerrarSesion() }}
            >
            <Avatar sx={{ width: 45, height: 45 ,backgroundColor: '#ED6060' }}><FaPowerOff/></Avatar>
          </IconButton>
          
        </Tooltip>
      </Box>
            

          

          </Stack>
        </Stack>
      </Toolbar>
      <Box
        class="fondoActividadTutor"
        style={{
          backgroundImage: `url(${fondoActividadTutor})`,
          backgroundSize: "cover",
          height: tablaDeActividades.length > 4 ? (""):("100vh")
        

        }}
        >



        <Grid container direction="column">
          <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">

            <Stack direction="row" marginLeft={7} sx={{ mb: 2 }} spacing={2} >
              <FormControl fullWidth sx={{ backgroundColor: 'White', width: 300 }}>
                <InputLabel sx={{ width: 250 }} id="demo-multiple-name-label"> Seleccione niño </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={nombreHijo}
                  label="Hijo"
                  input={
                    <OutlinedInput id="demo-multiple-name-label" label="Seleccione niño" />
                  }

                  onChange={manejarDropDown}
                >
                  {hijos.map((hijo) => (<MenuItem id={hijo.usuario} value={hijo.nombre} key={hijo.usuario} >{hijo.nombre}</MenuItem>))}
                </Select>
              </FormControl>

              
                <AiFillFilter />
                <FormControl sx={{ backgroundColor: 'White', width: 150, }}>
                  <InputLabel sx={{ width: 210 }} id="filtro">Seleccione día</InputLabel>
                  <Select
                    labelId="filtro"
                    id="filtro"
                    value={dia}
                    label="filtro"
                    onChange={filtro}
                    input={
                      <OutlinedInput id="filtro" label="Seleccione día" />
                    }
                  >
                    <MenuItem value={"hoy"}>Hoy</MenuItem>
                    <MenuItem value={"todas"}>Todas</MenuItem>
                    <MenuItem value={"Lunes"}>Lunes</MenuItem>
                    <MenuItem value={"Martes"}>Martes</MenuItem>
                    <MenuItem value={"Miercoles"}>Miércoles</MenuItem>
                    <MenuItem value={"Jueves"}>Jueves</MenuItem>
                    <MenuItem value={"Viernes"}>Viernes</MenuItem>
                    <MenuItem value={"Sabado"}>Sábado</MenuItem>
                    <MenuItem value={"Domingo"}>Domingo</MenuItem>

                  </Select>
                </FormControl>
            

            </Stack>
            <Stack marginRight={15} marginTop={3} sx={{ width: '150px' }}>
              <Stack direction="row" spacing={2}>
              <Link to='crear/'>
                <Button variant="contained" sx={{ backgroundColor: '#64C6FF', maxWidth: '450px' }} >Agregar</Button>
              </Link>
          
             <Badge marginbottom={2} badgeContent={numeroNotificaciones} color="error" >
              <Notificaciones usuario={usuario} setNumeroNotificaciones={setNumeroNotificaciones}/>
            </Badge>
              
              </Stack>
              <Box border={2} borderRadius={2} marginTop={2} color="#B4B1B1" sx={{ backgroundColor: 'White', maxWidth: '400px', maxHeight: '400px' }}>

                <Stack direction="column" justifyContent="center" alignItems="center" margin={1}>
                  
                  <Typography variant="subtitle2" color="#545454" >Estado Actividad</Typography>
                  <Stack direction="row" marginTop={1} spacing={2}>
                    <Typography variant="subtitle2" color="#7560AB">Pendiente</Typography>
                    <Box display="flex" alignItems="center"justifyContent="center" borderRadius={100} color="White" sx={{ backgroundColor: '#7560AB', minHeight: '5px', minWidth: '20px',padding:'2px'}}> {pendiente}</Box>
                  </Stack>
                  <Stack direction="row" marginTop={1} spacing={1}>
                    <Typography variant="subtitle2" color="#79C665">Completada</Typography>
                    <Box display="flex" alignItems="center"justifyContent="center"borderRadius={100} color="White" sx={{ backgroundColor: '#79C665', minHeight: '5px', minWidth: '20px', padding:'2px' }}> {completed}</Box>
                  </Stack>
                </Stack>
              </Box>

            </Stack>

          </Stack>

          <Grid container direction="column" alignItems="center">
            <Box border={2} borderRadius={20} color="#B4B1B1" sx={{ backgroundColor: '#B4B1B1', maxHeight: '60px' }}>
              <Typography variant="h5" color="White" margin={1}>{dia == 'todas' ? "Todas las actividades Semanales" : "Actividades de: " + dia + "."}</Typography>
            </Box>

            <Stack justifyContent={"center"} alignItems="center" sx={{ maxWidth: 1050, border: "4px solid #6DCBC4", borderRadius: 2 }} marginTop={3} flex={1}>
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
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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

  )
}
export default TutorActividadTable