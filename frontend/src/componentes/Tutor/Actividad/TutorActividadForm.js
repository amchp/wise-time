import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useParams, useNavigate } from 'react-router-dom';
import { conseguirActividad, crearActividad, actualizarActividad } from '../../../servicios/ActividadServicio';
import { conseguirTodosLosHijos } from '../../../servicios/HijoServicio';
import { conseguirHijosActividad } from '../../../servicios/HistoriaDeActividadServicio';
import { InputLabel, MenuItem, Select, ListItemText, OutlinedInput, Grid, Container, TextField, Button, Typography } from '@mui/material/';
const initialForm = {
  "nombre": "",
  "descripcion": "",
  "dias": ["Lunes", "Martes"],
  "hora": "",
  "hijos": []
};

const TutorActividadForm = ({ usuario }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const creating = !id ? true : false;
  const [form, setForm] = useState(initialForm);
  let [dateMap, setDateMap] = useState({
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
  const [mapaIDNombre,setMapaIDNombre]= useState({});
  useEffect(() => {
    const conseguirHijos = async () => {
      const filtros = { 'tutor': usuario.id.toString() };
      const consulta = await conseguirTodosLosHijos(filtros);
      let listaHijos=[];

      setHijos(consulta);
    }
    conseguirHijos(); //Consigue TODOS los hijos
    if (id) {
      const conseguirDatos = async () => {
        const data = await conseguirActividad(id);
        const temp = {
          "Lunes": false,
          "Martes": false,
          "Miercoles": false,
          "Jueves": false,
          "Viernes": false,
          "Sabado": false,
          "Domingo": false
        };
        const filtroDeHijoActvidad = {'hijo__tutor': usuario.id, 'activdad': id};
        //
        data.dias.forEach((day) => {
          temp[day] = true;
        });
        setDateMap(temp);
        setForm(data);
        //mapa ID : Nombre
        let mapaNombresID={};
        hijos.forEach((hijo)=>{if (hijosmap[hijo.usuario]) {
          mapaNombresID[hijo.usuario]=hijo.nombre;
        }});
        setMapaIDNombre(mapaNombresID);
        //
        let listaNombres=Object.values(mapaNombresID);
        console.log(listaNombres);
        setHijosSeleccionados(listaNombres);



      };
      conseguirDatos();

    }
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
    const {checked,value,name} = e.target;
    console.log(e.target);
    setHijosSeleccionados(name);
  }

  const handleCheckBox = (e) => {
    const { checked, name } = e.target;
    console.log(e.target);
    //labels[0].innerText
    setDateMap({
      ...dateMap,
      [name]: checked,
    });
  }

  const handleSubmit = () => {
    const dias = Object.keys(dateMap).filter(key => dateMap[key]);
    
    console.log(dias);
    form.dias = dias;
    form.hijos=hijos;
    if (creating) {
      create(form);
    } else {
      edit(form);
    }
    navigate('/actividades')
  };



  return (
    <Container fixed sx={{ p: 2, border: '1px dashed grey' }}>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            {creating ? "Agregar Actividad" : "Editar Actividad"}
          </Typography>

        </Grid>
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1 }}>
              <InputLabel id="dropDown">Seleccione hijos</InputLabel>
              <Select labelId="demo-multiple-checkbox-label" 
              id="demo-multiple-checkbox"
              multiple
              value={hijosSeleccionados}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              
        >
          {hijos.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={hijosSeleccionados.indexOf(name) > -1} />
              <ListItemText primary={name} />
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
            />
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} >

          <Grid item xs={1}>
            <Checkbox checked={dateMap["Lunes"]} type="checkbox" onChange={handleCheckBox} name="Lunes" /><span>"L"</span>
          </Grid>
          <Grid item xs={1}>
            <Checkbox checked={dateMap["Martes"]} type="checkbox" onChange={handleCheckBox} name="Martes" /><span>"M"</span>
          </Grid>
          <Grid item xs={1}>
            <Checkbox checked={dateMap["Miercoles"]} type="checkbox" onChange={handleCheckBox} name="Miercoles" /><span>"MI"</span>
          </Grid>
          <Grid item xs={1}>
            <Checkbox checked={dateMap["Jueves"]} type="checkbox" onChange={handleCheckBox} name="Jueves" /><span>"J"</span>
          </Grid>
          <Grid item xs={1}>
            <Checkbox checked={dateMap["Viernes"]} type="checkbox" onChange={handleCheckBox} name="Viernes" /><span>"V"</span>
          </Grid>
          <Grid item xs={1}>
            <Checkbox checked={dateMap["Sabado"]} type="checkbox" onChange={handleCheckBox} name="Sabado" /><span>"S"</span>
          </Grid>
          <Grid item xs={1}>
            <Checkbox checked={dateMap["Domingo"]} type="checkbox" onChange={handleCheckBox} name="Domingo" /><span>"D"</span>
          </Grid>

        </Grid>
        <Grid container spacing={10}>
          <Grid item xs={2} >
            <TextField
              type="text"
              name="hora"
              placeholder="hora"
              onChange={handleChange}
              value={form.hora}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" component="label">
              Guardar
              <input type="submit" hidden />
            </Button>
          </Grid>
        </Grid>
      </form>


    </Container>

  )


}
export default TutorActividadForm