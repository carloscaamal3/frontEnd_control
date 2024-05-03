import anualService from '@/services/presupuestoAnual.services'
export const namespaced = true

export const actions = { 
	fetchPresupuestoAnual(context, payload) {
	let params = 'params' in payload ? payload.params : null
	return anualService.getPresupuestoAnual(payload.jwt, params)
       },
     fetchPresupuestoAnualDet(context, payload){
  	let params = 'params' in payload ? payload.params : null
	return anualService.getPresupuestoAnualDet(payload.jwt, params)
     },

}