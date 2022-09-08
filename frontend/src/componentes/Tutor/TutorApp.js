import React from 'react';
import TutorActividadTable from './Actividad/TutorActividadTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TutorActividadForm from './Actividad/TutorActividadForm'; 
import TutorActivityInfo from './Actividad/TutorActivityInfo';



const TutorApp =  ({data}) => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="actividades" element={<TutorActividadTable/>}/>
                    <Route path="actividades/crear" element={<TutorActividadForm usuario={data} />}/>
                    <Route path="actividades/:id/editar" element={<TutorActividadForm usuario={data}/>}/>
                    <Route path="actividades/:id" element={<TutorActivityInfo usuario={data}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default TutorApp