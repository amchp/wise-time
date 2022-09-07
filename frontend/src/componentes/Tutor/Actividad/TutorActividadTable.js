import React, { useEffect, useState } from 'react'
import TutorActividadTableRow from './TutorActividadTableRow';
import Button from '@mui/material/Button';
import { conseguirTodasActividades} from '../../../servicios/ActividadServicio';

const TutorActividadTable = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const conseguirDatosTabla = async () => {
          const semana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
          const diaDeLaSemana = semana[new Date().getDay()];
          const filtros = {"hijo": 1, "dias": diaDeLaSemana};
            const datos = await conseguirTodasActividades(filtros);
            setData(datos);
        }
        conseguirDatosTabla();
    }, []);
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
        ):(data.map((el) => <TutorActividadTableRow key={el.id} el={el}/>) 
        )}
        </tbody>
      </table>
        </div>
    )
}
export default TutorActividadTable