<template>
  <v-container id="montos" tag="section">
        <base-material-card icon="mdi-counter" color="primary darken-1" inline class="px-5 py-3">
         
          <template v-slot:after-heading></template>
          <template v-slot:corner-button>
            <v-btn
              medium
              class="ma-2"
              elevation="2"
              @click.stop="dialogDeMov = true"
              color="blue darken-1"
              >Registrar Sección</v-btn
            >
            <!-- <v-btn small class="ma-2" elevation="2" @click="calcularDetalle" color="brown darken-1"
              >Total</v-btn
              >-->
          </template>

          <v-card flat>
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

            <v-divider class="mt-3" /><v-col cols="6"> </v-col>
            <v-container fluid :search.sync="search">
              <v-row dense>
                <v-card
                class="mx-auto"
                width="250"
                v-for="(seccion, index) in arregloVisualizacion"
                :key="index"
                >
                <v-card-text>
                  <div><h3>Número Sección:</h3></div>
                  <p class="text-h2 text--primary">
                    {{ seccion.nombre }}
                  </p>
                  <p>Pertenece a:</p>
                  <div class="text--primary" v-for="(usuario, uindex) in filteredUsuarios(seccion)" :key="uindex">
                    {{ usuario.nombres }} {{ usuario.apellidoPaterno }}  {{ usuario.apellidoMaterno }}
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="editItem(seccion)" text color="blue accent-4">
                    Ver Más
                  </v-btn>
                   <v-btn @click="viewItemDet(seccion)" text color="red accent-4">
                    Detalles
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-container>
            <v-col cols="auto">
              <ConfirmationDialog v-model="isSure" @click="cancel" />
              <!---dialog  de ver--->
              <v-dialog
                transition="dialog-bottom-transition"
                max-width="550"
                v-model="dialogDeMov"
                persistent
              >
                <template>
                  <v-card>
                    <v-toolbar dense flat color="blue darken-1" dark>
                      <!--<span class="headline">{{ formTitleView }} </span>-->
                    </v-toolbar>
                    <v-card flat>
                      <v-card inline flat color="white" class="px-5 py-3" ><v-card-text
                              ><v-container class="elevation-1">
                                <ConfirmationDialog v-model="isSureDet" @click="cancelDet" />
                                <v-card-title>
                                  <span class="headline">{{ formTitle }} </span></v-card-title>
                                <v-divider class="mt-3" />
                                <v-row
                                  ><v-col>
                                    <v-row cols="6" md="4"
                                      >
                                      <!--monto--><v-col
                                        ><v-text-field
                                          v-model="$v.editedItem.nombre.$model"
                                          @blur="$v.editedItem.nombre.$touch()"
                                          @input="$v.editedItem.nombre.$reset(), (changed = true)"
                                          text-xs-right
                                          id="monedaInput"
                                          counter="4"
                                          maxlength="4"
                                          label="Numero Sección"
                                          required
                                           @keypress="isNumber($event)"
                                           :error-messages="secErrors"
                                           persistent-hint
                                           ></v-text-field
                                           ></v-col>
                                           <v-col>
                                            <v-autocomplete
                                            :menu-props="{ top: true, offsetY: true }"
                                            v-model="editedItem.coloniasLocalidades"
                                            label="Colonia o Localidad"
                                            :items="colonias"
                                            multiple
                                            clearable
                                            :item-text="(item) => item.nombre"
                                            hint="Seleccione  una opción"
                                            persistent-hint
                                            item-value="id"
                                            ></v-autocomplete
                                            ></v-col>
                                          </v-row>
                                          <v-row> </v-row> <v-divider class="mt-3" />
                                          <v-checkbox
                                          v-model="editedItem.activo"
                                          :label="`Estatus: ${
                                            editedItem.activo.toString() == 'true' ? 'Activo' : 'Inactivo'
                                          }`"
                                          @input="$v.editedItem.activo.$reset(), (changed = true)"
                                          @blur="$v.editedItem.activo.$touch()"
                                          ></v-checkbox>
                                    <v-card-actions><v-spacer></v-spacer>
                                      <v-btn color="red darken-1" @click="checkChanges" text>Cancelar</v-btn>
                                      <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="save"
                                        :disabled="validando">Guardar</v-btn></v-card-actions>
                                  </v-col></v-row>
                              </v-container></v-card-text>
                          </v-card>
                    </v-card>
                  </v-card>
                </template>
              </v-dialog>
            <!---termina dialog de ver--->
            <!--dialog detalle-->
            <v-dialog
                transition="dialog-bottom-transition"
                max-width="720"
                v-model="dialogDetalle"
                persistent>
                <template>
                  <v-card>
                    <v-toolbar dense flat color="blue darken-1" dark>
                      <!--<span class="headline">{{ formTitleView }} </span>-->
                    </v-toolbar>
                    <v-card flat>
                      <v-card inline flat color="white" class="px-5 py-3" ><v-card-text
                              ><v-container class="elevation-1">
                                <v-card-title>
                                  <span class="headline">Detalles</span></v-card-title>
                                <v-divider class="mt-3" />
                                <v-row><v-col>
                                  <v-data-table
                                  :headers="headerDet"
                                  :search.sync="search2"
                                  :items="seccionVisualizacion"
                                  :loading="isLoading"
                                  dense
                                  loading-text="Cargando... Espere por favor"
                                  ></v-data-table>
                                    <v-row> </v-row> <v-divider class="mt-3" />
                                    <v-card-actions><v-spacer></v-spacer>
                                      <v-btn color="red darken-1" @click="dialogDetalle = false" text>Cancelar</v-btn></v-card-actions>
                                  </v-col></v-row>
                              </v-container></v-card-text>
                          </v-card>
                    </v-card>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>
          </v-card>
        </base-material-card></v-container>
</template>
<script>
import { getValidToken } from '@/store/helpers.js'
import ConfirmationDialog from '@/components/general/ConfirmationDialog.vue'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import * as tools from '@/store/modules/tools.store.js'
//import Vue from 'vue'
export default {

  components: {
    ConfirmationDialog,
  },
  data: () => ({
    

    eFormatos: tools.formatos,
    mostrar: false,
    inputNum: 0,
    separados: 0,

    alert: true,
    alert2: true,
    alertAdvertencia: true,
    alertSaldo: true,
    validaGuardar: true,

    search: undefined,
    search2: undefined,

    isLoading: false,
    select: null,
    checkbox: false,
    changed: false,
    changedDet: false,
    changedAnual: false,

    dialog: false,
    dialogDeMov: false,
    dialogDetalle: false,
    /*dialogNewMovDet: false,
    dialog2: false,
    dialogDetxMovimiento: false,
    dialogDetxMovimientoCancelado: false,
    dialogDePresAnual: false,
    dialogCancelar: false,
    dialogDetxAnual: false,
    dialogCancelarMovimiento: false,
    dialogCancelaPrin:false,*/
    valueCancel: false,
    valueCancelDet: false,

    minDate: '2021-01-01',
    maxDate: '2050-01-31',
    fromDateMenu: false,

    isView: false,
    isMov: true,
    isSure: false,
    isSureCancel: false,
    isSureDetalleMov: false,
    isEditingPres: false,
    isEditing: false,
    isEditingDet: false,
    isSolicita: true,
    idEmpleadoAut: 0,
    isSureDet: false,

    checkboxDet: false,

    verificaMonto: true,

    TotalCalculado: 0,

    ///headers///
    headers: [
      //{ text: 'ID', value: 'id' },
      { text: 'NOMBRE', value: 'nombre' },
      { text: 'Activo', value: 'activo' },
      /*{ text: 'Fecha', value: 'fechaDocumento' },
      { text: '$ Monto', value: 'monto' },
      //{ text: 'Cancelado', value: 'cancelado' },*/
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    headerDet: [
      ///{ text: 'Movimiento', value: 'nombre', class: 'blue accent-2' },
      { text: 'Colonia/Localidad', value: 'nombre' },
      { text: 'Tipo', value: 'tipoAcentamiento' },
      //{ text: 'Acciones', value: 'actions', sortable: false },
    ],
    headerPresAnual: [
      { text: 'Ejercicio', value: 'ejercicio' },
      { text: 'Monto', value: 'Monto' },
      { text: 'Proyectos', value: 'proyectos' },
      { text: 'Licitaciones', value: 'licitaciones' },
      { text: 'Contratos', value: 'contratos' },
      { text: 'Estimaciones', value: 'estimaciones' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    headerPresAnualDet: [
      { text: 'Ejercicio', value: 'ejercicio' },
      { text: 'Tipos Presupuesto', value: 'nomTipoPres' },
      { text: 'Clave Presupuesto', value: 'idClaveTipoPres' },
      { text: 'Nombre', value: 'nomClaveTipoPres' },
      { text: 'Monto', value: 'monto' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    headerSaldo: [
      { text: 'Ejercicio', value: 'MontoTotalxTipo' },
      { text: 'Tipos Presupuesto', value: 'SaldoxTipo' },
      { text: 'Clave Presupuesto', value: 'idClaveTipoPres' },
      // { text: 'Nombre', value: 'nomClaveTipoPre' },
      { text: 'Monto', value: 'monto' },
    ],
    headerMvtosCanceladosDet: [
      { text: 'Tipo Presupuesto', value: 'idTipoPres' },
      { text: 'Clave Presupuesto', value: 'idClaveTipoPres' },
      { text: 'Monto', value: 'monto' },
      { text: 'Fecha de cancelación', value: 'cancelado_el' },
    ],
    /* itemsAnual: [
         { text: 'Proyectos',   sub:'Número de proyectos: ',   monto:'Monto',value: 'proyectos' },
         { text: 'Licitaciones',sub:'Número de licitaciones: ',monto:'Monto: ', value: 'licitaciones' },
         { text: 'Contratos',   sub:'Número de contratos: ',   monto:'Monto: ',value: 'contratos' },
         { text: 'Estimaciones',sub:'Número de estimaciones: ',monto:'Monto: ', value: 'estimaciones' },
         { text: 'Anticipos',   sub:'Número de anticipos: ',   monto:'Monto: ',value: 'acticipos' },
      ]*/

    //////
    value: [],
    ejercicio: 0,
    ////Arreglos///
    montos:[],
    secciones:[],
    seccions:[],
    seccionVisualizacion:[],
    arregloVisualizacion: [],
    coloniasLocalidades:[],
    colonias:[],
    usuarios:[],
    usuariosVisualizacion:[],
    items: [],
    ejercicios: [],
    presupuestoAnual: [],
    presupuestoAnualDet: [],
    movimientosDet: [],
    tipo: [],
    descripciontipos: [],
    TipoDes: [],
    tipoMovimiento: [],
    tipoMonto: [],
    tipoDetalle: [],
    MovimientoRecursos: [],
    MovimientosCancelados:[],
    saldo: [],
    //////
    editedIndex: -1,
    editedIndexDet: -1,
    editedIndexDetRec: -1,
    editedIndexPres: -1,
    ///////
    editedItem: {
      idMovimiento: 0,
      ejercicio: '',
      fechaDocumento: '',
      tipoMov: '',
      tipoMonto: '',
      tipo_descripcion: '',
      monto: 0,
      observaciones: '',
      idTipoPres: '',
      activo: true,
    },
    editedItemCanDet:
    {
      motivoCancelacion:''
    },
    editedItemCan:
    {
      motivoCancelacion:''
    },
    editedItemDet: {
      idMovimiento: 0,
      ejercicio: '',
      idTipoPres: '',
      idClaveTipoPres: '',
      monto: 0,
       motivoCancelacion:'',
    },
    editedItemDetCancel: {
       motivoCancelacion:'',
    },
    editedItemDetRec: {
      idMovimiento: 0,
      ejercicio: '',
      idTipoPres: '',
      idClaveTipoPres: '',
      monto: 0,
    },
    editedItemPres: {
      ejercicio: '',
      idTipoPres: '',
      nomTipoPres: '',
      idClaveTipoPres: '',
      nomClaveTipoPres: '',
      monto: '',
    },
    editedItemSaldo: {
      IdMovimiento: 0,
      IdTipoPres: '',
      MontoTotal: 0,
      MontoTotalxTipo: 0,
      SaldoxTipo: 0,
    },
    ///////
    defaultItem: {
      idMovimiento: 0,
      ejercicio: '',
      documento: '',
      fechaDocumento: '',
      tipoMov: '',
      tipoMonto: '',
      monto: '',
      observaciones: '',
      motivoCancelacion:''
    },
    defaultItemDet: {
      idMovimiento: 0,
      ejercicio: '',
      idTipoPres: '',
      nomTipoPres: '',
      idClaveTipoPres: '',
      nomClaveTipoPres: '',
      monto: 0,
    },
    //////
    mixins: [validationMixin],
  }),
  validations: {
    editedItem: {
      ejercicio: { required },
      //tipoMov: { required },
      //documento: { required },
      nombre: { required },
      //tipoMonto: { required },
      
    },
    editedItemCan:
    {
      motivoCancelacion: { required },
    },
    editedItemDet: {
      ejercicio: { required },
      monto: { required },
      idTipoPres: { required },
      idClaveTipoPres: { required },
      motivoCancelacion: { required },
    },
    editedItemDetCancel: {
      motivoCancelacion: { required },
    },
  },
  async created() {
    this.Inicia()
  },
  watch: {
    dialogDeMov(val) {
      val || this.closeDet()
    },
  },
  methods: {


    async Inicia() {
      let jwt = await getValidToken(this)
      await this.obtenerSecciones()
       await this.obtenerSeccion()
       await this.obtenerColonias(jwt)
      await this.obtenerUsuarios()
      await this.obtenerMovimientosDeta()
      //await this.obtenerTipos(jwt)
      this.obtenerTipo(jwt, '')
      await this.obtenerTipoDescripcion('')
      await this.obtenerEjercicioMov()
      await this.obtenerPresupuestoAnualDet()
      await this.obtenerTipoMovimiento(jwt, '')
      this.obtenerTipoMonto(jwt, '')
      await this.obtenerTipoDetalle(jwt)
      await this.obtenerDetxMovimiento(jwt)
      //await this.obtenerDetxMovimientoSaldo('')
      await this.verificarMonto('','')
      console.log()
    },
    filteredUsuarios(seccion) {
      const filteredUsers = this.usuariosVisualizacion.filter(usuario => usuario.seccion.nombre === seccion.nombre);
      if (filteredUsers.length === 0) {
      // No se encontraron usuarios relacionados a esta sección
        return [{ nombres: "No se econtro usuario" }];
      }
      return filteredUsers;
    },
     /*=============================================
    =            OBTENER DATOS            =
    =============================================*/
    async obtenerSeccion(id) {
  this.isLoading = true;
  try {
    let jwt = await getValidToken(this);
    let params = id;
    if (jwt != null) {
      let payload = { jwt: jwt, params: params };
      const response = await this.$store.dispatch('seccion/fetchSeccion', payload);
      if (response.data.mensaje === undefined && response.data.ok === true) {
         if (typeof response.data.seccion === 'object'){
          console.log('Datos recibidos:', response.data.seccion);
          this.seccionVisualizacion = [ ...response.data.seccion.coloniasLocalidades]; // solo muestro su detalle de la seccion
           console.log("ARREGLO", this.seccionVisualizacion) // Asignar el arreglo directamente a this.seccion
        } else {
          //this.seccionVisualizacion = [this.seccion]; 
           console.log("ARREGLO", this.seccionVisualizacion)
          console.log('El arreglo "seccion" no está presente en los datos.');
        }
        this.isLoading = false;
      }
    } else {
      console.log('No se obtuvo un token válido');
    }
  } catch (error) {
    console.error('Error al obtener el token:', error);
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
    async obtenerDetxMovimientoSaldo(idMovimiento, idTipoPres) {
      this.isLoading = true
      let params = null
      ;(params = idMovimiento), idTipoPres
      let jwt = await getValidToken(this)
      if (jwt != null) {
        this.saldo = []
        let payload = { jwt: jwt, params: params }
        await this.$store
          .dispatch('monto/fetchSaldoDet', payload)
          .then((response) => {
            //roger - 16/dic/2022
            if (response.data.mensaje == undefined) {
              this.saldo = response.data
              //this.idMovimiento = this.saldo[0].idMovimiento
              console.log('recibio', this.saldo)
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
      //obtener movimientos con filtro
    /*  async obtenerMovimientos(jwt, filtro) {
      this.isLoading = true
      let params = null
      if (filtro === '') {
        params = 'filtro?campo1=cancelado&tipo1=igual&valor1=0'
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        await this.$store
          .dispatch('monto/fetchMonto', payload)
          .then((response) => {
            this.montos = response.data
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
    },*/
    async obtenerDetxMovimientoCancelados(idTipoPres)
    {
      params = idTipoPres
      let params = null
      let jwt = await getValidToken(this)
      params = 'filtro?campo1=idTipoPres&tipo1=igual&valor1='+ idTipoPres
      +'&logico2=and&campo2=idMovimiento&tipo2=igual&valor2='+ this.idMovimiento 
      +'&logico3=and&tipo3=igual&campo3=cancelado&valor3=1'
      if(jwt != null){
        this.MovimientosCancelados = []
        let payload = {jwt: jwt, params: params}
        await this.$store 
        .dispatch('mvtoDetalle/fetchMontoDet', payload)
        .then((response)=>{
          if(response.data.mensaje == undefined){
            this.MovimientosCancelados = response.data
            this.isLoading = false
            this.idMovimiento = this.MovimientosCancelados[0].idMovimiento
          }
        })
        .catch((err) => {
          this.isLoading = false
          this.$store.commit('ALERT',{
            color: 'error',
            text: err.response.data.error,
          })
        })
      }
    },
    async obtenerDetxMovimiento(idTipoPres) {
      //this.isLoading = true
      params = idTipoPres
      let params = null
      // console.log('VALOR CONSULTA',idTipoPres)
      let jwt = await getValidToken(this)
      params =
        'filtro?campo1=idTipoPres&tipo1=igual&valor1=' +
        idTipoPres +
        '&logico2=and&campo2=idMovimiento&tipo2=igual&valor2=' +
        this.idMovimiento + '&logico3=and&tipo3=igual&campo3=cancelado&valor3=0'
      if (jwt != null) {
        this.MovimientoRecursos = []
        let payload = { jwt: jwt, params: params }
        await this.$store
          .dispatch('mvtoDetalle/fetchMontoDet', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.MovimientoRecursos = response.data
              this.isLoading = false
              this.idMovimiento = this.MovimientoRecursos[0].idMovimiento
              //console.log('VALOR CONSULTA',this.idTipoPres)
              //this.idMovimiento = this.MovimientoRecurso[0].idMovimiento
              //this.idTipoPres = this.MovimientoRecurso[0].idTipoPres
            }
            //this.isLoading = false
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

    //obtenerTipoDetalle
    async obtenerTipoDetalle() {
      //this.isLoading = true
      let params = null
      //console.log(jwt)
      let jwt = await getValidToken(this)

      params = 'filtro?campo1=t.clatip_id&tipo1=igual&valor1=TIPOPRES' //+ tipo

      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.tipoDetalle = []
        await this.$store
          .dispatch('tipo/fetchTipo', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.tipoDetalle = response.data
            }

            //this.isLoading = false
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
    //obtener  tipos
    async obtenerTipo(jwt, tip) {
      //this.isLoading = true
      let params = null
      console.log()
      if (tip === '') {
        params = 'filtro?campo1=t.tipo_activo&tipo1=igual&valor1=1'
      } else {
        params =
          'filtro?campo1=t.tipo_activo&tipo1=igual&valor1=1&logico2=and&campo2=t.clatip_id&tipo2=igual&valor2=' +
          tip
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.tipo = []
        await this.$store
          .dispatch('tipo/fetchTipo', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.tipo = response.data
            }
            //this.isLoading = false
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
    //obtener tipo descripcion
    async obtenerTipoDescripcion(tipo) {
      //this.isLoading = true
      let params = null
      //console.log(jwt)
      let jwt = await getValidToken(this)

      /*params ='filtro?campo1=t.clatip_id&tipo1=igual&valor1=SOL&campo2=t.tipo_clave&tipo2=igual&valor2='*/
      if (tipo != null) {
        if (tipo != '') {
          params = 'filtro?campo1=t.clatip_id&tipo1=igual&valor1=' + tipo
        }
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.TipoDes = []
        await this.$store
          .dispatch('tipo/fetchTipo', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.TipoDes = response.data
            }
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
    //OBTENER EJERICIO DE MOVIMIENTO
    async obtenerEjercicioMov(ejercicio) {
      console.log()
      let params = null
      params = ejercicio
      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.ejercicios = []
        await this.$store
          .dispatch('monto/fetchMonto', payload)
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
    //obtiene tipoMovimiento
    async obtenerTipoMovimiento(jwt, filtro) {
      this.isLoading = true
      let params = null
      if (filtro === '') {
        params = 'filtro?campo1=t.clatip_id&tipo1=igual&valor1=TIPOMOVPRE'
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        await this.$store
          .dispatch('tipo/fetchTipo', payload)
          .then((response) => {
            this.tipoMovimiento = response.data
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
    //tipomonto
    async obtenerTipoMonto(jwt, filtro) {
      this.isLoading = true
      let params = null
      if (filtro === '') {
        params = 'filtro?campo1=t.clatip_id&tipo1=igual&valor1=TIPOMONTOP'
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        await this.$store
          .dispatch('tipo/fetchTipo', payload)
          .then((response) => {
            this.tipoMonto = response.data
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
  
  async obtenerSecciones() {
  this.isLoading = true;
  try {
    let jwt = await getValidToken(this);
    console.log("jwt", jwt)
    if (jwt != null) {
      let payload = { jwt: jwt, params: null };
      await this.$store.dispatch('seccion/fetchMonto', payload)
        .then((response) => {
          this.secciones = [];
          if (response.data.mensaje == undefined && response.data.ok === true) {
            console.log('Datos recibidos:', response.data);
            if (Array.isArray(response.data.secciones)) {
              this.arregloVisualizacion = response.data.secciones;
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


    //AQUI SE OBTIENE EL DETALLE DE MOVIMIENTO
    async obtenerMovimientosDeta(idMovimiento) {
      this.isLoading = true
      let params = null
      params = idMovimiento
      let jwt = await getValidToken(this)
      if (jwt != null) {
        //roger - 16/dic/2022
        //ARREGLO
        this.movimientosDet = []
        let payload = { jwt: jwt, params: params }
        await this.$store
          .dispatch('mvtoDetalle/fetchMontoDet', payload)
          .then((response) => {
            //roger - 16/dic/2022
            if (response.data.mensaje == undefined) {
              this.movimientosDet = response.data
              //console.log("recibio",this.idTipoPres, this.idMovimiento)
              this.idMovimiento = this.movimientosDet[0].idMovimiento
              //this.idTipoPres= this.movimientosDet[0].idTipoPres
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
    //OBTENER PRESUPUESTO ANUAL DET
    async obtenerPresupuestoAnualDet(ejercicio) {
      let params = null
      params = ejercicio
      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.presupuestoAnualDet = []
        await this.$store
          .dispatch('prespuestoAnual/fetchPresupuestoAnualDet', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.presupuestoAnualDet = response.data
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

    /*=====  End OBTENER DATOS ======*/
    /*=============================================
=            Filtros            =
=============================================*/
    //para filtrar  tipo de presupuesto
    async setfilter(value) {
      let jwt = await getValidToken(this)
      if (value) {
        this.obtenerTipoDescripcion(this.editedItemDet.idTipoPres)
      } /*
    else
      {
      this.obtenerTipoDescripcion(this.editedItemDet.idClaveTipoPres)
      }*/
      this.isSolicita = false
      await this.obtenerTipoDescripcion(jwt, value.clatip_id)
      /*console.log('valuar', value)
      console.log('obtener', this.obtenerTipoDescripcion)*/
    },

    /*=====  End of Filtros  ======*/

    /*=============================================
    =            Metodos save         =
    =============================================*/
 async GuardaCancelar() {
      this.overlay = true
      this.$v.$touch()
      if (!this.$v.validandoCa) {
        let body = {
           motivoCancelacion: this.editedItemCan.motivoCancelacion

        }

        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        if (this.editedIndex > -1) {
          payload.id = this.editedItem.idMovimiento
          await this.$store
            .dispatch('monto/addCancelacion', payload)
            .then(() => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'Registro Cancelado correctamente',
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
          Object.assign(this.montos[this.editedIndex], this.editedItem)
        } 
        this.close(this.checkbox)
        this.changed = false
        jwt = await getValidToken(this)
        await this.obtenerMovimientos(jwt, '')
      }
    },
     async GuardaCancelarDetalle() {
      this.overlay = true
      this.$v.$touch()
      if (!this.$v.validandoCaDet) {

        let tipo = ''
        if (this.editedItemDet.idTipoPres.idTipoPres == null) {
          tipo = this.editedItemDet.idTipoPres
        } else {
          tipo = this.editedItemDet.idTipoPres.idTipoPres
        }

        let tipoId = ''
        if (this.editedItemDet.idClaveTipoPres.idClaveTipoPres == null) {
          tipoId = this.editedItemDet.idClaveTipoPres
        } else {
          tipoId = this.editedItemDet.idClaveTipoPres.idClaveTipoPres
        }
        let body = {
          idTipoPres: tipo,
          idClaveTipoPres: tipoId,
          motivoCancelacion: this.editedItemDetCancel.motivoCancelacion    
        }
        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        if (this.editedIndexDet > -1) {
          payload.id = this.editedItemDet.idMovimiento
          await this.$store
            .dispatch('monto/addCancelacionXDetalle', payload)
            .then(() => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'Registro Cancelado correctamente',
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
          Object.assign(this.MovimientoRecursos[this.editedIndexDet], this.editedItem)
        } 
        this.closeCancel(this.checkbox)
        this.changed = false
        jwt = await getValidToken(this)
        await this.obtenerDetxMovimiento(this.idTipoPres)
        await this.obtenerDetxMovimientoSaldo(this.idMovimiento + '/' + this.idTipoPres)
      }
    },
    async save() {
      this.overlay = true
      this.$v.$touch()
      if (!this.$v.validando) {
        let col = ''
        if (this.editedItem.coloniasLocalidades.id == null) {
          col = this.editedItem.coloniasLocalidades
        } else {
          col = this.editedItem.coloniasLocalidades.id
        }
        let body = {
          nombre: this.editedItem.nombre,
          coloniasLocalidades: [col],
          activo: this.editedItem.activo == true ? true : false, 
        }

        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        if (this.editedIndex > -1) {
          payload.id = this.editedItem.id
          await this.$store
            .dispatch('seccion/editSeccion', payload)
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
                text: err.response.data.ok,
              })
              this.overlay = false
            })
        } else {
          await this.$store
            .dispatch('seccion/addSeccion', payload)
            .then((response) => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se creó con éxito',
              })
              this.arregloVisualizacion.push(response.data.ok)
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
        await this.obtenerSeccion()
      }
    },
    /*guardar detalle movimiento*/
    async saveMovimientoDet() {
      this.overlay = true
      //this.$v.$touch()
      if (this.changedDet) {
        let id = ''
        if (this.editedItem.idMovimiento.idMovimiento == null) {
          id = this.editedItem.idMovimiento
        } else {
          id = this.editedItem.idMovimiento.idMovimiento
        }
        let ejer = ''
        if (this.editedItem.ejercicio.ejercicio == null) {
          ejer = this.editedItem.ejercicio
        } else {
          ejer = this.editedItem.ejercicio.ejercicio
        }
        let body = {}
        body = {
          idMovimiento: id,
          ejercicio: ejer,
          idTipoPres: this.editedItemDet.idTipoPres,
          idClaveTipoPres: this.editedItemDet.idClaveTipoPres,
          monto: this.editedItemDet.monto,
        }
        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        if (this.editedIndexDet > -1) {
        body = {
            idMovimiento: id,
            ejercicio: this.editedItemDet.ejercicio,
            idTipoPres: this.editedItemDet.idTipoPres,
            idClaveTipoPres: this.editedItemDet.idClaveTipoPres,
            monto: this.editedItemDet.monto,
          }
          await this.$store
            .dispatch('monto/addMvtoDet', payload)
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
           Object.assign(this.movimientosDet[this.editedIndexDet], this.editedItem.idMovimiento)
        } else {
          //obtener id y ejercicio del movimineto principal
          payload.id = this.editedItem.idMovimiento
          payload.ejer = this.editedItem.ejercicio
          await this.$store
            .dispatch('monto/addMvtoDet', payload)
            .then((response) => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se creó con éxito',
              })
              this.movimientosDet.push(response.data)
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
        //await this.obtenerMovimientosDeta(this.idTipoPres)
        this.isLoading = true
        await this.obtenerDetxMovimiento(this.idTipoPres)
        await this.obtenerDetxMovimientoSaldo(this.idMovimiento + '/' + this.idTipoPres)
      }
    },

    /*=====  End of save ======*/

    isNumber: function (evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },

    async editItem(item) {
      this.isEditing = true
      console.log('Detalle de item princioal', item)
      this.editedIndex = this.arregloVisualizacion.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.activo = this.editedItem.activo == true ? true : false
      this.dialogDeMov = true
    },
    async editItemPres(item) {
      console.log('item', item)
      this.isEditingPres = true
      this.editedIndexPres = this.presupuestoAnual.indexOf(item)
      this.editedItemPres = Object.assign({}, item)
      console.log('ejercicio', this.editedItemPres.ejercicio)
      await this.obtenerPresupuestoAnualDet(this.editedItemPres.ejercicio)
      this.dialogDePresAnual = true
    },

    async editItemDet(item) {
      this.isEditingDet = true
      this.isEditing = true
      console.log('item detalle', item)
      this.editedIndexDet = this.movimientosDet.indexOf(item)
      console.log('item detalle', this.movimientosDet)
      this.editedItemDet = Object.assign({}, item)
      //this.idTipoPres = this.editedItemDet.idTipoPres
      //console.log('Tipo', this.editedItemDet.idTipoPres)
      await this.obtenerMovimientosDeta(this.idMovimiento)
      // this.dialogNewMovDet = true
    },
    async viewItemDet(item) {
      this.isEditing = true
      this.editedIndexDet = this.arregloVisualizacion.indexOf(item)
      this.editedItemDet = Object.assign({}, item)
      this.id = this.editedItemDet.id
      this.dialogDetalle = true
      await this.obtenerSeccion(this.id)
    },
    async cancelItemDet(idTipoPres) {
      this.idTipoPres = idTipoPres
      await this.obtenerDetxMovimiento(idTipoPres)
      //this.dialogDetxMovimiento = true
      await this.obtenerDetxMovimientoSaldo(this.idMovimiento + '/' + idTipoPres)
      this.dialogCancelar = true
     /* this.isEditing = true
      console.log('item', item)
      this.editedIndexDet = this.MovimientoRecursos.indexOf(item)
      this.editedItemDet = Object.assign({}, item)
      this.dialogCancelar = true*/
    },
    async cancelItem(item) {
      this.isEditing = true
      console.log('items de cancelar detalle', item)
      this.editedIndexDet = this.MovimientoRecursos.indexOf(item)
      this.editedItemDet = Object.assign({}, item)
      this.dialogCancelar = true
    },
     async cancelItemPrincipal(item) {
      this.isEditing = true
      console.log('items de cancelar detalle', item)
      this.editedIndexDet = this.MovimientoRecursos.indexOf(item)
      this.editedItemDet = Object.assign({}, item)
      this.dialogCancelaPrin = true
    },
    async viewItemDetAnual(item) {
      console.log('items que trae', item)
      this.editedIndexPres = this.presupuestoAnualDet.indexOf(item)
      this.editedItemPres = Object.assign({}, item)
      this.dialogDetxAnual = true
    },
    async viewItemDetSaldo(idTipoPres) {
      this.alert2 = false
    await this.obtenerDetxMovimientoSaldo(this.idMovimiento + '/' + idTipoPres)
      if (this.MontoSaldo('SaldoxTipo') <= 0) {
        this.validaGuardar = true
        this.verificaMonto = true
        this.alert = true
        this.alertAdvertencia = false
      } else {
        this.verificaMonto = false
        this.alert = false
        this.alert2 = true
        this.alertAdvertencia = false
      }
    },
    /*async viewItemDetSaldos() {
    await this.obtenerDetxMovimientoSaldo(this.idMovimiento + '/' + 'RECURSOS')
    await this.obtenerDetxMovimientoSaldo(this.idMovimiento + '/' + 'UGI')
    await this.obtenerDetxMovimientoSaldo(this.idMovimiento + '/' + 'UBP')
},*/
    checkChangesDet() {
      console.log('checkChangesDet()')
      if (this.changedDet) {
        this.isSureDet = true
      } else {
        this.closeDet(false)
        this.changedDet = false
      }
    },
    cancelDet(isSure) {
      this.isSureDet = isSure
      if (this.isSureDet) {
        this.closeDet(false)
        this.changedDet = false
      }
    },

    closeDet(checkbox) {
      this.isSureDet = false
      this.isSure = false
      this.checkboxDet = checkbox
      if (!this.checkboxDet) {
        // this.dialogDeMov = false
        this.dialogNewMovDet = false
        this.isEditingDet = false
      }
      this.$nextTick(() => {
        this.saldoTitle
      })
      //para formulario de detalle
      this.$nextTick(() => {
        this.editedItemDet = Object.assign({}, this.defaultItemDet)
        this.editedIndexDet = -1
        this.isMov = false
      }),
        this.$v.$reset()
    },
    cancelDialogDet(isSure) {
      this.isSureDet = isSure
      if (this.isSureDet) {
        this.closeDialogDet(false)
        this.changedDet = false
      }
    },

    closeDialogDet(checkbox) {
      this.isSureDet = false
      this.isSure = false
      this.checkboxDet = checkbox
      if (!this.checkboxDet) {
        // this.dialogDeMov = false
        this.dialogDetxMovimiento = false
        this.isEditingDet = false
      }
      /*this.$nextTick(() => {
        this.MontoSaldo('SaldoxTipo')
        console.log('check()',  this.MontoSaldo('SaldoxTipo'))
      
      })*/
      //para arreglo
      this.$nextTick(() => {
        this.editedItemDet = Object.assign({}, this.defaultItemDet)
        this.editedIndexDet = -1
        //this.isMov = false
      }),
        this.$v.$reset()
    },
    checkChangesDialogDet() {
      console.log('checkChangesDetAnual()')
      if (this.changedDet) {
        this.isSure = true
      } else {
        this.closeDialogDet(false)
        this.changedDet = false
      }
    },
    /*=============================================
    =            Salir Presupuesto Anual          =
    =============================================*/
    cancelAnual(isSure) {
      this.isSure = isSure
      if (this.isSure) {
        this.closeAnual(false)
        this.changedAnual = false
      }
    },
    closeAnual(checkbox) {
      this.isSure = false
      this.checkbox = checkbox
      if (!this.checkbox) {
        this.dialogDePresAnual = false
        //this.isEditing = false
      }
    },
    checkChangesDetAnual() {
      console.log('checkChangesDetAnual()')
      if (this.changedAnual) {
        this.isSure = true
      } else {
        this.closeAnual(false)
        this.changedAnual = false
      }
    },
    /*=====  End Salir Presupuesto Anual   ======*/

    /*Movimiento Inicial*/
    cancel(isSure) {
      this.isSure = isSure
      if (this.isSure) {
        this.close(false)
        this.changed = false
      }
    },
    cancelCa(isSureCancel) {
      this.isSureCancel = isSureCancel
      /*if (this.isSureCance) {
        this.close(false)
        this.isSureCance = false
      }*/
    },
    cancelDetMov(isSureDetalleMov) {
      this.isSureDetalleMov= isSureDetalleMov
      if (this.isSureDetalleMov) {
        this.closeCancel(false)
        this.changed = false
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
     checkChangesCancel() {
      if (this.changed) {
        this.isSureDetalleMov = true
      } else {
        this.closeCancel(false)
        this.changed = false
      }
    },
    closeCancel(checkbox) {
      this.isSureDetalleMov = false
      this.checkbox = checkbox
      if (!this.checkbox) {
        this.dialogCancelar = false
        this.dialogCancelaPrin = false
      }
      //para formulario de detalle
      this.$nextTick(() => {
        this.editedItemDetCancel = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }),
        this.$v.$reset()
    },
    close(checkbox) {
      this.isSure = false
      this.checkbox = checkbox
      if (!this.checkbox) {
        this.dialogDeMov = false
        this.isEditing = false
        this.valueCancel = false
         this.valueCancelDet = false
      }
      //para formulario de detalle
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }),
       this.$nextTick(() => {
        this.editedItemCan = Object.assign({}, this.defaultItem)
      }),
        this.$v.$reset()
    },
    /*fin detalle*/
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
    /*calcularDetalle() {
      //Calculo de prueba
     // console.log('SUMA', this.TotalCalculado)
      if (!(Number(this.editedItemDet.monto) == 0)) {
        if (Number(this.editedItemPres.monto) == 0) {
          this.TotalCalculado =
            Number(this.editedItemDet.monto) + Number(this.editedItemPres.monto)
        }
        this.TotalCalculado = this.editedItem.monto
      }
    },*/

    async validaMaximoPresupuesto(muestraMensaje = true) {
      let excede = false
      if (Number(this.editedItemDet.monto) > this.MontoSaldo('SaldoxTipo'))
        excede = await this.verificarMonto(this.editedItemDet.monto)
      this.validaGuardar = false
      if (excede) {
        if (muestraMensaje) {
          //this.alert2 = false
          //this.alertSaldo = true
          this.$store.commit('ALERT', {
            color: 'error',
            text: 'Esta superando el saldo disponible',
             //this.MontoSaldo('SaldoxTipo')//this.editedItem.monto
          })
        }
        this.validaGuardar = true
        //this.verificaMonto = false
      } /*else {
         if (muestraMensaje) {
          //this.alertSaldo = true
       this.$store.commit('ALERT', {
            color: 'info',
            text: 'Monto disponible: ' + this.MontoSaldo('SaldoxTipo')//this.editedItem.monto
          })
            }
            this.verificaMonto = true
      }*/
    },
    async verificarMonto(idMovimiento, idTipoPres) {
      let resultado = false
      let jwt = await getValidToken(this)
      let param = null
      let payload = {}
      if (idTipoPres != null && idMovimiento > 0) {
        param =
          'filtro?campo1=idTipoPres&tipo1=igual&valor1=' +
          idTipoPres +
          '&logico2=and&campo2=idMovimiento&tipo2=igual&valor2=' +
          idMovimiento 
        payload = { jwt: jwt, params: param }
        await this.$store
          .dispatch('mvtoDetalle/fetchMontoDet', payload)
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
        param = idTipoPres
        payload = { jwt: jwt, params: param }
        await this.$store
          .dispatch('mvtoDetalle/fetchMontoDet', payload)
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

    /*=============================================
     =            Section montos         =
     =============================================*/
 
    sumaCampo(key) {
      //console.log('MontoInicial')
      let suma = 0
      for (let x in this.movimientosDet) {
        if (key == 'MontoInicial') {
          suma -= Number(this.movimientosDet[x].monto)
        } else if (key == 'TotalMonto') {
          suma = Number(this.movimientosDet[x].monto)
        } else if (key == 'osDetSubtotal') {
          suma += Number(this.montos[x].monto) // - Number(this.sumaCampo('TotalMonto'))
        }
      }
      return suma
    },
    sumaPresupuestoAnual(key) {
      console.log('Total Anual', sumaAnual)
      let sumaAnual = 0
      for (let x in this.presupuestoAnualDet) {
        if (key == 'MontoAnual') {
          sumaAnual += Number(this.presupuestoAnualDet[x].monto)
        } else if (key == 'TotalAnual') {
          sumaAnual += Number(this.presupuestoAnualDet[x].monto)
        }
      }
      return sumaAnual
    },

    MontoSaldo(key) {
      //console.log('Total Anual')
      let saldos = 0
      for (let x in this.saldo) {
        if (key == 'MontoTotalTipo') {
          saldos = Number(this.saldo[x].MontoTotalxTipo)
        } else if (key == 'SaldoxTipo') {
          saldos = Number(this.saldo[x].SaldoxTipo)
        } else if (key == 'MontoTotal') {
          saldos = Number(this.saldo[x].MontoTotal)
        }
      }
      return saldos
    },
  },
  /*=====  End of Section montos  ======*/
  computed: {
     itemsRender() { 
      return this.MovimientoRecursos.map
      ( item => Object.assign({}, 
        { random: Math.random(), }, item) 
      ) 
    } 
    ,
    /*itemAnual()
      {
        return this.itemsAnual.filter(title =>{
          return title.text === 'Proyectos'  
        })
      }
    ,*/
    formTitle() {
      return this.editedIndex === -1
        ? 'Nueva sección'
        : 'Sección: #' + this.editedItem.nombre
    },
    saldoTitle() {
      return this.editedItemDet.idTipoPres ? '' + this.MontoSaldo('SaldoxTipo') : '' + ''
    },
    formTitleDetalles() {
      return !this.idTipoPres
        ? 'Movimiento por: ' + this.idTipoPres
        : 'Movimiento por: ' + this.idTipoPres
    },
    formTitleAnual() {
      return this.editedIndexPres === -1
        ? 'Presupuesto Anual'
        : 'Detalle de Presupuesto Anual: ' + this.editedItemPres.ejercicio
    },
    formTitleView() {
      return !this.isView
        ? 'Movimiento #' + this.editedItem.idMovimiento
        : 'Movimiento # ' + this.editedItem.idMovimiento
    },
    formTitleDet() {
      return this.editedIndexDet === -1 ? 'Nuevo detalle de movimiento' : 'Detalle'
    },
    EjercicioErrors() {
      const errors = []
      if (!this.$v.editedItem.ejercicio.$dirty) return errors
      !this.$v.editedItem.ejercicio.required && errors.push('Este campo es requerido')
      return errors
    },
    /*DocumentoErrors() {
      const errors = []
      if (!this.$v.editedItem.documento.$dirty) return errors
      !this.$v.editedItem.documento.required && errors.push('Este campo es requerido')
      return errors
    },*/

    tipoMovErrors() {
      const errors = []
      if (!this.$v.editedItem.tipoMov.$dirty) return errors
      !this.$v.editedItem.tipoMov.required && errors.push('Este campo es requerido')
      return errors
    },
    tipoMontoErrors() {
      const errors = []
      if (!this.$v.editedItem.tipoMonto.$dirty) return errors
      !this.$v.editedItem.tipoMonto.required && errors.push('Este campo es requerido')
      return errors
    },
    tipoPresupuestoErrors() {
      const errors = []
      if (!this.$v.editedItemDet.idTipoPres.$dirty) return errors
      !this.$v.editedItemDet.idTipoPres.required && errors.push('Este campo es requerido')
      return errors
    },
    tipoCvePresupuestoErrors() {
      const errors = []
      if (!this.$v.editedItemDet.idClaveTipoPres.$dirty) return errors
      !this.$v.editedItemDet.idClaveTipoPres.required && errors.push('Este campo es requerido')
      return errors
    },
    secErrors() {
      const errors = []
      if (!this.$v.editedItem.nombre.$dirty) return errors
      !this.$v.editedItem.nombre.required && errors.push('Este campo es requerido')
      return errors
    },
    /*detalle*/
    EjercicioDetErrors() {
      const errors = []
      if (!this.$v.editedItemDet.ejercicio.$dirty) return errors
      !this.$v.editedItemDet.ejercicio.required && errors.push('Este campo es requerido')
      return errors
    },
    montoDetErrors() {
      const errors = []
      if (!this.$v.editedItemDet.monto.$dirty) return errors
      !this.$v.editedItemDet.monto.required && errors.push('Ingrese una cantidad')
      return errors
    },
    cancelacionError() {
      const errors = []
      if (!this.$v.editedItemCan.motivoCancelacion.$dirty && !this.$v.editedItemDetCancel.motivoCancelacion.$dirty) return errors
      !this.$v.editedItemCan.motivoCancelacion.required && !this.$v.editedItemDetCancel.motivoCancelacion.required && errors.push('Ingrese un motivo de cancelacion')
      return errors
    },

    /*fin detalle*/
    /*=============================================a
    =            Validador comment block            =
    =============================================*/
       validandoCa() {
      let valida = true
      if (
        this.$v.editedItemCan.motivoCancelacion.$model !='' 
      ) {
        valida = false
      }

      //valida = false
      return valida
    },
      validandoCaDet() {
      let valida = true
      if (
        this.$v.editedItemDetCancel.motivoCancelacion.$model !='' 
        
      ) {
        valida = false
      }

      //valida = false
      return valida
    },
    validando() {
      let valida = true
      if (
        this.$v.editedItem.nombre.$model != '' 
      ) {
        valida = false
      }

      //valida = false
      return valida
    },
    //AQUIII 19
    validandoMovDet() {
      let validar = true
      if (
        //this.$v.editedItemDet.ejercicio.$model != '' &&
        this.$v.editedItemDet.monto.$model != ''
      ) {
        validar = false
      }
      return validar
    },
    //aqui se deshabilita el tab item "Detalle"
    //en el formulario para registro de nuevo presupuesto inicial

    deshabilitaDetalle() {
      let valida = false
      //onsole.log('VERIFICAR ID:', this.editedItem.idMovimiento)
      //activa la pestaña Detalle del dialogDeMov si tiene una id
      if (this.editedItem.idMovimiento == '' 
        /*this.editedItem.motivoCancelacion == ''*/)
       {
        valida = true
      }
      return valida
    },

    /*  deshabilita() {
      let valida = true
      if (
        this.editedItem.tipoMov == '' &&
        this.editedItem.tipoMonto == ''
   
        ) {
        valida = false
      }
      else{
         valida = true
      }
      return valida
    },
    deshabilitaDet (){
   console.log()
      let valida = true
      if(this.editedItemDet.idTipoPres ==''){
        valida = false
      }
      return valida

    },*/
  },

  /*=====  End of   Validador  comment block  ======*/
}
</script>
