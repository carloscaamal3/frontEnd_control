import licitacion from '@/services/licitaciones.services'
export const namespaced = true

export const actions = { 
       fetchLicit(context, payload) {
	let params = 'params' in payload ? payload.params : null
	return licitacion.getLictCe(payload.jwt, params)
       },
       fetchProyFilRegion(context, payload) {
       let params = 'params' in payload ? payload.params : null
       return licitacion.getProyFilterReg(payload.jwt, params)
       },
       fetchProyFilMunicipio(context, payload) {
       let params = 'params' in payload ? payload.params : null
       return licitacion.getProyFilterMun(payload.jwt, params)
       },
       fetchProyFilLocalidades(context, payload) {
       let params = 'params' in payload ? payload.params : null
       return licitacion.getProyFilterLoc(payload.jwt, params)
       },
       fetchLicitAll(context, payload) {
	let params = 'params' in payload ? payload.params : null
	return licitacion.getLictAll(payload.jwt, params)
       },
       fetchContrXLic(context, payload) {
       let params = 'params' in payload ? payload.params : null
       return licitacion.getContraXLicitacion(payload.jwt, params)
       },
       addLicitacion(context,payload)
       {
       return licitacion.postLicitacionNueva(payload.jwt, payload.body)
       },
       editLicitacion(context, payload)
       {
       return licitacion.putLicitacionNueva(payload.jwt, payload.body, payload.id)
       },
       moveProyectos(context, payload)
       {
       return licitacion.putProyectoLicitacion(payload.jwt, payload.body, payload.id)
       },
       addContratistaXLic(context, payload)
       {
       return licitacion.postLiciXContra(payload.jwt, payload.body, payload.id)
       },
       fetchLicXContratis(context, payload) {
       let params = 'params' in payload ? payload.params : null
       return licitacion.getLictXContratista(payload.jwt, params)
       },
       deleteContratXLici(context, payload){
       return licitacion.deleteContrXLici(payload.jwt,payload.body, payload.id)
       },

}