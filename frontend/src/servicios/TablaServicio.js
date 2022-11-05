import { conseguirTodasActividades } from './ActividadServicio';
import { conseguirTodasLasHistoriaDeLaActividades } from './HistoriaDeActividadServicio'
import { conseguirHoy } from './ServicioGeneral';

const conseguirDiaDeLaSemana = () => {
    const semana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    return semana[new Date().getDay()];
}

export const conseguirActividadesParaTabla= async (hijo,dia) => {
    const diaDeLaSemana = conseguirDiaDeLaSemana();
    if (dia==='hoy') {
        const filtroHoy = { "hijos": hijo, "dias": diaDeLaSemana };
        return await conseguirTodasActividades(filtroHoy);
    } else if(dia==='todas'){
        
        const filtrosActividad = { "hijos": hijo}
        return await conseguirTodasActividades(filtrosActividad);
    }else{
        console.log("Dia especifico" + dia)
        const filtrosActividad = { "hijos": hijo, "dias": ""+dia+"" };
        return await conseguirTodasActividades(filtrosActividad);
    }
    
    
}

const crearDicionarioDeEstadosDeFilas = (historiaDeActividades) => {
    const confimarActividad = {};
    historiaDeActividades.forEach(historiaDeActividad => {
        if(historiaDeActividad.completado){
            confimarActividad[historiaDeActividad.actividad] = {
                id: historiaDeActividad.id,
                confirmado: historiaDeActividad.confirmado
            }
        }   
    });
    return confimarActividad;
}

export const conseguirHistoriasDeActividadesParaLosEstados = async (hijo) => {
    const filtroHistoriaDeActividad = {"hijo_actividad__hijo": hijo, "dia": conseguirHoy()};
    const historiaDeActividades = await conseguirTodasLasHistoriaDeLaActividades(filtroHistoriaDeActividad);
    const confimarActividad = crearDicionarioDeEstadosDeFilas(historiaDeActividades);
    return confimarActividad;
}