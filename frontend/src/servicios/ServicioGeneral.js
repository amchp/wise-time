const axios = require('axios');
export function ponerFiltros(filtros){
    return {
        params:{
            ...filtros
        }
    }
}

export function conseguirHoy(){
    return new Date().toISOString().split('T')[0];
};
export async function conseguirNotificaciones(filtros = {}) {
    try {
        const response = await axios.get(
            'http://127.0.0.1:8000/api/v1/notificacion/', ponerFiltros(filtros)
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
    
}
