import TipoService from '@/services/tipo.service'
export const namespaced = true

export const actions = {
  fetchTipo(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return TipoService.getTipo(payload.jwt, params)
  },
  fetchColonias(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return TipoService.getColonias(payload.jwt, params)
  },
   fetchSeccion(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return TipoService.getSec(payload.jwt, params)
  },
  addTipo(context, payload) {
    return TipoService.postTipo(payload.jwt, payload.body)
  },
  editTipo(context, payload) {
    return TipoService.putTipo(payload.jwt, payload.body, payload.id)
  },
  deleteTipo(context, payload) {
    return TipoService.deleteTipo(payload.jwt, payload.body, payload.id)
  },
  addTipoEvento(context, payload) {
    return TipoService.postTipoEventos(payload.jwt, payload.body)
  },
  fetchTipoEvento(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return TipoService.getTipoEventos(payload.jwt, params)
  },
}
