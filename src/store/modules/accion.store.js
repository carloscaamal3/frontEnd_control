import accionService from '@/services/accion.services'
export const namespaced = true

export const actions = {
	fetchAccion(context, payload) {
	  let params = 'params' in payload ? payload.params : null
	  return accionService .getAcciones(payload.jwt, params)
	},
	addAccion(context, payload) {
		return accionService.postAcciones(payload.jwt, payload.body)
	       },
	       editAccion(context, payload) {
		return accionService.putAcciones(payload.jwt, payload.body, payload.id)
	       },
	       deleteAccion(context, payload){
		return accionService.deleteAcciones(payload.jwt,payload.body, payload.id)
	       }
	
       }
       