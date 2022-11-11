import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';



const LogrosTableRow = ({usuario,logro,setReload }) => {
  
  return (
    
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
    >
      <TableCell component="th" scope="row">{"12 pts"}</TableCell>
      <TableCell align="right">{logro}</TableCell>
    </TableRow>
   
  )
}

export default LogrosTableRow