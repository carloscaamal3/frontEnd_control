//import sistemaService from '@/services/sistema.services'
import seccionService from '@/services/seccion.services'
export const namespaced = true

/*=============================================
=            Section Movimientos            =
=============================================*/
export const actions = { 
	fetchMonto(context, payload) {
	let params = 'params' in payload ? payload.params : null
	return seccionService.getMonto(payload.jwt, params)
       },
   fetchSeccion(context, payload) {
   let params = 'params' in payload ? payload.params : null
   return seccionService.getSeccion(payload.jwt, params)
       },
    fetchMontoDet(context, payload) {
	let params = 'params' in payload ? payload.params : null
	return seccionService.getMontoDetalle(payload.jwt, params)
       },
       addMvto(context, payload) {
	return seccionService.postMvto(payload.jwt, payload.body)
       },
        addSeccion(context, payload) {
   return seccionService.postSeccion(payload.jwt, payload.body)
       },
        editSeccion(context, payload) {
   return seccionService.putSeccion(payload.jwt, payload.body, payload.id)
       },
       editMvto(context, payload) {
	return seccionService.putMvto(payload.jwt, payload.body, payload.id)
       },
       deleteMvto(context, payload){
		return seccionService.deleteMvto(payload.jwt,payload.body, payload.id)
	       },
/*=====  End of Section Movimientos  ======*/
/*=============================================
   =            Section Movimiento Detalle     =
=============================================*/
	       addMvtoDet(context, payload) {
		return seccionService.postMvtoDet(payload.jwt, payload.body, )
	       },
	       editMvtoDet(context, payload) {
		return seccionService.putMvtoDet(payload.jwt, payload.body, payload.id)
	       },
/*=====  End of Section Movimiento Detalle  ======*/
   /*=============================================
   =            Section   Saldos           =
   =============================================*/
	fetchSaldoDet(context, payload){
  	let params = 'params' in payload ? payload.params : null
	return seccionService.getSaldoDet(payload.jwt, params)
     },
   /*=====  End of Section Saldos  ======*/
     /*=============================================
     =            Section Cancelar Movimiento block            =
     =============================================*/
      addCancelacion(context, payload) {
	return seccionService.postCancelacion(payload.jwt, payload.body, payload.id)
       },
     /*=====  End of Cancelar Movimiento comment block  ======*/
     /*=============================================
     =            Section cancelarxdetalle  block   =
     =============================================*/
      addCancelacionXDetalle(context, payload) {
	return seccionService.postCancelacionXDetalle(payload.jwt, payload.body, payload.id)
     }
     /*=====  End of Section cancelarxdetalle  block  ======*/
     
   
}