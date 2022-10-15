import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button, Stack, TextField, FormControl, FormHelperText, Paper, } from '@mui/material/';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as yup from "yup";
import fondoHomo from '../../../imagenes/fondoHomo.svg';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { crearUsuarioHijo } from '../../../servicios/AuthenticacionServicio';
export default function RegistroHijos({usuario}) {
    const theme = createTheme({
        typography: {
            fontFamily: ["Nunito", "sans-serif"].join(","),
        },
    });
    const userSchema = yup.object().shape({
        nombreHijo: yup.string().required("Campo de nombre vacio"),
        apellidoHijo: yup.string().required("Campo de apellido vacio"),
        edad: yup.string().required("Campo de edad vacio"),
        username: yup.string().required("Campo de nombre de usuario vacio"),
        password: yup.string().max(20).min(8, 'Minimo 8 caracteres').matches(/[0-9]/, 'Al menos un número').required("Campo de contraseña vacio"),
    });
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({ resolver: yupResolver(userSchema), });
    const formHandleSubmit = (data) => {
        console.log(data);
        const coleccion = {
            nombre: data.nombreHijo,
            apellido: data.apellidoHijo,
            "es_hijo": true,
            "es_tutor": false,
            username: data.username,
            password: data.password,
        };
        console.log(coleccion);
        crearUsuarioHijo(coleccion,usuario.id,data.edad).then(response => {
            console.log("entra");
            const inicioSesion = async () => {
                const err = await crearToken(coleccion.username, coleccion.password, false);
                console.log(err);
            }
            inicioSesion();
        });
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
                        }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>

                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registro Niño
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit(formHandleSubmit)} sx={{ mt: 1 }}>
                            <Stack direction="column" justifyContent={"left"} alignItems="left" marginTop={2}>
                                <Typography component="h5" variant="subtitle1" color="primary">
                                    Datos Personales*
                                </Typography>
                                <FormControl>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="nombreHijo"
                                        label="Nombre"
                                        name="nombreHijo"
                                        autoComplete="nombreHijo"
                                        autoFocus
                                        sx={{ width: "500px" }}
                                        error={!!errors["nombreHijo"]}
                                        {...register("nombreHijo")}
                                    />
                                    <FormHelperText sx={{ color: 'red' }}>{errors["nombreHijo"] ? errors["nombreHijo"].message : ""}</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="apellidoHijo"
                                        label="Apellido"
                                        name="apellidoHijo"
                                        autoComplete="apellidoHijo"
                                        autoFocus
                                        sx={{ width: "500px" }}
                                        error={!!errors["apellidoHijo"]}
                                        {...register("apellidoHijo")}
                                    />
                                    <FormHelperText sx={{ color: 'red' }}>{errors["apellidoHijo"] ? errors["apellidoHijo"].message : ""}</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        type="number"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="edad"
                                        label="Edad"
                                        name="edad"
                                        autoComplete="edad"
                                        autoFocus
                                        sx={{ width: "500px" }}
                                        error={!!errors["edad"]}
                                        {...register("edad")}
                                    />
                                    <FormHelperText sx={{ color: 'red' }}>{errors["edad"] ? errors["edad"].message : ""}</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Nombre de Usuario"
                                        name="username"
                                        autoComplete="username"
                                        autoFocus
                                        sx={{ width: "500px" }}
                                        error={!!errors["username"]}
                                        {...register("username")}
                                    />
                                    <FormHelperText sx={{ color: 'red' }}>{errors["username"] ? errors["username"].message : ""}</FormHelperText>
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
                                        sx={{ width: "500px" }}
                                        error={!!errors["password"]}
                                        {...register("password")}
                                    />
                                    <FormHelperText sx={{ color: 'red' }}>{errors["password"] ? errors["password"].message : ""}</FormHelperText>
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}>
                                    Registrate aquí
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>


    )
}