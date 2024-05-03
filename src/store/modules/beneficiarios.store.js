import beneficiariosService from '@/services/beneficiarios.services'
export const namespaced = true

export const actions = {
  fetchBeneficiarios(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return beneficiariosService.getBeneficiarios(payload.jwt, params)
  },
  // addBeneficiarios(context, payload) {
  //   return beneficiariosService.postBeneficiarios(payload.jwt, payload.body)
  // },
  // editBeneficiarios(context, payload) {
  //   return beneficiariosService.putBeneficiarios(payload.jwt, payload.body, payload.id)
  // },
  // deleteBeneficiarios(context, payload) {
  //   return beneficiariosService.deleteBeneficiarios(payload.jwt, payload.body, payload.id)
  // },
}
