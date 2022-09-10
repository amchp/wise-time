import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HijoActividadTable from './Actividad/HijoActividadTable';
import HijoMascota from './Mascota/HijoMascota';

const HijoApp =  ({usuario}) => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="actividades" element={<HijoActividadTable usuario={usuario}/>}/>
                    <Route path="mascota" element={<HijoMascota usuario={usuario}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default HijoApp