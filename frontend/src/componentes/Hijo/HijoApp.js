import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HijoActividadTable from './Actividad/HijoActividadTable';
import HijoMascota from './Mascota/HijoMascota';

const HijoApp =  ({usuario}) => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="actividades" element={<HijoActividadTable data={usuario}/>}/>
                    <Route path="mascota" element={<HijoMascota/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default HijoApp