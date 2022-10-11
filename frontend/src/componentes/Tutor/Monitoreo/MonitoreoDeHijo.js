import React, { useEffect, useState } from 'react'
import FiltroDeMonitoreoDeHijo from './FiltroDeMonitoreoDeHijo';
import GraficaDeMonitoreoDeHijo from './GraficaDeMonitoreoDeHijo';
import { conseguirMonitoreoDeHijo } from '../../../servicios/HistoriaDeActividadServicio';

const MonitoreoDeHijo =  ({usuario}) => {
    const [hijoSelecionado, setHijoSeleccionado] = useState(0);
    const [diaInicial, setDiaInicial] = useState('');
    const [diaFinal, setDiaFinal] = useState('');
    const [inforamacionDeGrafica, setInforamacionDeGrafica] = useState({});

    const conseguirInformacionDeGrafica = async () =>{
        const filtros = {
            'hijo_actividad__hijo': hijoSelecionado,
            'dia__gte': diaInicial,
            'dia__lte': diaFinal,
            'confirmado': true
        }
        return await conseguirMonitoreoDeHijo(filtros);
    }

    useEffect(()=> {
        setInforamacionDeGrafica(conseguirInformacionDeGrafica());
    }, [hijoSelecionado, diaInicial, diaFinal])
    
    return (
        <div>
            <FiltroDeMonitoreoDeHijo usuario={usuario} setHijoSeleccionado={setHijoSeleccionado} setDiaInicial={setDiaInicial} setDiaFinal={setDiaFinal}/>
            <GraficaDeMonitoreoDeHijo inforamacionDeGrafica={inforamacionDeGrafica}/>
        </div>
    )
}

export default MonitoreoDeHijo