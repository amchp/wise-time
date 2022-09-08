import React from 'react'
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';




const HijoActividadTableRow = ({ el }) => {
  const accept = () => {

  }
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
      </TableCell>
      <TableCell align="right">{el.nombre}</TableCell>
      <TableCell align="right">{el.hora}</TableCell>
      <TableCell align="right">
        <Button><img src="https://lasierraeduca.es/wp-content/uploads/2020/05/Thumbs-Up-icon-2.png" alt="imagen de aceptar" onClick={accept} /></Button>

      </TableCell>
    </TableRow>
  )
}

export default HijoActividadTableRow