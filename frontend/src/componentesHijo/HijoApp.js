import React, { useEffect, useState } from 'react';
import TableHijo from './TableHijo';
import {conseguirTodasActividades} from '../servicios/ActividadServicio';

const HijoApp =  () => {
    const [db, setDb] = useState([]);
    useEffect(() => {
        const conseguirDatosTabla = async () => {
            const data = await conseguirTodasActividades();
            setDb(data);
        }
        conseguirDatosTabla();
    }, []);
    return(
        <div>
        <h1>ACTIVIDADES</h1>
        <TableHijo data={db}/>
        </div>

    )


}
export default HijoApp