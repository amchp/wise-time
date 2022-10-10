import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import fondoHomo from '../../imagenes/fondoHomo.svg';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const theme = createTheme();
export default function Formulario() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          nombreTutor: data.get('nombreTutor'),
          email: data.get('email'),
          password: data.get('password'),
          nombreHijo: data.get('nombreHijo'),
          edadHijo: data.get('edadHijo'),
        });
      };
    return (
        <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={3}
          md={7}
          sx={{
            backgroundImage: `url(${fondoHomo})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              
            </Avatar>
            <Typography component="h1" variant="h5">
             Registro
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="nombreTutor"
                label="Nombre"
                name="nombreTutor"
                autoComplete="nombreTutor"
                autoFocus
                color="secondary"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                color="secondary"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                color="secondary"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="nombreHijo"
                label="Nombre Niño"
                name="nombreHijo"
                autoComplete="nombreHijo"
                autoFocus
                color="secondary"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="edadHijo"
                label="edad"
                name="edadHijo"
                autoComplete="edadHijo"
                autoFocus
                color="secondary"
              />
              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrate aquí
              </Button>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    )
}

