import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, Paper, Box, AppBar, Container, Toolbar, Typography } from '@mui/material/';
import LogrosTableRow from './LogrosTableRow';
import { ImHappy } from "react-icons/im";
import fondoLogros from '../../../imagenes/fondoLogros.svg';
import { Link } from "react-router-dom";
import Fab from '@mui/material/Fab';
import { conseguirHijo } from '../../../servicios/HijoServicio';


const LogrosTable = ({ usuario }) => {
    const [tablaDeLogros, setTablaDeLogros] = useState([]);
    const [reload, setReload] = useState(false);
    const [numLogros, setNumLogros] = useState(0);
    useEffect(() => {
        const obtenerTabla = async () => {
            const respuesta = await conseguirHijo(usuario.id);
            console.log(respuesta);
            setTablaDeLogros(respuesta.logros__descripcion);


        }
        obtenerTabla();
    }, []);
    useEffect(() => {
        if (tablaDeLogros.length > 0) {
            const nlogro = tablaDeLogros.length;

            console.log(nlogro);
            setNumLogros(nlogro);


        }

    }, [tablaDeLogros]);
    return (
        <Box>

            <AppBar position="static" style={{
                backgroundColor: "White"
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters  >
                        <img

                            src={require('../../../imagenes/logoWiseTime2.png')}
                            width="130" height="35"
                            alt='Logo' />
                    </Toolbar>
                </Container>
            </AppBar>
            <Box
                class="fondoLogros"
                style={{
                    backgroundImage: `url(${fondoLogros})`,
                    backgroundSize: "cover",
                    height: "100vh",
                }}>



                <Grid container direction="column">

                    <Stack direction="row" alignItems="center" justifyContent="space-between" width="80%" marginTop={10} marginLeft={10}>
                        <Link to="/actividades">
                            <Fab color="warning" sx={{ backgroundColor: '#FFB800' }} aria-label="add" height="90"
                                width="90" >
                                <img width="50" height="50" src={require('../../../imagenes/volver.png')} alt="icono volver" />
                            </Fab>
                        </Link>
                        <Box border={2}   borderRadius={2} color="#FFB800" sx={{ backgroundColor: 'White', maxWidth: '400px', maxHeight: '600px' }}>

                            <Stack direction="column" justifyContent="center" alignItems="center" margin={1}>

                                <Typography color="#545454" sx={{ fontSize: '16'}}><ImHappy/><spam>  </spam>Felicitaciones haz conseguido:</Typography>
                                <Stack direction="row" marginTop={1} spacing={1}>
                                    
                                    <Box display="flex" alignItems="center" justifyContent="center" borderRadius={100} color="White" sx={{ backgroundColor: '#FFB800', minHeight: '5px', minWidth: '20px', padding: '2px' }}> {numLogros}</Box>
                                    <Typography color="Orange" sx={{ fontSize: '6'}}>Logros</Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                    <Grid container direction="column" alignItems="center">


                        <Stack marginTop={4} justifyContent={"center"} alignItems="center" sx={{ maxWidth: 650, border: "4px solid #6DCBC4", borderRadius: 2 }} flex={1}>
                            <TableContainer component={Paper} >
                                <Table aria-label="simple table" >

                                    <TableHead>
                                        <TableRow>

                                            <TableCell align="center">
                                                <Box marginLeft={5} justifyContent={"center"} alignItems="center"
                                                    borderRadius={20} sx={{ backgroundColor: '#6DCBC4', maxHeight: '60px', maxWidth: '300px' }}>
                                                    <Typography variant="h4" color="White" margin={1}>Logros</Typography>
                                                </Box></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>

                                        {tablaDeLogros.length === 0 ? (
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                </TableCell>
                                                <TableCell align="right" colSpan="3">Aun no haz completado ningun logro</TableCell>
                                            </TableRow >
                                        ) : (tablaDeLogros.map((logro) => <LogrosTableRow usuario={usuario} logro={logro} setReload={setReload} />)
                                        )}

                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Box>



    )


}

export default LogrosTable;