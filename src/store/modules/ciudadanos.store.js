import ciudadanosService from '@/services/ciudadanos.services'
export const namespaced = true

export const actions = {
  fetchCiudadanos(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return ciudadanosService.getCiudanos(payload.jwt, params)
  },
   addCiud(context, payload) {
    return ciudadanosService.postCiud(payload.jwt, payload.body)
  },
  editCiud(context, payload) {
    return ciudadanosService.putCiud(payload.jwt, payload.body, payload.id)
  },
}
