import React,{useState} from 'react';
import { Grid, Box, Container, Typography, Button, Stack, AppBar, Toolbar, TextField, FormControl, FormHelperText } from '@mui/material/';
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import fondoLoginTutor from '../../imagenes/fondoLoginTutor.png';
function Cuenta({ usuario }) {
    const userSchema = yup.object().shape({
        nombreTutor: yup.string().required("Campo de nombre vacio"),
        apellidoTutor: yup.string().required("Campo de apellido vacio"),
        email: yup.string().email("No es un email valido").required("Campo de email vacio"),
        currentpassword:yup.string().max(20).min(8, 'Minimo 8 caracteres').matches(/[0-9]/, 'Al menos un número').required("Campo de contraseña vacio"),
        newpassword: yup.string().max(20).min(8, 'Minimo 8 caracteres').matches(/[0-9]/, 'Al menos un número').required("Campo de contraseña vacio"),
        newpassword2: yup.string().max(20).min(8, 'Minimo 8 caracteres').matches(/[0-9]/, 'Al menos un número').required("Campo de contraseña vacio"),
    });
    const {register,handleSubmit,reset,formState: { errors },} = useForm({resolver: yupResolver(userSchema),});
    const formHandleSubmit = (data) => {
        console.log(data);
    }
    return (
        <>
            <Box
                    class="fondoLogin"
                    style={{
                        backgroundImage: `url(${fondoLoginTutor})`,
                        backgroundSize: "cover",
                        height: "100vh"
                    }}>

                    <Grid container direction="column">
                        <Stack justifyContent={"center"} alignItems="center" marginTop={8}>
                            <Box border={2} borderRadius={5} color="#7560AB" sx={{ backgroundColor: 'White', minHeight: '200px', minWidth: '600px' }}>
                                <Stack justifyContent={"center"} alignItems="center" margin={6}>
                                    <Typography component="h5" variant="h6" color="#7560AB">
                                        Registra tus datos para iniciar tu sesión
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={handleSubmit(formHandleSubmit)} >
                                        <Stack justifyContent={"center"} alignItems="center" marginTop={2}>
                                            <FormControl>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label=" Correo electrónico "
                                                    name="email"
                                                    autoComplete="email"
                                                    autoFocus
                                                    color="secondary"
                                                    sx={{width:"300px"}}
                                                    error={!!errors["email"]}
                                                    {...register("email")}
                                                />
                                                <FormHelperText sx={{ color: 'red' }}>{errors["email"] ? errors["email"].message : ""}</FormHelperText>
                                            </FormControl>

                                            <FormControl>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label=" Contraseña "
                                                    type="password"
                                                    id="password"
                                                    autoComplete="current-password"
                                                    color="secondary"
                                                    sx={{width:"300px"}}
                                                    error={!!errors["password"]}
                                                    {...register("password")}
                                                />
                                                <FormHelperText sx={{ color: 'red' }} >{errors["password"] ? errors["password"].message : ""}</FormHelperText>
                                            </FormControl>
                                        </Stack>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            color="secondary"
                                            variant="contained"
                                            sx={{ backgroundColor: '#7560AB', mt: 3, mb: 2 }}
                                        >
                                            Iniciar sesión
                                        </Button>
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>


                    </Grid>
                </Box>
           
        </>
    )
}

export default Cuenta