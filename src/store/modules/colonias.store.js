import coloniaService from '@/services/colonias.services'
export const namespaced = true

export const actions = {
  fetchGetColonias(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return coloniaService.getColonias(payload.jwt, params)
  },
  addColonias(context, payload) {
    return coloniaService.postColonias(payload.jwt, payload.body)
  },
  editColonias(context, payload) {
    return coloniaService.putColonias(payload.jwt, payload.body, payload.id)
  },
  deleteColonias(context, payload) {
    return coloniaService.deleteClasTipo(payload.jwt, payload.body, payload.id)
  },
}
