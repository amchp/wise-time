const axios = require('axios');

export async function conseguirTodosLosHijos(filtros = {}) {
    const response = await axios.get(
        'http://127.0.0.1:8000/api/v1/hijo/', filtros
    );
    return response.data;
}