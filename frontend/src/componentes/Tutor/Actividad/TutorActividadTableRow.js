import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { borrarActividad } from '../../../servicios/ActividadServicio' 

const TutorActividadTableRow = ({el}) => {
    const onDelete = () => {
      alert("Seguro que quieres borrar esta actividad");
      borrarActividad(el);
    }
    return(
          <tr>
            <td>{el.nombre}</td>
            <td>{el.hora}</td>
            <td>
            <Stack direction="row" spacing={1}>
                <Button variant="outlined" href={`actividades/${el.id}`}>Informacion</Button>
                <Button variant="outlined" href={`actividades/${el.id}/editar/`}>Editar</Button>
                <Button variant="outlined" onClick={onDelete}>Eliminar</Button>
            </Stack>
            </td>
          </tr>
    )
}

export default TutorActividadTableRow