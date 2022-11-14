import React from 'react';
import { Grid, Box, Container, Typography,Button,Stack,AppBar,Toolbar} from '@mui/material/';
import fondoLogin from '../../../imagenes/fondoLogin.png';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
const GuiaFuncionalidades  = () => {
    
    return (
    <Box>
        <Box
        class="fondoLogin"
        style={{
        backgroundImage: `url(${fondoLogin})`,
        backgroundSize: "cover",
        height: "100vh"}}>

        <Grid container direction="column">
            

        <Stack direction="row" justifyContent={"center"} alignItems="center" marginTop={4} spacing={3}>
        <Box marginbottom={3} borderRadius={5} padding={3} sx={{ backgroundColor: '#72D2CB', maxHeight: '110px',maxWidth: '330px'}}> 
        
        <Typography align="center" sx={{ fontSize: '20px'}} color="#306460"> ¿Qué más puedes hacer?<br/></Typography>
        
        </Box> 
        <Link to='/actividades'>
                <Button variant="contained" sx={{ backgroundColor: '#64C6FF', maxWidth: '450px' }} >Terminar tutorial</Button>
        </Link>
        </Stack>

        <Stack direction="row" justifyContent={"center"} alignItems="center" margin={3} spacing={2}>
        <Box borderRadius={5} padding={1} border={3}  color="#72D2CB" sx={{ backgroundColor: 'White',minWidth: '200px',height: '180px'}}> 
        <Box display="flex" alignItems="center" justifyContent="center" borderRadius={100} color="White" sx={{ backgroundColor: '#FFB800', maxHeight: '20px', maxWidth: '20px', padding: '2px' , margin:'1px'}}> 1</Box>
        <Stack direction="column" justifyContent={"center"} alignItems="center" >
        <Typography align="center" sx={{ fontSize: '15px'}} color="#306460">El botón de monitoreo te mostrará una serie de gráficas que te permitará ver el progreso del niño</Typography>
        <img
        width="160" height="100"
        src={require('../../../imagenes/botonMonitoreo.png')}
        alt='FotoCaritaFeliz'/>
        </Stack>
        </Box> 

        <Box borderRadius={5} padding={1} border={3}  color="#72D2CB" sx={{ backgroundColor: 'White',minWidth: '200px',height: '180px'}}> 
        <Box display="flex" alignItems="center" justifyContent="center" borderRadius={100} color="White" sx={{ backgroundColor: '#FFB800', maxHeight: '20px', maxWidth: '20px', padding: '2px' , margin:'1px'}}> 2</Box>
        <Stack direction="column" justifyContent={"center"} alignItems="center" >
        <Typography align="center" sx={{ fontSize: '15px'}} color="#306460">El botón de sugerencias te aconsejara tareas segun la edad del niño</Typography>
        
        <img
        width="165" height="100"
        src={require('../../../imagenes/botonSugerencias.png')}
        alt='FotoCaritaFeliz'/>
        
        </Stack>
        </Box> 

        <Box borderRadius={5} padding={1} border={3}  color="#72D2CB" sx={{ backgroundColor: 'White',minWidth: '200px',height: '180px'}}> 
        <Box display="flex" alignItems="center" justifyContent="center" borderRadius={100} color="White" sx={{ backgroundColor: '#FFB800', maxHeight: '20px', maxWidth: '20px', padding: '2px' , margin:'1px'}}> 3</Box>
        <Stack direction="column" justifyContent={"center"} alignItems="center" >
        <Typography align="center" sx={{ fontSize: '15px'}} color="#306460">El botón de configuraciones te permitirá editar tu información de la cuenta</Typography>
        <Stack marginTop={3}>
        <img
        width="120" height="70"
        src={require('../../../imagenes/botonConfiguraciones.png')}
        alt='FotoCaritaFeliz'/>
        </Stack>
        </Stack>
        </Box> 

        

        </Stack>

        <Stack direction="row" justifyContent={"center"} alignItems="center" spacing={2}>
        <Box borderRadius={5} padding={1} border={3}  color="#72D2CB" sx={{ backgroundColor: 'White',width: '400px',height: '180px'}}> 
        <Box display="flex" alignItems="center" justifyContent="center" borderRadius={100} color="White" sx={{ backgroundColor: '#FFB800', maxHeight: '20px', maxWidth: '20px', padding: '2px' , margin:'1px'}}> 4</Box>
        <Stack direction="column" justifyContent={"center"} alignItems="center" >
        <Typography align="center" sx={{ fontSize: '15px'}} color="#306460">El botón de apagar te permitirá cerrar la sesión</Typography>
        <Stack marginTop={3}>
        <img
        width="120" height="70"
        src={require('../../../imagenes/botonApagar.png')}
        alt='FotoCaritaFeliz'/>
        </Stack>
        </Stack>
        </Box> 

        <Box borderRadius={5} padding={1} border={3}  color="#72D2CB" sx={{ backgroundColor: 'White',width: '450px',height: '180px'}}> 
        <Box display="flex" alignItems="center" justifyContent="center" borderRadius={100} color="White" sx={{ backgroundColor: '#FFB800', maxHeight: '20px', maxWidth: '20px', padding: '2px' , margin:'1px'}}> 5</Box>
        <Stack direction="column" justifyContent={"center"} alignItems="center" >
        <Typography align="center" sx={{ fontSize: '15px'}} color="#306460">El botón de notificaciones te permitirá visualizar los logros de tu niño y las actividades que han sido completadas</Typography>
        <Stack marginTop={3}>
        <img
        width="120" height="70"
        src={require('../../../imagenes/botonAlerta.png')}
        alt='FotoCaritaFeliz'/>
        </Stack>
        </Stack>
        </Box> 

        
        
          

        </Stack>
       
        </Grid>
        </Box>
      
        </Box>
    )}

    export default GuiaFuncionalidades  