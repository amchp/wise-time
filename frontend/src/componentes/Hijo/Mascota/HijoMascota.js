import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MascotaNivel from './MascotaNivel';
import fondoMascota from '../../../imagenes/fondoMascota.png';
import Fab from '@mui/material/Fab';


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
      <Stack direction="row" justifyContent={"flex_start"} alignItems="center" paddingLeft={15}  >
      <Fab color="error" aria-label="add" height="70"
          width="70" >
      <h1>A</h1>
      </Fab>
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