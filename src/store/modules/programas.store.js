import ProgramasService from '@/services/programas.services'

export const namespaced = true

export const actions = {
  fetchProgramas(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return ProgramasService.getProgramas(payload.jwt, params)
  },
  addProgramas(context, payload) {
    return ProgramasService.postProgramas(payload.jwt, payload.body)
  },
  editProgramas(context, payload) {
    return ProgramasService.putProgramas(payload.jwt, payload.body, payload.id)
  },
  deleteProgramas(context, payload) {
    return ProgramasService.deleteProgramas(payload.jwt, payload.body, payload.id)
  },
}