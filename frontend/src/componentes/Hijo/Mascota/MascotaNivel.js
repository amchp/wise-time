import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {conseguirHijo} from '../../../servicios/HijoServicio';

export const MascotaNivel = ({usuario}) =>{
return(
<Box>
  <LinearWithValueLabel usuario={usuario}/>
</Box>
  )
}
function LinearProgressWithLabel(props) {
  return (
    <Box >
      <Stack direction="row" justifyContent={"flex-end"} alignItems="center" spacing={3} paddingRight={8} paddingTop={7}  >
        
        <Box sx={{ width: '400px',}} border={2} borderRadius={50} >
          <LinearProgress variant="determinate"  {...props} color="error"  />
        </Box>
        <Box sx={{ minWidth: 35  }}>
          <Typography variant="h6" color="Black">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Stack>
      <Box paddingTop={5} ><Typography variant="h4" color="Black" align="center" >{`Nivel ${Math.round(
        props.value,
      )}`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({usuario}) {
  const [puntos, ponerPuntos] = useState(0);
  
  useEffect(() => {
    const conseguirPuntosHijo = async () => {
      const hijo = await conseguirHijo(usuario.id);
      ponerPuntos(hijo.puntos);
    }
    conseguirPuntosHijo();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={puntos} />
    </Box>
  );
}

