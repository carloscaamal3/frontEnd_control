//import sistemaService from '@/services/sistema.services'
import montoDetalleService from '@/services/mvtosDetalle.services'
export const namespaced = true

export const actions = { 
       fetchMontoDet(context, payload) {
	let params = 'params' in payload ? payload.params : null
	return montoDetalleService.getMontoDetalle(payload.jwt, params)
       },

}