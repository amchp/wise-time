import React from 'react'
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import {conseguirHijosActividad, crearHistoriaDeLaActividad} from '../../../servicios/HistoriaDeActividadServicio'




const HijoActividadTableRow = ({ usuario, el, historiaActividad }) => {
  const noHecho = historiaActividad === undefined;
  const completado = historiaActividad !== undefined && !historiaActividad.confirmado;
  const confimardo = historiaActividad !== undefined && historiaActividad.confirmado;
  
  const accept = () => {
    const conseguirHijoActividadYCrearHistoriaDeActividad = async() =>{
      const filtros = {
        'hijo': usuario.id,
        'actividad': el.id
      }
      let hijo_actividad = await conseguirHijosActividad(filtros);
      const data = {
        'hijo_actividad': hijo_actividad[0].id,
        'completado': true,
        'confirmado': false,
      };
      console.log(data);
      await crearHistoriaDeLaActividad(data);
    }
    conseguirHijoActividadYCrearHistoriaDeActividad();
  }
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
      {el.nombre}
      </TableCell>
      <TableCell align="right">{el.hora}</TableCell>
      <TableCell align="right">
        {noHecho && <Button><img width="50" height="50" src="https://lasierraeduca.es/wp-content/uploads/2020/05/Thumbs-Up-icon-2.png" alt="imagen de aceptar" onClick={accept} /></Button>}

      </TableCell>
    </TableRow>
  )
}

export default HijoActividadTableRow