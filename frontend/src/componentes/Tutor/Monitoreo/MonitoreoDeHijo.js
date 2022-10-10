import React, { useEffect, useState } from 'react'
import FiltroDeMonitoreoDeHijo from './FiltroDeMonitoreoDeHijo';
import GraficaDeMonitoreoDeHijo from './GraficaDeMonitoreoDeHijo';

const MonitoreoDeHijo =  ({usuario}) => {
    const [hijoSelecionado, setHijoSeleccionado] = useState(0);

    
    return (
        <div>
            <FiltroDeMonitoreoDeHijo usuario={usuario} setHijoSeleccionado={setHijoSeleccionado}/>
            <GraficaDeMonitoreoDeHijo/>
        </div>
    )
}

export default MonitoreoDeHijo