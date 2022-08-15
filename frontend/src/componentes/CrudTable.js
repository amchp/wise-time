import React from 'react'
import CrudTableRow from './CrudTableRow';
import Button from '@mui/material/Button';

const CrudTable = ({data}) => {
    return(
        <div>
        <h3>Actividades Semanales</h3>
        <Button variant="outlined" href="actividades/crear">Agregar</Button>
        <br />
      <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Hora</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
        {data.length === 0 ? (
          <tr>
          <td colSpan="3">Sin Actividades Registradas</td>
          </tr>
        ):(data.map((el) => <CrudTableRow key={el.id} el={el}/>) 
        )}
        </tbody>
      </table>
        </div>
    )
}
export default CrudTable