import React from 'react'
import { FaMedal} from "react-icons/fa";
import { ListItemIcon,TableCell,TableRow  } from '@mui/material/';



const LogrosTableRow = ({usuario,logro,setReload }) => {
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
      <TableCell align="right"><ListItemIcon><FaMedal size={30} color="orange"/></ListItemIcon>{logro}</TableCell>
    </TableRow>
   
  )
}

export default LogrosTableRow

