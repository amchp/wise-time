import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MascotaNivel from './MascotaNivel';
import fondoMascota from '../../../imagenes/fondoMascota.png';
import Fab from '@mui/material/Fab';
import { Link } from "react-router-dom";
import { conseguirHijo } from '../../../servicios/HijoServicio'
import fase1Mascota from '../../../imagenes/fase1Mascota.gif';
import fase2Mascota from '../../../imagenes/fase2Mascota.gif';
import fase3Mascota from '../../../imagenes/fase3Mascota.gif';
import fase4Mascota from '../../../imagenes/fase4Mascota.gif';

const HijoMascota= ({usuario}) => {
  const [nivel, setNivel] = useState(1);
  const [porcentaje, setPorcentaje] = useState(0);
  const imagenes = [fase1Mascota, fase2Mascota, fase3Mascota, fase4Mascota];
  const proporcionesDeImagen = [[250, 290], [250, 290], [300, 300],[300,300]];
  useEffect(() => {
    const conseguirPuntosHijo = async () => {
      const hijo = await conseguirHijo(usuario.id);
      setNivel(Math.floor(hijo.puntos / 100) + 1);
      setPorcentaje(hijo.puntos % 100);
    }
    conseguirPuntosHijo();
  }, [])
  return (

    <Box
      class="fondo5"
      style={{
        backgroundImage: `url(${fondoMascota})`,
        backgroundSize: "cover",
        height: "100vh",
      }}>

      <MascotaNivel  usuario={usuario} nivel={nivel} porcentaje={porcentaje}/>
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
          width={proporcionesDeImagen[Math.min(nivel, 4) - 1][0]} height={proporcionesDeImagen[Math.min(nivel, 4) - 1][1]}
          src={imagenes[Math.min(nivel, 4) - 1]}
          alt='Foto fase 1'

        />
      </Stack>


    </Box>


  )
}

export default HijoMascota