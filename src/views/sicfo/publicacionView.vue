<template>
  <v-container>
    <base-material-card
      icon="mdi-archive-arrow-down-outline "
      color="brown darken-1"
      inline
      class="px-5 py-3"
    >
    <template v-slot:corner-button>
        <v-row>
        <v-col cols="5">
        <v-btn small class="ma-2" elevation="2" color="brown darken-1" @click.stop="dialogC = true">
          Nuevo registro</v-btn>
        </v-col>
         <v-col cols="5">
              <v-select
                v-model="ejercicioPub"
                :items="ejercicios"
                :menu-props="{ top: true, offsetY: true }"
                label="Ejercicio"
                item-text="ejercicio"
                item-value="ejercicio"
                persistent-hint
                dense
                hint="Selecionar Ejercicio"
                @change="onChangePrincipal"
                return-object
              >
              </v-select>
            </v-col>
          </v-row>
      </template>
      <v-card flat>
        <v-spacer></v-spacer>
        <template v-slot:after-heading></template>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          class="ml-auto"
          label="Búsqueda"
          hide-details
          single-line
          style="max-width: 250px"
        />
        <v-divider class="mt-3" />
        <v-spacer></v-spacer>
        <!---TABLA PRINCIPAL---->
        <v-data-table
          :headers="headers"
          :items="filteredPublicaciones"
          :search.sync="search"
          :loading="isLoading"
          dense
          loading-text="Cargando... Espere por favor"
          disable-pagination
          hide-default-footer
        >
        <template v-slot:item.pubTotal="{ item }">
                {{ formato(eFormatos.MONEDA, item.pubTotal) }}
        </template>
          <template v-slot:no-data> ¡No hay datos para mostrar en este movimiento! </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon medium class="mr-2" @click="viewItem(item)">mdi-pencil</v-icon>
            <v-icon medium class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:[`item.fechapublicacion`]="{ item }">
            <div class="name-info-title">
              {{ formato(eFormatos.FECHA, item.fechapublicacion) }}
            </div>
          </template>
        </v-data-table>
        <!------------------------->
        <!------------------------>
        <v-dialog hide-overlay v-model="dialogC" persistent max-width="920px">
          <v-card>
            <ConfirmationDialog v-model="isSure" @click="cancel" />
            <v-toolbar dark color="brown">
              <v-btn icon dark @click="checkChanges">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Convocatoria:</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-tabs fixed-tabs background-color="">
                <v-tabs-slider color="brown darken-1"></v-tabs-slider>
                <v-tab default
                  ><v-icon right>mdi-archive-arrow-down-outline </v-icon>Convocatoria:</v-tab
                >
                <v-tab v-if="editedItem.idpublicacion > 0"
                  ><v-icon left>mdi-archive-arrow-down-outline </v-icon>Detalle</v-tab
                >
                <!---------CABECERO------------>
                <v-tab-item>
                  <v-card inline flat color="white" class="px-5 py-3">
                    <v-card flat>
                      <v-container class="elevation-1">
                        <v-card-text>
                          <v-card flat>
                            <!--<v-img src="@/assets/logo_ivey.jpg" width="20%" height="20%"> </v-img>-->
                            <v-card-title>
                              <span class="headline">{{ formTitle }}</span></v-card-title
                            >
                            <v-divider class="mt-3" />
                            <!-----inicia formulario-->
                            <v-row>
                              <v-col>
                                <!--campo Descripcion-->
                                <v-row>
                                  <v-col cols="3">
                                          <v-select
                             v-model="$v.editedItem.ejercicio.$model"
                             :items="ejercicios"
                             :menu-props="{ top: true, offsetY: true }"
                             label="Ejercicio*"
                             item-text="ejercicio"
                             item-value="ejercicio"
                             persistent-hint
                             hint="Seleciona Ejercicio"
                             return-object
                             :error-messages="sp_ejercicioErrors"
                             @change="onChangeEjercicio"
                             @blur="$v.editedItem.ejercicio.$touch()"
                             ></v-select>
                                  </v-col>
                                  <v-col cols="3"
                                    ><v-text-field
                                      v-model="editedItem.estatus"
                                      label="Estatus"
                                      persistent-hint
                                      placeholder="CAP"
                                      maxlength="10"
                                      value="CAP"
                                      readonly
                                      @input="changed = true"
                                      @blur="$v.editedItem.estatus.$touch()"
                                    ></v-text-field>
  
                                  </v-col>
                                   <v-col cols="4"
                                    ><v-text-field
                                      v-model="$v.editedItem.numpublicacion.$model"
                                      label="Clave de convocatoria"
                                      persistent-hint
                                      counter="60"
                                      maxlength="60"
                                      return-object
                                      :error-messages="numPublicacionError"
                                      placeholder="Clave de convocatoria"
                                      @input="$v.editedItem.numpublicacion.$reset(),
                                      (editedItem.numpublicacion = editedItem.numpublicacion.toUpperCase())
                                      changed = true"
                                      @blur="$v.editedItem.numpublicacion.$touch()"
                                    ></v-text-field>
  
                                  </v-col>
                                </v-row>
                                <v-row cols=" 6" >
                                  <v-col cols="3">
                                    <v-menu
                                      v-model="fromDateMenu"
                                      dense
                                      :close-on-content-click="false"
                                      :nudge-right="40"
                                      transition="scale-transition"
                                      offset-y
                                      max-width="290px"
                                      min-width="290px"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                          v-model="editedItem.fechapublicacion"
                                          label="Fecha de publicación"
                                          prepend-icon="mdi-calendar-month"
                                          v-bind="attrs"
                                          dense
                                          v-on="on"
                                          id="fechapublicacion"
                                        ></v-text-field>
                                      </template>
                                      <v-date-picker
                                        locale="en-in"
                                        year-icon="mdi-calendar-blank"
                                        prev-icon="mdi-skip-previous"
                                        next-icon="mdi-skip-next"
                                        color="brown darken-1"
                                        v-model="editedItem.fechapublicacion"
                                        @input=";(fromDateMenu = false), (changed = true)"
                                        :min="minDate"
                                        :max="maxDate"
                                      ></v-date-picker>
                                    </v-menu>
                                  </v-col>
                                  <v-col>
                                    <v-text-field
                                      v-model="$v.editedItem.descripcion.$model"
                                      @input="changed = true"
                                      @blur="$v.editedItem.descripcion.$touch()"
                                      dense
                                      :error-messages="descripcionErrors"
                                      label="Descripción"
                                      persistent-hint
                                      placeholder="Descripción"
                                      required
                                      counter="200"
                                      maxlength="200"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                                <v-card-actions
                                  ><v-spacer></v-spacer>
                                  <v-checkbox v-model="checkbox" label="Crear otro" :disabled="isEditing"></v-checkbox>
                                  <v-btn color="red darken-1" @click="checkChanges" text
                                    >Salir</v-btn
                                  ><v-btn
                                    color="primary darken-1"
                                    @click="savePublicacionNueva"
                                    :disabled="validando"
                                    text
                                    >Guardar</v-btn
                                  >
                                  <!--<v-btn color="red darken-1" border="2px solid" text @click="dialogC = false"
                      >Cerrar</v-btn>-->
                                </v-card-actions>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-card-text>
                      </v-container>
                    </v-card>
                  </v-card>
                </v-tab-item>
                <!--------FINALIZA CABECERO-------------------->
                <!--------DETALLE-------------------->
                <v-tab-item>
                  <v-card inline flat color="white" class="px-5 py-3">
                    <v-container class="elevation-1">
                      <v-card-title>
                        <span class="headline">{{ TiDetalle }}</span></v-card-title
                      >
                      <v-spacer></v-spacer>
                      <template v-slot:after-heading></template>
                      <v-btn
                        small
                        class="ma-2"
                        elevation="2"
                        color="brown darken-1"
                        @click="dialogDet = true"
                        >Nuevo Detalle</v-btn
                      >
                      <v-text-field
                        v-model="searchDet"
                        append-icon="mdi-magnify"
                        class="ml-auto"
                        label="Búsqueda"
                        hide-details
                        single-line
                        style="max-width: 250px"
                      />
                      <v-spacer></v-spacer>
                      <v-divider class="mt-3" />
                      <v-data-table
                        :headers="headersDet"
                        :items="publicacionesDet"
                        :search.sync="searchDet"
                        :loading="isLoading"
                        dense
                        loading-text="Cargando... Espere por favor"
                        disable-pagination
                        hide-default-footer
                      >
                        <template v-slot:[`item.monto_base`]="{ item }">
                          <div class="name-info-title">
                            {{ formato(eFormatos.MONEDA, item.monto_base) }}
                          </div>
                        </template>
                        <template v-slot:no-data>
                          ¡No hay datos para mostrar en este registro!
                        </template>
                        <!-- <template v-slot:item.monto_base="{ item }"></template>-->
                        <template v-slot:[`item.actions`]="{ item }">
                          <v-icon small class="mr-2" @click="openModal(item)">mdi-eye</v-icon>
                          <v-icon small @click="deleteItemDet(item)">mdi-delete</v-icon>
                        </template>
                         <!-- FOOTER -->
                
                    <template slot="body.append">
                    <tr class="Black--text">
                      <th>
                        <p style="font-size: 15px">TOTAL:</p>
                      </th>
                      <th></th>
                      <th>
                        <p style="font-size: 15px">
                          {{ formato(eFormatos.MONEDA, sumaCampo('TotalMonto')) }}
                        </p>
                      </th>
                    </tr>
                  </template>
                      </v-data-table>
                      <v-card-actions
                        ><v-spacer></v-spacer>
                        <v-btn color="red darken-1" @click="checkChanges" text>Salir</v-btn>
                      </v-card-actions>
                    </v-container>
                  </v-card>
                  <!----dialogo nuevo detalle-->
                  <v-dialog hide-overlay v-model="dialogDet" persistent max-width="720px">
                    <ConfirmationDialog v-model="isSureDet" @click="cancelDet" />
                    <v-card>
                      <v-card-text>
                        <v-card flat>
                          <v-card-title> <span class="headline">Nuevo detalle</span></v-card-title>
                          <v-divider class="mt-3" />
                          <!-----inicia formulario-->
                          <v-row>
                            <v-col>
                              <!--campo Descripcion-->
                              <v-row>
                                <v-col cols="1">
                                  <v-text-field
                                    v-model="editedItem.idpublicacion"
                                    @blur="$v.editedItem.idpublicacion.$touch()"
                                    @change="
                                      $v.editedItem.idpublicacion.$reset(), (changedDet = true)
                                    "
                                    dense
                                    label="Id publicación"
                                    persistent-hint
                                    maxlength="25"
                                    readonly
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="3"
                                  ><v-text-field
                                    v-model="editedItem.estatus"
                                    @change="$v.editedItem.estatus.$reset(), (changedDet = true)"
                                    dense
                                    label="Estatus"
                                    persistent-hint
                                    readonly
                                    maxlength="25"
                                    value="CAP"
                                  >
                                  </v-text-field>
      
                                </v-col>
                                <v-col>
                                  <v-select
                                    v-model="editedItemDet.idlicitacion"
                                    :menu-props="{ top: true, offsetY: true }"
                                    label="Licitaciones"
                                    :item-text="
                                      (item) => item.idlicitacion + ' - ' + item.numlicitacion
                                    "
                                    :items="licitaciones"
                                    dense
                                    @input="validaExisteLicitacion(true)"
                                    required
                                    hint="Seleccione  una opción"
                                    persistent-hint
                                    item-value="idlicitacion"
                                    @focus="focusField('idlicitacion')"
                                    id="idlicitacion"
                                    :disabled="!existeID"
                                    :error-messages="selectLicitacionError"
                                  >
                                  </v-select>
                                </v-col>
                              </v-row>
                              <v-card-actions
                                ><v-spacer></v-spacer>
                                <v-btn color="red darken-1" @click="revCambiosDet" text>Salir</v-btn
                                ><v-btn
                                  color="primary darken-1"
                                  @click="savePublicacionDet"
                                  :disabled="validaGuardar"
                                  text
                                  >Guardar</v-btn
                                >
                              </v-card-actions>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  <!---------modal 2---------->
                  <v-dialog v-model="dialog2" max-width="500" :persistent="true" :scrollable="true">
                    <v-card>
                      <v-card-title>Información adicional</v-card-title>
                      <v-card-text>
                        <v-row v-for="(value, key) in modalData" :key="key">
                          <v-col cols="4">
                            <strong>{{ key }}:</strong>
                          </v-col>
                          <v-col cols="8">
                            {{ value }}
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" border="2px solid" text @click="dialog2 = false"
                          >Cerrar</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!----------------------->
                </v-tab-item>
                <!--------FINALIZA DETALLE------------->
              </v-tabs>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card>
    </base-material-card>
  </v-container>
</template>
<script>
import { getValidToken } from '@/store/helpers.js'
import ConfirmationDialog from '@/components/general/ConfirmationDialog.vue'
import * as tools from '@/store/modules/tools.store.js'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  components: {
    ConfirmationDialog,
  },

  data: () => ({
    overlay: false,
    showDeleteDialog: false,
    dialogVisible: false,
    eFormatos: tools.formatos,
    search: undefined,
    searchDet: undefined,
    isLoading: false,
    dialogC: false,
    dialogDet: false,
    dialog2: false,
    isSure: false,
    isEditing: false,
    isSureDet: false,
    changed: false,
    changedDet: false,
    checkbox: false,
    checkboxDet: false,
    existeID: true,
    validaGuardar: true,
    ejercicioPub:0,
    minDate: '2021-01-01',
    maxDate: '2050-01-31',
    fromDateMenu: false,
    headers: [
      { text: 'Id Convocatoria', value: 'idpublicacion' },
      { text: 'Clave', value: 'numpublicacion' },
      { text: 'Descripción', value: 'descripcion' },
      { text: 'Estatus', value: 'estatus' },
      { text: 'Fecha Publicación', value: 'fechapublicacion' },
      { text: 'Monto Total', value: 'pubTotal' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    headersDet: [
      { text: 'Id Licitacion', value: 'idLicitacion' },
      { text: 'Num Licitacion', value: 'numlicitacion' },
      { text: 'Monto', value: 'monto_base' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    headersMap: {
      idPublicacion: 'ID Publicación',
      idLicitacion: 'ID Licitación',
      numlicitacion: 'Licitación',
      descripcion: 'Descripción',
      estatus: 'Estatus',
    },
    publicaciones: [],
    publicacionesDet: [],
    licitaciones: [],
    value: [],
    ejercicios:[],
    ////
    modalData: {},
    ////
    editedIndex: -1,
    editedIndexDet: -1,
    ////
    defaultItem: {
      idlicitacion: 0,
      idpublicacion: 0,
      numpublicacion:'',      
      descripcion: '',
      fechapublicacion: '',
      estatus: 'CAP',
      //defecto
    },
    defaultItemDet: {
      idpublicacion: 0,
      idlicitacion: 0,
      idLicitacion: 0,
      descripcion: '',
      numlicitacion: '',
      estatus: '',
    },
    editedItemDet: {
      idPublicacion: 0,
      numlicitacion: '',
      idLicitacion: 0,
      estatus: '',
    },
    editedItem: {
      idpublicacion: 0,
      numpublicacion:'',
      descripcion: '',
      fechapublicacion: '',
      estatus: 'CAP',
      //defecto
    },
    mixins: [validationMixin],
  }),
  validations: {
    editedItem: {
      descripcion: { required },
      numpublicacion:{required},
      ejercicio: { required},
    },
    editedItemDet: {
      idlicitacion: { required },
    },
  },
   watch: {
    dialog(val) {
      val || this.close()
    },
  },
  created() {
  this.iniciando()
  },
  methods: {
    async iniciando() {
      let jwt = await getValidToken(this)
      await this.obtenerEjercicios(jwt)
      console.log()
      //cargar ejercicio al inicio
      if (this.ejercicioPub == undefined || this.ejercicioPub == 0) {
        this.ejercicioPub = this.ejercicios[0].ejercicio
      }
      await this.obtenerPublicaciones(jwt, this.ejercicioPub)
      await this.obtenerAllLicitaciones(jwt, this.ejercicioPub)

      this.EjercicioValido()
    },
      
    async verificarLicitacion(idpublicacion, idlicitacion) {
      let resultado = false
      let jwt = await getValidToken(this)
      let param = null
      let payload = {}
      if (idpublicacion != null && idpublicacion > 0) {
        param =
          'filtro?campo1=p.idLicitacion&tipo1=igual&valor1=' +
          this.editedItemDet.idlicitacion +
          '&logico2=and&campo2=idpublicacion&tipo2=igual&valor2=' +
          this.idpublicacion
        payload = { jwt: jwt, params: param }
        await this.$store
          .dispatch('publicacion/fetchPublicDet', payload)
          .then((response) => {
            if (response.data.length >= 0) resultado = true
          })
          .catch((err) => {
            this.isLoading = false
            this.$store.commit('ALERT', {
              color: 'error',
              text: err.response.data.error,
            })
          })
      } else {
        param = idlicitacion
        payload = { jwt: jwt, params: param }
        await this.$store
          .dispatch('publicacion/fetchPublicDet', payload)
          .then((response) => {
            if (response.data.length >= 0) resultado = true

            //this.isLoading = false
          })
          .catch((err) => {
            this.$store.commit('ALERT', {
              color: 'error',
              text: err.response.data.error,
              // Enviar a inicio de sesión
            })
          })
      }
      return resultado
    },
    async obtenerEjercicios(jwt) {
      //this.isLoading = true
      let params = 'publicacion'
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.ejercicios = []
        await this.$store
          .dispatch('consulta/fetchGetEjercicios', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.ejercicios = response.data
            }
          })
          .catch((err) => {
            this.$store.commit('ALERT', {
              color: 'error',
              text: err.response.data.error,
            })
          })
      }
    },
    async validaExisteLicitacion(muestraMensaje = true) {
      let excede = false
      if (Number(this.editedItemDet.idlicitacion) > 0)
        excede = await this.verificarLicitacion(this.editedItemDet.idlicitacion)
      this.validaGuardar = false
      if (excede) {
        if (muestraMensaje) {
          //this.alert2 = false
          //this.alertSaldo = true
          this.validaGuardar = false
          this.$store.commit('ALERT', {
            color: 'error',
            text:
              'Ya existe la licitacion: ' +
              this.editedItemDet.idlicitacion +
              ', seleccione otra opción',
          })
        }
        this.existeID = true
        this.focusField('idlicitacion')
        this.validaGuardar = true
        //this.verificaMonto = false
      } else {
        if (muestraMensaje) {
          //this.alertSaldo = true
          this.$store.commit('ALERT', {
            color: 'info',
            text: 'Licitación disponible',
          })
        }
        this.verificaMonto = true
      }
    },
    ////////////////////////////////////////////////////
    async savePublicacionDet() {
      this.overlay = true
      let id = ''
      if (this.editedItem.idpublicacion.idpublicacion == null) {
        id = this.editedItem.idpublicacion
      } else {
        id = this.editedItem.idpublicacion.idpublicacion
      }
      let est = ''
      if (this.editedItem.estatus.estatus == null) {
        est = this.editedItem.estatus
      } else {
        est = this.editedItem.estatus.estatus
      }
      let body = {}

      body = {
        idpublicacion: id,
        estatus: est,
        idLicitacion: this.editedItemDet.idlicitacion,
      }
      let jwt = await getValidToken(this)
      let payload = { jwt: jwt, body: body }
      if (this.editedIndexDet > -1) {
        body = {
          idpublicacion: id,
          estatus: est,
          idLicitacion: this.editedItemDet.idlicitacion,
        }
        await this.$store
          .dispatch('publicacion/addPub', payload)
          .then(() => {
            this.$store.commit('ALERT', {
              color: 'success',
              text: 'El registro se creó con éxito',
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
        Object.assign(this.publicacionesDet[this.editedIndexDet], this.editedItemDet.idpublicacion)
      } else {
        //obtener id y ejercicio del movimineto principal
        payload.id = this.editedItem.idpublicacion
        payload.est = this.editedItem.estatus
        await this.$store
          .dispatch('publicacion/addPub', payload)
          .then((response) => {
            this.$store.commit('ALERT', {
              color: 'success',
              text: 'El registro se creó con éxito',
            })
            this.publicacionesDet.push(response.data)
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
      this.closeDet(this.checkbox)
      this.changedDet = false
      jwt = await getValidToken(this)
      this.isLoading = true
      await this.obtenerPublicacionesDeta(this.idPublicacion)
    },

    async savePublicacionNueva() {
      this.overlay = true
      this.$v.$touch()
      ///if (!this.$v.validando) {
      let est=''
      if(this.editedItem.ejercicio.ejercicio == null){
        est = this.editedItem.ejercicio
      }else{
        est = this.editedItem.ejercicio.ejercicio
      }
      let body = {
        ejercicio: est,
        estatus: this.editedItem.estatus,
        fechapublicacion: this.editedItem.fechapublicacion,
        pubTotal: 0,
        descripcion: this.editedItem.descripcion,
        numpublicacion: this.editedItem.numpublicacion,
      }
      let jwt = await getValidToken(this)
      let payload = { jwt: jwt, body: body }
      if (this.editedIndex > -1) {
        payload.id = this.editedItem.idpublicacion
        await this.$store
        .dispatch('publicacion/editPublicacionNueva', payload)
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
        Object.assign(this.publicaciones[this.editedIndex], this.editedItem)
       // console.log("assign", this.publicaciones)
      } else {
        await this.$store
          .dispatch('publicacion/addPublicacionNueva', payload)
          .then((response) => {
            this.$store.commit('ALERT', {
              color: 'success',
              text: 'El registro se creó con éxito',
            })
            this.publicaciones.push(response.data)
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
      await this.obtenerPublicaciones(jwt)

    },
    ////////////////////////////////////////////////////
    //OBTENER TODAS LAS LICITACIONES
     async obtenerAllLicitaciones(jwt, ejercicio) {
      this.isLoading = true
      let params = null
      console.log("ejerss", this.ejercicio)
      params ='filtro?campo1=ejercicio&tipo1=igual&valor1=' + ejercicio
      if (jwt != null) {
        this.licitaciones = []
        let payload = { jwt: jwt, params: params }
        await this.$store
          .dispatch('licitaciones/fetchLicitAll', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.licitaciones = response.data
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
    /*async obtenerAllLicitaciones() {
      console.log
      this.isLoading = true
      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: null }
        this.licitaciones = []
        await this.$store
          .dispatch('licitaciones/fetchLicitAll', payload)
          .then((response) => {
            this.licitaciones = response.data
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
    },*/
      async obtenerPublicaciones(jwt, ejercicio) {
      this.isLoading = true
      let params = null
      params ='filtro?campo1=ejercicio&tipo1=igual&valor1=' + ejercicio
      if (jwt != null) {
        this.publicaciones = []
        let payload = { jwt: jwt, params: params }
        await this.$store
          .dispatch('publicacion/fetchPublicacionCab', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.publicaciones = response.data
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
     //OBTENER TODAS LAS PUBLICACIONES
  /*async obtenerPublicaciones(jwt) {
  this.isLoading = true;
  if (jwt != null) {
    let payload = { jwt: jwt }
    this.publicaciones = []
    //Evitar el almacenamiento en caché
    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }
    };
    try {
      const response = await this.$store.dispatch(
        'publicacion/fetchPublicacionCab',
        payload,
        config,
        jwt
      );
      if (response.data.mensaje === undefined) {
        this.publicaciones = response.data;
      }
    } catch (err) {
      this.isLoading = false
            this.$store.commit('ALERT', {
              color: 'error',
              text: err.response.data.error,
              // Enviar a inicio de sesión
            })
    } finally {
      this.isLoading = false;
    }
  }
},*/
   
    //OBTENER DETALLE DE PUBLICACIONES
    async obtenerPublicacionesDeta(idPublicacion) {
      this.isLoading = true
      let params = null
      params = idPublicacion
      let jwt = await getValidToken(this)
      if (jwt != null) {
        this.publicacionesDet = []
        let payload = { jwt: jwt, params: params }
        await this.$store
          .dispatch('publicacion/fetchPublicDet', payload)
          .then((response) => {
            //roger - 16/dic/2022
            if (response.data.mensaje == undefined) {
              this.publicacionesDet = response.data
              console.log('recibio', this.idpublicacion)
              this.idPublicacion = this.publicacionesDet[0].idPublicacion
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
    async viewItem(item) {
      this.editedIndex = this.publicaciones.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.idpublicacion = this.editedItem.idpublicacion
      console.log('text', this.editedItem)
      //await this.obtenerEjercicios()
      await this.obtenerPublicacionesDeta(this.idpublicacion)
     // await this.obtenerAllLicitaciones(this.ejercicio)
      this.dialogC = true
    },
    async deleteItem(item) {
      this.editedIndex = this.publicaciones.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.idpublicacion = this.editedItem.idpublicacion
      await this.obtenerPublicacionesDeta(this.idpublicacion)
      this.deleteItemPrin(item)
    },
    //*=            Section DELTE block            =
    /*=============================================*/
    deleteItemPrin(item) {
      const index = this.publicaciones.indexOf(item)
      confirm('¿Está seguro que desea eliminar este registro?, Se perderan los datos') &&
        this.publicaciones.splice(index, 1)
      for (let i = this.publicacionesDet.length - 1; i >= 0; i--) {
        const det = this.publicacionesDet[i]
        if (det.idpublicacion === item.idPublicacion && det.idLicitacion) {
          this.BorrarPubDet(item.idpublicacion + '/' + det.idLicitacion)
        }
      }
      this.BorrarPub(item.idpublicacion)
    },

    deleteItemDet(item) {
      const index = this.publicacionesDet.indexOf(item)
      confirm('¿Está seguro que desea eliminar este registro?') &&
        this.publicacionesDet.splice(index, 1)
      this.BorrarPubDet(item.idPublicacion + '/' + item.idLicitacion)
    },

    //////////////////////////////////////
    async BorrarPub(index) {
      this.overlay = true
      this.$v.$touch()
      let body = {
        idpublicacion: index,
        estatus: 'CAN',
      }
      let jwt = await getValidToken(this)
      let payload = { jwt: jwt, body: body }
      payload.id = index
      await this.$store
        .dispatch('publicacion/deletePub', payload)
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
          })
          this.overlay = false
        })
    },
    async BorrarPubDet(index) {
      this.overlay = true
      this.$v.$touch()
      let body = {

        idLicitacion: index,
      }
      let jwt = await getValidToken(this)
      let payload = { jwt: jwt, body: body }
      payload.id = index
      await this.$store
        .dispatch('publicacion/deletePubDet', payload)
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
          })
          this.overlay = false
        })
    },
    /*=====  End of Section comment block  ======*/
     async onChangeEjercicio(value) {
      this.editedItem.ejercicio = value.ejercicio
    },
    async onChangePrincipal(value) {
      let jwt = await getValidToken(this)
      this.ejercicioPub = value.ejercicio
      await this.obtenerPublicaciones(jwt, value.ejercicio)
      await this.obtenerAllLicitaciones(jwt, value.ejercicio)
    },
    EjercicioValido() {
      if (this.ejercicio == undefined || this.ejercicio == 0) {
        this.ejercicio = this.ejercicios[0].ejercicio
        //this.ejercicioCap = this.ejercicios[0].sp_ejercicio
      }
      if (this.ejercicio == 0) {
        var currentTime = new Date()
        this.ejercicio = currentTime.getFullYear()
      }
      this.editedItem.ejercicio = this.ejercicio
    },
    formato(opcion, valor) {
      if (opcion == this.eFormatos.IMPORTE) {
        return tools.formatoImporte(valor)
      } else if (opcion == this.eFormatos.MONEDA) {
        return tools.formatoMoneda(valor)
      } else if (opcion == this.eFormatos.FECHA) {
        return tools.convierteNumeroFechaVista(valor)
      } else if (opcion == this.eFormatos.FECHA_NUM) {
        return tools.convierteNumeroFecha(valor)
      } else if (opcion == this.eFormatos.FECHA_FORMATO) {
        return tools.fechaformato(valor)
      } else if (opcion == this.eFormatos.MONEDA_RIGHT) {
        return tools.formatoMonedaRight(valor)
      }
    },
    focusField(id) {
      //Al ejecutarse el focus del campo se selecciona y tomar el foco
      //Seleccionar todo el Campo
      document.getElementById(id).select()
      // nos posicionamos en el siguiente input
      document.getElementById(id).focus()
    },
    //obtener informacion adiccional detalle
    openModal(item) {
      this.modalData = {}
      console.log('informacion', this.modalData)
      this.dialog2 = true
      for (const key in item) {
        const mappedKey = this.headersMap[key]
        if (mappedKey) {
          this.modalData[mappedKey] = item[key]
        }
      }
    },

    checkChanges() {
      console.log('checkChanges()')
      if (this.changed) {
        this.isSure = true
      } else {
        this.close(false)
        this.changed = false
      }
    },

    revCambiosDet() {
      console.log('checkChanges()Det')
      if (this.changedDet) {
        this.isSureDet = true
      } else {
        this.closeDet(false)
        this.changedDet = false
      }
    },
    cancelDet(isSureDet) {
      this.isSureDet = isSureDet
      if (this.isSurDet) {
        this.closeDet(false)
        this.changedDet = false
      }
    },
    closeDet(checkboxDet) {
      this.isSureDet = false
      this.checkboxDet = checkboxDet
      if (!this.checkboxDet) {
        this.dialogDet = false
      }
      //para formulario de detalle
      this.$nextTick(() => {
        this.editedItemDet = Object.assign({}, this.defaultItemDet)
        this.editedIndexDet = -1
      }),
        this.$v.$reset()
    },
    cancel(isSure) {
      this.isSure = isSure
      if (this.isSure) {
        this.close(false)
        this.changed = false
      }
    },
    close(checkbox) {
      this.isSure = false
      this.checkbox = checkbox
      if (!this.checkbox) {
        this.dialogC = false
      }
      //para formulario de detalle
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }),
        this.$v.$reset()
    },
    sumaCampo(key) {
      //console.log('MontoInicial')
      let suma = 0
      for (let x in this.publicacionesDet) {
        if (key == 'MontoInicial') {
          suma -= Number(this.publicacionesDet[x].monto_base)
        } else if (key == 'TotalMonto') {
          suma += Number(this.publicacionesDet[x].monto_base)
        }
      }
      return suma
    },
  },

  ///////termina meotodos/////////////////

  ///////computed////////////////
  computed: {
    //FILTRO PARA OCULTAR EN TABLA LOS QUE TIENEN ESTATUS "CAN"
    filteredPublicaciones() {
      return this.publicaciones.filter((publicacion) => publicacion.estatus !== 'CAN')
    },
    formTitle() {
      return this.editedIndex === -1
        ? 'Nueva convocatoria'
        : 'Convocatoria: #' + this.editedItem.idpublicacion
    },
    TiDetalle() {
      return this.editedIndex === -1
        ? ''
        : 'Detalle de convocatoria: #' + this.editedItem.idpublicacion
    },
    descripcionErrors() {
      const errors = []
      if (!this.$v.editedItem.descripcion.$dirty) return errors
      !this.$v.editedItem.descripcion.required && errors.push('Este campo es requerido')
      return errors
    },
    numPublicacionError() {
      const errors = []
      if (!this.$v.editedItem.numpublicacion.$dirty) return errors
      !this.$v.editedItem.numpublicacion.required && errors.push('Ingrese la clave de convocatoria')
      return errors
    },
    selectLicitacionError() {
      const errors = []
      if (!this.$v.editedItemDet.idlicitacion.$dirty) return errors
      !this.$v.editedItemDet.idlicitacion.required && errors.push('Este campo es requerido')
      return errors
    },
    sp_ejercicioErrors() {
      const errors = []
      if (!this.$v.editedItem.ejercicio.$dirty) return errors
      !this.$v.editedItem.ejercicio.required && errors.push('Este campo es requerido')
      return errors
    },
    selectLicitacion() {
      const errors = []
      if (!this.$v.editedItemDet.idlicitacion.$dirty) return errors
      !this.$v.editedItemDet.idlicitacion.required && errors.push('Este campo es requerido')
      return errors
    },
    validando() {
      let valida = true
      if (this.$v.editedItem.descripcion.$model != '') {
        valida = false
      }
      return valida
    },
  },
}
</script>
<style lang="scss" scoped>
.v-text {
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.v-text-Right {
  //text-align: right;
  direction: rtl;
}
.totales {
  font-size: 20px;
}
.total {
  text-align: end;
}
.centrado {
  text-align: center;
}
</style>
