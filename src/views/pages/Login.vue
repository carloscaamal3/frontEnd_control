<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          
          light
          max-width="100%"
          width="400"
          class="px-5 py-4"
          flat 
          color="blue darken-1" 
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 v-if="!passwordReset"  class="font-weight-bold mb-1">Iniciar Sesión</h1>
              <h1 v-if="passwordReset" class="display-2 font-weight-bold mb-2">
                Reiniciar Contraseña
              </h1>
            </div>
          </template>

          <v-overlay :value="overlay">
            <v-progress-circular :size="50" color="blue" indeterminate></v-progress-circular>
          </v-overlay>

          <!-- Inicia formulario de login -->
          <!-- Campo correo electronico formulario login -->
          <v-card-text class="text-left">
            <p style="color: black;" class="font-weight-bold mb-1">Usuario</p>
            <v-text-field
             class="font-weight-bold mb-1"
              color="secondary"
              prepend-icon="mdi-account"
              v-model="$v.user.$model"
              :error-messages="userErrors"
              required
              @input="$v.user.$reset()"
              @blur="$v.user.$touch()"
            />

            <!-- campo contraseña formulario login -->
            <p style="color: black;" class="font-weight-bold mb-1 ">Contraseña</p>
            <v-text-field
              v-if="!passwordReset"
              class="mb-8"
              color="secondary"
              prepend-icon="mdi-lock-outline"
              v-model="$v.password.$model"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassword ? 'text' : 'password'"
              
             
              @input="$v.password.$reset()"
              @blur="$v.password.$touch()"
              :counter="15"
              @click:append="showPassword = !showPassword"
              v-on:keyup="login"
            />
                        <!-- Botones de formulario login -->
              <v-card-text class="text-center">
            <!-- Boton para iniciar sesion -->
            <pages-btn
              v-if="!passwordReset"
              large
              color="primary"
              depressed
              text
              @click="login"
              :disabled="$v.$invalid"
              >Iniciar Sesión</pages-btn
            >
             <!-- Boton para reinicio de contraseña -->
            <v-btn
              v-if="!passwordReset"
              small
              color
              depressed
              class="v-btn--text red--text"
              @click.stop=";(passwordReset = true), (email = '')"
              >¿Olvidaste tu contraseña?</v-btn
            >
            <!-- Botones de formulario reinicio de contraseña -->
            <!-- Cancelar el reinicio de contraseña -->
            <v-btn
              v-if="passwordReset"
              color="red darken-1"
              text
              @click=";(passwordReset = false), (email = '')"
              >Cancelar</v-btn
            >
            <!-- Aceptar el reinicio de contraseña -->
            <v-btn
              v-if="passwordReset"
              color="blue darken-1"
              text
              @click="resetPassword"
              :disabled="$v.user.$invalid"
              >Aceptar</v-btn
            >
        </v-card-text>
          </v-card-text>
    
          <v-snackbar v-model="snackbar" color="red darken-4" right top :timeout="timeout">
            {{ errorMessage }}
            <!-- <v-btn x-small @click="snackbar = false">
              Cerrar
            </v-btn>-->
          </v-snackbar>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

const oneNumber = (value) => /[0-9]/.test(value)
//const oneUpperCase = (value) => /[A-Z]/.test(value)
//const oneLowerCase = (value) => /[a-z]/.test(value)

export default {
  name: 'PagesLogin',
  mixins: [validationMixin],

  validations: {
    user: { required, minLength: minLength(4), maxLength: maxLength(20) },
    password: {
      required,
      maxLength: maxLength(15),
      oneNumber,
     // oneUpperCase,
     // oneLowerCase,
    },
  },

  components: {
    PagesBtn: () => import('./components/Btn'),
  },

  data: () => ({
    extra: '',
    overlay: false,
    //user: 'roger.gala',
    //password: 'Apge2003',
    //user: 'user2',
    //password: 'User123456',
    user: '',
    password: '',
    errorMessage: null,
    snackbar: false,
    timeout: 2000,
    showPassword: false,
    passwordReset: false,
    rules: {
      required: (value) => !!value || 'Campo requerido.',
      min: (v) => v.length >= 6 || 'La contraseña debe de tener un minimo de 6 caracteres.',
    },
  }),

  computed: {
    userErrors() {
      const errors = []
      if (!this.$v.user.$dirty) return errors
      !this.$v.user.required && errors.push('Este campo es requerido')
      !this.$v.user.minLength && errors.push('Este campo debe de tener un mínimo de 4 caracteres.')
      !this.$v.user.maxLength && errors.push('Este campo debe de tener un máximo de 20 caracteres.')
      return errors
    },
    /*/passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.maxLength &&
        errors.push('La contraseña debe de tener un máximo de 15 caracteres.')
      !this.$v.password.required && errors.push('La contraseña es requerida.')
      !this.$v.password.oneNumber && errors.push('La contraseña debe de tener al menos un número')
      !this.$v.password.oneUpperCase &&
        errors.push('La contraseña debe de tener al menos una letra mayúscula')
      !this.$v.password.oneLowerCase &&
        errors.push('La contraseña debe de tener al menos una letra minúscula')
      return errors
    },*/
  },
  methods: {
    login() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.overlay = true
        this.$store
          .dispatch('auth/login', {
            email: this.user,
            password: this.password,
          })
          .then(() => {
            this.overlay = false
            this.clear()
            this.$router.push('/')
          })
          .catch((err) => {
           /* console.log("mensjw", err.response); // Check the response object
  this.overlay = false

  if (err.response && err.response.data && err.response.data.errors && err.response.data.errors.email && err.response.data.errors.email.msg) {
    this.errorMessage = err.response.data.errors.email.msg;
  } else {
    this.errorMessage = 'An unexpected error occurred.';
  }

  this.snackbar = true;*/
          // console.log("mensjw",err.response.data.errors.email.msg)
            this.overlay = false
            this.errorMessage = 'Usuario o Contraseña Incorrectos'
            this.errorMessage = err.response.data.errors.email.msg
           // this.errorMessage =  err.response.data.msg
            this.snackbar = true
          })
      }
    },

    resetPassword() {
      this.$v.$touch()
      if (!this.$v.user.$invalid) {
        this.$store
          .dispatch('auth/resetPassword', { correo: this.user })
          .then(() => {
            this.$store.commit('ALERT', {
              color: 'success',
              text: 'Se ha enviado un correo electrónico con tu nueva contraseña',
            })
          })
          .catch((err) => {
            this.$store.commit('ALERT', {
              color: 'error',
              text: err.response.data.msg,
            })
          })
      }
      this.clear()
    },

    clear() {
      this.$v.$reset()
      this.user = ''
      this.password = ''
      this.passwordReset = false
    },
  },
}
</script>
