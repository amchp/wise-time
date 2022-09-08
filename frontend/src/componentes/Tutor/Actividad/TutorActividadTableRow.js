import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { borrarActividad } from '../../../servicios/ActividadServicio'

const TutorActividadTableRow = ({ el }) => {
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
        <Button variant="outlined"  href={`actividades/${el.id}`}>Informacion</Button>
        <Button variant="outlined" href={`actividades/${el.id}/editar/`}>Editar</Button>
        <Button variant="outlined" color="error" onClick={onDelete}>Eliminar</Button>
      </Stack>
      </TableCell>
    </TableRow>
  )
}

export default TutorActividadTableRow