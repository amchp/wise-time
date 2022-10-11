import React, { useEffect, useState } from 'react'
import { Grid, Box,Typography, Button, Stack, TextField, FormControl, FormHelperText, Paper,} from '@mui/material/';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as yup from "yup";
import fondoHomo from '../../../imagenes/fondoHomo.svg';
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function RegistroHijos() {
    const theme = createTheme({
        typography: {
            fontFamily: ["Nunito", "sans-serif"].join(","),
        },
    });
    const userSchema = yup.object().shape({
        nombreHijo: yup.string().required("Campo de nombre vacio"),
        apellidoHijo: yup.string().required("Campo de apellido vacio"),
        edad: yup.string().required("Campo de edad vacio"),
        nombreUsuario: yup.string().required("Campo de nombre de usuario vacio"),
        passwordHijo: yup.string().max(20).required("Campo de contraseña vacio"),
    });
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({ resolver: yupResolver(userSchema), });
    const formHandleSubmit = (data) => {
        console.log(data);
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
                        <Stack  direction="column" justifyContent={"left"} alignItems="left" marginTop={2}>
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
                                    sx={{width:"500px"}}
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
                                    sx={{width:"500px"}}
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
                                    sx={{width:"500px"}}
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
                                    id="nombreUsuario"
                                    label="Nombre de Usuario"
                                    name="nombreUsuario"
                                    autoComplete="nombreUsuario"
                                    autoFocus
                                    sx={{width:"500px"}}
                                    error={!!errors["nombreUsuario"]}
                                    {...register("nombreUsuario")}
                                />
                                <FormHelperText sx={{ color: 'red' }}>{errors["nombreUsuario"] ? errors["nombreUsuario"].message : ""}</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="passwordHijo"
                                    label="Contraseña"
                                    type="password"
                                    id="passwordHijo"
                                    autoComplete="current-password"
                                    sx={{width:"500px"}}
                                    error={!!errors["passwordHijo"]}
                                    {...register("passwordHijo")}
                                />
                                <FormHelperText sx={{ color: 'red' }}>{errors["passwordHijo"] ? errors["passwordHijo"].message : ""}</FormHelperText>
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