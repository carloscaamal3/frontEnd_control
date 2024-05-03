import axios from 'axios'
const baseURL = process.env.VUE_APP_BASE_URL_API

const Api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de espera
})

export default{
	getContratista(jwt, params){
		Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
		if(params != null)
		{
			return Api.get('contratistas/'+ params)
		}
		return Api.get('contratistas/')
	}

}
		