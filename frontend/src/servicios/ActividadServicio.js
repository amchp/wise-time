const axios = require('axios');

export async function conseguirTodasActividades() {
    const response = await axios.get(
        'http://127.0.0.1:8000/api/v1/actividad/'
    );
    return response.data;
}

export async function conseguirActividad(id) {
    const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/actividad/${id}`
    );
    return response.data;
}

export async function crearActividad(data) {
    await axios.post(
        'http://127.0.0.1:8000/api/v1/actividad/',
        data
    );
}

export async function editarActividad(data) {
    await axios.patch(
        `http://127.0.0.1:8000/api/v1/actividad/${data.id}/`,
        data
    );
}

export async function borrarActividad(data) {
    await axios.delete(
        `http://127.0.0.1:8000/api/v1/actividad/${data.id}/`
    );
}