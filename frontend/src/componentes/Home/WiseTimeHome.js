import React from 'react';
import { Grid, Box, Container, Typography, Button, Stack, AppBar, Toolbar } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/';
import { Link, useNavigate } from "react-router-dom";
import fondoHome from '../../imagenes/fondoHome.png';
const Home = ({ usuario }) => {
    const navigate = useNavigate();
    const theme = createTheme({
        typography: {
            fontFamily: ["Nunito", "sans-serif"].join(","),
        },
    });
    const verificacionSesion = () => {
        if (typeof usuario === 'undefined') {
            navigate('/login');
        } else {

            navigate('/actividades/');
        }
    }
    return (
        <Box>
            <ThemeProvider theme={theme}>
                <AppBar position="static" style={{ backgroundColor: "White" }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters  >
                            <Stack direction="row" alignItems="center" justifyContent="right" width="100%">
                                <Typography marginRight={4} variant="subtitle1" color="#306460" >¿Ya tienes cuenta?</Typography>
                                <Button onClick={() => { verificacionSesion() }} variant="contained" color="warning" sx={{ backgroundColor: '#FCA600', maxWidth: '300px' }}>Inicia Sesión</Button>

                            </Stack>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Box
                    class="fondoLogin"
                    style={{
                        backgroundImage: `url(${fondoHome})`,
                        backgroundSize: "cover",
                        height: "100vh"
                    }}>
                    <Grid container direction="column" >
                        <Stack marginLeft={10} marginTop={5}>
                            <img
                                src={require('../../imagenes/logoWiseTime2.png')}
                                width="270" height="75"
                                alt='Logo'
                            />
                        </Stack>
                        <Stack justifyContent={"center"} alignItems="center" marginTop={5} >
                            <Box borderRadius={5} sx={{ backgroundColor: '#FFDF80', minHeight: '250px', minWidth: '1000px' }}>
                                <Stack justifyContent={"center"} alignItems="center">
                                    <Typography align="center" variant="h5" color="#534726" marginTop={7} marginBottom={3}>Aprovecha tu tiempo sabiamente <br /> Bienvenido a Wise Time, la app de gestión y monitoreo interactiva para niños  </Typography>
                                    <Link to='/registrotutor'>
                                        <Button variant="contained" color="secondary" sx={{ backgroundColor: '#9E7AFF', maxWidth: '300px' }} >Registrate aqui</Button>
                                    </Link>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>
                </Box>
            </ThemeProvider>
        </Box>
    )
}

export default Home