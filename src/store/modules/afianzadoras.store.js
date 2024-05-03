import AfianzadorasService from '@/services/afianzadoras.services'

export const namespaced = true

export const actions = {
  fetchAfianzadoras(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return AfianzadorasService.getAfianzadoras(payload.jwt, params)
  },
  addAfianzadoras(context, payload) {
    return AfianzadorasService.postAfianzadoras(payload.jwt, payload.body)
  },
  editAfianzadoras(context, payload) {
    return AfianzadorasService.putAfianzadoras(payload.jwt, payload.body, payload.id)
  },
  deleteAfianzadoras(context, payload) {
    return AfianzadorasService.deleteAfianzadoras(payload.jwt, payload.body, payload.id)
  },
}