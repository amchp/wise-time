import React, { useEffect, useState } from 'react';
import { MdNotificationsActive } from "react-icons/md";
import { ImNotification } from "react-icons/im";
import { IconButton, Typography, Divider, Tooltip, amber, Box, Avatar, Menu, MenuItem, ListItemIcon, Button } from '@mui/material';
import { conseguirNotificaciones } from '../../../servicios/ServicioGeneral';


export default function Notificaciones({ usuario, setNumeroNotificaciones }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificaciones, setNotificaciones] = useState([]);
  const open = Boolean(anchorEl);
  useEffect(() => { ///calcular total de cantidades
    const cantidades = () => {
      setNumeroNotificaciones(notificaciones.length)
    }
    cantidades();
  }, [notificaciones]);
  
  const traerNotificaciones = async (filtro) => {
    const respuesta = await conseguirNotificaciones(filtro);
    console.log(respuesta);
    setNotificaciones(respuesta);
  }
  const handleClick = (event) => {

    setAnchorEl(event.currentTarget);

    traerNotificaciones({ "usuario": usuario.id.toString(),"leido":false,"leer":true});
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  ///
  useEffect(()=>{
    traerNotificaciones({ "usuario": usuario.id.toString(),"leido":false});
  },[anchorEl]);


  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        {
          usuario.es_tutor ?
            <Tooltip title="Notificaciones">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 50, height: 50, bgcolor: "#FCA600" }}><MdNotificationsActive /></Avatar>
              </IconButton>
            </Tooltip> :
            <IconButton

              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            ><Button variant="contained" color="warning" sx={{ backgroundColor: '#FCA600' }} >
                <img width="60" height="63" src={require('../../../imagenes/campana.png')} alt="icono trofeo" />
              </Button>
            </IconButton>
        }


      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {notificaciones.map((notificacion) => (<div><MenuItem key={notificaciones.indexOf(notificacion)}><ListItemIcon><ImNotification /></ListItemIcon>{notificacion.descripcion}</MenuItem><Divider /></div>))}
      </Menu>
    </>
  )
}

