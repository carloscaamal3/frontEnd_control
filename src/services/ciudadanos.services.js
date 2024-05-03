import axios from 'axios'

const baseURL = process.env.VUE_APP_BASE_URL_API
//const endPoint = 'proyectos/all/'

const Api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export default {
  getCiudanos(jwt, params) {
   console.log("TOKEN DE SERVICES", jwt)
  Api.defaults.headers.common['x-token'] = jwt; // Usar 'x-token' como clave en el encabezado
  if (params != null) {
    return Api.get('ciudadanos' + params);
  }
  return Api.get('ciudadanos');
  },
  async postCiud(jwt, body) {
  try {
    // Establecer el token JWT en el encabezado
    Api.defaults.headers.common['x-token'] = jwt;

    // Realizar una solicitud POST para crear el registro
    const response = await Api.post('ciudadanos', body);

    // Devolver la respuesta del servidor
    return response.data;
  } catch (error) {
    // Manejar errores, por ejemplo, registrando el error o lanzando una excepción personalizada
    console.error('Error al crear el registro de ciudadano:', error);
    throw new Error('No se pudo crear el registro de ciudadano');
  }
},
// Función para actualizar un registro de ciudadano existente
async putCiud(jwt, body, id) {
  try {
    // Establecer el token JWT en el encabezado
    Api.defaults.headers.common['x-token'] = jwt;

    // Realizar una solicitud PUT para actualizar el registro con el ID proporcionado
    const response = await Api.put(`ciudadanos/${id}`, body);

    // Devolver la respuesta del servidor
    return response.data;
  } catch (error) {
    // Manejar errores, por ejemplo, registrando el error o lanzando una excepción personalizada
    console.error('Error al actualizar el registro de ciudadano:', error);
    throw new Error('No se pudo actualizar el registro de ciudadano');
  }
},
}
