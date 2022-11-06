import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useParams, useNavigate } from 'react-router-dom';
import { conseguirActividad, crearActividad, actualizarActividad } from '../../../servicios/ActividadServicio';
import { conseguirTodosLosHijos } from '../../../servicios/HijoServicio';
import { FormControl, InputLabel, MenuItem, Select, ListItemText, Box,OutlinedInput, Grid, Container, TextField, Button, Typography, Stack, AppBar, Toolbar } from '@mui/material/';
import { Link } from "react-router-dom";
import fondoLoginTutor from '../../../imagenes/fondoLoginTutor.png';
const initialForm = {
  "nombre": "",
  "descripcion": "",
  "dias": [],
  "hora": "",
  "hijos": []
};

const TutorActividadForm = ({ usuario }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const creating = !id ? true : false;
  const [form, setForm] = useState(initialForm);
  let [mapaDeDias, ponerMapaDeDias] = useState({
    "Lunes": true,
    "Martes": true,
    "Miercoles": true,
    "Jueves": true,
    "Viernes": true,
    "Sabado": true,
    "Domingo": true
  });

  let [hijos, setHijos] = useState([]);
  const [hijosSeleccionados, setHijosSeleccionados] = useState([]);
  const [mapaHijoNombreAId, setMapaHijoNombreAId] = useState({});

  const conseguirInformacionDeLosHijos = async () => {
    const filtros = { 'tutor': usuario.id.toString() };
    return await conseguirTodosLosHijos(filtros);
  }

  const crearListaYDicionarioDeHijos = (informacionDeHijos) => {
    let listaHijos = [];
    const dicionarioDeIdAHijo = {};
    const dicionarioDeHijoAId = {};
    console.log(informacionDeHijos);
    informacionDeHijos.forEach((hijo) => {
      dicionarioDeIdAHijo[hijo.usuario] = hijo.nombre;
      dicionarioDeHijoAId[hijo.nombre] = hijo.usuario;
      listaHijos.push(hijo.nombre);
    });
    console.log(listaHijos);
    return { listaHijos, dicionarioDeIdAHijo, dicionarioDeHijoAId }
  }

  const ponerDiasSelecionados = (informacionDeLaActividad) => {
    const diasSelecionados = {
      "Lunes": false,
      "Martes": false,
      "Miercoles": false,
      "Jueves": false,
      "Viernes": false,
      "Sabado": false,
      "Domingo": false
    };
    informacionDeLaActividad.dias.forEach((dia) => {
      diasSelecionados[dia] = true;
    })
    return diasSelecionados;
  }

  const sacarListaDeSelecionados = async (dicionarioDeIdAHijo) => {
    const filtroDeHijoActvidad = { 'tutor': usuario.id, 'actividades': id };
    const hijoActividades = await conseguirTodosLosHijos(filtroDeHijoActvidad);
    console.log(hijoActividades);
    let listaSeleccionados = [];
    hijoActividades.forEach((hijoActividad) => {
      let idHijo = hijoActividad.usuario;
      listaSeleccionados.push(dicionarioDeIdAHijo[idHijo]);
    });
    console.log("Lista ! :",listaSeleccionados);
    return listaSeleccionados;
  }

  useEffect(() => {
    const llenarFormulario = async () => {
      const informacionDeHijos = await conseguirInformacionDeLosHijos();
      const { listaHijos, dicionarioDeIdAHijo, dicionarioDeHijoAId } = crearListaYDicionarioDeHijos(informacionDeHijos);
      if (id) {
        const informacionDeLaActividad = await conseguirActividad(id);
        const diasSelecionados = ponerDiasSelecionados(informacionDeLaActividad);
        const listaDeSelecionados = await sacarListaDeSelecionados(dicionarioDeIdAHijo);
        setForm(informacionDeLaActividad);
        ponerMapaDeDias(diasSelecionados);
        setHijosSeleccionados(listaDeSelecionados);
      }
      setMapaHijoNombreAId(dicionarioDeHijoAId);
      setHijos(listaHijos);
    };
    llenarFormulario();
  }, []);

  const create = (data) => {
    crearActividad(data);
  }

  const edit = (data) => {
    actualizarActividad(data);
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  const handleCheckMark = (e) => {
    const { value, key } = e.target;
    setHijosSeleccionados(value);
  }

  const handleCheckBox = (e) => {
    const { checked, name } = e.target;

    //labels[0].innerText
    ponerMapaDeDias({
      ...mapaDeDias,
      [name]: checked,
    });
  }

  const handleSubmit = () => {
    const dias = Object.keys(mapaDeDias).filter(key => mapaDeDias[key]);
    const hijos = hijosSeleccionados.map((hijo) => { return mapaHijoNombreAId[hijo] });
    form.dias = dias;
    form.hijos = hijos;
    if (creating) {
      create(form);
    } else {
      edit(form);
    }
    navigate('/actividades/')
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
        class="fondoLoginTutor"
        style={{
          backgroundImage: `url(${fondoLoginTutor})`,
          backgroundSize: "cover",

          height: "100vh",

        }}>  
      <Grid container direction="column" alignItems="center">
      
      <Box border={2} marginTop={5} borderRadius={5} color="#7560AB" sx={{ backgroundColor: 'White'}}>
      <Stack justifyContent={"center"} padding={3} alignItems="center" sx={{maxHeight: '1200px', maxWidth: '1000px' }}>   
            <Grid>
              <Typography variant="h6" gutterBottom>
                {creating ? "Agregar Actividad" : "Editar Actividad"}
              </Typography>

            </Grid>
          

          <form onSubmit={handleSubmit}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <FormControl sx={{ width: 500 }}>
                  <InputLabel id="dropDown">Seleccione niños</InputLabel>
                  <Select labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={hijosSeleccionados}
                    onChange={handleCheckMark}
                    input={<OutlinedInput label="Seleccione niños" />}
                    renderValue={(selected) => selected.join(', ')}


                  >
                    {hijos.map((nombre) => (
                      <MenuItem key={mapaHijoNombreAId[nombre]} value={nombre}>
                        <Checkbox checked={hijosSeleccionados.indexOf(nombre) > -1} />
                        <ListItemText primary={nombre} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre de la tarea"
                  type="text"
                  name="nombre"
                  placeholder="Nombre de la tarea"
                  onChange={handleChange}
                  value={form.nombre}
                  sx={{width:"500px"}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  label="Descripcion de la tarea"
                  type="text"
                  name="descripcion"
                  placeholder="descripcion"
                  onChange={handleChange}
                  value={form.descripcion}
                  sx={{width:"600px"}}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" margin={2} justifyContent="center" alignItems="center" spacing={2} >

              <Grid item xs={1}>
                <Checkbox checked={mapaDeDias["Lunes"]} type="checkbox" onChange={handleCheckBox} name="Lunes" /><span>L</span>
              </Grid>
              <Grid item xs={1}>
                <Checkbox checked={mapaDeDias["Martes"]} type="checkbox" onChange={handleCheckBox} name="Martes" /><span>M</span>
              </Grid>
              <Grid item xs={1}>
                <Checkbox checked={mapaDeDias["Miercoles"]} type="checkbox" onChange={handleCheckBox} name="Miercoles" /><span>MI</span>
              </Grid>
              <Grid item xs={1}>
                <Checkbox checked={mapaDeDias["Jueves"]} type="checkbox" onChange={handleCheckBox} name="Jueves" /><span>J</span>
              </Grid>
              <Grid item xs={1}>
                <Checkbox checked={mapaDeDias["Viernes"]} type="checkbox" onChange={handleCheckBox} name="Viernes" /><span>V</span>
              </Grid>
              <Grid item xs={1}>
                <Checkbox checked={mapaDeDias["Sabado"]} type="checkbox" onChange={handleCheckBox} name="Sabado" /><span>S</span>
              </Grid>
              <Grid item xs={1}>
                <Checkbox checked={mapaDeDias["Domingo"]} type="checkbox" onChange={handleCheckBox} name="Domingo" /><span>D</span>
              </Grid>

            </Grid>
            <Grid container spacing={10}>
              <Grid item xs={2} >
                <TextField
                  type="text"
                  label="Hora"
                  name="hora"
                  placeholder="hora"
                  onChange={handleChange}
                  value={form.hora}
                />
              </Grid>
              <Grid item xs={2} marginTop={2}>
                <Button variant="contained" component="label">
                  Guardar
                  <input type="submit" hidden />
                </Button>
              </Grid>
            </Grid>
          </form>

        
        </Stack>
        </Box>
      
      </Grid>
      </Box>
      </Box>
  

  )


}
export default TutorActividadForm