import React from 'react'
import CrudForm from './componentes/CrudForm'; 
import CrudApp from './componentes/CrudApp'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ActivityInfo from './componentes/ActivityInfo';
import HijoApp from './componentesHijo/HijoApp';


function App() {
  return (
    <div className="App">
      <h1>WiseTime</h1>
      <BrowserRouter>
          <Routes>
              <Route path="actividades" element={<CrudApp />}/>
              <Route path="actividades/crear" element={<CrudForm />}/>
              <Route path="actividades/:id/editar" element={<CrudForm />}/>
              <Route path="actividades/:id" element={<ActivityInfo />}/>
              <Route path="actividades_hijo" element={<HijoApp/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
