<template>
  <v-container id="data-tables" tag="section">
    <base-material-card icon="mdi-ballot-outline" color="blue" inline class="px-5 py-3">
      <v-spacer></v-spacer>
      <template v-slot:after-heading></template>
      <!-- Texto del boton NUEVO -->
      <template v-slot:corner-button>
        <v-btn medium class="ma-2" elevation="2" color="blue" @click.stop="dialog = true"
          >Nuevo Evento</v-btn
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
      />
      <!-- Empieza Dialogo Cancelar -->
      <ConfirmationDialog v-model="isSure" @click="cancel" />
      <!--Empieza ventana nuevo-->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <!-- Campo nombre programa -->
                <v-col cols="12">
                  <v-text-field
                    v-model="$v.editedItem.nombre.$model"
                    label="Nombre del Programa*"
                    counter="100"
                    required
                    :error-messages="nombreErrors"
                    @input="$v.editedItem.nombre.$reset(), (changed = true)"
                    @blur="$v.editedItem.nombre.$touch()"
                  ></v-text-field>
                </v-col>
                <!-- Campo año programa -->
                <v-col cols="12">
                  <v-text-field
                    v-model="$v.editedItem.anio.$model"
                    label="Año del Programa*"
                    counter="10"
                    required
                    :error-messages="anioErrors"
                    @input="$v.editedItem.anio.$reset(), (changed = true)"
                    @blur="$v.editedItem.anio.$touch()"
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
            <v-btn color="red darken-1" text @click="checkChanges">Cancelar</v-btn>
            <!-- boton guardar -->
            <v-btn color="blue darken-1" text @click="save" :disabled="$v.$invalid">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!----termina ventana nuevo-->
      <!----INICIO DATATABLE-->
      <v-divider class="mt-3" />

      <v-data-table
        :headers="headers"
        :items="progra"
        dense
        :search.sync="search"
        :loading="isLoading"
        loading-text="Cargando... Espere por favor"
        disable-pagination
        hide-default-footer
      >
        <!-- acciones editar, eliminar-->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>

        <!-- Creo el boton de Activo-->
        <template v-slot:[`item.activo`]="{ item }">
          <Status :activostr="item.activo" tipo="String" />
        </template>

        <template v-slot:no-data>
          <!-- <v-btn color="primary">Reset</v-btn> -->
          ¡No hay datos para mostrar!
        </template>
      </v-data-table>
      <!-- Empieza DataExporter -->
      <DataExporter :dataArray="progra" :dataFields="fields" fileName="progra" />
      <!-- Termina DataExporter -->
    </base-material-card></v-container
  >

  <!--   <v-container id="data-tables" tag="section">
    <base-material-card icon="mdi-ballot-outline" color="blue" inline class="px-5 py-3">
    </base-material-card>
  </v-container>
        -->
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
    isEditing: false,
    dialog: false,
    isSure: false,
    overlay: false,
    changed: false,
    headers: [
      { text: 'Nombre Descripcion', value: 'descripcion' },
      { text: 'Fecha', value: 'fecha' },
      { text: 'hora', value: 'hora' },
      { text: 'Tipo de evento', value: 'tipoEvento.tipoEvento' },
      { text: 'Activo', value: 'activo' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    //
    value: [],
    progra: [],
    editedIndex: -1,
    editedItem: {
      idprograma: 0,
      nombre: '',
      anio: '',
      activo: true,
    },
    defaultItem: {
      idprograma: 0,
      nombre: '',
      anio: '',
      activo: true,
    },
    //Para Exportar
    fields: {
      Id: 'idprograma',
      Programa: 'nombre',
      Año: 'anio',
      Activo: 'activo',
    },
  }),
  //TERMINA EXPORTAR DATOS
  mixins: [validationMixin],
  //Validaciones para los campos del formulario
  validations: {
    editedItem: {
      nombre: { required, minLength: minLength(3), maxLength: maxLength(100) },
      anio: { required, minLength: minLength(3), maxLength: maxLength(10) },
    },
  },

  computed: {
    //Titulo de los formularios
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Programa' : 'Editar Programa'
    },
    nombreErrors() {
      const errors = []
      if (!this.$v.editedItem.nombre.$dirty) return errors
      !this.$v.editedItem.nombre.required && errors.push('Este campo es requerido')
      !this.$v.editedItem.nombre.minLength &&
        errors.push('Este campo debe de tener un mínimo de 3 caracteres.')
      !this.$v.editedItem.nombre.maxLength &&
        errors.push('Este campo debe de tener un máximo de 6 caracteres.')
      return errors
    },
    anioErrors() {
      const errors = []
      if (!this.$v.editedItem.anio.$dirty) return errors
      !this.$v.editedItem.anio.required && errors.push('Este campo es requerido')
      !this.$v.editedItem.anio.minLength &&
        errors.push('Este campo debe de tener un mínimo de 3 caracteres.')
      !this.$v.editedItem.anio.maxLength &&
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
      await this.obtenerProgramas(jwt)
    },
    //Obtiene Todas los programas para la tabla
    async obtenerProgramas(jwt) {
      this.isLoading = true
      if (jwt != null) {
        let payload = { jwt: jwt }
        this.progra = []
        await this.$store
          .dispatch('programas/fetchProgramas', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.progra = response.data
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
    // Editar programa
    editItem(item) {
      this.isEditing = true
      this.editedIndex = this.progra.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.activo = this.editedItem.activo == 1 ? true : false
      this.dialog = true
    },
    //eliminar programa de la tabla
    deleteItem(item) {
      const index = this.progra.indexOf(item)
      //Confirma cerrar formulario
      confirm('Esta seguro que desea eliminar este registro?') && this.progra.splice(index, 1)
      this.Borrar(item.idprograma)
    },
    //Borrar en BD es desActivar
    async Borrar(index) {
      this.overlay = true
      this.$v.$touch()

      let body = {
        idprograma: index,
        activo: 0,
      }
      let jwt = await getValidToken(this)
      let payload = { jwt: jwt, body: body }
      payload.id = index
      await this.$store
        .dispatch('programas/deleteProgramas', payload)
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
      await this.obtenerProgramas(jwt)
      //Object.assign(this.progra[this.editedIndex], this.editedItem)
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
      this.overlay = true
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let body = {
          nombre: this.editedItem.nombre,
          anio: this.editedItem.anio,
          activo: this.editedItem.activo == true ? 1 : 0,
        }
        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        if (this.editedIndex > -1) {
          //EDITAR
          payload.id = this.editedItem.idprograma
          //console.log(payload.id)
          await this.$store
            .dispatch('programas/editProgramas', payload)
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
          Object.assign(this.progra[this.editedIndex], this.editedItem)
        } else {
          await this.$store
            .dispatch('programas/addProgramas', payload)
            .then((response) => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se creó con éxito',
              })
              this.progra.push(response.data)
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
        jwt = await getValidToken(this)
        await this.obtenerProgramas(jwt)
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
