import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Link } from "react-router-dom";
import { borrarActividad } from '../../../servicios/ActividadServicio'
import {actualizarHistoriaDeLaActividad, eliminarHistoriaDeLaActividad} from '../../../servicios/HistoriaDeActividadServicio'

const TutorActividadTableRow = ({ el, historiaActividad }) => {
  const noHecho = historiaActividad === undefined;
  const completado = historiaActividad !== undefined && !historiaActividad.confirmado;
  const confimardo = historiaActividad !== undefined && historiaActividad.confirmado;

  const confimar = () => {
    const confimarActividad = async() =>{
      const data = {
        'id': historiaActividad.id,
        'completado': true,
        'confirmado': true,
      };
      await actualizarHistoriaDeLaActividad(data);
    }
    confimarActividad();
  }
  const denegar = () => {
    const denegarActividad = async() =>{
      const data = {
        "id": historiaActividad.id
      };
      await eliminarHistoriaDeLaActividad(data);
    }
    denegarActividad();
  }
  const onDelete = () => {
    alert("Seguro que quieres borrar esta actividad?");
    borrarActividad(el);
  }
  return (
    <TableRow

      sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
    >
      <TableCell component="th" scope="row">{el.nombre}</TableCell>
      <TableCell align="right">{el.hora}</TableCell>
      <TableCell align="center"><Stack direction="row" spacing={1}>
      
      { (completado) && <Button variant="contained" color="success" sx={{ backgroundColor: '#79C665' }} onClick={confimar}>Confirmar</Button>}
      { (completado) && <Button variant="contained" color="error" sx={{ backgroundColor: '#ED6060' }}  onClick={denegar}>Denegar</Button>}
        <Link to={`${el.id}`}>
        <Button variant="contained" sx={{ backgroundColor: '#64C6FF' }} >Información</Button>
        </Link>
        <Link to={`${el.id}/editar`}>
          <Button variant="contained" sx={{ backgroundColor: '#64C6FF' }}>Editar</Button>
        </Link>
        <Button variant="contained" color="error" sx={{ backgroundColor: '#ED6060' }} onClick={onDelete}>Eliminar</Button>
      </Stack>
      </TableCell>
    </TableRow>
  )
}

export default TutorActividadTableRow