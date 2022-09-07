const axios = require('axios');

export async function conseguirTodasLasHistoriaDeLaActividades(filtros = {}) {
    const response = await axios.get(
        'http://127.0.0.1:8000/api/v1/historia_de_la_actividad/', filtros
    );
    return response.data;
}

export async function actualizarHistoriaDeLaActividad(data){
    await axios.patch(
        `http://127.0.0.1:8000/api/v1/historia_de_la_actividad/${data.id}/`,
        data
    );
}

export async function crearHistoriaDeLaActividad(data){
    await axios.post(
        `http://127.0.0.1:8000/api/v1/historia_de_la_actividad/`,
        data
    );
}

export async function eliminarHistoriaDeLaActividad(data){
    await axios.delete(
        `http://127.0.0.1:8000/api/v1/historia_de_la_actividad/${data.id}/`,
        data
    );
}