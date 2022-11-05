import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';



const LogrosTableRow = ({ el, historiaActividad, reload, setReload }) => {
  
  return (
    
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
    >
      <TableCell component="th" scope="row">{el.nombre}</TableCell>
      <TableCell align="right">{el.descripcion}</TableCell>
    </TableRow>
   
  )
}

export default LogrosTableRow