import React from 'react';
import TutorActividadTable from './Actividad/TutorActividadTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TutorActividadForm from './Actividad/TutorActividadForm'; 
import TutorActivityInfo from './Actividad/TutorActivityInfo';



const TutorApp =  ({usuario}) => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="actividades" element={<TutorActividadTable/>}/>
                    <Route path="actividades/crear" element={<TutorActividadForm usuario={usuario} />}/>
                    <Route path="actividades/:id/editar" element={<TutorActividadForm/>}/>
                    <Route path="actividades/:id" element={<TutorActivityInfo/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default TutorApp