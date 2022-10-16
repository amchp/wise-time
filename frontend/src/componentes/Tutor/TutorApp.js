import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TutorActividadTable from './Actividad/TutorActividadTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TutorActividadForm from './Actividad/TutorActividadForm'; 
import TutorActivityInfo from './Actividad/TutorActivityInfo';
import RegistroHijos from './Configuraciones/RegistroHijos';
import MonitoreoDeHijo from './Monitoreo/MonitoreoDeHijo';
import SugerenciaTable from './Sugerencias/SugerenciaTable';
import '../../App.css';




const TutorApp =  ({data}) => {
    const theme = createTheme({
        typography: {
            fontFamily: ["Nunito", "sans-serif"].join(","),
        },
    });
    return(
        <div>
            <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                <Route path="actividades" element={<TutorActividadTable usuario={data}/>}/>
                    <Route path="actividades/crear" element={<TutorActividadForm usuario={data} />}/>
                    <Route path="actividades/:id/editar" element={<TutorActividadForm usuario={data}/>}/>
                    <Route path="actividades/:id" element={<TutorActivityInfo usuario={data}/>}/>
                    <Route path="registrohijos" element={<RegistroHijos usuario={data}/>}/>
                    <Route path="monitoreo" element={<MonitoreoDeHijo usuario={data}/>}/>
                    <Route path="sugerencias" element={<SugerenciaTable usuario={data}/>}/>
                </Routes>
            </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}
export default TutorApp