import ContratistaService from '@/services/contratistas.services'
export const namespaces = true

export const actions = {
	fetchContratista(context, payload){
		let params = 'params' in payload ? payload.params: null
		return ContratistaService.getContratista(payload.jwt, params)
	},
}