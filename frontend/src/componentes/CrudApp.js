import React, { useEffect, useState } from 'react';
import CrudTable from './CrudTable';
import {conseguirTodasActividades} from '../servicios/ActividadServicio';

// const initialDb =[

// {
//     id:1,
//     nombre:"Despertarse",
//     hora:"8am",
//     descripcion:"Sol solecito",
//     dias:["Lunes","Martes"],
// },
// {
//     id:2,
//     nombre:"Almorzar",
//     hora:"1pm",
//     descripcion:"Debe alimentarse bien",
//     dias:["Miercoles"],
// },
// {
//     id:3,
//     nombre:"Piano",
//     hora:"3pm",
//     descripcion:"Debe practicar el piano y llevarse su cuaderno",
//     dias:["Jueves","Viernes"],
// },
// {
//     id:4,
//     nombre:"Dormir",
//     hora:"7pm",
//     descripcion:"Luna luna",
//     dias:["Miercoles"],
// },
// ];


const CrudApp =  () => {
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
        <CrudTable data={db}/>
        </div>

    )


}
export default CrudApp