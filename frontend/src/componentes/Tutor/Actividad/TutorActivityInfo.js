import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography, TextField, Button, Container } from '@mui/material';
import { conseguirActividad } from '../../../servicios/ActividadServicio';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    const theme = createTheme({
        typography: {
            fontFamily: ["Nunito", "sans-serif"].join(","),
        },
    });
    return (
        <Box >
        <ThemeProvider theme={theme}>
            <Container fixed sx={{ borderRadius: '5%', border: '1px dashed blue', p: 10 }}>
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={6}>
                        <Typography variant="h3" gutterBottom>
                            Información de actividad
                        </Typography>
                    </Grid>
                </Grid>


                <Grid container rowSpacing={2}>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Nombre
                        </Typography>
                        <TextField
                            fullWidth
                            id="name"
                            value={actividad.nombre}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Descripción
                        </Typography>
                        <TextField
                            fullWidth
                            id="description"
                            value={actividad.descripcion}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Grid container direction="row" spacing={2}>
                    {}
                    </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={10} rowSpacing={3}>
                    <Grid item xs={2} >
                        <Typography variant="h6" gutterBottom>
                            Hora
                        </Typography>
                        <TextField
                            id="hora"
                            value={actividad.hora}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" component="label">
                            Atrás

                        </Button>
                    </Grid>
                </Grid>



            </Container>
            </ThemeProvider>
        </Box >
        
    )
}
export default TutorActivityInfo;