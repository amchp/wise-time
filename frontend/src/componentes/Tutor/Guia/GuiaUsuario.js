import React from 'react';
import { Grid, Box, Container, Typography,Button,Stack,AppBar,Toolbar} from '@mui/material/';
import fondoLogin from '../../../imagenes/fondoLogin.png';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
const GuiaUsuario  = () => {
    
    return (
    <Box>
        <Box
        class="fondoLogin"
        style={{
        backgroundImage: `url(${fondoLogin})`,
        backgroundSize: "cover",
        height: "100vh"}}>

        <Grid container direction="column">
            

        <Stack justifyContent={"center"} alignItems="center" marginTop={3}>
        <Box marginbottom={2} borderRadius={5} padding={2} sx={{ backgroundColor: '#72D2CB', maxHeight: '110px',maxWidth: '330px'}}> 
        
        <Typography align="center" sx={{ fontSize: '20px'}} color="#306460"  >¡Bienvenido! <br/>Comencemos nuestra aventura</Typography>
        
        </Box> 
        </Stack>

        <Stack direction="row" justifyContent={"center"} alignItems="center" margin={2} spacing={2}>
        
        <Box borderRadius={5} padding={1} border={3}  color="#72D2CB" sx={{ backgroundColor: 'White',minWidth: '200px',height: '215px'}}> 
        <Box display="flex" alignItems="center" justifyContent="center" borderRadius={100} color="White" sx={{ backgroundColor: '#FFB800', maxHeight: '20px', maxWidth: '20px', padding: '2px' , margin:'1px'}}> 1</Box>
        <Stack direction="column" justifyContent={"center"} alignItems="center" >
        <Typography align="center" sx={{ fontSize: '18px'}} color="#306460"> Primero lo que debes hacer es agregar una tarea</Typography>
        <img
        width="120" height="120"
        src={require('../../../imagenes/botonAgregarr.gif')}
        alt='FotoCaritaFeliz'/>
        </Stack>
        </Box> 
        <Box borderRadius={5} padding={2} border={3}  color="#72D2CB" sx={{ backgroundColor: 'White',minWidth: '200px',height: '200px'}}> 
        <Box display="flex" alignItems="center" justifyContent="center" borderRadius={100} color="White" sx={{ backgroundColor: '#FFB800', maxHeight: '20px', maxWidth: '20px', padding: '2px' , margin:'1px'}}> 2</Box>
        <Stack direction="column" justifyContent={"center"} alignItems="center" >
        <Typography align="center" sx={{ fontSize: '18px'}} color="#306460"> Selecciona a los niños que quieras agregar esa misma tarea</Typography>
        <img
        width="240" height="130"
        src={require('../../../imagenes/seleccionNiños.gif')}
        alt='FotoCaritaFeliz'/>
        </Stack>
        </Box> 
        <Box borderRadius={5} padding={2} border={3} color="#72D2CB" sx={{ backgroundColor: 'White', height: '200px',minWidth: '200px'}}> 
        <Box display="flex" alignItems="center" justifyContent="center" borderRadius={100} color="White" sx={{ backgroundColor: '#FFB800', maxHeight: '20px', maxWidth: '20px', padding: '2px' , margin:'1px'}}> 3</Box>
        <Stack direction="column" justifyContent={"center"} alignItems="center" >
        <Typography align="center" sx={{ fontSize: '18px'}} color="#306460"> llena el formulario y dale al botón guardar para registrar la tarea</Typography>
        <img
        width="200" height="120"
        src={require('../../../imagenes/botonGuardarr.gif')}
        alt='FotoCaritaFeliz'/>
        </Stack>
        </Box> 

        </Stack>
        <Stack direction="row" justifyContent={"center"} alignItems="center" spacing={2}>
        
        <Box borderRadius={5} padding={1} border={3}  color="#72D2CB" sx={{ backgroundColor: 'White',minWidth: '200px',height: '200px'}}> 
        <Box display="flex" alignItems="center" justifyContent="center" borderRadius={100} color="White" sx={{ backgroundColor: '#FFB800', maxHeight: '20px', maxWidth: '20px', padding: '2px' , margin:'1px'}}> 4</Box>
        <Stack direction="column" justifyContent={"center"} alignItems="center" >
        <Typography align="center" sx={{ fontSize: '18px'}} color="#306460"> Seleciona el niño y el dia de actividades que quieres visualizar</Typography>
        <img
        width="400" height="150"
        src={require('../../../imagenes/dropNiño.png')}
        alt='FotoCaritaFeliz'/>
        </Stack>
        </Box> 
        <Box borderRadius={5} padding={1} border={3}  color="#72D2CB" sx={{ backgroundColor: 'White',width: '500px',height: '200px'}}> 
        <Box display="flex" alignItems="center" justifyContent="center" borderRadius={100} color="White" sx={{ backgroundColor: '#FFB800', maxHeight: '20px', maxWidth: '20px', padding: '2px' , margin:'1px'}}> 4</Box>
        <Stack direction="column" justifyContent={"center"} alignItems="center" >
        <Typography align="center" sx={{ fontSize: '18px'}} color="#306460">Puedes visualizar la tabla y no olvides confirmar o denegar la actividad, dependiendo si el niño la realizó o no</Typography>
        <img
        width="400" height="120"
        src={require('../../../imagenes/tablaniños.png')}
        alt='FotoCaritaFeliz'/>
        </Stack>
        </Box> 

        </Stack>
        </Grid>
        </Box>
      
        </Box>
    )}

    export default GuiaUsuario  