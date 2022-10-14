import React from 'react';
import { Grid, Box, Container, Typography,Button,Stack,AppBar,Toolbar} from '@mui/material/';
import { createTheme, ThemeProvider} from '@mui/material/';
import fondoLogin from '../../imagenes/fondoLogin.png';
import { Link } from "react-router-dom";
const LoginHome   = () => {
    const theme = createTheme({
        typography: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
        },
    });
    return (
    <Box>
    <ThemeProvider theme={theme}>
    
        <AppBar position="static"  style={{
                backgroundColor: "White"
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters  >
                        <Stack direction="row" alignItems="center"  justifyContent="space-between" width="100%">
                            <img
                            src={require('../../imagenes/logoWiseTime2.png')}
                            width="130" height="35"
                            alt='Logo' />
                            <Link to='/'>
                            <Button  variant="contained" sx={{ backgroundColor: '#64C6FF', maxWidth: '300px' }} >volver</Button>
                            </Link>
                        </Stack>
                    </Toolbar>
                    
                </Container>
        </AppBar>
        <Box
        class="fondoLogin"
        style={{
        backgroundImage: `url(${fondoLogin})`,
        backgroundSize: "cover",
        height: "100vh"}}>

        <Grid container direction="column">
            

        <Stack justifyContent={"center"} alignItems="center" marginTop={6}>
        <Box borderRadius={5} sx={{ backgroundColor: '#72D2CB', minHeight: '200px',minWidth: '550px'}}> 
        
        <Typography align="center" variant="h5" color="#306460" marginTop={8} >¡Bienvenido de vuelta! <br/>Escoge de que modo quieres ingresar</Typography>
        
        </Box> 
        </Stack>

        <Stack direction="row" justifyContent={"center"} alignItems="center" marginTop={6}>
        
        <Box borderRadius={5} alignItems="center" marginRight={6}  sx={{ backgroundColor: '#B49CF4', minHeight: '230px',minWidth: '340px'}}> 
        <Stack direction="column" justifyContent={"center"} alignItems="center" marginTop={4}>
        <img
        width="100" height="100"
        src={require('../../imagenes/iconoUser.png')}
        alt='FotoUser'/>
        <Link to='/logintutor'>
        <Button variant="contained" color="secondary"sx={{ backgroundColor: '#7560AB', maxWidth: '300px' }} >ingresa como tutor</Button>
        </Link>
        </Stack>
        </Box> 
        
        <Box borderRadius={5} sx={{ backgroundColor: '#FFD456', minHeight: '230px',minWidth: '340px'}}> 
        <Stack direction="column" justifyContent={"center"} alignItems="center" marginTop={4}>
        <img
        width="100" height="100"
        src={require('../../imagenes/caritaFeliz.png')}
        alt='FotoCaritaFeliz'/>
        <Link to='/loginhijo'>
        <Button variant="contained" color="warning"sx={{ backgroundColor: '#FCA600', maxWidth: '300px' }} >ingresa como niño</Button>
        </Link>
        </Stack>
        </Box> 

        </Stack>
        </Grid>
        </Box>
        </ThemeProvider>
        </Box>
    )}

    export default LoginHome    