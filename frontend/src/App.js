import React, { useState, useEffect } from 'react';
import { conseguirUsurioLogeado } from './servicios/AuthenticacionServicio';
import CircularProgress from '@mui/material/CircularProgress';
import TutorApp from './componentes/Tutor/TutorApp'; 
import HijoApp from './componentes/Hijo/HijoApp';
import HomePage from './componentes/Home/HomePage';

function App() {
  const [usuario, setUsuario] = useState({es_hijo: false, es_tutor: false});

  useEffect(()=> {
    const conseguirUsuario = async () => {
      const data = await conseguirUsurioLogeado();
      setUsuario(data);
    };
    conseguirUsuario();
  }, []);
  
  if(usuario.es_hijo){
    return (<HijoApp usuario={usuario}/>)
  }else if(usuario.es_tutor){
    return (<TutorApp data={usuario}/>);
  }else{
    if(localStorage.getItem('tokenKey')){
      <CircularProgress />
    }else{
      return (<HomePage usuario={usuario}/>);
    }
  }
}

export default App;
