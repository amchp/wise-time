import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registro from './Registro';
import WiseTimeHome from './WiseTimeHome'
import LoginHome from './LoginHome'
import LoginTutor from './LoginTutor'
import '../../App.css';



export default function HomePage() {
  return (
    <div>

        <BrowserRouter>
                <Routes>
                <Route path="" element={<WiseTimeHome/>}/>
                    <Route path="registro" element={<Registro/>}/>
                    <Route path="login" element={<LoginHome/>}/>
                    <Route path="logintutor" element={<LoginTutor/>}/>
                </Routes>
            </BrowserRouter>
    </div>
  )
}
