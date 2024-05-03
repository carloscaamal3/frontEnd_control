import accionDService from '@/services/accionDetalle.services'
export const namespaced = true

export const actions = {
	fetchAccionD(context, payload) {
	  let params = 'params' in payload ? payload.params : null
	  return  accionDService .getAccionesD(payload.jwt, params)
	},
	addAccionD(context, payload) {
		return accionDService.postAccionesD(payload.jwt, payload.body)
	       },
	       editAccionD(context, payload) {
		return accionDService.putAccionesD(payload.jwt, payload.body, payload.id)
	       },
	       deleteAccionD(context, payload) {
		return accionDService.deleteAccionesD(payload.jwt, payload.body, payload.id)
	       },
	
       }