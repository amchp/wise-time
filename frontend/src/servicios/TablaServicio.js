import { conseguirTodasActividades } from './ActividadServicio';
import { conseguirTodasLasHistoriaDeLaActividades } from './HistoriaDeActividadServicio'
import { conseguirHoy } from './ServicioGeneral';

const conseguirDiaDeLaSemana = () => {
    const semana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    return semana[new Date().getDay()];
}

export const conseguirActividadesParaTabla= async (hijo) => {
    const diaDeLaSemana = conseguirDiaDeLaSemana();
    const filtrosActividad = { "hijos": hijo, "dias": diaDeLaSemana };
    return await conseguirTodasActividades(filtrosActividad);
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