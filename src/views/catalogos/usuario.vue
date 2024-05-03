<template>
  <v-container id="data-tables" tag="section">
    <!-- <base-v-component heading="Data Tables" link="components/data-tables" /> -->

    <base-material-card color="blue" icon="mdi-account" inline class="px-5 py-3">
      <v-spacer></v-spacer>
      <template v-slot:after-heading> </template>
      <template v-slot:corner-button>
        <v-btn medium class="ma-2" elevation="2" color="blue" @click.stop="dialog = true"
          >Nuevo Usuario</v-btn
        >
       <!-- <v-btn small class="ma-2" elevation="2" color="blue" @click.stop="dialog2 = true">
          <v-icon left x-small> mdi-email </v-icon> 
          Invitar Usuario
        </v-btn>--->
      </template>

      <v-overlay :value="overlay">
        <v-progress-circular :size="50" color="green" indeterminate></v-progress-circular>
      </v-overlay>
      <!-- Textfield para la barra de Búsqueda -->
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Búsqueda"
        hide-details
        single-line
        style="max-width: 250px"
      />
      <!-- Termina extfield para la barra de Búsqueda -->

      <!-- Empieza dialogo cancelar -->
      <ConfirmationDialog v-model="isSure" @click="cancel" />
      <!-- Termina dialogo cancelarº -->

      <!-- Empieza Dialogo nuevo usuario persistent -->
      <v-dialog v-model="dialog" max-width="600" max-height="450" persistent>
        <v-card inline title="Usuarios" class="px-2 py-2">
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-form v-model="valid">
            <!-- <v-container> -->
            <v-col>
              <!-- login -->
              <!-- <v-row cols="6" md="4">
               <v-col>
                  <v-text-field
                    v-model="$v.editedItem.usr_login.$model"
                    dense
                    maxlength="100"
                    label="Login"
                    required
                    :disabled="isEditing"
                    :error-messages="LoginErrors"
                    @input="$v.editedItem.usr_login.$reset(), (changed = true)"
                    @blur="$v.editedItem.usr_login.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>-->
              <!-- Nombre(s) del Usuario -->
              <v-row cols="6" md="4">
                <v-col>
                  <v-text-field
                    v-model="$v.editedItem.nombres.$model"
                    dense
                    maxlength="255"
                    required
                    label="Nombre Completo*"
                    :error-messages="usr_nombresErrors"
                    @input="$v.editedItem.nombres.$reset(), (changed = true)"
                    @blur="$v.editedItem.nombres.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="editedItem.apellidoPaterno"
                    dense
                    maxlength="255"
                    label="Apellido Paterno"
                    @input="$v.editedItem.apellidoPaterno.$reset(), (changed = true)"
                    @blur="$v.editedItem.apellidoPaterno.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="editedItem.apellidoMaterno"
                    dense
                    maxlength="255"
                    label="Apellido Materno"
                    @input="$v.editedItem.apellidoMaterno.$reset(), (changed = true)"
                    @blur="$v.editedItem.apellidoMaterno.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
                <v-row cols="6" md="4">
                <v-col>
                  <v-text-field
                    v-model="$v.editedItem.ine.$model"
                    dense
                    counter="13"
                    maxlength="13"
                    label="Clave de elector*"
                    :error-messages="ineErrors"
                    @input="$v.editedItem.ine.$reset(), (changed = true)"
                    @blur="$v.editedItem.ine.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row >
              <v-row cols="6" md="4" >
                <v-col cols="4">
                  <v-text-field
                    v-model="editedItem.direccion"
                    dense
                    counter="50"
                    maxlength="50"
                    label="Dirección*"
                    :error-messages="ineErrors"
                    @input="$v.editedItem.direccion.$reset(), (changed = true)"
                    @blur="$v.editedItem.direccion.$touch()"
                  ></v-text-field>
                </v-col>
              <v-col cols="4">
                <v-autocomplete
                :menu-props="{ top: true, offsetY: true }"
                v-model="editedItem.coloniaLocalidad"
                label="Colonia o Localidad"
                dense
                :items="colonias"
                :item-text="(item) => item.nombre"
                hint="Seleccione  una opción"
                persistent-hint
                item-value="id"
                ></v-autocomplete
                ></v-col>
                <v-col cols="4">
                  <v-autocomplete
                  :menu-props="{ top: true, offsetY: true }"
                  v-model="editedItem.seccion"
                  label="Sección"
                  dense
                  :items="secciones"
                  :item-text="(item) => item.nombre"
                  hint="Seleccione  una opción"
                  persistent-hint
                  item-value="id"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <!-- Correo del Usuario -->
              <v-row cols="6" md="4">
                <v-col cols="6">
                  <v-text-field
                    v-model="$v.editedItem.email.$model"
                    dense
                    label="Correo Electrónico*"
                    :error-messages="emailErrors"
                    @input="$v.editedItem.email.$reset(), (changed = true)"
                    @blur="$v.editedItem.email.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editedItem.telefono"
                    dense
                    label="Teléfono"
                    :error-messages="emailErrors"
                    @input="$v.editedItem.telefono.$reset(), (changed = true)"
                    @blur="$v.editedItem.telefono.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row cols="6" md="4">
                <v-col>
                  <v-select
                    v-model="editedItem.rol"
                    :items="tiposCiudadanos"
                    :menu-props="{ top: true, offsetY: true }"
                    label="Rol de usuario*"
                    hint="Selecciona un Rol"
                    :item-text="(item) => item.rol"
                    item-value="id"
                    persistent-hint
                    dense
                    required
                    return-object
                    @input="changed = true"
                    @blur="$v.editedItem.rol.$touch()"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <!-- <v-row cols="6" md="4">
                <v-checkbox label="Establecer contraseña" v-model="isPassword" />
              </v-row> -->
              <!-- Contraseña del usuario -->
              <v-row cols="6" md="4">
                <v-col>
                  <v-text-field
                    v-model="$v.editedItem.password.$model"
                    dense
                    :disabled="isEditing"
                    label="Contraseña"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    :counter="15"
                    :error-messages="passwordErrors"
                    @click:append.prevent="show = !show"
                    @input="$v.editedItem.password.$reset(), (changed = true)"
                    @blur="$v.editedItem.password.$touch()"
                  ></v-text-field>
                </v-col>
                <!-- Confirmación de contraseña del usuario -->
                <v-col>
                  <v-text-field
                    v-model="$v.editedItem.repassword.$model"
                    dense
                    :disabled="isEditing"
                    label="Confirmar Contraseña"
                    :append-icon="reShow ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="reShow ? 'text' : 'password'"
                    :counter="15"
                    :error-messages="rePasswordErrors"
                    @click:append.prevent="reShow = !reShow"
                    @input="$v.editedItem.repassword.$reset(), (changed = true)"
                    @blur="$v.editedItem.repassword.$touch()"
                  ></v-text-field>
                </v-col>
                <!-- Campo ACTIVO -->
                <v-col cols="12">
                  <v-checkbox
                    v-model="editedItem.activo"
                    :label="`Estatus: ${
                      editedItem.activo.toString() == 'true' ? 'Activo' : 'Inactivo'
                    }`"
                    @input="$v.editedItem.activo.$reset(), (changed = true)"
                    @blur="$v.editedItem.activo.$touch()"
                  >
                  </v-checkbox>
                </v-col>
              </v-row>
            </v-col>
            <div class="body-2 font-weight-thin">*Campo Obligatorio</div>
            <!-- </v-container> -->
          </v-form>
          <!-- Botones y checkList -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-checkbox v-model="checkbox" label="Crear otro"></v-checkbox>
            <v-btn color="red darken-1" text @click="checkChanges">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="saveForm" :disabled="$v.$invalid"
              >Guardar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Termina Dialogo nuevo usuario-->

      <!-- Empieza Dialogo2 invitar usuario persistent -->
      <v-dialog v-model="dialog2" max-width="500" max-height="450" persistent>
        <v-card inline title="Usuarios" class="px-2 py-2">
          <v-card-title>
            <span class="headline">Invitar Usuario</span>
          </v-card-title>
          <v-form v-model="valid">
            <!-- <v-container> -->
            <!-- Correo electrónico del usuario a invitar -->
            <v-col>
              <v-row cols="6" md="4">
                <v-col>
                  <v-text-field
                    v-model="$v.editedItem.email.$model"
                    dense
                    label="Correo Electrónico*"
                    required
                    :error-messages="emailErrors"
                    @input="$v.editedItem.email.$reset()"
                    @blur="$v.editedItem.email.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- <v-row cols="6" md="4">
                <v-checkbox label="Establecer contraseña" v-model="isPassword" />
              </v-row>-->
            </v-col>
            <div class="body-2 font-weight-thin">*Campo Obligatorio</div>
            <!-- </v-container> -->
          </v-form>
          <!-- Botones -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="sendEmail"
              :disabled="$v.editedItem.email.$invalid"
              >Aceptar</v-btn
            >
            <v-btn color="red darken-1" text @click="closeForm">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Termina Dialogo2 invitar usuario -->

      <!-- Empieza el dialog de solo cambiar la contraseña-->
      <v-dialog v-model="dialogPwd" max-width="500" max-height="450" persistent>
        <v-card inline title="Usuarios" class="px-2 py-2">
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-form v-model="valid">
            <v-col>
              <!-- login -->
              <v-row cols="6" md="4">
                <v-col>
                  <v-text-field
                    v-model="$v.editedItem.nombres.$model"
                    dense
                    maxlength="100"
                    label="Nombre"
                    required
                    :disabled="isEditing"
                    @input="$v.editedItem.nombres.$reset(), (changed = true)"
                    @blur="$v.editedItem.nombres.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Contraseña del usuario -->
              <v-row cols="6" md="4">
                <v-col>
                  <v-text-field
                    v-model="$v.editedItem.password.$model"
                    dense
                    label="Contraseña"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    :counter="15"
                    :error-messages="passwordErrors"
                    @click:append.prevent="show = !show"
                    @input="$v.editedItem.password.$reset(), (changed = true)"
                    @blur="$v.editedItem.password.$touch()"
                  ></v-text-field>
                </v-col>

                <!-- Confirmación de contraseña del usuario -->
                <v-col>
                  <v-text-field
                    v-model="$v.editedItem.repassword.$model"
                    dense
                    label="Confirmar Contraseña"
                    :append-icon="reShow ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="reShow ? 'text' : 'password'"
                    :counter="15"
                    :error-messages="rePasswordErrors"
                    @click:append.prevent="reShow = !reShow"
                    @input="$v.editedItem.repassword.$reset(), (changed = true)"
                    @blur="$v.editedItem.repassword.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <div class="body-2 font-weight-thin">*Campo Obligatorio</div>
          </v-form>
          <!-- Botones y checkList -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-checkbox v-model="checkbox" label="Crear otro"></v-checkbox>
            <v-btn color="red darken-1" text @click="checkChanges">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="changePassword" :disabled="$v.$invalid"
              >Guardar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Termina el dialog de solo cambiar la contraseña-->

      <v-divider class="mt-3" />
      <v-data-table
        :headers="headers"
        :items="usuariosVisualizacion"
        :search.sync="search"
        
        :loading="isLoading"
        loading-text="Cargando... Espere por favor"
        multi-sort
        disable-pagination
        hide-default-footer
      >
        <template v-slot:item.activo="{ item }">
          <Status :activostr="item.activo.toString()" tipo="String" />
        </template>
        <template v-slot:[`item.login`]="{ item }">
          <SessionInfo :loginTimes="item.login_times" :lastLogin="item.last_login" />
        </template>
        <!-- <template #item.login_times="{item}"> <b>Conexiones:</b> {{ item.login_times }} </template> -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
          <v-icon small @click="passwordItem(item)">mdi-lock-plus</v-icon>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { getValidToken } from '@/store/helpers.js'
import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'
import SessionInfo from '@/components/general/SessionInfo.vue'
import ConfirmationDialog from '@/components/general/ConfirmationDialog.vue'
import Status from '@/components/general/StatusInfo.vue'

const checkPassword = (value) => {
  if (!value) {
    return true
  }
  if (String(value).length < 6 || String(value).length > 16) {
    return false
  }
  return true
}

const oneNumber = (value) => {
  if (value != '') {
    return /[0-9]/.test(value)
  } else {
    return true
  }
}

const oneUpperCase = (value) => {
  if (value != '') {
    return /[A-Z]/.test(value)
  } else {
    return true
  }
}

const oneLowerCase = (value) => {
  if (value != '') {
    return /[a-z]/.test(value)
  } else {
    return true
  }
}

// const noWhitespace = (value) => value.indexOf(' ') === -1

export default {
  name: 'DashboardDataTables',

  components: {
    SessionInfo,
    ConfirmationDialog,
    Status,
  },
  data: () => ({
    search: undefined,
    valid: false,
    isLoading: false,
    isEditing: false,
    checkbox: false,
    dialog: false,
    dialog2: false,
    dialogPwd: false,
    isSure: false,
    show: false,
    reShow: false,
    isPassword: false,
    overlay: false,
    changed: false,
    headers: [
      { text: 'INE', align: 'start', value: 'ine' },
      { text: 'Nombre', value: 'nombres' },
      //{ text: 'Correo Electrónico', value: 'usr_correo' },
      { text: 'Apellido P', value: 'apellidoPaterno' },
      { text: 'Apellido M', value: 'apellidoMaterno' },
      { text: 'Email', value: 'password' },
      { text: 'Activo', value: 'activo' },
      { text: 'Rol', value: 'rol.rol' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    usuarios: [],
    usuariosVisualizacion:[],
    tiposCiudadanos:[],
    colonias:[],
    secciones:[],
    roles: [],
    sistemas: [],
    editedIndex: -1,
    editedItem: {
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno:'',
      email:'',
      rol:'',
      ine: '',
      password: '',
      direccion: '',
      telefono: '',
      coloniaLocalidad: '',
      seccion: '',
      activo: '',
    },
    defaultItem: {
     nombres: '',
      apellidoPaterno: '',
      apellidoMaterno:'',
      email:'',
      rol:'',
      ine: '',
      password: '',
      direccion: '',
      telefono: '',
      coloniaLocalidad: '',
      seccion: '',
      activo: '',
    },
  }),
  mixins: [validationMixin],
  validations: {
    editedItem: {
      nombres: { required, minLength: minLength(3), maxLength: maxLength(255) },
      ///usr_login: { required, minLength: minLength(3), maxLength: maxLength(100) },
      email: { email },
      rol: { required },
      ine: { required, minLength: minLength(12), maxLength: maxLength(13)},
      password: {
        checkPassword,
        oneNumber,
        oneUpperCase,
        oneLowerCase,
      },
      repassword: {
        sameAsPassword: sameAs('password'),
      },
    },
  },
  watch: {
    dialog(val) {
      val || this.closeForm()
    },
    dialog2(val) {
      val || this.closeForm()
    },
    dialogPwd(val) {
      val || this.closeForm()
    },
  },

  created() {
    this.iniciando()
  },
  methods: {
    //Refresca Datos para la tabla
    async iniciando() {
      let jwt = await getValidToken(this)
      await this.obtenerUsuarios(jwt)
      await this.obtenerRoles(jwt)
      await this.obtenerSistemas(jwt)
      await this.obtenerColonias(jwt)
      await this.obtenerSecciones(jwt)
    },
    // Obtiene todos los registros
    async obtenerUsuarios() {
  this.isLoading = true;
  try {
    let jwt = await getValidToken(this);
    console.log("jwt", jwt)
    if (jwt != null) {
      let payload = { jwt: jwt, params: null };
      await this.$store.dispatch('user/fetchUsers', payload)
        .then((response) => {
          this.usuarios = [];
          if (response.data.mensaje == undefined && response.data.ok === true) {
            console.log('Datos recibidos:', response.data);
            // Verifica si 'secciones' está presente en response.data y es un arreglo
            if (Array.isArray(response.data.usuarios)) {
              // Asigna 'secciones' a otro arreglo para visualizarlo en la tabla
              this.usuariosVisualizacion = response.data.usuarios;
            } else {
              console.log('El arreglo "secciones" no está presente en los datos.');
            }
            this.isLoading = false;
            console.log('monto', this.id);
         //   this.id = this.secciones[0].id;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$store.commit('ALERT', {
            color: 'error',
            text: err.response.data.error,
            // Enviar a inicio de sesión
          });
        });
    } else {
      // Manejar el caso en el que no se obtiene un token
      console.log('No se obtuvo un token válido');
      // Puedes tomar medidas aquí, como redirigir al usuario a iniciar sesión o mostrar un mensaje de error.
    }
  } catch (error) {
    // Manejar errores que ocurran al obtener el token
    console.error('Error al obtener el token:', error);
    // Puedes tomar medidas adicionales en caso de error, si es necesario.
  }
},
async obtenerColonias() {
  this.isLoading = true;
  try {
    let jwt = await getValidToken(this);
    console.log("jwt", jwt)
    if (jwt != null) {
      let payload = { jwt: jwt, params: null };
      await this.$store.dispatch('tipo/fetchColonias', payload)
        .then((response) => {
          this.colonias = [];
          if (response.data.mensaje == undefined && response.data.ok === true) {
            console.log('Datos recibidos:', response.data);
            if (Array.isArray(response.data.coloniasLocalidades)) {
              this.colonias = response.data.coloniasLocalidades;
            } else {
              console.log('El arreglo "secciones" no está presente en los datos.');
            }
            this.isLoading = false;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$store.commit('ALERT', {
            color: 'error',
            text: err.response.data.error,
          });
        });
    } else {
      console.log('No se obtuvo un token válido');
    }
  } catch (error) {
    console.error('Error al obtener el token:', error);
  }
},
async obtenerSecciones() {
  this.isLoading = true;
  try {
    let jwt = await getValidToken(this);
    console.log("jwt", jwt)
    if (jwt != null) {
      let payload = { jwt: jwt, params: null };
      await this.$store.dispatch('tipo/fetchSeccion', payload)
        .then((response) => {
          this.secciones = [];
          if (response.data.mensaje == undefined && response.data.ok === true) {
            console.log('Datos recibidos:', response.data);
            if (Array.isArray(response.data.secciones)) {
              this.secciones = response.data.secciones;
            } else {
              console.log('El arreglo "secciones" no está presente en los datos.');
            }
            this.isLoading = false;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$store.commit('ALERT', {
            color: 'error',
            text: err.response.data.error,
          });
        });
    } else {
      console.log('No se obtuvo un token válido');
    }
  } catch (error) {
    console.error('Error al obtener el token:', error);
  }
},
async obtenerRoles() {
  this.isLoading = true;
  try {
    let jwt = await getValidToken(this);
    console.log("jwt", jwt)
    if (jwt != null) {
      let payload = { jwt: jwt, params: null };
      await this.$store.dispatch('tipo/fetchTipo', payload)
        .then((response) => {
          this.tiposCiudadanos = [];
          if (response.data.mensaje == undefined && response.data.ok === true) {
            console.log('Datos recibidos:', response.data);
            // Verifica si 'secciones' está presente en response.data y es un arreglo
            if (Array.isArray(response.data.roles)) {
              // Asigna 'secciones' a otro arreglo para visualizarlo en la tabla
              this.tiposCiudadanos = response.data.roles;
            } else {
              console.log('El arreglo "secciones" no está presente en los datos.');
            }
            this.isLoading = false;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$store.commit('ALERT', {
            color: 'error',
            text: err.response.data.error,
            // Enviar a inicio de sesión
          });
        });
    } else {
      // Manejar el caso en el que no se obtiene un token
      console.log('No se obtuvo un token válido');
      // Puedes tomar medidas aquí, como redirigir al usuario a iniciar sesión o mostrar un mensaje de error.
    }
  } catch (error) {
    // Manejar errores que ocurran al obtener el token
    console.error('Error al obtener el token:', error);
    // Puedes tomar medidas adicionales en caso de error, si es necesario.
  }
},
    //Obtiene los sistemas del usuario
    async obtenerSistemas(jwt) {
      this.isLoading = true
      let params = null

      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.sistemas = []
        await this.$store
          .dispatch('sistema/fetchSistema', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.sistemas = response.data
            }
            this.isLoading = false
          })
          .catch((err) => {
            this.isLoading = false
            this.$store.commit('ALERT', {
              color: 'error',
              text: err.response.data.error,
              // Enviar a inicio de sesión
            })
          })
      }
    },
    // Editar registro
    editItem(item) {
      this.isEditing = true
      console.log("item", this.editedIndex)
      this.editedIndex = this.usuariosVisualizacion.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.password = ''
      this.editedItem.repassword = ''
      this.editedItem.activo = this.editedItem.activo ==  1 ? true : false
      this.dialog = true
    },
    // Eliminar registro
    deleteItem(item) {
      const index = this.usuarios.indexOf(item)
      confirm('Esta seguro que desea eliminar este registro?') && this.usuarios.splice(index, 1)
    },
    //Cambiar solo la contraseña del usuario
    passwordItem(item) {
      this.isEditing = true
      console.log("item password", item)
      this.editedIndex = this.usuarios.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.password = ''
      this.editedItem.repassword = ''
      this.dialogPwd = true
    },
    // Guardar contenido del formulario
    async saveForm() {
      this.overlay = true
      this.$v.$touch()
      /*if (!this.$v.$invalid) {*/
        let rol = 0
        if (this.editedItem.rol.id == null) {
          rol = this.editedItem.rol
        } else {
          rol = this.editedItem.rol.id
        }
        let idsec = ''
        if (this.editedItem.seccion.id == null) {
          idsec = this.editedItem.seccion
        } else {
          idsec = this.editedItem.seccion.id
        }
        let col = ''
        if (this.editedItem.coloniaLocalidad.id == null) {
          col = this.editedItem.coloniaLocalidad
        } else {
          col = this.editedItem.coloniaLocalidad.id
        }
        let body = {
          nombres: this.editedItem.nombres,
          apellidoPaterno: this.editedItem.apellidoPaterno,
          apellidoMaterno: this.editedItem.apellidoMaterno,
          email: this.editedItem.email,
          rol: rol,
          ine: this.editedItem.ine,
          //password: this.editedItem.password,
          direccion: this.editedItem.direccion,
          telefono: this.editedItem.telefono,
          coloniaLocalidad: col,
          seccion: idsec,
          seccionesAdministradas: [idsec],
          activo: this.editedItem.activo == true ? true : false,
        }
        if (this.editedItem.password !== '') {
          //body.login = { usr_pwd: this.editedItem.usr_pwd }
          body.password = this.editedItem.password
          console.log(body.password)

          // Verificar si las contraseñas coinciden
          if (this.editedItem.password !== this.editedItem.repassword) {
            this.$store.commit('ALERT', {
              color: 'error',
              text: 'La contraseña y la confirmación de contraseña no coinciden',
            })
            return // Detener el proceso de guardado
          }
        }
        let jwt = await getValidToken(this)
        if (this.editedIndex > -1) {
          // Edicion del registro
          let id = this.editedItem.id
          let body = {
          nombres: this.editedItem.nombres,
          apellidoPaterno: this.editedItem.apellidoPaterno,
          apellidoMaterno: this.editedItem.apellidoMaterno,
          email: this.editedItem.email,
          rol: rol,
          ine: this.editedItem.ine,
          //password: this.editedItem.password,
          direccion: this.editedItem.direccion,
          telefono: this.editedItem.telefono,
          coloniaLocalidad: col,
          seccion: idsec,
          seccionesAdministradas: [idsec],
          activo: this.editedItem.activo == true ? true : false,
          }
          let payload = { jwt: jwt, id: id, body: body }
          await this.$store
            .dispatch('user/editUser', payload)
            .then(() => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro fue actualizado con éxito',
              })
              this.overlay = false
            })
            .catch((err) => {
              this.$store.commit('ALERT', {
                color: 'error',
                text: err.response.data.msg,
              })
              this.overlay = false
            })
          Object.assign(this.usuarios[this.editedIndex], this.editedItem)
          console.log(body)
        } else {
          let payload = { jwt: jwt, body: body }
          await this.$store
            .dispatch('user/addUser', payload)
            .then((response) => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se creo con éxito',
              })
              this.usuarios.push(response.data)
              this.overlay = false
            })
            .catch((err) => {
              this.$store.commit('ALERT', {
                color: 'error',
                text: err.response.data.errores,
              })
              this.overlay = false
            })
        }
        this.closeForm()
        await this.iniciando()
      //}
    },
    async changePassword() {
      this.overlay = true
      this.$v.$touch()

      if (!this.$v.$invalid) {
        // Verificar si las contraseñas coinciden
        if (this.editedItem.password !== this.editedItem.repassword) {
          this.$store.commit('ALERT', {
            color: 'error',
            text: 'La contraseña y la confirmación de contraseña no coinciden',
          })
          return // Detener el proceso de guardado
        }
              let rol = 0
        if (this.editedItem.rol.id == null) {
          rol = this.editedItem.rol
        } else {
          rol = this.editedItem.rol.id
        }
        let idsec = ''
        if (this.editedItem.seccion.id == null) {
          idsec = this.editedItem.seccion
        } else {
          idsec = this.editedItem.seccion.id
        }
        let col = ''
        if (this.editedItem.coloniaLocalidad.id == null) {
          col = this.editedItem.coloniaLocalidad
        } else {
          col = this.editedItem.coloniaLocalidad.id
        }

        let body = {
        nombres: this.editedItem.nombres,
          apellidoPaterno: this.editedItem.apellidoPaterno,
          apellidoMaterno: this.editedItem.apellidoMaterno,
          email: this.editedItem.email,
          rol: rol,
          ine: this.editedItem.ine,
          password: this.editedItem.password,
          direccion: this.editedItem.direccion,
          telefono: this.editedItem.telefono,
          coloniaLocalidad: col,
          seccion: idsec,
          seccionesAdministradas: [idsec],
          activo: this.editedItem.activo == true ? true : false,
        }

        let jwt = await getValidToken(this)
        let id = this.editedItem.id // Agregar la variable 'id' para enviarla en el payload

        let payload = { jwt: jwt, id: id, body: body }

        try {
          await this.$store.dispatch('user/cambioPwd', payload)
          this.$store.commit('ALERT', {
            color: 'success',
            text: 'La contraseña fue actualizada con éxito',
          })
          this.overlay = false
        } catch (err) {
          this.$store.commit('ALERT', {
            color: 'error',
            text: err.response.data.msg,
          })
          this.overlay = false
        }

        this.closeForm()
        await this.iniciando()
      }
    },

    // Invitar Nuevo Usuario (enviar email)
    async sendEmail() {
      this.overlay = true
      this.$v.$touch()
      if (!this.$v.editedItem.usr_correo.$invalid) {
        let body = {
          usr_correo: this.editedItem.usr_correo,
        }
        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        await this.$store
          .dispatch('user/inviteUser', payload)
          .then(() => {
            this.$store.commit('ALERT', {
              color: 'success',
              text: 'Se ha enviado la invitación con éxito',
            })
            this.overlay = false
          })
          .catch((err) => {
            this.$store.commit('ALERT', {
              color: 'error',
              text: err.response.data.msg,
            })
            this.overlay = false
          })
        this.closeForm()
      }
    },
    // Cerrar formulario
    closeForm(checkbox) {
      this.isSure = false
      this.checkbox = checkbox
      if (!this.checkbox) {
        this.dialog = false
        this.isEditing = false
      }
      this.dialog = false
      this.dialog2 = false
      this.dialogPwd = false
      this.show = false
      this.reShow = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.clearForm()
      })
      this.$v.$reset()
    },
    // Limpiar formulario
    clearForm() {
      this.$v.$reset()
      ;(this.editedItem.id = 0),
        //(this.editedItem.usr_login = ''),
        (this.editedItem.nombres = ''),
        (this.editedItem.activo = true),
        (this.editedItem.email = ''),
        (this.editedItem.password = ''),
        (this.editedItem.repassword = '')
    },
    // Revisar si hay cambios en el formulario
    checkChanges() {
      if (this.changed) {
        this.isSure = true
      } else {
        this.closeForm(false)
        this.changed = false
      }
    },
    // Confirmar la cancelación
    cancel(isSure) {
      this.isSure = isSure
      if (this.isSure) {
        this.closeForm(false)
        this.changed = false
      }
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
    },
    usr_rolErrors() {
      const errors = []
      if (!this.$v.editedItem.rol.$dirty) return errors
      !this.$v.editedItem.rol.required && errors.push('Este campo es requerido')
      return errors
    },
    usr_nombresErrors() {
      const errors = []
      if (!this.$v.editedItem.nombres.$dirty) return errors
      !this.$v.editedItem.nombres.required && errors.push('Este campo es requerido')
      !this.$v.editedItem.nombres.minLength &&
        errors.push('Este campo debe de tener un mínimo de 3 caracteres.')
      !this.$v.editedItem.nombres.maxLength &&
        errors.push('Este campo debe de tener un máximo de 20 caracteres.')
      return errors
    },
     ineErrors() {
      const errors = []
      if (!this.$v.editedItem.ine.$dirty) return errors
      !this.$v.editedItem.ine.required && errors.push('Este campo es requerido')
      !this.$v.editedItem.ine.minLength &&
        errors.push('Este campo debe de tener un mínimo de 12 caracteres.')
      !this.$v.editedItem.ine.maxLength &&
        errors.push('Este campo debe de tener un máximo de 13 caracteres.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.editedItem.email.$dirty) return errors
      !this.$v.editedItem.email.email && errors.push('Debe ser un correo electrónico válido')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.editedItem.password.$dirty) return errors
      !this.$v.editedItem.password.checkPassword &&
        errors.push('La contraseña debe de tener un mínimo de 6 caracteres y un máximo de 15.')
     !this.$v.editedItem.password.oneNumber &&
        errors.push('La contraseña debe de tener al menos un número')
      !this.$v.editedItem.password.oneUpperCase &&
        errors.push('La contraseña debe de tener al menos una letra mayúscula')
      !this.$v.editedItem.password.oneLowerCase &&
        errors.push('La contraseña debe de tener al menos una letra minúscula')
      return errors
    },
    rePasswordErrors() {
      const errors = []
      if (!this.$v.editedItem.repassword.$dirty) return errors
      !this.$v.editedItem.repassword.sameAsPassword && errors.push('La contraseña debe ser igual.')
      return errors
    },
  },
}
</script>
