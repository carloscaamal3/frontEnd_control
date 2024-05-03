<template>
  <v-container id="data-tables" tag="section">
    <base-material-card color="blue" icon="mdi-shape" inline class="px-5 py-3">
      <v-spacer></v-spacer>
      <template v-slot:after-heading></template>
      <!-- Texto del boton NUEVO -->
      <template v-slot:corner-button>
        <v-btn medium class="ma-2" elevation="2" color="blue" @click.stop="dialog = true"
          >Nuevo Registro</v-btn
        >
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Búsqueda"
        hide-details
        single-line
        style="max-width: 250px"
      />
      <!-- Empieza Dialogo Cancelar -->
      <ConfirmationDialog v-model="isSure" @click="cancel" />
      <!-- Termina Dialogo Cancelar -->
      <!-- Empieza Dialogo -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="$v.editedItem.nombre.$model"
                    label="Nombre*"
                    @keypress="isLetter($event)"
                    :error-messages="coloniaErrors"
                    @input="
                      $v.editedItem.nombre.$reset(),
                        (editedItem.nombre = editedItem.nombre.toUpperCase())
                      changed = true
                    "
                    @blur="$v.editedItem.nombre.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                            :menu-props="{ top: true, offsetY: true }"
                            v-model="editedItem.tipoAcentamiento"
                            label="Tipo"
                            dense
                            :items="tipoColonia"
                            hint="Seleccione  una opción"
                            persistent-hint
                            item-value="tipoAcentamiento"
                            ></v-autocomplete
                            >
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
            </v-container>
            <small>*Campo Obligatorio</small>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-checkbox v-model="checkbox" label="Crear otro" :disabled="isEditing"></v-checkbox>
            <v-btn color="red darken-1" text @click="checkChanges">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="save" :disabled="$v.$invalid">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Termina Dialogo -->
      <!-- Aqui va progress linear -->
      <v-divider class="mt-3" />

      <v-data-table
        :headers="headers"
        :items="colonias"
        dense
        :search.sync="search"
        :loading="isLoading"
        loading-text="Cargando... Espere por favor"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <!--<v-icon small @click="deleteItem(item)">mdi-delete</v-icon>-->
        </template>

        <!-- Creo el boton de Activo-->
        <template v-slot:item.activo="{ item }">
          <Status :activostr="item.activo" tipo="String" />
        </template>

        <template v-slot:no-data>
          <!-- <v-btn color="primary">Reset</v-btn> -->
          ¡No hay datos para mostrar!
        </template>
      </v-data-table>
      <!-- Termina Tabla de Clasificación de Tipos -->
      <!-- Empieza DataExporter -->
      <DataExporter :dataArray="colonias" :dataFields="fields" fileName="Colonias-Localidades" />
      <!-- Termina DataExporter -->
    </base-material-card>
  </v-container>
</template>

<script>
import ConfirmationDialog from '@/components/general/ConfirmationDialog.vue'
import Status from '@/components/general/StatusInfo.vue'
import { getValidToken } from '@/store/helpers.js'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import DataExporter from '@/components/general/DataExporter.vue'
export default {
  components: {
    ConfirmationDialog,
    Status,
    DataExporter,
  },

  data: () => ({
    search: undefined,
    isLoading: false,
    checkbox: false,
    isEditing: false,
    dialog: false,
    isSure: false,
    overlay: false,
    changed: false,
    headers: [
      { text: 'Nombre', align: 'start', value: 'nombre' },
      { text: 'Tipo', value: 'tipoAcentamiento' },
      { text: 'Activo', value: 'activo' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    //
    value: [],
    colonias:[],
    coloniasVisualizacion:[],
    tipoColonia:[
      { text: 'COLONIA', value: 'colonia' },
      { text: 'LOCALIDAD', value: 'localidad' },
      ],
    editedIndex: -1,
    editedItem: {
      nombre: '',
      tipoAcentamiento: '',
      activo: true,
    },
    defaultItem: {
      nombre: '',
      tipoAcentamiento: '',
      activo: true,
    },
    //Para Exportar
    fields: {
      Clasificación: 'nombre',
      Descripción: 'tipoAcentamiento',
      Activo: 'activo',
    },
  }),

  mixins: [validationMixin],
  //Validaciones para los campos del formulario
  validations: {
    editedItem: {
      nombre: { required, minLength: minLength(3), maxLength: maxLength(10) },
      tipoAcentamiento: { required, minLength: minLength(3), maxLength: maxLength(100) },
    },
  },

  computed: {
    //Titulo de los formularios
    formTitle() {
      return this.editedIndex === -1
        ? 'Nueva Colonia o Localidad'
        : 'Editar Registro'
    },
    coloniaErrors() {
      const errors = []
      if (!this.$v.editedItem.nombre.$dirty) return errors
      !this.$v.editedItem.nombre.required && errors.push('Este campo es requerido')
      !this.$v.editedItem.nombre.minLength &&
        errors.push('Este campo debe de tener un mínimo de 3 caracteres.')
      !this.$v.editedItem.nombre.maxLength &&
        errors.push('Este campo debe de tener un máximo de 6 caracteres.')
      return errors
    },
    descripcionErrors() {
      const errors = []
      if (!this.$v.editedItem.tipoAcentamiento.$dirty) return errors
      !this.$v.editedItem.tipoAcentamiento.required && errors.push('Este campo es requerido')
      !this.$v.editedItem.tipoAcentamiento.minLength &&
        errors.push('Este campo debe de tener un mínimo de 3 caracteres.')
      !this.$v.editedItem.tipoAcentamiento.maxLength &&
        errors.push('Este campo debe de tener un máximo de 20 caracteres.')
      return errors
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
  },
  //1ero
  created() {
    this.iniciando()
  },

  methods: {
    //Refresca Datos para la tabla
    async iniciando() {
      let jwt = await getValidToken(this)
      await this.obtenerColonias(jwt)
    },
    async obtenerColonias() {
  this.isLoading = true;
  try {
    let jwt = await getValidToken(this);
    console.log("jwt", jwt)
    if (jwt != null) {
      let payload = { jwt: jwt, params: null };
      await this.$store.dispatch('colonias/fetchGetColonias', payload)
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
    // Editar Tipo
    editItem(item) {
      this.isEditing = true
      this.editedIndex = this.colonias.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.activo = this.editedItem.activo == 1 ? true : false
      this.dialog = true
    },
    // Eliminar Tipo
    deleteItem(item) {
      const index = this.clastipos.indexOf(item)
      //Confirma cerrar formulario
      confirm('Esta seguro que desea eliminar este registro?') && this.clastipos.splice(index, 1)
      this.Borrar(item.clatip_id)
    },
    //Borrar en BD es desActivar
    async Borrar(index) {
      this.overlay = true
      this.$v.$touch()

      let body = {
        clatip_id: index,
        clatip_activo: 0,
      }
      let jwt = await getValidToken(this)
      let payload = { jwt: jwt, body: body }
      payload.id = index
      await this.$store
        .dispatch('clastipo/deleteClasTipo', payload)
        .then(() => {
          this.$store.commit('ALERT', {
            color: 'success',
            text: 'El registro se eliminó con éxito',
          })
          this.overlay = false
        })
        .catch((err) => {
          this.$store.commit('ALERT', {
            color: 'error',
            text: err.response.data.msg,
            // Enviar a inicio de sesión
          })
          this.overlay = false
        })
      Object.assign(this.clastipos[this.editedIndex], this.editedItem)
    },
    // Revisar los cambios en el formulario
    checkChanges() {
      if (this.changed) {
        this.isSure = true
      } else {
        this.close(false)
        this.changed = false
      }
    },

    cancel(isSure) {
      this.isSure = isSure
      if (this.isSure) {
        this.close(false)
        this.changed = false
      }
    },

    // Cerrar el formulario
    close(checkbox) {
      this.isSure = false
      this.checkbox = checkbox
      if (!this.checkbox) {
        this.dialog = false
        this.isEditing = false
      }
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.$v.$reset()
    },

    // Guardar el formulario
  async save() {
  this.overlay = true;
  this.$v.$touch();
  if (!this.$v.$invalid) {
    let body = {
      nombre: this.editedItem.nombre,
      tipoAcentamiento: this.editedItem.tipoAcentamiento,
      activo: this.editedItem.activo == true ? true : false,
    };
    let jwt = await getValidToken(this);
    let payload = { jwt: jwt, body: body };
    if (this.editedIndex > -1) {
      payload.id = this.editedItem.id;
      console.log(payload.id);
      await this.$store
        .dispatch('colonias/editColonias', payload)
        .then(() => {
          this.$store.commit('ALERT', {
            color: 'success',
            text: 'El registro se actualizó con éxito',
          });
          this.overlay = false;
        })
        .catch((err) => {
          if (err.response.data.ok === false) {
            this.$store.commit('ALERT', {
              color: 'error',
              text: err.response.data.message, // Utiliza el mensaje del endpoint
            });
          } else {
            this.$store.commit('ALERT', {
              color: 'error',
              text: 'Error desconocido',
            });
          }
          this.overlay = false;
        });
      Object.assign(this.colonias[this.editedIndex], this.editedItem);
    } else {
      await this.$store
        .dispatch('colonias/addColonias', payload)
        .then((response) => {
          this.$store.commit('ALERT', {
            color: 'success',
            text: 'El registro se creó con éxito',
          });
          this.colonias.push(response.data);
          this.overlay = false;
        })
        .catch((err) => {
          if (err.response.data.ok === false) {
            this.$store.commit('ALERT', {
              color: 'error',
              text: err.response.data.message, // Utiliza el mensaje del endpoint
            });
          } else {
            this.$store.commit('ALERT', {
              color: 'error',
              text: 'Error desconocido',
            });
          }
          this.overlay = false;
        });
    }
    this.close(this.checkbox);
    this.changed = false;
    jwt = await getValidToken(this);
    await this.obtenerColonias(jwt);
  }
},
    // Evalua el caracter para saber si es una letra
    isLetter: function (e) {
      let char = String.fromCharCode(e.keyCode)
      if (/^[a-zA-Z\u00C0-\u00FF ]*$/.test(char)) return true
      else e.preventDefault()
    },
  },
}
</script>
