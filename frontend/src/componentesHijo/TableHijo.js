import React from 'react'
import TableRowHijo from './TableRowHijo';

const TableHijo = ({ data }) => {
    //Recorro arreglo de dias en cada actividad para filtrar :)
    function searchDate(dateArray, date) {
        var find = false;
        dateArray.forEach(dia => {
            if (dia === date) {
                console.log(dia);
                find = true;
            }
        });
        return find;
    }
    //Obtener dia actual y filtrar actividades por dia para el niño.
    const week=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    let currentDay=new Date().getDay();
    const dataByDate = data.filter((item) => (searchDate(item.dias, week[currentDay])));
    //---
    return (
        <div>
            <h3>Actividades del día {week[currentDay]} </h3>
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
                    ) : (dataByDate.map((el) => <TableRowHijo key={el.id} el={el} />)
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default TableHijo;