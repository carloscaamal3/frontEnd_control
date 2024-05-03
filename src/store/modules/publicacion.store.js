import publicacionesServices from '@/services/publicacion.services'
export const namespaced = true

export const actions = {
     fetchPublicacionCab(context, payload) {
	let params = 'params' in payload ? payload.params : null
	return publicacionesServices.getPub(payload.jwt, params)
       },
	   	   
       fetchPublicDet(context, payload) {
	let params = 'params' in payload ? payload.params : null
	return publicacionesServices.getPublicDetalle(payload.jwt, params)
       },
	   addPub(context, payload) {
	return publicacionesServices.postPubDet(payload.jwt, payload.body)
       },
       editPub(context, payload) {
	return publicacionesServices.putPubDet(payload.jwt, payload.body, payload.id)
       },
	   /*addPubNueva(context, payload){
	return publicacionesServices.postPubNueva(payload.jwt, payload.body)
	   }, 
	   editPubNueva(context, payload){
	return publicacionesServices.putPubNueva(payload.jwt, payload.body, payload.id)
	   }*/
       addPublicacionNueva(context, payload) {
       	return publicacionesServices.postPubNueva(payload.jwt, payload.body)
       },
       editPublicacionNueva(context, payload) {
       	return publicacionesServices.putPubNueva(payload.jwt, payload.body, payload.id)
       },
       deletePub(context, payload){
       	return publicacionesServices.deletePublicacion(payload.jwt,payload.body, payload.id)
       },
       deletePubDet(context, payload){
       	return publicacionesServices.deletePublicacionDet(payload.jwt,payload.body, payload.id)
       }
   }