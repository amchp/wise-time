import React, { useEffect, useState } from 'react'
import FiltroDeMonitoreoDeHijo from './FiltroDeMonitoreoDeHijo';
import GraficaDeMonitoreoDeHijo from './GraficaDeMonitoreoDeHijo';
import { conseguirMonitoreoDeHijo } from '../../../servicios/HistoriaDeActividadServicio';
import { Grid, Box, Container, Button, Stack, AppBar, Toolbar } from '@mui/material/';
import { Link } from "react-router-dom";
import fondoHome from '../../../imagenes/fondoHome.png';


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
        
        <Box>
            <AppBar position="static"  style={{
                backgroundColor: "White"
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters  >
                        <Stack direction="row" alignItems="center"  justifyContent="space-between" width="100%">
                            <img
                            src={require('../../../imagenes/logoWiseTime2.png')}
                            width="130" height="35"
                            alt='Logo' />
                            <Link to='/actividades'>
                            <Button  variant="contained" sx={{ backgroundColor: '#64C6FF', maxWidth: '300px' }} >volver</Button>
                            </Link>
                        </Stack>
                    </Toolbar>
                    
                </Container>
        </AppBar>
        <Box 
    class="fondoActividadTutor"
    style={{
      backgroundImage: `url(${fondoHome})`,
      backgroundSize: "cover",
                        height: "100vh"
    }}>
            <FiltroDeMonitoreoDeHijo usuario={usuario} setHijoSeleccionado={setHijoSeleccionado} setDias={setDias} dias={dias}/>
            <Stack justifyContent={"center"} alignItems="center" marginTop={3} sx={{ backgroundColor: 'White'}}>
            <GraficaDeMonitoreoDeHijo inforamacionDeGrafica={inforamacionDeGrafica}/>
            </Stack>
        </Box>
        </Box>
        

    )
}

export default MonitoreoDeHijo