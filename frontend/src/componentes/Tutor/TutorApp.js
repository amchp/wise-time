import React from 'react';
import TutorActividadTable from './Actividad/TutorActividadTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TutorActividadForm from './Actividad/TutorActividadForm'; 
import TutorActivityInfo from './Actividad/TutorActivityInfo';
import RegistroHijos from './Configuraciones/RegistroHijos';
import MonitoreoDeHijo from './Monitoreo/MonitoreoDeHijo';
import '../../App.css';




const TutorApp =  ({data}) => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                <Route path="actividades" element={<TutorActividadTable usuario={data}/>}/>
                    <Route path="actividades/crear" element={<TutorActividadForm usuario={data} />}/>
                    <Route path="actividades/:id/editar" element={<TutorActividadForm usuario={data}/>}/>
                    <Route path="actividades/:id" element={<TutorActivityInfo usuario={data}/>}/>
                    <Route path="registrohijos" element={<RegistroHijos/>}/>
                    {/* <Route path="monitoreo" element={<MonitoreoDeHijo/>}/> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default TutorApp