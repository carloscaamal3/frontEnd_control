/**
 * @fileoverview Contiene el archivo del store de Ordenos
 *
 * @version 1.0
 *
 * @author Roger Gala Pacheco <rogapa@hotmail.com>
 *
 * @copyright Shuttle Express Mexico
 *
 * Historial
 *
 * ----
 * La primera versión fue escrita por Roger Gala Pacheco
 */

import OrdenCompraServices from '@/services/sica/ordenes_compra.services'
export const namespaced = true

export const actions = {
  /**
   * @name addOrden
   * @description Crea un nuevo Ordeno
   *
   * @param {*} context Para hacer referencia al objeto en el que se ejecuta la función
   * @param {*} payload Parametros para crear un nuevo Ordeno
   */
  addOrden(context, payload) {
    return OrdenCompraServices.postOrder(payload.jwt, payload.body)
  },
  /**
   * @name fetchOrden
   * @description Obtiene una lista de Ordenes
   *
   * @param {*} context Para hacer referencia al objeto en el que se ejecuta la función
   * @param {*} payload Parametros para poblar el select
   */
  fetchOrden(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return OrdenCompraServices.getOrders(payload.jwt, params)
  },
  /**
   * @name fetchOrdenDet
   * @description Obtiene el Detalle de una orden de compra
   *
   * @param {*} context Para hacer referencia al objeto en el que se ejecuta la función
   * @param {*} payload Parametros para poblar el select
   */
  fetchOrdenDet(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return OrdenCompraServices.getOrdersDet(payload.jwt, params)
  },
  /**
   * @name editOrden
   * @description Edita un Ordeno
   *
   * @param {*} context Para hacer referencia al objeto en el que se ejecuta la función
   * @param {*} payload Parametros para editar un Ordeno
   */
  editOrden(context, payload) {
    return OrdenCompraServices.putOrder(payload.jwt, payload.body, payload.id)
  },
  /**
   * @name addCreaDet
   * @description Crea un nuevo Detalle de Orden de compra Existente
   *
   * @param {*} context Para hacer referencia al objeto en el que se ejecuta la función
   * @param {*} payload Parametros para crear un nuevo Detalle de Orden de compra
   */
  addCreaDet(context, payload) {
    return OrdenCompraServices.postCreaDet(payload.jwt, payload.body)
  },
  /**
   * @name editOrdenDet
   * @description Edita un Ordeno
   *
   * @param {*} context Para hacer referencia al objeto en el que se ejecuta la función
   * @param {*} payload Parametros para editar un Ordeno
   */
  editOrdenDet(context, payload) {
    return OrdenCompraServices.putOrderDet(payload.jwt, payload.body, payload.id, payload.posicion)
  },
  /**
   * @name fetchUltimaPosicion
   * @description Obtiene el Detalle de una orden de compra
   *
   * @param {*} context Para hacer referencia al objeto en el que se ejecuta la función
   * @param {*} payload Parametros para poblar el select
   */
  fetchUltimaPosicion(context, payload) {
    let params = 'params' in payload ? payload.params : null
    return OrdenCompraServices.getUltimaPosicion(payload.jwt, params)
  },
}
