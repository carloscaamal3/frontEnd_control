import axios from 'axios'
// URL de la API
const baseURL = process.env.VUE_APP_BASE_URL_API

// Objeto axios de la api de tipo
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
   * @name getTipo
   * @description Obtienen una lista de Tipos
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar el Select
   */
  getTipo(jwt, params) {
  Api.defaults.headers.common['x-token'] = jwt; // Usar 'x-token' como clave en el encabezado
  if (params != null) {
    return Api.get('roles' + params);
  }
  return Api.get('roles');
},
  /**
   * @name getColonias
   * @description Obtienen una lista de colonias
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
getSec(jwt, params) {
  Api.defaults.headers.common['x-token'] = jwt; // Usar 'x-token' como clave en el encabezado
  if (params != null) {
    return Api.get('secciones' + params);
  }
  return Api.get('secciones');
},
deleteTipo(jwt, body, id) {
  Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
  return Api.delete('tipo/' + id, body)
},
async postTipoEventos(jwt, body) {
  try {
    Api.defaults.headers.common['x-token'] = jwt;
    const response = await Api.post('tipos-eventos', body);
    return response.data;
  } catch (error) {
    console.error('Error al crear el registro:', error);
    throw new Error('No se pudo crear el registro');
  }
},
getTipoEventos(jwt, params) {
  Api.defaults.headers.common['x-token'] = jwt; // Usar 'x-token' como clave en el encabezado
  if (params != null) {
    return Api.get('tipos-eventos' + params);
  }
  return Api.get('tipos-eventos');
},
}
