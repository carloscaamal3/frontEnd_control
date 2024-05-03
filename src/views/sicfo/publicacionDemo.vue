<template>
<v-container>
<base-material-card icon="mdi-archive-arrow-down-outline " color="brown darken-1" inline class="px-5 py-3">
<template v-slot:corner-button>
	<v-btn small class="ma-2" elevation="2"
	color="brown darken-1" @click
  ="dialogC = true" >Nuevo Registro
	</v-btn> 
</template>
<v-card flat>
	<v-spacer></v-spacer>
    <v-divider class="mt-3"/>
	<v-spacer></v-spacer>
    <!---TABLA PRINCIPAL---->
    <v-data-table
    :headers="headers"
    :items="publicaciones"
    :search.sync="search"
    :loading="isLoading"
	dense
    loading-text="Cargando... Espere por favor"
    disable-pagination
    hide-default-footer>
    <template v-slot:no-data>
      ¡No hay datos para mostrar en este movimiento!
    </template>
    <!--<template v-slot:[`item.actions`]="{ item }">
      <v-icon medium class="mr-2">mdi-eye</v-icon>
    </template>-->
  </v-data-table>
  </v-card>
  <!------------------dialogo--------------------->
   <v-dialog
  hide-overlay
  transition="dialog-bottom-transition"
  v-model="dialogC"
  persistent
  max-width="920px">
  <v-card >
      
    <v-toolbar dark color="brown">
    <v-btn icon dark >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-toolbar-title>Convocatoria:</v-toolbar-title>
    <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
                <v-card inline flat color="white" class="px-5 py-3">
                 <v-card flat>
                  <v-container class="elevation-1">
                    <v-card-text>
                     <v-card flat>
                       <!--<v-img src="@/assets/logo_ivey.jpg" width="20%" height="20%"> </v-img>-->
                       <v-card-title>
                        <span class="headline"></span></v-card-title
                        >
                        <v-divider class="mt-3" />
                        <!-----inicia formulario-->
                        <v-row>
                          <v-col>
                            <!--campo Descripcion-->
                            <v-row>
                              <v-col cols="3" 
                              ><v-text-field
                              v-model="editedItem.estatus"
                              label="Estatus"
                              persistent-hint
                              placeholder="CAP"
                              maxlength="10"
                               @input="changed = true"
                             @blur="$v.editedItem.estatus.$touch()"
                              >
                            </v-text-field>
                            </v-col>
                          </v-row>
                       <v-row cols=" 6" md="4">
                        <v-col cols="3">
                           <v-menu
                            v-model="fromDateMenu"
                            dense
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                              v-model="editedItem.fechapublicacion"
                              label="Fecha de publicacion"
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
                    v-model="editedItem.descripcion"
                     dense
                     label="Descripcion"
                     persistent-hint
                     counter="200"
                     maxlength="200"
                     @input="changed = true"
                    @blur="$v.editedItem.descripcion.$touch()"
                     ></v-text-field>
                          </v-col>
                      </v-row>
                      <v-card-actions
                      ><v-spacer></v-spacer>
                      <v-btn color="red darken-1" text
                      >Salir</v-btn
                      ><v-btn color="primary darken-1" @click="savePublicacionNueva"   text>Guardar</v-btn>
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
   </v-card-text>
 </v-card>
</v-dialog>
</base-material-card>
</v-container>
</template>
<script>
//import * as tools from '@/store/modules/tools.store.js'
import { getValidToken } from '@/store/helpers.js'

export default  {
data: () => ({
	search:undefined,
	isLoading: false,
  dialogC: false,
  minDate: '2021-01-01',
  maxDate: '2050-01-31',
  fromDateMenu: false,
		   headers: [
            { text: 'Id Convocatoria', value: 'idpublicacion' },
            { text: 'Descripción', value: 'descripcion' },
            { text: 'Fecha Publicación', value: 'fechapublicacion' },
            { text: 'Acciones', value: 'actions', sortable: false },
            ],
       editedIndex: -1,
		   publicaciones: [],
       editedItem:
       {
        id:0,
       idpublicacion: 0,
       descripcion: '',
       fechapublicacion: '',
       estatus: 'CAP',
       }
	}),
  async created() {
            this.Inicia()
          },
   methods:{
  async Inicia(){
    let jwt = await getValidToken(this)
     await this.obtenerPublicaciones(jwt)
    console.log()
  },
 	/////FUNFIONES GET//
 	async obtenerPublicaciones() {
              console.log
              this.isLoading = true
              let jwt = await getValidToken(this)
              if (jwt != null) {
                let payload = { jwt: jwt, params: null }
                this.publicaciones= []
                await this.$store
                .dispatch('publicacion/fetchPublicacionCab', payload)
                .then((response) => {
                  this.publicaciones = response.data
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
      async savePublicacionNueva() {
      //this.overlay = true
      //this.$v.$touch()
      ///if (!this.$v.validando) {
      console.log("ESTATUS",this.editedItem.estatus)
      console.log("Descripcion",this.editedItem.descripcion)
      console.log("FECHA",this.editedItem.fechapublicacion)
        let body = {
          //estatus: encodeURI(this.editedItem.estatus),
          //fechapublicacion:encodeURI(this.editedItem.fechapublicacion)
          estatus:this.editedItem.estatus,
          fechapublicacion:this.editedItem.fechapublicacion,
          descripcion: this.editedItem.descripcion
        }
        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        if (this.editedIndex > -1) {
          payload.id = this.editedItem.idpublicacion
          await this.$store
            .dispatch('publicacion/addPublicacionNueva', payload)
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
        } else {
          await this.$store
            .dispatch('publicacion/addPublicacionNueva', payload)
             //console.log(payload)
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
      //}
    },
          
 },

 }
</script>

