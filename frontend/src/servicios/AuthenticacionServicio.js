const axios = require('axios');

function conseguirConfiguracionDeAutenticacion(){
    return {
        headers:{
            'Authorization': `Token ${localStorage.getItem('tokenKey')}`
        }
    }
}
export async function crearToken(user,password){
    const datos={
        "password": password,
        "username": user
    }
    await axios.post(
        'http://127.0.0.1:8000/auth/token/login',datos
    ).then(response=>{
        console.log("Token Creado",response.data.auth_token);
        localStorage.setItem('tokenKey',response.data.auth_token)
        
    });
    

}

export async function conseguirUsurioLogeado(){
    const config = conseguirConfiguracionDeAutenticacion();
    const response = await axios.get(
        'http://127.0.0.1:8000/auth/users/me/', config
    );
    return response.data;
}
export async function crearUsuarioBase(data) {
    const response=await axios.post(
        'http://127.0.0.1:8000/auth/users/',
        data
    );
    return response.data
}
export async function crearUsuarioTutor(data) {

    await crearUsuarioBase(data).then(usuario => {
        console.log(usuario);
        const info={
            "usuario": usuario.id,
            "email": usuario.username,
        }
        console.log(info);
        const enviarTutor=async(datos)=>{
            await axios.post(
            'http://127.0.0.1:8000/api/v1/tutor/',
            datos).then(respose=>{
                console.log("Tutor creado")
            })
        }
        enviarTutor(info);

    });
    
}
export async function crearUsuarioHijo(data) {}
