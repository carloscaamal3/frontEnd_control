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
   * @name getClastipo
   * @description Obtienen una lista de Clasificacion de tipos
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar el Select
   */
   getColonias(jwt, params) {
  Api.defaults.headers.common['x-token'] = jwt; // Usar 'x-token' como clave en el encabezado
  if (params != null) {
    return Api.get('colonias-localidades' + params);
  }
  return Api.get('colonias-localidades');
},
  /**
   * @name postColonias
   * @description Se crea la clasificacion de tipo
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar el Select
   */
async postColonias(jwt, body) {
  try {
    Api.defaults.headers.common['x-token'] = jwt;
    const response = await Api.post('colonias-localidades', body);
    return response.data;
  } catch (error) {
    console.error('Error al crear el registro:', error);
    throw new Error('No se pudo crear el registro');
  }
},

  /**
   * @name postColonias
   * @description Se crea la clasificacion de tipo
   *
   * @param {*} jwt JSON Web Token válido
   **/
async putColonias(jwt, body, id) {
  try {
    Api.defaults.headers.common['x-token'] = jwt;
    const response = await Api.put(`colonias-localidades/${id}`, body);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el registro', error);
    throw new Error('No se pudo actualizar el registro');
  }
},

  /**
   * @name putClasTipo
   * @description Se actualiza la clasificacion de tipo
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar el Select
   */
  putClasTipo(jwt, body, id) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.put('clastipo/' + id, body)
  },
  /**
   * @name deleteClasTipo
   * @description Se actualiza el activp de clasificacion de tipo
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar el Select
   */
  deleteClasTipo(jwt, body, id) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.delete('clastipo/' + id, body)
  },
}
