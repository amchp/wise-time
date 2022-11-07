import React from 'react';
import { Grid, Button, Box,FormControl,TextField,FormHelperText} from '@mui/material/';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { actualizarEmail } from '../../../servicios/AuthenticacionServicio';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


const EmailContainer = ({cambiarEstado }) => {
    const userSchema = yup.object().shape({
        currentpassword: yup.string().max(20).min(8, 'Minimo 8 caracteres').matches(/[0-9]/, 'Al menos un número').required("Campo de contraseña vacio"),
        email: yup.string().email("No es un email valido").required("Campo de email vacio"),
    });
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(userSchema), });
    const formHandleSubmit = (data) => {
        actualizarEmail(data.currentpassword,data.email);
    }
    return (
        <>
            <Grid container sx={{ ...style}} >
                <h2 >Actualiza tu correo electrónico</h2>
                <h3 id="child-modal-description">
                    Ingresa la contraseña actual y el nuevo correo.
                </h3>
                <Grid container spacing={5} >
                    <Grid container item xs={12} direction="column" >
                        <Box component="form" noValidate onSubmit={handleSubmit(formHandleSubmit)} >
                            <FormControl>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="currentpassword"
                                    label=" Contraseña actual"
                                    name="password"
                                    type="password"
                                    autoComplete="currentpassword"
                                    autoFocus
                                    color="secondary"
                                    error={!!errors["currentpassword"]}
                                    {...register("currentpassword")}
                                />
                                <FormHelperText sx={{ color: 'red' }}>{errors["currentpassword"] ? errors["currentpassword"].message : ""}</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label=" Email nuevo"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    color="secondary"
                                    error={!!errors["email"]}
                                    {...register("email")}
                                />
                                <FormHelperText sx={{ color: 'red' }}>{errors["email"] ? errors["email"].message : ""}</FormHelperText>
                            </FormControl>
                            <Grid item sx={2} >
                                <Button
                                    type="submit"
                                    fullWidth
                                    color="secondary"
                                    variant="contained"
                                    sx={{ backgroundColor: '#7560AB', mt: 3, mb: 2 }}>Actualizar</Button>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item sx={2}>
                    <Button onClick={cambiarEstado}>Cancelar</Button>
                </Grid>



            </Grid >
        </>)

}

export default EmailContainer