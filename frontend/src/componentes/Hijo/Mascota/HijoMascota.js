import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MascotaNivel from './MascotaNivel';
import fondoMascota from '../../../imagenes/fondoMascota.png';
import Fab from '@mui/material/Fab';
import { Link } from "react-router-dom";

const HijoMascota= ({usuario}) => {
  return (
    
    <Box
      class="fondo5"
      style={{
        backgroundImage: `url(${fondoMascota})`,
        backgroundSize: "cover",
        height: "100vh",
      }}>

      <MascotaNivel  usuario={usuario}/>
      <Stack direction="row" justifyContent={"flex_start"} alignItems="center" paddingLeft={20}  >
      <Link to="/actividades">
      <Fab color="error" aria-label="add" height="90"
          width="90" >
      <img width="50" height="50"src={require('../../../imagenes/volver.png')} alt="icono volver"/>
      </Fab>
      </Link>
    </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        marginTop={8}
      >

        <img
          width="250" height="290"
          src={require('../../../imagenes/fase1Mascota.gif')}
          alt='Foto fase 1'

        />
      </Stack>


    </Box>


  )
}

export default HijoMascota