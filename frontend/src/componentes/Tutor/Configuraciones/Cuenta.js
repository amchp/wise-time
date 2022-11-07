import React, { useState } from 'react';
import { Input, InputLabel, InputAdornment, Grid, Modal, Box, Link, Typography, Button, Stack, Paper, TextField, FormControl, FormHelperText, Divider } from '@mui/material/';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { actualizarNombreYApellido } from '../../../servicios/AuthenticacionServicio';
import PaswordContainer from './PaswordContainer';

import { AiFillEdit } from "react-icons/ai";
import EmailContainer from './EmailContainer';
//import fondoLoginTutor from "../../../imagenes/fondoLoginTutor";
function Cuenta({ usuario }) {
    const [open, setOpen] = useState(false);
    const [openEmail, setOpenEmail] = useState(false);
    const userSchema = yup.object().shape({
        nombre: yup.string().required("Campo de nombre vacio"),
        apellido: yup.string().required("Campo de apellido vacio"),
    });
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(userSchema), });
    const formHandleSubmit = (data) => {
        console.log(data);
        actualizarNombreYApellido(data);
    }
    const editarEmail = () => {

    }
    return (
        <>
            <Box
                class="fondoLogin"
                style={{
                    //backgroundImage: `url(${fondoLoginTutor})`,
                    backgroundSize: "cover",
                    height: "100vh"
                }}>

                <Grid container direction="column">
                    <Stack justifyContent={"center"} alignItems="center" marginTop={8}>
                        <Grid item border={2} xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ backgroundColor: 'white' }}>
                            <Stack justifyContent={"center"} alignItems="center" margin={6}>
                                <Typography component="h5" variant="h6" color="#7560AB">
                                    Configuración
                                </Typography>
                                <Divider flexItem />

                                <Stack justifyContent={"left"} alignItems="center" marginTop={2}>
                                    <Grid container spacing={5} >

                                        <Grid container item xs={6} direction="column" >
                                            <Box component="form" noValidate onSubmit={handleSubmit(formHandleSubmit)} >
                                                <FormControl>
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="nombre"
                                                        label=" Nombre"
                                                        name="name"
                                                        defaultValue={usuario.nombre}
                                                        autoComplete="nombre"
                                                        autoFocus
                                                        color="secondary"
                                                        error={!!errors["nombre"]}
                                                        {...register("nombre")}
                                                    />
                                                    <FormHelperText sx={{ color: 'red' }}>{errors["nombre"] ? errors["nombre"].message : ""}</FormHelperText>
                                                </FormControl>
                                                <FormControl>
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="apellido"
                                                        label=" apellido"
                                                        name="apellido"
                                                        defaultValue={usuario.apellido}
                                                        autoComplete="apellido"
                                                        autoFocus
                                                        color="secondary"
                                                        error={!!errors["apellido"]}
                                                        {...register("apellido")}
                                                    />
                                                    <FormHelperText sx={{ color: 'red' }}>{errors["apellido"] ? errors["apellido"].message : ""}</FormHelperText>
                                                </FormControl>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    color="secondary"
                                                    variant="contained"
                                                    sx={{ backgroundColor: '#7560AB', mt: 3, mb: 2 }}
                                                >
                                                    Guardar Datos Básicos
                                                </Button>
                                            </Box>
                                        </Grid>
                                        <Grid container item xs={6} direction="column" >
                                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                                <InputLabel htmlFor="email">E-mail</InputLabel>
                                                <Input
                                                    id="email"
                                                    type="text"
                                                    value={usuario.username}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <Button onClick={() => { setOpenEmail(true) }}><AiFillEdit /></Button>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                            <Modal
                                                hideBackdrop
                                                open={openEmail}
                                                onClose={() => { setOpenEmail(false) }}
                                                aria-labelledby="child-modal-title"
                                                aria-describedby="child-modal-description"
                                            >
                                                <EmailContainer cambiarEstado={() => { setOpenEmail(false) }} />
                                            </Modal>
                                            <Button
                                                fullWidth
                                                color="secondary"
                                                variant="contained"
                                                sx={{ backgroundColor: '#7560AB', mt: 3, mb: 2 }}
                                                onClick={() => { setOpen(true) }}
                                            >
                                                Cambiar contraseña
                                            </Button>
                                            <Modal
                                                hideBackdrop
                                                open={open}
                                                onClose={() => { setOpen(false) }}
                                                aria-labelledby="child-modal-title"
                                                aria-describedby="child-modal-description"
                                            >
                                                <PaswordContainer cambiarEstado={() => { setOpen(false) }} />
                                            </Modal>
                                        </Grid>
                                    </Grid>
                                </Stack>


                            </Stack>
                        </Grid>
                    </Stack>


                </Grid>
            </Box>

        </>
    )
}

export default Cuenta