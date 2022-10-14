import React from 'react';
import { 
    BarChart, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Legend, 
    Bar, 
    ResponsiveContainer, 
    Label 
} from 'recharts';

// const datosDeGrafica = [{"dia":"2022-10-11","cuenta":1},{"dia":"2022-10-12","cuenta":1},{"dia":"2022-10-13","cuenta":1},{"dia":"2022-10-14","cuenta":1}];

const GraficaDeMonitoreoDeHijo = ({inforamacionDeGrafica}) => {

    return (
        <ResponsiveContainer width="90%" height={400}>
            <BarChart width={730} height={250} data={inforamacionDeGrafica} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" label={{ value: "Dias", offset: 0, position: "insideBottom" }}/>
                <YAxis label={{ value: 'Número de actvidades', angle: -90, offset: 0, position: 'center' }}/>
                <Tooltip />
                <Bar dataKey="cuenta" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default GraficaDeMonitoreoDeHijo