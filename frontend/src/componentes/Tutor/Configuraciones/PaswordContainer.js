import React from 'react';
import { Grid, Button, Box,FormControl,TextField,FormHelperText} from '@mui/material/';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { actualizarPassword } from '../../../servicios/AuthenticacionServicio';
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


const PaswordContainer = ({cambiarEstado }) => {
    const userSchema = yup.object().shape({
        currentpassword: yup.string().max(20).min(8, 'Minimo 8 caracteres').matches(/[0-9]/, 'Al menos un número').required("Campo de contraseña vacio"),
        newpassword: yup.string().max(20).min(8, 'Minimo 8 caracteres').matches(/[0-9]/, 'Al menos un número').required("Campo de contraseña vacio"),
        newpassword2: yup.string().oneOf([yup.ref('newpassword'), null], 'No concuerda con la contraseña anterior'),
    });
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(userSchema), });
    const formHandleSubmit = (data) => {
        actualizarPassword(data.currentpassword,data.newpassword,data.newpassword2);
    }
    return (
        <>
            <Grid container sx={{ ...style}} >
                <h2 >Actualiza tu contraseña</h2>
                <h3 id="child-modal-description">
                    Ingresa la contraseña actual y la nueva contraseña
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
                                    id="newpassword"
                                    label=" Contraseña Nueva"
                                    type="password"
                                    name="newpassword"
                                    autoComplete="newpassword"
                                    autoFocus
                                    color="secondary"
                                    error={!!errors["newpassword"]}
                                    {...register("newpassword")}
                                />
                                <FormHelperText sx={{ color: 'red' }}>{errors["newpassword"] ? errors["newpassword"].message : ""}</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="newpassword2"
                                    label="Repita la contraseña"
                                    type="password"
                                    name="password2"
                                    autoComplete="newpassword2"
                                    autoFocus
                                    color="secondary"
                                    error={!!errors["newpassword2"]}
                                    {...register("newpassword2")}
                                />
                                <FormHelperText sx={{ color: 'red' }}>{errors["newpassword2"] ? errors["newpassword2"].message : ""}</FormHelperText>
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

export default PaswordContainer