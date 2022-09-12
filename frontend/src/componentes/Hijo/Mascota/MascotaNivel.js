import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export const MascotaNivel = ({usuario, nivel, porcentaje}) =>{
return(
<Box>
  <LinearWithValueLabel usuario={usuario} nivel={nivel} porcentaje={porcentaje}/>
</Box>
  )
}
function LinearProgressWithLabel({nivel, porcentaje}) {

  return (
    <Box >
      <Stack direction="row" justifyContent={"flex-end"} alignItems="center" spacing={3} paddingRight={8} paddingTop={7}  >
        
        <Box sx={{ width: '400px',height:'9px'}} border={4} borderRadius={20} >
          <LinearProgress variant="determinate" sx={{ height:'9px'}}  value={porcentaje} color="error"  />
        </Box>
        <Box sx={{ minWidth: 35  }}>
          <Typography variant="h6" color="Black">{`${Math.round(
            porcentaje,
          )}%`}</Typography>
        </Box>
      </Stack>
      <Box paddingTop={5} ><Typography variant="h4" color="Black" align="center" >Nivel {nivel}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel({usuario, nivel, porcentaje}) {

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel porcentaje={porcentaje} nivel={nivel} />
    </Box>
  );
}