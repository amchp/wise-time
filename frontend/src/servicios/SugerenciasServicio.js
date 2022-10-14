import {ponerFiltros} from './ServicioGeneral'

const axios = require('axios');

export async function conseguirTodasSugerencias(filtros = {}) {
    const response = await axios.get(
        'http://127.0.0.1:8000/api/v1/sugerencias/', ponerFiltros(filtros)
    );
    return response.data;
}
