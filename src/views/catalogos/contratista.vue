<template>
  <v-container id="data-tables" tag="section">
    <base-material-card icon="mdi-account-tie" color="blue" inline class="px-5 py-3">
      <v-spacer></v-spacer>
      <template v-slot:after-heading></template>
      <template v-slot:corner-button>
        <v-btn small class="ma-2" elevation="2" color="blue" @click.stop="dialog = true"
          >Nuevo Contratista</v-btn
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
      <v-divider class="mt-3" />
      <!----INICIO DATATABLE-->
      <v-data-table
        :headers="headers"
        :items="contr"
        dense
        :loading="isLoading"
        :search.sync="search"
        loading-text="Cargando... Espere por favor"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:[`item.actions`]="{ item }"
          ><v-icon medium class="mr-2" @click="editItem(item)">mdi-pencil</v-icon
          ><v-icon medium @click="deleteItem(item)" class="mr-2">mdi-delete</v-icon></template
        >
        <template v-slot:[`item.activo`]="{ item }">
          <Status :activostr="item.activo" tipo="String"
        /></template>
      </v-data-table>
      <ConfirmationDialog v-model="isSure" @click="cancel" />
      <!--DIALOGO DE NUEVO REGSITRO-->
      <v-dialog v-model="dialog" max-width="700px"
        ><v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <!--Empresa-->
                  <v-row cols="6" md="4"
                    ><v-col
                      ><v-text-field
                        v-model="$v.editedItem.empresa.$model"
                        dense
                        maxlength="100"
                        required
                        label="Empresa*"
                        :error-messages="empresaError"
                        counter="250"
                        @input="$v.editedItem.empresa.$reset(), (changed = true)"
                        @blur="$v.editedItem.empresa.$touch()"
                      ></v-text-field></v-col
                    ><!--RFC-->
                    <v-col
                      ><v-text-field
                        v-model="$v.editedItem.rfc.$model"
                        counter="20"
                        dense
                        maxlength="100"
                        :error-messages="rfcErrors"
                        label="RFC*"
                        required
                        @input="$v.editItem.rfc.$reset(), (changed = true)"
                        @blur="editedItem.rfc.$touch()"
                      ></v-text-field></v-col
                  ></v-row>
                  <!--TELEFONO-->
                  <v-row cols="6" md="4"
                    ><v-col
                      ><v-text-field
                        v-model="editedItem.telefono"
                        dense
                        maxlength="100"
                        required
                        label="Teléfono"
                        counter="250"
                        @input="$v.editedItem.telefono.$reset(), (changed = true)"
                        @blur="$v.editedItem.telefono.$touch()"
                      ></v-text-field></v-col
                    ><!--EMAIL-->
                    <v-col
                      ><v-text-field
                        v-model="editedItem.email"
                        counter="100"
                        dense
                        maxlength="100"
                        label="Correo Electrónico"
                        required
                        @input="$v.editItem.email.$reset(), (changed = true)"
                        @blur="editedItem.email.$touch()"
                      ></v-text-field></v-col
                  ></v-row>
                  <!--checkbox-->
                  <v-row cols="6" md="4">
                    <v-col>
                      <v-select
                        label="CMIC"
                        :items="selecciona"
                        v-model="editedItem.cmic"
                        hint="Seleccione  una opcion"
                        item-value="cmic"
                        @input="changed = true"
                        @blur="$v.editedItem.cmic.$touch()"
                      ></v-select></v-col
                    ><v-col>
                      <v-select
                        label="Manifestacion"
                        :items="selecciona"
                        v-model="editedItem.manifestacion"
                        hint="Seleccione  una opcion"
                        item-value="manifestacion"
                        @input="changed = true"
                        @blur="$v.editedItem.manifestacion.$touch()"
                      ></v-select> </v-col
                    ><v-col>
                      <v-select
                        label="Constancias"
                        :items="selecciona"
                        v-model="editedItem.constancias"
                        hint="Seleccione  una opcion"
                        item-value="constancias"
                        @input="changed = true"
                        @blur="$v.editedItem.constancias.$touch()"
                      ></v-select> </v-col
                  ></v-row>
                  <!--Registro-->
                  <v-row cols="6" md="4"
                    ><v-col
                      ><v-text-field
                        v-model="editedItem.registro"
                        dense
                        maxlength="100"
                        label="Registro"
                        counter="200"
                        @input="$v.editItem.registro.$reset(), (changed = true)"
                        @blur="editedItem.registro.$touch()"
                      ></v-text-field
                    ></v-col>
                    <!--Representante-->

                    <v-col
                      ><v-text-field
                        dense
                        v-model="editedItem.representante"
                        maxlength="100"
                        counter="250"
                        label="Representante"
                        @input="changed = true"
                        @blur="editedItem.representante.$touch()"
                      ></v-text-field></v-col
                  ></v-row>
                  <!--Domicilio-->
                  <v-row cols="6" md="4"
                    ><v-col
                      ><v-text-field
                        dense
                        v-model="editedItem.domicilio"
                        maxlength="100"
                        counter="250"
                        label="Domicilio"
                        @input="$v.editItem.domicilio.$reset(), (changed = true)"
                        @blur="editedItem.domicilio.$touch()"
                      ></v-text-field></v-col
                    ><v-col>
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
                </v-col>
              </v-row>
              <small>*Campo Obligatorio</small>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" @click="checkChanges" text>Cancelar</v-btn>
                <v-btn color="blue darken-1" @click="save" text :disabled="$v.$invalid"
                  >Guardar</v-btn
                >
              </v-card-actions>
            </v-container></v-card-text
          ></v-card
        ></v-dialog
      >
      <!--TERMINA DIALOGO DE NUEVO REGISTRO-->
      <DataExporter :dataArray="contr" :dataFields="fields" fileName="ReporteContratistas" />
    </base-material-card>
  </v-container>
</template>
<script>
import ConfirmationDialog from '@/components/general/ConfirmationDialog.vue'
import Status from '@/components/general/StatusInfo.vue'
import { getValidToken } from '@/store/helpers.js'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
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
    changed: false,
    isSure: false,
    select: null,

    headers: [
      { text: 'Id', align: 'start', value: 'idcontratista' },
      { text: 'Empresa', value: 'empresa' },
      { text: 'RFC', value: 'rfc' },
      { text: 'CMIC', value: 'cmic' },
      //{ text: 'Registro', value: 'registro' },
      { text: 'Representante', value: 'representante' },
      //{ text: 'Domicilio', value: 'domicilio' },
      { text: 'Manifestación', value: 'manifestacion' },
      { text: 'Constancias', value: 'constancias' },
      //{ text: 'Proveedor id', value: 'prov_id' },
      { text: 'Activo', value: 'activo' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    value: [],
    contr: [],
    selecciona: [
      { value: 'Si', text: 'SI' },
      { value: 'No', text: 'NO' },
    ],
    editedIndex: -1,
    editedItem: {
      idcontratista: 0,
      empresa: '',
      rfc: '',
      cmic: false,
      registro: '',
      representante: '',
      domicilio: '',
      manifestacion: false,
      constancias: false,
      telefono:'',
      email:'',
      //prov_id: 0,
      activo: true,
    },
    defaultItem: {
      idcontratista: 0,
      empresa: '',
      rfc: '',
      cmic: false,
      registro: '',
      representante: '',
      domicilio: '',
      manifestacion: '',
      telefono:'',
      email:'',
      //prov_id: 0,
      constancias: false,

      activo: true,
    },
    //EXPORTAR DATOS
    fields: {
      Id_contratista: 'idcontratista',
      Empresa: 'empresa',
      RFC: 'rfc',
      CMIC: 'cmic',
      Registro: 'registro',
      Representante: 'representante',
      Domicilio: 'domicilio',
      Manifestación: 'manifestacion',
      Constancias: 'constancias',
      Telefono:'telefono',
      CorreoElectrónico:'email',
      // prov_id:'prov_id',
      Activo: 'activo',
    },
    mixins: [validationMixin],

    //TERMINA EXPORTAR DATOS
  }),
  validations: {
    editedItem: {
      empresa: { required },
      rfc: { required },
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Contratista' : 'Editar Contratista'
    },
    empresaError() {
      const errors = []
      if (!this.$v.editedItem.empresa.$dirty) return errors
      !this.$v.editedItem.empresa.required && errors.push('Este campo es requerido')
      return errors
    },
    rfcErrors() {
      const errors = []
      if (!this.$v.editedItem.rfc.$dirty) return errors
      !this.$v.editedItem.rfc.required && errors.push('Este campo es requerido')
      return errors
    },
    /*RegistroErrors() {
      const errors = []
      if (!this.$v.editedItem.registro.$dirty) return errors
      !this.$v.editedItem.registro.required && errors.push('Este campo es requerido')
      return errors
    },
    RepresentanteErrors() {
      const errors = []
      if (!this.$v.editedItem.representante.$dirty) return errors
      !this.$v.editedItem.representante.required && errors.push('Este campo es requerido')
      return errors
    },*/
  },
  created() {
    this.iniciando()
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
  },
  methods: {
    async iniciando() {
      let jwt = await getValidToken(this)
      await this.obtenerContratistas(jwt)
    },
    async obtenerContratistas(jwt) {
      //console.log(jwt)
      this.isLoading = true
      if (jwt != null) {
        let payload = { jwt: jwt }
        this.contr = []
        await this.$store
          .dispatch('contratista/fetchContratista', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.contr = response.data
            }
            this.isLoading = false
          })
          .catch((err) => {
            this.isLoading = false
            this.$store.commit('ALERT', {
              color: 'error',
              text: err.response.data.error,
            })
          })
      }
    },
    async save() {
      this.overlay = true
      this.$v.$touch()
      if (!this.$v.$invalid) {
        //console.log()
        let body = {
          empresa: this.editedItem.empresa,
          rfc: this.editedItem.rfc,
          cmic: this.editedItem.cmic,
          registro: this.editedItem.registro,
          representante: this.editedItem.representante,
          domicilio: this.editedItem.domicilio,
          telefono: this.editedItem.telefono,
          manifestacion: this.editedItem.manifestacion,
          email: this.editedItem.email,
          constancias: this.editedItem.constancias,
          activo: this.editedItem.activo,
        }
        //console.log(tipo)
        //console.log(body)

        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        if (this.editedIndex > -1) {
          payload.id = this.editedItem.idcontratista
          await this.$store
            .dispatch('contratista/editContratista', payload)
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
              })
              this.overlay = false
            })
          Object.assign(this.contr[this.editedIndex], this.editedItem)
        } else {
          await this.$store
            .dispatch('contratista/addContratista', payload)
            .then((response) => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se creó con éxito',
              })
              this.contr.push(response.data)
              this.overlay = false
            })
            .catch((err) => {
              this.$store.commit('ALERT', {
                color: 'error',
                text: err.response.data.msg,
              })
              this.overlay = false
            })
        }
        this.close(this.checkbox)
        this.changed = false
        jwt = await getValidToken(this)
        await this.obtenerContratistas(jwt)
      }
    },
    editItem(item) {
      this.isEditing = true
      console.log('item', item)
      this.editedIndex = this.contr.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.activo = this.editedItem.activo == 1 ? true : false
      this.dialog = true
    },
    deleteItem(item) {
      const index = this.contr.indexOf(item)
      confirm('Esta seguro que desea eliminar este registro?') && this.contr.splice(index, 1)
      this.Borrar(item.idcontratista)
    },
    async Borrar(index) {
      this.overlay = true
      this.$v.$touch()
      let body = {
        idcontratista: index,
        activo: 0,
      }
      let jwt = await getValidToken(this)
      let payload = { jwt: jwt, body: body }
      payload.id = index
      await this.$store
        .dispatch('contratista/deleteContratista', payload)
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
      Object.assign(this.contr[this.editedIndex], this.editedItem)
    },
    checkChanges() {
      if (this.changed) {
        this.isSure = true
      } else {
        this.close(false)
        this.changed = false
      }
    },
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
    cancel(isSure) {
      this.isSure = isSure
      if (this.isSure) {
        this.close(false)
        this.changed = false
      }
    },
  },
}
</script>
