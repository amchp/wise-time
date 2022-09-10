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