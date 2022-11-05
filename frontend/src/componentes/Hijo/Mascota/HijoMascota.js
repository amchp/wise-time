import React, {useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import MascotaNivel from './MascotaNivel';
import fondoMascota from '../../../imagenes/fondoMascota.png';
import Fab from '@mui/material/Fab';
import { Link } from "react-router-dom";
import { conseguirHijo } from '../../../servicios/HijoServicio'
import { Box,  Typography } from '@mui/material/';
import fase1Mascota from '../../../imagenes/fase1Mascota.gif';
import fase2Mascota from '../../../imagenes/fase2Mascota.gif';
import fase3Mascota from '../../../imagenes/fase3Mascota.gif';
import fase4Mascota from '../../../imagenes/fase4Mascota.gif';

const HijoMascota= ({usuario}) => {
  const [nivel, setNivel] = useState(1);
  const [porcentaje, setPorcentaje] = useState(0);
  const [nivel1, setNivel1 ] = useState(0)
  const [nivel2, setNivel2 ] = useState(0)
  const [nivel3, setNivel3 ] = useState(0)
  const [nivel4, setNivel4 ] = useState(0)

  
  const imagenes = [fase1Mascota, fase2Mascota, fase3Mascota, fase4Mascota];
  const proporcionesDeImagen = [[250, 290], [250, 290], [300, 300],[300,300]];
  const proporcionesDeImagen1 = [[25, 30], [25, 30], [30, 30],[30,30]];
  useEffect(() => {
    const conseguirPuntosHijo = async () => {
      const hijo = await conseguirHijo(usuario.id);
      setNivel(Math.floor(hijo.puntos / 100) + 1);
      setPorcentaje(hijo.puntos % 100);
      if (nivel === 2) {
        setNivel2(2)
        
      } else if (nivel === 3) {
        setNivel3(3)
      } else if (nivel === 4) {
        setNivel4(4)
      } else {
        setNivel1(1)
        
      }
      
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
      <Stack direction="row" justifyContent={"flex_start"} alignItems="center" paddingLeft={10}  >
      <Link to="/actividades">
      <Fab color="error" aria-label="add" height="90"
          width="90" >
      <img width="50" height="50"src={require('../../../imagenes/volver.png')} alt="icono volver"/>
      </Fab>
      </Link>
      
    </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop={8}
        marginLeft={35}
      >

        <img
          width={proporcionesDeImagen[Math.min(nivel, 4) - 1][0]} height={proporcionesDeImagen[Math.min(nivel, 4) - 1][1]}
          src={imagenes[Math.min(nivel, 4) - 1]}
          alt='Foto fase 1'

        />
      <Box border={3} borderRadius={2} marginLeft={20} color="#B4B1B1" sx={{ backgroundColor: 'White', maxWidth: '400px', maxHeight: '400px' }}>

<Stack direction="column" justifyContent="center" alignItems="center" margin={1}>
<Typography variant="subtitle2" color="#545454" >Estado Mascota</Typography>
<Stack direction="row"  marginTop={1} spacing={1}>
  <Typography variant="subtitle2" color="error">Nivel 1 -----</Typography>
  <img
          width={proporcionesDeImagen1[Math.min(nivel, 4) - 1][0]} height={proporcionesDeImagen1[Math.min(nivel, 4) - 1][1]}
          src={imagenes[Math.min(nivel1, 4) - 1]}
          alt='Foto fase 1'

        />
        
  </Stack>
  <Stack direction="row"  marginTop={1} spacing={1}>
  <Typography variant="subtitle2" color="error">Nivel 2 -----</Typography>
 
    <img
          width={proporcionesDeImagen1[Math.min(nivel, 4) - 1][0]} height={proporcionesDeImagen1[Math.min(nivel, 4) - 1][1]}
          src={imagenes[Math.min(nivel2, 4) - 1]}
          alt='Foto fase 1'

        />
        
  </Stack>
  <Stack direction="row"  marginTop={1} spacing={1}>
  <Typography variant="subtitle2" color="error">Nivel 3 -----</Typography>
  
    <img
          width={proporcionesDeImagen1[Math.min(nivel, 4) - 1][0]} height={proporcionesDeImagen1[Math.min(nivel, 4) - 1][1]}
          src={imagenes[Math.min(nivel3, 4) - 1]}
          alt='Foto fase 1'

        />
        
  </Stack>
  <Stack direction="row"  marginTop={1} spacing={1}>
  <Typography variant="subtitle2" color="error">Nivel 4 -----</Typography>
  <img
          width={proporcionesDeImagen1[Math.min(nivel, 4) - 1][0]} height={proporcionesDeImagen1[Math.min(nivel, 4) - 1][1]}
          src={imagenes[Math.min(nivel4, 4) - 1]}
          alt='Foto fase 1'

        />
       
  </Stack>
  </Stack>
</Box>
      </Stack>


    </Box>


  )
}

export default HijoMascota