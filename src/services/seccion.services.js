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
  timeout: 10000, 
})
export default {
  /*=============================================
  =            Section Movimientos         =
  =============================================*/
  getMonto(jwt, params) {
    console.log("TOKEN DE SERVICES", jwt)
  Api.defaults.headers.common['x-token'] = jwt; // Usar 'x-token' como clave en el encabezado
  if (params != null) {
    return Api.get('secciones' + params);
  }
  return Api.get('secciones');
},
getSeccion(jwt, params) {
  console.log("TOKEN DE SERVICES", jwt)
  Api.defaults.headers.common['x-token'] = jwt; // Usar 'x-token' como clave en el encabezado
  if (params != null) {
    return Api.get('secciones/' + params);
  }
  return Api.get('secciones/');
},
async postSeccion(jwt, body) {
  try {
    Api.defaults.headers.common['x-token'] = jwt;
    const response = await Api.post('secciones' , body);
    return response.data;
  } catch (error) {
    console.error('Error al crear el registro de secciones:', error);
    throw new Error('No se pudo crear el registro de secciones');
  }
},
async putSeccion(jwt, body, id) {
  try {
    Api.defaults.headers.common['x-token'] = jwt;
    const response = await Api.put(`secciones/${id}`, body);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el registro de putSeccion:', error);
    throw new Error('No se pudo actualizar el registro de putSeccion');
  }
},
postMvto(jwt, body){
  Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
  return Api.post('presupuesto/creamovto',body)
},
putMvto(jwt, body, id) {
  Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
  return Api.put('presupuesto/creamovto' + id, body)
},
deleteMvto(jwt, body, id){
  Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
  return Api.delete('presupuesto/movtos/' + id, body) },

  /*=====  End of Movimientos block  ======*/

  /*=============================================
  =      Section Movimiento Detalle           =
  =============================================*/

  getMontoDetalle(jwt, params){
    Api.defaults.headers.common['Authorization'] = 'Bearer' + jwt
    if(params != null){
      return Api.get('presupuesto/movtosdet/' + params)}
      return Api.get('presupuesto/movtosdet/')
    },
    putMvtoDet(jwt, body, id) {
      Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
      return Api.put('presupuesto/creamovtodet' + id, body) },
      postMvtoDet(jwt, body){
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
        return Api.post('presupuesto/creamovtodet', body)
      },
  /*=====  End of Section Movimiento Detalle  ======*/
  /*=============================================
  =            Section Saldo Detalle            =
  =============================================*/

      getSaldoDet(jwt, params) {
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
        if (params != null) {
          return Api.get('presupuesto/saldopresxmov/' + params) }
          return Api.get('presupuesto/saldopresxmov/')
        },
  /*=====  End of Section Saldo Detalle  ======*/
            /*=====================================================
            =            Section cancelacion mov block            =
            =====================================================*/
        postCancelacion(jwt, body,id){
          Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
          return Api.post('presupuesto/cancelamov/'+ id, body)
        }, 
            /*=====  End of Section cancelacion mov block  ======*/

        postCancelacionXDetalle(jwt, body,id){
          Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
          return Api.post('presupuesto/cancelamovdet/'+ id, body)
        }
      }

