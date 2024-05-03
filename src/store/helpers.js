import { mapGetters } from 'vuex'

export const authComputed = {
  ...mapGetters(['loggedIn']),
}

export const getValidToken = async (vm) => {
  // Espera la respuesta de la acción 'auth/getValidToken'
  let jwt = await vm.$store.dispatch('auth/getValidToken');

  if (jwt.ok) {
    // Si la respuesta es exitosa, devuelve el token
    console.log("token de inicio", jwt.token);
    return jwt.token;
  } else {
    // Si la respuesta no es exitosa, muestra un mensaje de error y maneja la sesión
    vm.$store.commit('ALERT', {
      color: 'error',
      text: jwt.message + ', Inicie Sesión de Nuevo',
    });
    vm.$store.dispatch('auth/logout');
    vm.$router.push('/pages/login');
    return null;
  }
};
