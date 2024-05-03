import ProveedorService from '@/services/proveedor.services'
export const namespaced = true

export const actions = {
  fetchProveedor(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return ProveedorService.getProveedor(payload.jwt, params)
  },
  addProveedor(context, payload) {
    return ProveedorService.postProveedor(payload.jwt, payload.body)
  },
  editProveedor(context, payload) {
    return ProveedorService.putProveedor(payload.jwt, payload.body, payload.id)
  },
  deleteProveedor(context, payload) {
    return ProveedorService.deleteProveedor(payload.jwt, payload.body, payload.id)
  },
}
