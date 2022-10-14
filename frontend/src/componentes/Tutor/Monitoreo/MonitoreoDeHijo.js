import React, { useEffect, useState } from 'react'
import FiltroDeMonitoreoDeHijo from './FiltroDeMonitoreoDeHijo';
import GraficaDeMonitoreoDeHijo from './GraficaDeMonitoreoDeHijo';
import { conseguirMonitoreoDeHijo } from '../../../servicios/HistoriaDeActividadServicio';

const MonitoreoDeHijo =  ({usuario}) => {
    const [hijoSelecionado, setHijoSeleccionado] = useState(0);
    const [dias, setDias] = useState([new Date(), new Date()]);
    const [inforamacionDeGrafica, setInforamacionDeGrafica] = useState([{dia: "", cuenta: 0}]);

    const dateToString = (date) => {
        const dd = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate().toString();
        const mm = date.getMonth() < 9 ? '0' + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1).toString();
        const yyyy = date.getUTCFullYear();
        return `${yyyy}-${mm}-${dd}`;
    };

    const conseguirInformacionDeGrafica = async () =>{
        const filtros = {
            'hijo_actividad__hijo': hijoSelecionado,
            'dia__gte': dateToString(dias[0]),
            'dia__lte': dateToString(dias[1]),
            'confirmado': true
        }
        const datosDeGrafica = await conseguirMonitoreoDeHijo(filtros);
        console.log(datosDeGrafica, typeof datosDeGrafica);
        setInforamacionDeGrafica(datosDeGrafica);
    }

    useEffect(()=> {
        conseguirInformacionDeGrafica();
    }, [hijoSelecionado, dias])
    
    return (
        <div>
            <FiltroDeMonitoreoDeHijo usuario={usuario} setHijoSeleccionado={setHijoSeleccionado} setDias={setDias} dias={dias}/>
            <GraficaDeMonitoreoDeHijo inforamacionDeGrafica={inforamacionDeGrafica}/>
        </div>
    )
}

export default MonitoreoDeHijo