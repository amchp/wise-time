import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistroTutor from './RegistroTutor';
import WiseTimeHome from './WiseTimeHome'
import LoginHome from './LoginHome'
import LoginTutor from './LoginTutor'
import LoginHijo from './LoginHijo';
import '../../App.css';
import { createTheme, ThemeProvider } from '@mui/material/';




export default function HomePage() {
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
                <Route path="/" element={<WiseTimeHome/>}/>
                    <Route path="registrotutor" element={<RegistroTutor/>}/>
                    <Route path="login" element={<LoginHome/>}/>
                    <Route path="logintutor" element={<LoginTutor/>}/>
                    <Route path="loginhijo" element={<LoginHijo/>}/>
                    <Route path="*" element={<WiseTimeHome/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </div>
  )
}
