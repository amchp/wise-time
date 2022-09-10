import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, Paper, Box } from '@mui/material/';
import { conseguirActividadesParaTabla, conseguirHistoriasDeActividadesParaLosEstados} from '../../../servicios/TablaServicio';
import TutorActividadTableRow from './TutorActividadTableRow';
import fondoActividadTutor from '../../../imagenes/fondoActividadTutor.svg';


const TutorActividadTable = () => {
  const [tablaDeActividades, ponerTablaDeActividades] = useState([]);
  const [actividadesPorConfimar,ponerActividadesPorConfimar] = useState({});

  useEffect(() => {
    const conseguirDatosTabla = async () => {
      const actividades = await conseguirActividadesParaTabla(3);
      ponerTablaDeActividades(actividades);
      const confimarActividad = await conseguirHistoriasDeActividadesParaLosEstados(3);
      ponerActividadesPorConfimar(confimarActividad);
    }
    conseguirDatosTabla();
  }, []);
  return (
    <Box>
      <nav>
      <div>
      <img
          
          src={require('../../../imagenes/logoWiseTime.svg')}
          alt='logo'

        />         
      </div>
      </nav>
    <Box
      class="fondoActividadTutor"
      style={{
        backgroundImage: `url(${fondoActividadTutor})`,
        backgroundSize: "cover",
        height: "100vh",
      }}>

      
      <Stack marginLeft={8} sx={{ width: '150px',}}>
      <h3>Actividades Semanales</h3>
      <br/>
      <Button variant="contained" sx={{ backgroundColor: '#64C6FF' }} href="crear/">Agregar</Button>
      <br/>
      </Stack>
      <Grid container direction="column"  alignItems="center" paddingTop={3}>
      <Stack justifyContent={"center"} alignItems="center" sx={{ maxWidth: 1050, border: "3px solid #6DCBC4" }}  flex={1}>
        <TableContainer component={Paper} >
          <Table aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Nombre</b></TableCell>
                <TableCell align="center"><b>Hora</b></TableCell>
                <TableCell align="center"><b>Acciones</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tablaDeActividades.length === 0 ? (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                >
                  <TableCell component="th" scope="row">
                  </TableCell>
                  <TableCell align="right" colSpan="3">Sin Actividades Registradas</TableCell>
                </TableRow >
              ) : (tablaDeActividades.map((el) => <TutorActividadTableRow key={el.id} el={el} historiaActividad={actividadesPorConfimar[el.id]} />)
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      </Grid>
    </Box>
    </Box>
  )
}
export default TutorActividadTable