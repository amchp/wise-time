import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HijoActividadTable from './Actividad/HijoActividadTable';
import HijoMascota from './Mascota/HijoMascota';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogrosTable from './Logros/LogrosTable';
import WiseTimeHome from '../Home/WiseTimeHome'

const HijoApp = ({ usuario }) => {
    const theme = createTheme({
        typography: {
            fontFamily: ["Nunito", "sans-serif"].join(","),
        },
    });
    return (
        <div>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<WiseTimeHome usuario={usuario}/>} />
                        <Route path="actividades" element={<HijoActividadTable usuario={usuario} />} />
                        <Route path="mascota" element={<HijoMascota usuario={usuario} />} />
                        <Route path="logros" element={<LogrosTable usuario={usuario} />} />
                        <Route path="*" element={<WiseTimeHome usuario={usuario}/>} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    )
}
export default HijoApp