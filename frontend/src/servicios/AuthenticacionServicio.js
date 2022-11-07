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
export async function cerrarSesion() {
    const config = conseguirConfiguracionDeAutenticacion();
    const token=localStorage.getItem('tokenKey');
    try {
        await axios.post(
            'http://127.0.0.1:8000/auth/token/logout',token,config

        ).then(response => {
            localStorage.removeItem('tokenKey');
            window.location.href = '/';
        })


    } catch (error) {
        console.log(error);
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
//Actualizar datos de usuario---------
export async function actualizarNombreYApellido(datos) {
    const config = conseguirConfiguracionDeAutenticacion();
    try {
        await axios.put(
            'http://127.0.0.1:8000/auth/users/me/', datos, config
        );

    } catch (error) {
        console.log(error);
    }

}
export async function actualizarPassword(actual, nueva, repetida) {
    const datos = {
        "new_password": nueva,
        "re_new_password": repetida,
        "current_password": actual,
    };
    const config = conseguirConfiguracionDeAutenticacion();
    try {
        await axios.post(
            'http://127.0.0.1:8000/auth/users/set_password/', datos, config
        );
        alert("Contraseña actualizada correctamente, se direccionará a la página principal");
        cerrarSesion();


    } catch (error) {
        console.log(error);
    }

}
export async function actualizarEmail(actual, nuevoCorreo) {
    const datos = {
        "current_password": actual,
        "new_username": nuevoCorreo,
    };
    const config = conseguirConfiguracionDeAutenticacion();
    try {
        await axios.post(
            'http://127.0.0.1:8000/auth/users/set_username/', datos, config
        );
        alert("Correo actualizado correctamente, se direccionará a la página principal");
        cerrarSesion();


    } catch (error) {
        console.log(error);
    }

}