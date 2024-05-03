<template>
  <v-container id="data-tables" tag="section">
    <base-material-card icon="mdi-bank" color="blue" inline class="px-5 py-3">
      <v-spacer></v-spacer>
      <template v-slot:after-heading></template>
      <!-- Texto del boton NUEVO -->
      <template v-slot:corner-button>
        <v-btn small class="ma-2" elevation="2" color="blue" @click.stop="dialog = true"
          >Nuevo Afianzadora</v-btn
        >
      </template>
      <!---CAMPO DE BUSQUEDA-->
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Búsqueda"
        hide-details
        single-line
        style="max-width: 250px"
      ></v-text-field>
      <!-- Empieza Cancelar -->
      <ConfirmationDialog v-model="isSure" @click="cancel" />
      <!--Empieza ventana nuevo-->
      <v-dialog v-model="dialog" max-width="500px"
        ><v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <!-- Campo nombre afianzadora -->
                <v-col cols="12">
                  <v-text-field
                    v-model="$v.editedItem.afianzadora.$model"
                    label="Nombre de la Afianzadora"
                    counter="100"
                    required
                    :error-messages="afianzadoraErrors"
                    @input="$v.editedItem.afianzadora.$reset(), (changed = true)"
                    @blur="$v.editedItem.afianzadora.$touch()"
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
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <small>*Campo Obligatorio</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- checkbox -->
            <v-checkbox v-model="checkbox" label="Crear otro" :disabled="isEditing"></v-checkbox>
            <!-- boton cancelar -->
            <v-btn color="red darken-1" @click="checkChanges" text>Cancelar</v-btn>
            <!-- boton guardar -->
            <v-btn color="blue darken-1" @click="save" text :disabled="$v.$invalid">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!----termina ventana nuevo-->
      <!----INICIO DATATABLE-->
      <v-data-table
        :headers="headers"
        :items="afianza"
        dense
        :loading="isLoading"
        :search.sync="search"
        loading-text="Cargando... Espere por favor"
        disable-pagination
        hide-default-footer
      >
        <!-- acciones editar, eliminar-->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon medium @click="deleteItem(item)" class="mr-2">mdi-delete</v-icon>
        </template>
        <!-- Creo el boton de Activo-->
        <template v-slot:[`item.activo`]="{ item }">
          <Status :activostr="item.activo" tipo="String" />
        </template>
        <template v-slot:no-data>¡No hay datos para mostrar!</template>
      </v-data-table>
      <!-- Empieza DataExporter -->
      <DataExporter :dataArray="afianza" :dataFields="fields" fileName="afianza" />
      <!-- Termina DataExporter -->
    </base-material-card>
  </v-container>
</template>
<!-- Termina primera parte -->
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
    dialog: false,
    isEditing: false,
    overlay: false,
    changed: false,
    isSure: false,
    headers: [
      { text: 'Id', align: 'start', value: 'idafianza' },
      { text: 'Nombre Afianzadora', value: 'afianzadora' },
      { text: 'Activo', value: 'activo' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    value: [],
    afianza: [],
    editedIndex: -1,
    editedItem: {
      idafianza: 0,
      afianzadora: '',
      activo: true,
    },
    defaultItem: {
      idafianza: 0,
      afianzadora: '',
      activo: true,
    },
    //EXPORTAR DATOS
    fields: {
      Id: 'idafianza',
      Afianzadora: 'afianzadora',
      Activo: 'activo',
    },
    mixins: [validationMixin],

    //TERMINA EXPORTAR DATOS
  }),
  validations: {
    editedItem: {
      afianzadora: { required, minLength: minLength(3), maxLength: maxLength(100) },
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nueva Afianzadora' : 'Editar Afianzadora'
    },
    afianzadoraErrors() {
      const errors = []
      if (!this.$v.editedItem.afianzadora.$dirty) return errors
      !this.$v.editedItem.afianzadora.required && errors.push('Este campo es requerido')
      !this.$v.editedItem.afianzadora.minLength &&
        errors.push('Este campo debe de tener un mínimo de 3 caracteres.')
      !this.$v.editedItem.afianzadora.maxLength &&
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
      await this.obtenerAfianzadoras(jwt)
    },
    //Obtiene Todas las afianzadoras
    async obtenerAfianzadoras(jwt) {
      console.log('obtenerAfianzadoras(jwt)')
      this.isLoading = true
      //console.log(jwt)
      if (jwt != null) {
        //console.log('Entro a Consulta')
        let payload = { jwt: jwt }
        this.afianza = []
        //console.log(this.afianza)
        await this.$store
          .dispatch('afianzadoras/fetchAfianzadoras', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.afianza = response.data
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
    //editar afianzadora del atabla
    editItem(item) {
      this.isEditing = true
      this.editedIndex = this.afianza.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.activo = this.editedItem.activo == 1 ? true : false
      this.dialog = true
    },
    //eliminar afianza de la tabla
    deleteItem(item) {
      const index = this.afianza.indexOf(item)
      //confirmar cerrar formulario
      confirm('Esta seguro que desea eliminar este registro?') && this.afianza.splice(index, 1)
      this.Borrar(item.idafianza)
    },
    //borrar en la bd es desactivar
    async Borrar(index) {
      this.overlay = true
      this.$v.$touch()
      let body = {
        idafianza: index,
        activo: 0,
      }
      let jwt = await getValidToken(this)
      let payload = { jwt: jwt, body: body }
      payload.id = index
      await this.$store
        .dispatch('afianzadoras/deleteAfianzadoras', payload)
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
      //Object.assign(this.afianza[this.editedIndex], this.editedItem)
      this.obtenerAfianzadoras(jwt)
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

    //guardar el formulario
    async save() {
      this.overlay = true
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let body = {
          afianzadora: this.editedItem.afianzadora,
          activo: this.editedItem.activo == true ? 1 : 0,
        }
        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        if (this.editedIndex > -1) {
          //EDITAR
          payload.id = this.editedItem.idafianza
          //console.log(payload.id)
          await this.$store
            .dispatch('afianzadoras/editAfianzadoras', payload)
            .then(() => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se actualizo con éxito',
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
          Object.assign(this.afianza[this.editedIndex], this.editedItem)
        } else {
          //NUEVO
          await this.$store
            .dispatch('afianzadoras/addAfianzadoras', payload)
            .then((response) => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se creó con éxito',
              })
              this.afianza.push(response.data)
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
        }
        this.close(this.checkbox)
        this.changed = false
        //jwt = getValidToken(this)
        //jwt = await getValidToken(this)
        await this.obtenerAfianzadoras(jwt)
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
