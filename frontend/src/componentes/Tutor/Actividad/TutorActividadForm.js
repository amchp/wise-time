import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useParams, useNavigate} from 'react-router-dom';
import { conseguirActividad, crearActividad, actualizarActividad } from '../../../servicios/ActividadServicio';
import { conseguirTodosLosHijos } from '../../../servicios/HijoServicio';
import {InputLabel, MenuItem,Select,ListItemText,OutlinedInput} from '@mui/material/';
const initialForm ={
  "nombre":"",
  "descripcion":"",
  "dias":["Lunes", "Martes"],
  "hora":"",
};

const TutorActividadForm = ({usuario}) => {
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
  let [hijos,setHijos]=useState(["Pedro","Felipe"]);
  const [hijosSeleccionados,setHijosSeleccionados]= useState([])
  useEffect(() => {
    if(id){
      const conseguirDatos = async () => {
          const data = await conseguirActividad(id);
          const listaHijos = await conseguirTodosLosHijos({padre: usuario.id});
          const temp = {
            "Lunes": false,
            "Martes": false,
            "Miercoles": false,
            "Jueves": false,
            "Viernes": false,
            "Sabado": false,
            "Domingo": false
          }
          data.dias.forEach((day)=>{
            temp[day] = true;
          });
          setDateMap(temp);
          setForm(data);
          
          setHijos(listaHijos);
          console.log("lista");
          console.log(listaHijos);
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
    [e.target.name]:e.target.value,
    });
    
  }
   const handleCheckMark=(e)=>{
    const {
      target: { value },
    } = e;
    setHijosSeleccionados(
      typeof value === 'string' ? value.split(',') : value,
    );
   }
  
  const handleCheckBox = (e) => {
    setDateMap({
      ...dateMap,
      [e.target.labels[0].innerText]: e.target.checked,
    });
  }

  const handleSubmit=() =>{
    const dias = Object.keys(dateMap).filter(key => dateMap[key]);
    form.dias = dias;
    if(creating){
      create(form);
    }else{
      edit(form);
    }
    navigate('/actividades')
  };

  

    return(
        <div>
        <h3>{ creating ? "Agregar Actividad" : "Editar Actividad"}</h3>
        <form onSubmit={handleSubmit}>
        <InputLabel id="multiple-checkbox-hijos">Seleccione hijos !</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={hijosSeleccionados}
          onChange={handleCheckMark}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {hijos.map((nombre) => (
            <MenuItem key={nombre} value={nombre}>
              <Checkbox  checked={hijosSeleccionados.indexOf(nombre)>-1} />
              <ListItemText primary={nombre} />
            </MenuItem>
          ))}
        </Select>
          <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre de la tarea" 
          onChange={handleChange} 
          value={form.nombre}
          />

          <input 
          type="text" 
          name="descripcion" 
          placeholder="descripcion" 
          onChange={handleChange} 
          value={form.descripcion}
          />

          <FormGroup>
          <FormControlLabel control={<Checkbox checked={dateMap["Lunes"]}  onChange={handleCheckBox} />} label="Lunes" />
          <FormControlLabel control={<Checkbox checked={dateMap["Martes"]} onChange={handleCheckBox} />} label="Martes" />
          <FormControlLabel control={<Checkbox checked={dateMap["Miercoles"]} onChange={handleCheckBox} />} label="Miercoles" />
          <FormControlLabel control={<Checkbox checked={dateMap["Jueves"]} onChange={handleCheckBox} />} label="Jueves" />
          <FormControlLabel control={<Checkbox checked={dateMap["Viernes"]} onChange={handleCheckBox} />} label="Viernes" />
          <FormControlLabel control={<Checkbox checked={dateMap["Sabado"]} onChange={handleCheckBox} />} label="Sabado" />
          <FormControlLabel control={<Checkbox checked={dateMap["Domingo"]} onChange={handleCheckBox} />} label="Domingo" />
          </FormGroup>
          
          <input 
          type="text" 
          name="hora" 
          placeholder="hora" 
          onChange={handleChange} 
          value={form.hora}
          />
          
          <input type="submit" value="Guardar"/>
        </form>
        </div>

    )


}
export default TutorActividadForm