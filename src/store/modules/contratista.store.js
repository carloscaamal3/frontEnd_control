//import sistemaService from '@/services/sistema.services'
import contrService from '@/services/contratista.services'
export const namespaced = true

export const actions = {
  fetchContratista(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return contrService.getContratistas(payload.jwt, params)
  },
  addContratista(context, payload) {
	return contrService.postContratistas(payload.jwt, payload.body)
       },
       editContratista(context, payload) {
	return contrService.putContratistas(payload.jwt, payload.body, payload.id)
       },
       deleteContratista(context, payload){
	return contrService.deleteContratistas(payload.jwt,payload.body, payload.id)
       }
}
