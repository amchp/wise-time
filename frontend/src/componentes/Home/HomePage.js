import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Formulario from './Formulario';
import WiseTimeHome from './WiseTimeHome'



export default function HomePage() {
  return (
    <div>

        <BrowserRouter>
                <Routes>
                <Route path="" element={<WiseTimeHome/>}/>
                    <Route path="registro" element={<Formulario/>}/>
                </Routes>
            </BrowserRouter>
    </div>
  )
}
