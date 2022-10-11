import React, { useEffect, useState } from 'react'
import { Grid, Box, Container, Typography, Button, Stack, TextField, FormControl, FormHelperText ,Paper} from '@mui/material/';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import fondoHomo from '../../imagenes/fondoHomo.svg';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { crearUsuarioTutor,crearUsuarioBase,crearToken} from '../../servicios/AuthenticacionServicio';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const initialForm = {
    "nombre": "",
    "apellido": "",
    "es_hijo": false,
    "es_tutor": true,
    "username": "",
    "password": ""
}
export default function RegistroTutor() {
    const [formulario, setFormulario] = useState(initialForm);
    const [valido, setValido] = useState(false);
    const [user,setUser]=useState({});
    const theme = createTheme({
        typography: {
            fontFamily: ["Nunito", "sans-serif"].join(","),
        },
    });
    const userSchema = yup.object().shape({
        nombreTutor:yup.string().required("Campo de nombre vacio"),
        apellidoTutor:yup.string().required("Campo de apellido vacio"),
        email: yup.string().email("No es un email valido").required("Campo de email vacio"),
        password: yup.string().max(20).required("Campo de contraseña vacio"),
    });
    const {register,handleSubmit,reset,formState: { errors },} = useForm({resolver: yupResolver(userSchema),});
    const handleSubmitForm = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const coleccion = {
            nombre: data.get('nombreTutor'),
            apellido: data.get('apellidoTutor'),
            "es_hijo": false,
            "es_tutor": true,
            username: data.get('email'),
            password: data.get('password'),
        };
        crearUsuarioTutor(coleccion).then(response=>{crearToken(coleccion.username,coleccion.password)});
        

    };
   
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={3}
                    md={7}
                    sx={{
                        backgroundImage: `url(${fondoHomo})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registro
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Typography component="h5" variant="subtitle1" color="secondary">
                                Datos Personales*
                            </Typography>
                            <FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="nombreTutor"
                                label="Nombre"
                                name="nombreTutor"
                                autoComplete="nombreTutor"
                                autoFocus
                                color="secondary"
                            />
                            </FormControl>
                            <FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="apellidoTutor"
                                label="Apellido"
                                name="apellidoTutor"
                                autoComplete="apellidoTutor"
                                autoFocus
                                color="secondary"
                            />
                            </FormControl>
                            <FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Correo electrónico"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                color="secondary"
                            />
                            </FormControl>
                            <FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                color="secondary"
                            />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                color="secondary"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Siguiente
                            </Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

