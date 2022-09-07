const axios = require('axios');

function conseguirConfiguracionDeAutenticacion(){
    return {
        headers:{
            'Authorization': `Token ${localStorage.getItem('tokenKey')}`
        }
    }
}

export async function conseguirUsurioLogeado(){
    const config = conseguirConfiguracionDeAutenticacion();
    const response = await axios.get(
        'http://127.0.0.1:8000/auth/users/me/', config
    );
    return response.data;
}