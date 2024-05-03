import AuthService from '@/services/auth.services.js'
export const namespaced = true

export const state = {
  user: '',
  token: ''
}
export const getters = {
  accessToken: (state) => state.token,
}
console.log("estate", state.token)
export const mutations = {
  SET_USER_DATA(state, userData) {
    var created = new Date().getTime()
    userData.created = created
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
    console.log("localStorage", localStorage)
  },
  LOGOUT(state) {
    localStorage.removeItem('user')
    state.user = ''
  },
}
export const actions = {

  getValidToken({ commit }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const now = new Date().getTime();
  let expire = user.expira || 28800; 
  console.log("")
  const token = user.token;

  if (!token) {
    console.log('No hay token disponible');
    // Aquí puedes manejar la lógica en caso de que no haya un token en localStorage
    // Por ejemplo, puedes redirigir al usuario a iniciar sesión nuevamente.
    return { ok: false, message: 'Token no disponible' };
  }

  const timeSinceCreation = (now - user.created) / 1000;
  const remainingTime = expire - timeSinceCreation;

  if (remainingTime > 0) {
    console.log('Token válido, no es necesario refrescarlo');
    return { ok: true, token: token };
  } else {
    console.log('Solicitando nuevo token');
    const body = { token };
    return AuthService.refreshToken(body)
      .then((response) => {
        user.token = response.data.token;
        user.expira = response.data.expira;
        commit('SET_USER_DATA', user);
        console.log('Nuevo token obtenido');
        return { ok: true, token: user.token };
      })
      .catch((error) => {
        console.error('Error al obtener un nuevo token:', error);
        // Puedes manejar el error de acuerdo a tus necesidades aquí
        return { ok: false, message: 'Error al obtener un nuevo token' };
      });
  }
},
login({ commit }, credentials) {
  console.log("credentials", credentials)
  return AuthService.loginUser(credentials)
    .then(({ data }) => {
     console.log(data)
      // Include the token in the user data
      //console.log("data-toke", data.token)
      data.usuario.token = data.token;
      commit('SET_USER_DATA', data.usuario)
     // console.log("data", data.usuario)
    })
    .catch((error) => {
      throw error
    })
},
  logout({ commit }) {
    commit('LOGOUT')
  },

  changePassword(context, payload) {
    return AuthService.changePassword(payload)
  },

  resetPassword(context, payload) {
    return AuthService.resetPassword(payload)
  },
}
