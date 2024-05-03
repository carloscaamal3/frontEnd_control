import publicaciones from '@/services/publicaciones.services'
export const namespaced = true

export const actions = {
	
       fetchPublicacionCab(context, payload) {
	let params = 'params' in payload ? payload.params : null
	return publicaciones.getPub(payload.jwt, params)
       },
	   	   
       fetchPublicDet(context, payload) {
	let params = 'params' in payload ? payload.params : null
	return publicaciones.getPublicDetalle(payload.jwt, params)
       },
	   
	    addPub(context, payload) {
	return publicaciones.postPubDet(payload.jwt, payload.body)
       },
       editPub(context, payload) {
	return publicaciones.putPubDet(payload.jwt, payload.body, payload.id)
       },
}