import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const SugerenciaTableRow = ({ el, historiaActividad, reload, setReload }) => {
  const theme = createTheme({
    typography: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
    },
});
  return (
    <ThemeProvider theme={theme}>
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
    >
      <TableCell component="th" scope="row">{el.nombre}</TableCell>
      <TableCell align="right">{el.descripcion}</TableCell>
    </TableRow>
    </ThemeProvider>
  )
}

export default SugerenciaTableRow