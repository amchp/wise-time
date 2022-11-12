import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography, TextField, Button, Container, Stack, AppBar,Toolbar} from '@mui/material';
import { conseguirActividad } from '../../../servicios/ActividadServicio';
import { Link } from "react-router-dom";
import fondoLoginTutor from '../../../imagenes/fondoLoginTutor.png';


const TutorActivityInfo = () => {
    const [actividad, setActividad] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const conseguirDatos = async () => {
            const data = await conseguirActividad(id);
            setActividad(data);
        };
        conseguirDatos();
    }, [])

    return (
        <Box>
            <AppBar position="static"  style={{
                backgroundColor: "White"
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters  >
                        <Stack direction="row" alignItems="center"  justifyContent="space-between" width="100%">
                            <img
                            src={require('../../../imagenes/logoWiseTime2.png')}
                            width="130" height="35"
                            alt='Logo' />
                            <Link to='/actividades'>
                            <Button  variant="contained" sx={{ backgroundColor: '#64C6FF', maxWidth: '300px' }} >volver</Button>
                            </Link>
                        </Stack>
                    </Toolbar>
                    
                </Container>
        </AppBar>
        <Box
        class="fondoLoginTutor"
        style={{
          backgroundImage: `url(${fondoLoginTutor})`,
          backgroundSize: "cover",

          height: "100vh",

        }}>  

            
                <Grid container direction="column" alignItems="center">
                <Box border={2} marginTop={5} borderRadius={5} color="#7560AB" sx={{ backgroundColor: 'White'}}>
                <Stack justifyContent={"center"} padding={3} alignItems="center" sx={{maxHeight: '1000px', maxWidth: '900px' }}>   
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom>
                            Información de actividad
                        </Typography>
                    </Grid>
                    
                


                <Grid container rowSpacing={2}>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom>
                            Nombre
                        </Typography>
                        <TextField
                            fullWidth
                            id="name"
                            value={actividad.nombre}
                            color="secondary"
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{width:"500px"}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom>
                            Descripción
                        </Typography>
                        <TextField
                            fullWidth
                            id="description"
                            value={actividad.descripcion}
                            color="secondary"
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{width:"500px"}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={2}>
                            { }
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={10} rowSpacing={3}>
                    <Grid item xs={2} >
                        <Typography variant="subtitle2" gutterBottom>
                            Hora
                        </Typography>
                        <TextField
                            id="hora"
                            value={actividad.hora}
                            color="secondary"
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{width:"200px"}}
                        />
                    </Grid>
                    
                </Grid>
                </Stack>
                </Box>
                </Grid>



            
        
        </Box>
        </Box>

    )
}
export default TutorActivityInfo;