import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const TableRowHijo = ({el}) => {
    const accept = () => {
      
    }
    return(
          <tr>
            <td>{el.nombre}</td>
            <td>
            <Stack direction="row" spacing={1}>
                <Button><img src="https://lasierraeduca.es/wp-content/uploads/2020/05/Thumbs-Up-icon-2.png" alt="imagen de aceptar" onClick={accept} /></Button>
            </Stack>
            </td>
          </tr>
    )
}

export default TableRowHijo