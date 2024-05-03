<template>
         <v-container id="data-tables" tag="section">
           <base-material-card icon="mdi-account-multiple-plus" color="primary darken-1" inline class="px-5 py-3">
             <v-spacer></v-spacer>
             <template v-slot:after-heading></template>
             <template v-slot:corner-button>
            <v-btn
              medium
              class="ma-2"
              elevation="2"
              @click.stop="dialogDeMov = true"
              color="blue darken-1"
              >Registrar Ciudadano</v-btn
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
             <ConfirmationDialog v-model="isSure" @click.stop="cancel" />
             <v-dialog
               v-model="dialog"
               :persistent="true"
               :scrollable="true"
               :id="'mi-modal'"
               @hidden="onHidden"
               max-width="500px"
             >
               <v-card>
                 <v-card-title> Información adicional al Proyecto </v-card-title>
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
                   <v-btn color="red darken-1" border="2px solid" text @click="checkChanges">Cerrar</v-btn>
                 </v-card-actions>
               </v-card>
             </v-dialog>
             <!--Empieza segundo modal que muestra a los beneficiarios-->
             <ConfirmationDialog v-model="isSure2" @click="cancel" />
             <v-dialog
               v-model="showBeneficiariesModal"
               :persistent="true"
               :scrollable="true"
               max-width="1000px"
             >
               <v-card>
                 <v-card-title> Beneficiarios </v-card-title>
                 <v-card-text>
                   <v-text-field
                     v-model="searchBen"
                     append-icon="mdi-magnify"
                     class="ml-auto"
                     label="Búsqueda"
                     hide-details
                     single-line
                     style="max-width: 250px"
                   />
                   <v-data-table
                     :headers="beneficiariesHeaders"
                     :items="filteredBeneficiaries"
                     dense
                     :search.sync="searchBen"
                     :loading="isLoading"
                     loading-text="Cargando... Espere por favor"
                     disable-pagination
                     hide-default-footer
                   >
                     <template v-slot:item.actions="{ item }">
                       <v-icon small class="mr-2" @click="openModalDet(item)">mdi-eye</v-icon>
                     </template>
                   </v-data-table>
                 </v-card-text>
                 <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn
                     color="red darken-1"
                     border="2px solid"
                     text
                     @click="showBeneficiariesModal = false"
                     >Cerrar</v-btn
                   >
                 </v-card-actions>
               </v-card>
             </v-dialog>
             <!--Termina segundo modal-->
             <v-dialog v-model="dialog2" max-width="500" :persistent="true" :scrollable="true">
               <v-card>
                 <v-card-title>Información adicional del beneficiario</v-card-title>
                 <v-card-text>
                   <v-row v-for="(value, key) in modalData2" :key="key">
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
       
             <v-divider class="mt-3" />
             <v-data-table
               :headers="headers"
               :items="ciudadanoVisualizacion"
               :search.sync="search"
               :loading="isLoading"
               loading-text="Cargando... Espere por favor"
               disable-pagination
               hide-default-footer
             >
             <template v-slot:[`item.activo`]="{ item }">
              <Status :activostr="item.activo" tipo="String"
            /></template>
             <template v-slot:item.actions="{ item }">
               <v-icon medium class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
               <!-- <v-icon small @click="showBeneficiarios(item.idproy)">mdi-account-group</v-icon>-->
             </template>

             <template v-slot:item.activo="{ item }">
               <Status :activostr="item.activo" tipo="String" />
             </template>

             <template v-slot:no-data>
               <!-- <v-btn color="primary">Reset</v-btn> -->
               ¡No hay datos para mostrar!
             </template>
           </v-data-table>

           <!-- <DataExporter :dataArray="proyectos" :dataFields="fields" fileName="proyectos" /> -->
           <v-col cols="auto">
            <ConfirmationDialog v-model="isSure" @click="cancel" />
            <!---inicia dialogo registrar ciudadano incial--->
            <v-dialog
            transition="dialog-bottom-transition"
            max-width="1020"
            v-model="dialogDeMov"
            persistent
            >
            <template>
              <v-card>
                <v-toolbar dense flat color="blue darken-1" dark>
                <v-tab>
                <v-icon left> mdi-people-multiple-plus</v-icon> Ciudadano #:
                </v-tab>
                </v-toolbar>
                <v-card inline flat color="white" class="px-5 py-3">
                <v-card-text>
                  <v-container class="elevation-1">
                     <v-card-title>
                      <span class="headline">Nuevo Ciudadano </span></v-card-title>
                      <v-divider class="mt-3" />
                      <v-row>
                      <v-col>
                        <v-row>
                         <v-col cols="3">
                          <v-text-field
                          @input="changed = true"
                          dense
                          v-model="editedItem.nombres"
                          label="Nombres*"
                          persistent-hint
                          counter="30"
                          required
                          maxlength="30"
                          ></v-text-field
                          ></v-col>
                            <v-col cols="3">
                          <v-text-field
                          @input="changed = true"
                          dense
                          v-model="editedItem.apellidoPaterno"
                          label="Apellido Paterno*"
                          persistent-hint
                          counter="30"
                          required
                          maxlength="30"
                          ></v-text-field
                          ></v-col>
                            <v-col cols="3"> 
                          <v-text-field
                          @input="changed = true"
                          dense
                          v-model="editedItem.apellidoMaterno"
                          label="Apellido Materno*"
                          persistent-hint
                          counter="30"
                          required
                          maxlength="30"
                          ></v-text-field
                          ></v-col>
                          <v-col cols="3"> 
                            <v-autocomplete
                            :menu-props="{ top: true, offsetY: true }"
                            v-model="editedItem.tipoCiudadano"
                            label="Tipo de ciudadano"
                            dense
                            :items="tiposCiudadanos"
                            :item-text="(item) => item.rol"
                            hint="Seleccione  una opción"
                            persistent-hint
                            item-value="id"
                            ></v-autocomplete
                            ></v-col>
                          </v-row>
                          <v-row>
                         <v-col cols="4">
                          <v-text-field
                          @input="changed = true"
                          dense
                          v-model="editedItem.ine"
                          label="Clave Elector*"
                          persistent-hint
                          counter="30"
                          required
                          maxlength="30"
                          ></v-text-field
                          ></v-col>
                          <v-col cols="2">
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
                            ></v-autocomplete
                            ></v-col>
                        </v-row>
                        <v-row>
                         <v-col cols="2">
                          <v-text-field
                          @input="changed = true"
                          dense
                          label="Teléfono"
                          persistent-hint
                          v-model="editedItem.telefono"
                          counter="15"
                          required
                          maxlength="15"
                          ></v-text-field
                          ></v-col>
                            <v-col>
                          <v-text-field
                          @input="changed = true"
                          dense
                          v-model="editedItem.direccion"
                          label="Dirección"
                          persistent-hint
                          counter="30"
                          required
                          maxlength="30"
                          ></v-text-field
                          ></v-col>
                            <v-col>
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
                            <v-col>
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
                        <v-divider class="mt-3" />
                        <v-card-actions
                        ><v-spacer></v-spacer>
                        <v-btn color="red darken-1" @click="checkChanges" text
                        >Cancelar</v-btn
                        >
                        <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                        
                        >Guardar</v-btn
                        ></v-card-actions
                        >
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </base-material-card>
    </v-container>
       </template>
       
       <script>
       /* eslint-disable-next-line */
       import ConfirmationDialog from '@/components/general/ConfirmationDialog.vue'
       import Status from '@/components/general/StatusInfo.vue'
       import { getValidToken } from '@/store/helpers.js'
       import { validationMixin } from 'vuelidate'
       //import { required, minLength, maxLength } from 'vuelidate/lib/validators'
       // import DataExporter from '@/components/general/DataExporter.vue'
       export default {
         props: ['item'],
         components: {
           // DataExporter,
           Status,
           ConfirmationDialog,
         },
       
         data: () => ({
           search: undefined,
           searchBen: undefined,
           isLoading: false,
           checkbox: false,
           dialog: false,
           dialog2: false,
           showBeneficiariesModal: false,
           selectedProgram: null,
           changed: false,
           isSure: false,
           overlay: false,
           activo: true,
           select: null,
           dialogDeMov: false,
           headers: [
             { text: 'INE', align: 'start', value: 'ine' },
             { text: 'Nombres', align: 'start', value: 'nombres' },
             { text: 'Apellido Paterno', value: 'apellidoPaterno' },
             { text: 'Apellido Materno', value: 'apellidoMaterno' },
             { text: 'Teléfono', value: 'telefono' },
             { text: 'Sección', value: 'seccion.nombre' },
             { text: 'Dirección', value: 'direccion' },
             { text: 'Colonia', value: 'coloniaLocalidad.nombre' },
             { text: 'Activo', value: 'activo' },
             { text: 'Acciones', value: 'actions', sortable: false },
           ],
           beneficiariesHeaders: [
             { text: 'Nombre Completo', value: 'NomcompletoA' },
             { text: 'Localidad', value: 'localidad' },
             { text: 'Municipio', value: 'municipio' },
             { text: 'Accion', value: 'accion' },
             { text: 'Acciones', value: 'actions', sortable: false },
           ],
           headersMap: {
             idproy: 'ID',
             folioMIDS: 'Folio',
             cve_control: 'Núm Control',
             cve_obra: 'Núm Obra',
             UGI: 'UGI',
             region: 'Región',
             numreg: 'Núm Región',
             NomRegion: 'Nombre Región',
             // idmun: 'ID Municipio',
             municipio: 'Municipio',
             // idloc: 'ID Localidad',
             localidad: 'Localidad',
             // idAccionDet: 'ID Accion Detalle',
             // idaccion: 'ID Accion',
             accion: 'Acción',
             ejercicio: 'Ejercicio',
             // idprograma: 'ID Programa',
             nombre: 'Nombre Programa',
             ageb: 'Ageb',
             acciones: 'Acciones',
             hombres: 'Hombres',
             mujeres: 'Mujeres',
             totalben: 'Total Beneficiarios',
             // inicio_obra: 'Fecha de Inicio',
             // fin_obra: 'Fecha de Fin',
             etapa1: 'Etapa 1',
             etapa2: 'Etapa 2',
             // prelici: 'Prelici',
             // agrulic: 'Agrulic',
             // idlicita: 'ID Licitacion',
           },
           headersMap2: {
             id: 'ID',
             accion: 'Acción',
             fecha: 'Fecha',
             folio: 'Folio',
             NomcompletoA: 'Nombre Completo',
             curp: 'CURP',
             rfc: 'RFC',
             sexo: 'Sexo',
             edadCalculada: 'Edad Calculada',
             fechanac: 'Fecha Nacimiento',
             mayahablante: 'Maya Hablante',
             condiscapacidad: 'Discapacidad',
             // tipodiscapacidad: 'Tipo Discapacidad',
             calle: 'Calle',
             numero: 'Número',
             cruza1: 'Cruzamiento 1',
             cruza2: 'Cruzamiento 2',
             colonia: 'SAN PEDRO',
             postal: 'Postal',
             localidad: 'Localidad',
             cve_mun: 'Núm Municipio',
             municipio: 'Municipio',
             latitud: 'Latitud',
             longitud: 'Longitud',
             georeferencia: 'Georeferencia',
             estatus: 'Estatus',
           },
           value: [],
           proyectos: [],
           ciudadanos:[],
           tiposCiudadanos:[],
           colonias:[],
           secciones:[],
           ciudadanoVisualizacion:[],
           editedIndex: -1,
           selectedItem: {},
           modalData: {},
           modalData2: {},
           filteredBeneficiaries: [],
           beneficios: [],
           editedItem: {
             ejercicio: 2022,
             idproy: 0,
             cve_control: 0,
             cve_obra: 0,
             accion: '',
             nombre: '',
             activo: true,
           },
           defaultItem: {
             ejercicio: 2022,
             idproy: 0,
             cve_control: 0,
             cve_obra: 0,
             accion: '',
             nombre: '',
             activo: true,
           },
           fields: {
             Ejercicio: 'ejercicio',
             IdProyecto: 'idproy',
             CVE_Control: 'cve_control',
             CVE_Obra: 'cve_obra',
             Accion: 'accion',
             Nombre: 'nombre',
           },
         }),
         mixins: [validationMixin],
         validations: {},
         computed: {
           //Obtenemos la informacion faltante de la API correspondiente a cada fila
           selectedData() {
             return (
               this.selectedItem &&
               Object.keys(this.selectedItem)
                 .filter((key) => key !== 'action')
                 .reduce((obj, key) => {
                   obj[key] = this.selectedItem[key]
                   return obj
                 }, {})
             )
           },
         },
       
         watch: {
           dialog(val) {
             val || this.close()
           },
         },
         created() {
           this.iniciando()
           this.empezando()
         },
         methods: {
           async iniciando() {
             let jwt = await getValidToken(this)
             await this.obtenerCiudadadnos(jwt)
             await this.obtenerTipos(jwt)
            await this.obtenerColonias(jwt)
            await this.obtenerSecciones(jwt)
           },
  async obtenerCiudadadnos() {
  this.isLoading = true;
  try {
    let jwt = await getValidToken(this);
    console.log("jwt", jwt)
    if (jwt != null) {
      let payload = { jwt: jwt, params: null };
      await this.$store.dispatch('ciudadanos/fetchCiudadanos', payload)
        .then((response) => {
          this.ciudadanos = [];
          if (response.data.mensaje == undefined && response.data.ok === true) {
            console.log('Datos recibidos:', response.data);
            // Verifica si 'secciones' está presente en response.data y es un arreglo
            if (Array.isArray(response.data.ciudadanos)) {
              // Asigna 'secciones' a otro arreglo para visualizarlo en la tabla
              this.ciudadanoVisualizacion = response.data.ciudadanos;
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
async obtenerTipos() {
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
   async save() {
      this.overlay = true
      //this.$v.$touch()
    //  if (!this.$v.validando) {
       let id = ''
        if (this.editedItem.tipoCiudadano.id == null) {
          id = this.editedItem.tipoCiudadano
        } else {
          id = this.editedItem.tipoCiudadano.id
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
              ine: this.editedItem.ine,
              telefono: this.editedItem.telefono,
              direccion: this.editedItem.direccion,
              coloniaLocalidad: col,
              seccion: idsec,
              tipoCiudadano: id,
              activo: this.editedItem.activo == true ? true : false,
    }

        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        if (this.editedIndex > -1) {
          payload.id = this.editedItem.id
          await this.$store
            .dispatch('ciudadanos/editCiud', payload)
            .then(() => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se actualizó con éxito',
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
          Object.assign(this.ciudadanoVisualizacion[this.editedIndex], this.editedItem)
        } else {
         // payload.id = this.editedItem.id
          await this.$store
            .dispatch('ciudadanos/addCiud', payload)
            .then((response) => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se creó  con éxito',
              })
              this.ciudadanoVisualizacion.push(response.data.ok)
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
        await this.obtenerCiudadadnos(jwt)
      //}
    },
    async editItem(item) {
      this.isEditing = true
      console.log('Detalle de item princioal', this.editedIndex)
      this.editedIndex = this.ciudadanoVisualizacion.indexOf(item)
      this.editedItem = Object.assign({}, item)
      //this.editedItem.seccion = this.editedItem.seccion.nombre
      this.idSecccion = this.editedItem.seccion
      this.id = this.editedItem.id
      //aqui se cambia el valor del id
       console.log('editedItem',  this.idSecccion)
      console.log('editedItem', this.editedItem)
      this.editedItem.activo = this.editedItem.activo == 1 ? true : false
      this.dialogDeMov = true
    },
           //Empieza la llamada a la segunda api
           async empezando() {
             let jwt = await getValidToken(this)
             await this.obtenerBeneficiarios(jwt)
           },
           async obtenerBeneficiarios(jwt) {
             this.isLoading = true
             if (jwt != null) {
               let payload = { jwt: jwt }
               this.filteredBeneficiaries = []
               await this.$store
                 .dispatch('beneficiarios/fetchBeneficiarios', payload)
                 .then((response) => {
                   if (response.data.mensaje == undefined) {
                     this.beneficiaries = response.data
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
           //Se abre el primer modal que contiene el resto de la informacion de los proyectos
           openModal(item) {
             this.modalData = {}
             this.dialog = true
             for (const key in item) {
               const mappedKey = this.headersMap[key]
               if (mappedKey) {
                 this.modalData[mappedKey] = item[key]
               }
             }
           },
           //Se abre el segundo modal que muestra a los beneficiarios
           showBeneficiarios(idproy) {
             //this.selectedProgram = item
             this.filteredBeneficiaries = this.beneficiaries.filter(
               (beneficios) => beneficios.idproy === idproy
             )
             this.showBeneficiariesModal = true
           },
           //Se abre el submodal de los beneficiarios donde muestra la informacion restante de los beneficiarios
           openModalDet(item) {
             this.modalData2 = {}
             this.dialog2 = true
             for (const key in item) {
               const mappedKey2 = this.headersMap2[key]
               if (mappedKey2) {
                 this.modalData2[mappedKey2] = item[key]
               }
             }
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
               this.dialogDeMov= false
             }
             this.$nextTick(() => {
              this.editedItem = Object.assign({}, this.defaultItem)
              this.editedIndex = -1
            })
             this.$v.$reset()
           },
           // onHidden() {
           //   this.$nextTick(() => {
           //     const modalBody = document.querySelector('#mi-modal .v-dialog')
           //     if (modalBody) {
           //       modalBody.scrollTop = 0
           //     }
           //   })
           // },
           // deleteItem(item) {
           //   const index = this.proyectos.indexOf(item)
           //   //Confirma cerrar formulario
           //   confirm('Esta seguro que desea eliminar este registro?') && this.proyectos.splice(index, 1)
           //   this.Borrar(item.idproy)
           // },
           // async Borrar(index) {
           //   this.overlay = true
           //   this.$v.$touch()
           //   let body = {
           //     idproy: index,
           //     activo: 0,
           //   }
           //   let jwt = await getValidToken(this)
           //   let payload = { jwt: jwt, body: body }
           //   payload.id = index
           //   await this.$store
           //     .dispatch('proyectos/deleteProyecto', payload)
           //     .then(() => {
           //       this.$store.commit('ALERT', {
           //         color: 'success',
           //         text: 'El registro se eliminó con éxito',
           //       })
           //       this.overlay = false
           //     })
           //     .catch((err) => {
           //       this.$store.commit('ALERT', {
           //         color: 'error',
           //         text: err.response.data.msg,
           //         // Enviar a inicio de sesión
           //       })
           //       this.overlay = false
           //     })
           //   Object.assign(this.proyectos[this.editedIndex], this.editedItem)
           // },
         },
       }
       </script>
       