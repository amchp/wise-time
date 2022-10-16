const axios = require('axios');

function conseguirConfiguracionDeAutenticacion() {
    return {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tokenKey')}`
        }
    }
}
export async function crearToken(user, password, login) {
    const datos = {
        "password": password,
        "username": user
    }
    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/auth/token/login', datos

        )
        localStorage.setItem('tokenKey', response.data.auth_token)
        if (login) {
            window.location.href = '/actividades';
        }
        else {
            window.location.href = '/registrohijos'
        }


    } catch (error) {
        return error
    }
}

export async function conseguirUsurioLogeado() {
    const config = conseguirConfiguracionDeAutenticacion();
    const response = await axios.get(
        'http://127.0.0.1:8000/auth/users/me/', config
    );
    return response.data;
}
export async function crearUsuarioBase(data) {
    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/auth/users/',
            data
        );
        return response.data
    } catch (error) {
        return error;
    }
}

export async function crearUsuarioTutor(data) {
    try {
        const usuario = await crearUsuarioBase(data);
        console.log(usuario);
        const info = {
            "usuario": usuario.id,
            "email": usuario.username,
        }
        console.log(info);
        const enviarTutor = async (datos) => {
            await axios.post(
                'http://127.0.0.1:8000/api/v1/tutor/',
                datos).then(respose => {
                    console.log("Tutor creado")
                })
        }
        enviarTutor(info);
        const inicioSesion = async () => {
            await crearToken(data.username, data.password, false);

        }
        inicioSesion();

        return usuario;
    } catch (error) {

        console.log(error);
        return error;
    }
}
export async function crearUsuarioHijo(data, tutorId, edad, refresh, finalizar) {
    try {
        const usuario = await crearUsuarioBase(data);
        const info = {
            "usuario": usuario.id,
            "tutor": tutorId,
            "puntos": 0,
            "edad": edad,
        }
        console.log(info);
        const enviarHijo = async (datos) => {
            await axios.post(
                'http://127.0.0.1:8000/api/v1/hijo/',
                datos).then(respose => {
                    console.log("Hijo creado");
                    if (refresh) {

                        alert("Registro de " + data.nombre + " completado");
                        window.location.reload();
                    } else if (finalizar) {
                        alert("Registro de " + data.nombre + " completado--->finalizar");
                        window.location.href = '/actividades';

                    }
                })
        }
        enviarHijo(info);

        return usuario;
    } catch (error) {
        return error;
    }
}
