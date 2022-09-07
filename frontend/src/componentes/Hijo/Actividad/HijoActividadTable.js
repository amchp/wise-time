import React, { useEffect, useState }  from 'react'
import HijoActividadTableRow from './HijoActividadTableRow';
import {conseguirTodasActividades} from '../../../servicios/ActividadServicio';

const HijoActividadTable = ({usuario}) => {
    //Recorro arreglo de dias en cada actividad para filtrar :)
    const [data, setData] = useState([]);
    useEffect(() => {
        const conseguirDatosTabla = async () => {
            const semana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
            const diaDeLaSemana = semana[new Date().getDay()];
            const filtros = {"hijo": usuario.id, "dias": diaDeLaSemana};
            const datos = await conseguirTodasActividades(filtros);
            setData(datos);
        }
        conseguirDatosTabla();
    }, []);
    // function searchDate(dateArray, date) {
    //     var find = false;
    //     dateArray.forEach(dia => {
    //         if (dia === date) {
    //             console.log(dia);
    //             find = true;
    //         }
    //     });
    //     return find;
    // }
    // //Obtener dia actual y filtrar actividades por dia para el niño.
    // let currentDay=new Date().getDay();
    // const dataByDate = data.filter((item) => (searchDate(item.dias, week[currentDay])));
    //---
    return (
        <div>
            <h1>ACTIVIDADES</h1>
            <h3>Actividades del día</h3>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Icono</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="3">Sin Actividades</td>
                        </tr>
                    ) : (data.map((el) => <HijoActividadTableRow key={el.id} el={el} />)
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default HijoActividadTable;