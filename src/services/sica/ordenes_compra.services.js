/**
 * @fileoverview Contiene los servicios de consumo a la API para
 * Ordenes de compra
 *
 * @version 1.0
 *
 * @author Roger Gala Pacheco <rogapa@hotmail.com>
 *
 * @copyright
 *
 * Historial
 * ---------
 * La primera versión fue escrita por Roger Gala Pacheco
 */

import axios from 'axios'
// URL de la API
const baseURL = process.env.VUE_APP_BASE_URL_API

// Objeto axios de la api
const Api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de espera
})

export default {
  /**
   * @name getOrders
   * @description Obtienen una lista de Ordenes
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar el Select
   */
  getOrders(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt

    if (params != null) {
      return Api.get('ordensica/ordenes/' + params)
    }
    return Api.get('ordensica/ordenes/')
  },
  /**
   * @name getOrdersDet
   * @description Obtienen una lista de OrdenesDet
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar el Select
   */
  getOrdersDet(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt

    if (params != null) {
      return Api.get('ordensica/ordenesDet/' + params)
    }
    return Api.get('ordensica/ordenesDet/')
  },
  /**
   * @name postCreaDet
   * @description Se crea el detalle de los productos
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar el Select
   */
  postCreaDet(jwt, body) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.post('ordensica/creaDet/', body)
  },
  /**
   * @name putOrderDet
   * @description Se crea el detalle de los productos
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar el Select
   */
  putOrderDet(jwt, body, id, posicion) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.put('ordensica/actualizaDet/' + id + '/' + posicion, body)
  },
  /**
   * @name postOrder
   * @description Se crea el detalle de los productos
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar el Select
   */
  postOrder(jwt, body) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.post('ordensica/crea/', body)
  },
  /**
   * @name putOrder
   * @description Se crea el detalle de los productos
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar el Select
   */
  putOrder(jwt, body, id) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.put('ordensica/actualiza/' + id, body)
  },
  /**
   * @name getUltimaPosicion
   * @description Obtienen una lista de OrdenesDet
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar el Select
   */
  getUltimaPosicion(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt

    if (params != null) {
      return Api.get('ordensica/ultimapos/' + params)
    }
    return Api.get('ordensica/ultimapos/')
  },
}
