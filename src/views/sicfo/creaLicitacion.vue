<template>
  <v-container tag="section">
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="1920"
      v-model="dialogLicitaciones"
      persistent
    >
    <v-card>
      <!--------CABECERO DE LICITACIONES---------->
      <v-toolbar  color="brown darken-1" dark>
	  <v-btn icon dark @click="checkChanges">
      <v-icon>mdi-close</v-icon>
	  </v-btn>
	  <v-toolbar-title>Licitación:</v-toolbar-title>
	  <v-spacer></v-spacer>
	  </v-toolbar>
      <v-tabs fixed-tabs background-color="" >
        <v-tabs-slider color="brown darken-1"></v-tabs-slider>
        <v-tab><v-icon right>mdi-form-select</v-icon>Licitación: {{editedItem.idlicitacion}}</v-tab>
        <v-tab  v-if="editedItem.idlicitacion > 0" ><v-icon left>mdi-ballot-recount-outline</v-icon>Detalle de licitaciones</v-tab>
        <v-tab v-if="editedItem.idlicitacion > 0" ><v-icon left>mdi-account-card-outline</v-icon>Concursantes</v-tab>
        <!---licitaciones--->
        <v-tab-item>
          <v-card inline flat color="white" class="px-5 py-3">
            <v-card flat>
              <v-card-text>
                <v-container class="elevation-1">
                  <v-card flat>
                    <v-img src="@/assets/logo_ivey.jpg" width="20%" height="20%"> </v-img>
                    <v-card-title>
                      <span class="headline">{{ formTitle }} </span></v-card-title
                    >
                    <v-divider class="mt-3" />
                    <!-----inicia formulario-->
                    <v-row>
                      <v-col>
                        <!--campo ejercicio-->
                        <v-row>
                            <v-col cols="2">
                             <v-select
                             v-model="$v.editedItem.ejercicio.$model"
                             :items="ejercicios"
                             :menu-props="{ top: true, offsetY: true }"
                             label="Ejercicio*"
                             item-text="ejercicio"
                             item-value="ejercicio"
                             persistent-hint
                             dense
                             hint="Seleciona Ejercicio"
                             return-object
                             :error-messages="sp_ejercicioErrors"
                             @change="onChangeEjercicio"
                             @blur="$v.editedItem.ejercicio.$touch()"
                             >
                             </v-select>
                                  </v-col>
                          <v-col cols="2"
                            ><v-text-field
                              v-model="editedItem.acciones"
                              dense
                              label="Número de acciones"
                              persistent-hint
                              required
                              maxlength="11"
                               @input="$v.editedItem.acciones.$reset(), (changed = true)"
                               @keypress="isNumber($event)"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            ><v-text-field
                              dense
                              v-model="$v.editedItem.numlicitacion.$model"
                              label="Número de licitacion"
                              persistent-hint
                              counter="25"
                              required
                              maxlength="25"
                              return-object
                              :error-messages="LicitacionErrors"
                              @input="
                              $v.editedItem.numlicitacion.$reset(),
                                (editedItem.numlicitacion = editedItem.numlicitacion.toUpperCase())
                              changed = true
                            "
                            ></v-text-field>
                          </v-col>
                          <v-col
                            ><v-text-field
                              dense
                              v-model="editedItem.descripcion"
                              label="Descripción"
                              persistent-hint
                              counter="350"
                              required
                              maxlength="350"
                              @input="changed = true"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-divider class="mt-3" />
                        <v-row>
                          <v-col cols="3" >
                            <v-menu
                              v-model="fromDateMenuBases"
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
                                  v-model="editedItem.fecha_bases"
                                  label="Fecha Bases"
                                  prepend-icon="mdi-calendar-month"
                                  v-bind="attrs"
                                  v-on="on"
                                  id="fecha_bases"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                locale="en-in"
                                year-icon="mdi-calendar-blank"
                                prev-icon="mdi-skip-previous"
                                next-icon="mdi-skip-next"
                                v-model="editedItem.fecha_bases"
                                color="brown darken-1"
                                :min="minDate"
                                :max="maxDate"
                                @input=";(fromDateMenu = false), (changed = true)"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="3">
                            <v-menu
                              v-model="fromDateMenuEnvio"
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
                                  v-model="editedItem.fecha_envio"
                                  label="Fecha de envio"
                                  prepend-icon="mdi-calendar-month"
                                  v-bind="attrs"
                                  v-on="on"
                                  id="fecha_envio"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                locale="en-in"
                                year-icon="mdi-calendar-blank"
                                prev-icon="mdi-skip-previous"
                                next-icon="mdi-skip-next"
                                v-model="editedItem.fecha_envio"
                                color="brown darken-1"
                                :min="minDate"
                                :max="maxDate"
                                @input=";(fromDateMenu = false), (changed = true)"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="3">
                            <v-menu
                              v-model="fromDateMenuPub"
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
                                  v-model="editedItem.fecha_pub"
                                  label="Fecha de publicación"
                                  prepend-icon="mdi-calendar-month"
                                  v-bind="attrs"
                                  v-on="on"
                                  id="fecha_pub"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                locale="en-in"
                                year-icon="mdi-calendar-blank"
                                prev-icon="mdi-skip-previous"
                                next-icon="mdi-skip-next"
                                v-model="editedItem.fecha_pub"
                                color="brown darken-1"
                                :min="minDate"
                                :max="maxDate"
                                @input=";(fromDateMenu = false), (changed = true)"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                             <v-col cols="3" >
                            <v-menu
                              v-model="fromDateMenuVisita"
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
                                  v-model="editedItem.fecha_visita"
                                  label="Fecha de visita"
                                  prepend-icon="mdi-calendar-month"
                                  v-bind="attrs"
                                  v-on="on"
                                  id="fecha_visita"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                locale="en-in"
                                year-icon="mdi-calendar-blank"
                                prev-icon="mdi-skip-previous"
                                next-icon="mdi-skip-next"
                                v-model="editedItem.fecha_visita"
                                color="brown darken-1"
                                :min="minDate"
                                :max="maxDate"
                                @input=";(fromDateMenu = false), (changed = true)"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                        <v-divider class="mt-3" />
                        <v-row>
                          <v-col cols="3">
                            <v-menu
                              v-model="fromDateMenuJunta"
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
                                  v-model="editedItem.fecha_junta"
                                  label="Fecha de junta"
                                  prepend-icon="mdi-calendar-month"
                                  v-bind="attrs"
                                  v-on="on"
                                  id="fecha_junta"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                locale="en-in"
                                year-icon="mdi-calendar-blank"
                                prev-icon="mdi-skip-previous"
                                next-icon="mdi-skip-next"
                                color="brown darken-1"
                                v-model="editedItem.fecha_junta"
                                :min="minDate"
                                :max="maxDate"
                                @input=";(fromDateMenu = false), (changed = true)"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="3">
                            <v-menu
                              v-model="fromDateMenuApertura"
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
                                  v-model="editedItem.fecha_apertura"
                                  label="Fecha de apertura"
                                  prepend-icon="mdi-calendar-month"
                                  v-bind="attrs"
                                  v-on="on"
                                  id="fecha_apertura"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                locale="en-in"
                                year-icon="mdi-calendar-blank"
                                prev-icon="mdi-skip-previous"
                                next-icon="mdi-skip-next"
                                v-model="editedItem.fecha_apertura"
                                color="brown darken-1"
                                :min="minDate"
                                :max="maxDate"
                                @input=";(fromDateMenu = false), (changed = true)"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="3">
                            <v-menu
                              v-model="fromDateMenuFallo"
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
                                  v-model="editedItem.fecha_fallo"
                                  label="Fecha de fallo"
                                  prepend-icon="mdi-calendar-month"
                                  v-bind="attrs"
                                  v-on="on"
                                  id="fecha_fallo"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                locale="en-in"
                                year-icon="mdi-calendar-blank"
                                prev-icon="mdi-skip-previous"
                                next-icon="mdi-skip-next"
                                color="brown darken-1"
                                v-model="editedItem.fecha_fallo"
                                :min="minDate"
                                :max="maxDate"
                                @input=";(fromDateMenu = false), (changed = true)"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="3">
                            <v-menu
                              v-model="fromDateMenuFechaInicio"
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
                                  v-model="editedItem.fecha_inicio"
                                  label="Fecha de inicio"
                                  prepend-icon="mdi-calendar-month"
                                  v-bind="attrs"
                                  v-on="on"
                                  id="fecha_inicio"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                locale="en-in"
                                year-icon="mdi-calendar-blank"
                                prev-icon="mdi-skip-previous"
                                next-icon="mdi-skip-next"
                                color="brown darken-1"
                                v-model="editedItem.fecha_inicio"
                                :min="minDate"
                                :max="maxDate"
                                @input=";(fromDateMenu = false), (changed = true)"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="3">
                            <v-menu
                              v-model="fromDateMenuFechaTermino"
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
                                  v-model="editedItem.fecha_termino"
                                  label="Fecha de termino"
                                  prepend-icon="mdi-calendar-month"
                                  v-bind="attrs"
                                  v-on="on"
                                  id="fecha_fallo"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                locale="en-in"
                                year-icon="mdi-calendar-blank"
                                prev-icon="mdi-skip-previous"
                                next-icon="mdi-skip-next"
                                color="brown darken-1"
                                v-model="editedItem.fecha_termino"
                                :min="minDate"
                                :max="maxDate"
                                @input=";(fromDateMenu = false), (changed = true)"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                           <!--<v-col cols="4">
                              <v-text-field
                              v-model="editedItem.estatus"
                              label="Estatus"
                              prepend-icon="mdi-alert"
                              placeholder="CAP"
                              item-value="CAP"
                              readonly
                              @input="
                              changed = true
                            "
                              >                           
                              </v-text-field>
                            </v-col>-->
                            <v-col cols="5"
                              ><v-text-field
                                v-model="$v.editedItem.monto_base.$model"
                                label="Monto base"
                                persistent-hint
                                @blur="$v.editedItem.monto_base.$touch()"
                                @change="$v.editedItem.monto_base.$reset(),(changed = true)"
                                required
                                return-object
                                @keypress="isNumber($event)"
                                prepend-icon="mdi-currency-usd"
                                :error-messages="montoError"
                              ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider class="mt-3" />
                        <v-card-actions
                          ><v-spacer></v-spacer>
                          <v-btn color="red darken-1" @click="checkChanges" text
                            >Salir</v-btn
                          ><v-btn color="primary darken-1" :disabled="validando"  text @click="saveNuevLicitacion">Guardar</v-btn>
                          </v-card-actions
                        >
                      </v-col>
                    </v-row>
                  </v-card>
                  <!----fin formulario--->
                </v-container>
              </v-card-text>
            </v-card>
          </v-card>
        </v-tab-item>
        <!----detalle licitaciones---->
        <v-tab-item>
          <v-card inline flat color="white" class="px-5 py-3">
            <v-card flat>
              <v-card-text>
                <v-container class="elevation-1">
                  <template>
                    <v-col>
                      <template>
                        <!--<v-btn color="brown darken-1" dark class="mb-2"> opcion </v-btn>-->
                      
                        <v-divider class="mt-2"/>
                        <!--<v-toolbar-title>Filtrar</v-toolbar-title>-->
                        <v-divider class="mx-2" inset vertical></v-divider>
                      </template>
                    </v-col>
                    <v-row>
                      <v-col>
                        <v-row>
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-autocomplete
                            v-model="editedItem.idreg"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Seleccione una opción"
                            dense
                            hint="FILTRAR POR REGION"
                            persistent-hint
                            @change="setfilterRegion"
                            :item-text="(item) => item.region"
                            :items="AllRegiones"
                            item-value="idreg"
                            id="idreg"
                     
                          >
                          </v-autocomplete>
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-autocomplete
                            v-model="editedItem.idmunicipio"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Seleccione una opción"
                            dense
                            @change="setFilterMunicipio"
                            hint="FILTRAR POR MUNICIPIO"
                            persistent-hint
                            :item-text="(item) =>item.idmunicipio + '-' +item.municipio"
                            :items="localidades"
                            item-value="idmunicipio"
                            id="idmunicipio"
                          >
                          </v-autocomplete>
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-autocomplete
                           v-model="editedItem.id"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Seleccione una opción"
                            dense
                            hint="FILTRAR POR LOCALIDAD"
                            :item-text="(item) => item.id + '-' + item.localidad"
                            persistent-hint
                            @change="setfilterXloc"
                            :items="localidades"
                            item-value="id"
                            id="id"
                     
                          >
                          </v-autocomplete>
                          <v-divider class="mx-4" inset vertical></v-divider>

                        </v-row>
                      </v-col>
                    </v-row>
                    <v-alert
                    v-model="alert"
                    colored-border
                    elevation="2"
                    type="warning"
                    v-if="showAlert"
                    border="bottom"
                    >
                    Recuerde <strong>GUARDAR</strong> para realizar cambios
                  </v-alert>
                  </template>
                  <!-----------TABLA1------------->
                  <v-row>
                    <v-col>
                      <v-data-table
                        @change="onChange"
                        v-model="selectedItemsTableOne"
                        :headers="headersXLicitar"
                        :search.sync="search"
                        :items="noLicitaciones"
                        :single-select="singleSelect"
                        item-key="idproy"
                        show-select
                        :items-per-page="itemsPerPage"
                        :loading="isLoading"
                        :value="singleSelect"
                        dense
                        loading-text="Cargando... Espere por favor"
                      >
                       <template v-slot:[`item.actions`]="{ item }">
                        <v-icon medium @click="openModalLici(item)">mdi-information-slab-circle</v-icon>
                      </template>
                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title>Proyectos No Licitados</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <template>
                             <v-btn
                                color="brown darken-1"
                                v-model="button"
                                dark
                                small
                                class="ma-2"
                                elevation="2"
                                :disabled="selectedItemsTableOne.length === 0"
                                @click="saveProyectoXLicitar"
                              >
                                Mover y Guardar Selección
                              </v-btn>
                            </template>
                          </v-toolbar>
                          <v-row>
                            <v-col>
                              <v-row>
                                <v-col>
                                </v-col>
                                <v-col>
                                  <!---CAMPO DE BUSQUEDA-->
                                  <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Búsqueda"
                                    hide-details
                                    single-line
                                    style="max-width: 230px"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                          <v-divider />
                        </template> </v-data-table
                    ></v-col>
                    <!-------------TERMINA TABLA1-------------->
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <!-----------TABLA2------------->
                    <v-col>
                      <!---CAMPO DE BUSQUEDA-->
                      <v-data-table
                        v-model="selectedItemsTableTwo"
                        :headers="headersNoLicitaciones"
                        :search.sync="search2"
                        :items="seleccionados"
                        :single-select="singleSelect2"
                        item-key="idproy"
                        show-select
                        :items-per-page="itemsPerPage"
                        
                        :loading="isLoading"
                        dense
                        loading-text="Cargando... Espere por favor"
                      >

                       <template v-slot:[`item.actions`]="{ item }">
                        <v-icon medium @click="openModalLici(item)">mdi-information-slab-circle</v-icon>
                      </template>
                        <template v-slot:top>

                          <v-toolbar flat>
                            <v-toolbar-title>Proyectos Por Licitar</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <template>
                             <v-btn
                                color="brown darken-1"
                                dark
                                small
                                class="ma-2"
                                elevation="2"
                                :disabled="selectedItemsTableTwo.length == 0"
                                @click="SetProyectNoLicitados"
                              >Devolver y Guardar Selección
                              </v-btn>
                            </template>
                          </v-toolbar>
                          <v-row>
                            <v-col>
                              <v-row>
                                <v-col>
                                  <v-switch
                                  v-model="singleExpand"
                                  label="Aplicar filtros"
                                  class="mt-2"
                                  ></v-switch>
                                <v-spacer></v-spacer>
                                </v-col>
                                  <!---CAMPO DE BUSQUEDA-->
                                  <v-col>
                                  <v-text-field
                                    v-model="search2"
                                    append-icon="mdi-magnify"
                                    label="Búsqueda"
                                    hide-details
                                    single-line
                                    style="max-width: 230px"
                                  ></v-text-field>
                                </v-col>
                    
                              </v-row>
                            </v-col>
                          </v-row>
                          <v-divider />
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-row>
                  <!-------------TERMINA TABLA2-------------->
                </v-container>
              </v-card-text>
              <v-divider class="mt-3" />
              <v-card-actions
                ><v-spacer></v-spacer>
                <v-btn color="red darken-1" @click.stop="checkChanges" text
                  >Salir</v-btn
                ></v-card-actions>
            </v-card>
            <v-row> </v-row>
          </v-card>
        </v-tab-item>
        <!--termina detalle licitaciones-->
        <!---------contratistas--------->
        <v-tab-item>
        <v-card inline flat color="white" class="px-5 py-3">
            <v-card flat>
              <v-card-text>
                <v-container class="elevation-1">
                    <v-alert
                    v-model="alertContratist"
                    colored-border
                    elevation="2"
                    type="warning"
                    border="bottom"
                    v-if="showAlertCont">Recuerde <strong>Guardar</strong> todos los cambios
                  </v-alert>
                      <!-----------TABLA1------------->
                  <v-row>
                    <v-col>
                      <v-data-table
                        @change="onChange"
                        v-model="selectedItemsContra1"
                        :headers="headersContratis"
                        :search.sync="searchContr"
                        :items="contratistas"
                        :single-select="singleSelect"
                        item-key="idcontratista"
                        show-select
                        :items-per-page="itemsPerPage"
                        :loading="isLoading"
                        :value="singleSelect"
                        dense
                        loading-text="Cargando... Espere por favor"
                      >    
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-icon medium @click="openModalContra(item)">mdi-information-slab-circle</v-icon>
                      </template>
                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title>Concursantes</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <template>
                              <v-btn
                                color="brown darken-1"
                                v-model="button"
                                dark
                                small
                                class="ma-2"
                                elevation="2"
                                :disabled="selectedItemsContra1.length == 0"
                                @click="SetContraXLicitacion"
                              >
                                Asignar selección
                              </v-btn>
                            </template>
                          </v-toolbar>
                          <v-row>
                            <v-col>
                              <v-row>
                                <v-col>
                                </v-col>
                                <v-col>
                                  <!---CAMPO DE BUSQUEDA-->
                                  <v-text-field
                                    v-model="searchContr"
                                    append-icon="mdi-magnify"
                                    label="Búsqueda"
                                    hide-details
                                    single-line
                                    style="max-width: 230px"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                          <v-divider />
                        </template> </v-data-table
                    ></v-col>
                    <!-------------TERMINA TABLA1-------------->
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <!-----------TABLA2------------->
                    <v-col>
                      <!---CAMPO DE BUSQUEDA-->
                      <v-data-table
                        v-model="selectedItemsContra2"
                        :headers="headersXContratis"
                        :search.sync="search2"
                        :items="xContratar"
                        :single-select="singleSelect2"
                        item-key="idcontratista"
                        show-select
                        :items-per-page="itemsPerPage"
                        :loading="isLoading"
                        dense
                        loading-text="Cargando... Espere por favor"
                      >
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-icon medium @click="openModalContra(item)">mdi-information-slab-circle</v-icon>
                      </template>
                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title>Por agregar</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <template>
                              <!--<p>Seleccione para eliminar contratista(s) de la lista</p>-->
                              <v-divider class="mx-2" inset vertical></v-divider>
                            <br>
                             <v-btn 
                             :disabled="selectedItemsContra2.length == 0" 
                             @click="deleteContratistaList" color="brown darken-1" 
                             dark 
                             small 
                             class="ma-2" 
                             elevation="2" >
                                Eliminar
                              </v-btn>
                            </template>
                          </v-toolbar>
                          <v-row>
                            <v-col>
                              <v-row>
                                <v-col>
                                </v-col>
                                <v-col>
                                  <!---CAMPO DE BUSQUEDA-->
                                  <v-text-field
                                    v-model="search2"
                                    append-icon="mdi-magnify"
                                    label="Búsqueda"
                                    hide-details
                                    single-line
                                    style="max-width: 230px"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                          <v-divider />
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-row>
                  <!-------------TERMINA TABLA2-------------->
                  </v-container>
                </v-card-text>
                <v-divider class="mt-3" />
                <v-card-actions
                ><v-spacer></v-spacer>
                <v-btn color="red darken-1" @click.stop="checkChanges" text
                >Salir</v-btn
                ></v-card-actions >
                  </v-card>
                  </v-card>  
         </v-tab-item> 
      </v-tabs>
    </v-card>
      <!----------FINALIZA CABECERO DE LICITACIONES-------------->
    </v-dialog>
    <ConfirmationDialog v-model="isSure" @click="cancel" />
    <base-material-card color="brown darken" icon="mdi-form-select" inline class="px-5 py-3">
      <template v-slot:corner-button>
        <v-row>
        <v-col cols="5">
        <v-btn
          small
          class="ma-2"
          elevation="2"
          color="brown darken-1"
          @click="NuevoRegistro()"
          @click.stop="dialogLicitaciones = true"
          >Nuevo registro</v-btn>
        </v-col>
        <v-col cols="5">
              <v-select
                v-model="ejercicioLi"
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
      <v-text-field
        v-model="searchPrincipal"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Búsqueda"
        hide-details
        single-line
        style="max-width: 250px"
      ></v-text-field>
          
      <v-divider class="mt-3" /><v-col cols="6"> </v-col>
      <v-data-table
        v-model="selectedItemsTableOne"
        :headers="headerLicitacionesPricipal"
        :search.sync="searchPrincipal"
        :loading="isLoading"
        :single-select="singleSelect"
        :items="licitaciones"
        disable-pagination
        hide-default-footer
        item-key="idcontratista"
        loading-text="Cargando... Espere por favor"
      >
      <template v-slot:top>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="openModal(item)">mdi-information-slab-circle</v-icon>
    </template>
    <template v-slot:no-data> ¡No hay datos para mostrar! </template>
    <template v-slot:item.monto_base="{ item }">
      {{ formato(eFormatos.MONEDA, item.monto_base) }}
    </template>
  </v-data-table>
	  <!---------modal mas info---------->
       <v-dialog v-model="dialogInfo" max-width="500" :persistent="true" :scrollable="true">
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
                   <v-btn color="red darken-1" border="2px solid" text @click="dialogInfo=false">Cerrar</v-btn>
                 </v-card-actions>
               </v-card>
             </v-dialog>
<!----------------------->
    </base-material-card>
  </v-container>
</template>
<script>
import { getValidToken } from '@/store/helpers.js'
import ConfirmationDialog from '@/components/general/ConfirmationDialog.vue'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import * as tools from '@/store/modules/tools.store.js'

export default {
  components: {
    ConfirmationDialog,
  },
  data() {
    return {
       searchQuery: '',
       municipiosId: 0,
      eFormatos: tools.formatos,
      singleSelect: false,
      singleSelect2: false,
      singleExpand: false,
      itemsPerPage: 10,
      search: undefined,
      search2: undefined,
      searchPrincipal:undefined,
      searchContr:undefined,
      searchXcontr:undefined,

      button: false,

      alert: true,
      alertContratist: true,

      isSure: false,

      showAlert: false,
      showAlertCont: false,
      checkbox: false,
      changed: false,

      isLoading: false,
      isEditing: false,

      dialogNuevo: false,
      dialogLicitaciones: false,
	    dialogInfo: false,

      minDate: '2021-01-01',
      maxDate: '2050-01-31',

      fromDateMenu: false,
      fromDateMenuFallo: false,
      fromDateMenuBases: false,
      fromDateMenuEnvio: false,
      fromDateMenuPub: false,
      fromDateMenuVisita: false,
      fromDateMenuJunta: false,
      fromDateMenuApertura: false,
      fromDateMenuFechaInicio: false,
      fromDateMenuFechaTermino: false,

      sgteGpoFirmaSol:0,

      selected: [],
      selectedRecibe: [],
      seleccionados: [],
      selectedItemsTableTwo: [],
      selectedItemsTableOne: [],

      selectedItemsContra1:[],
      selectedItemsContra2:[],

      modalData:[],

      headersXLicitar: [
        { text: 'ID Proyecto', align: 'start', value: 'idproy', seleccionado: false },
      //  { text: 'Clave Control', value: 'cve_control' },
        { text: 'Clave de obra', value: 'cve_obra' },
		   // { text: 'folioMIDS', value: 'folioMIDS' },
        { text: 'Municipio', value: 'municipio' },
        { text: 'Localidad', value: 'localidad' },       
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      headersNoLicitaciones: [
        { text: 'ID Proyecto', align: 'start', value: 'idproy', seleccionado: false },
        //{ text: 'Clave Control', value: 'cve_control' },
        { text: 'Clave de obra', value: 'cve_obra' },
		    //{ text: 'folioMIDS', value: 'folioMIDS' },
        { text: 'Municipio', value: 'municipio' },
        { text: 'Localidad', value: 'localidad' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      headerLicitacionesPricipal: [
        { text: 'Id licitacion', value: 'idlicitacion' },
        { text: 'Acciones', value: 'acciones', sortable: false },
        //{ text: 'Descripción', value: 'descripcion', sortable: false },
        { text: 'Número de licitacion', value: 'numlicitacion', sortable: false },
        {text: 'Inicio', value: 'fecha_inicio'},
        {text: 'Termino', value: 'fecha_termino'},
        { text: 'Monto', value: 'monto_base', sortable: false },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
	   headersMap: {
            descripcion: 'Descripción',
          },
     headersContratis:[
          { text: 'Id Contratista', value: 'idcontratista' },
          { text: 'Empresa', value: 'empresa' },
          { text: 'RFC', value: 'rfc' },
          //  { text: 'CMIC', value: 'cmic' },
          { text: 'Acciones', value: 'actions', sortable: false },
      ],
      headersXContratis:[
          { text: 'Id Contratista', value: 'idcontratista' },
          { text: 'Empresa', value: 'empresa' },
          { text: 'RFC', value: 'rfc' },
          { text: 'Num Lic', value: 'numlicitacion' },
    
      ],
      headerInfoContra:
        { representante: 'Representante',
          manifestacion: 'Manifestación',
          constancias:  'Constancias',
          cmic: 'CMIC'
        },
        headerInfoLici:{
          cve_control:'Clave Control',
          folioMIDS: 'folioMIDS',
          ejercicio: 'Ejercicio',
          UGI: 'UGI',
          municipio: 'Municipio',
          accion: 'Acción',
          nombre: 'Programa',
          NomRegio:"Region",
        },
      noLicitaciones: [],
      licitaciones: [],
      xContratar:[],
      contratistas:[],
      ejercicios:[],
      municipios:[
        { id: 0, municipio: 'Traer todos los municipios' }
        ],
      localidades:[],
      AllRegiones:[],
      
      editedIndex: -1,
      defaultItem:{
        idlicitacion: 0,
        ejercicio: 0,
        acciones: '',
        descripcion: '',
        numlicitacion: '',
        fecha_bases: '',
        fecha_envio: '',
        fecha_pub: '',
        fecha_visita: '',
        fecha_junta: '',
        fecha_apertura: '',
        fecha_fallo: '',
        fecha_contrato: '',
        fecha_inicio: '',
        fecha_termino: '',
        fecha_plazo: '',
        monto_base: '',
        estatus: 'CAP'
      },
      editedItem: {
        idlicitacion: 0,
        ejercicio: 0,
        acciones: '',
        descripcion: '',
        numlicitacion: '',
        fecha_bases: '',
        fecha_envio: '',
        fecha_pub: '',
        fecha_visita: '',
        fecha_junta: '',
        fecha_apertura: '',
        fecha_fallo: '',
        fecha_contrato: '',
        fecha_inicio: '',
        fecha_termino: '',
        fecha_plazo: '',
        monto_base: '',
        //inicio: '',
        estatus: 'CAP',
        id:0,
        idreg: 0
      },

       mixins: [validationMixin],
    }
  },
   validations: {
    editedItem: {
      numlicitacion: { required },
      monto_base:{required},
      ejercicio:{required},
    }
  },
  async created() {
    this.Inicia()
  },
  watch: {
    dialogDeMov(val) {
      val || this.closeDet()
    },
    selectedItemsTableOne(value){
    this.showAlert = value !== '';
    },
     selectedItems(value){
    this.showAlert = value !== '';
    },
    selectedItemsContra1(value)
    {
      this.showAlertCont = value !=='';
    },
    selectedItemsContra2(value)
    {
      this.showAlertCont = value !==''; 
    },
  },
  methods: {
     onChange() {
      this.showAlert = false;
      this.showAlertCont = false;
    },
    async Inicia() {
      let jwt = await getValidToken(this)
      await this.obtenerNoLicitaciones(0)
      await this.obtenerLicitaciones(jwt, '')
      //await this.obtenerAllLicitaciones()
      //await this.getContraristasAll()
      //await this.getLictXContra()
      await this.obtenerEjercicios(jwt)
      
      console.log('this.ejercicioLi ' + this.ejercicioLi)
      if (this.ejercicioLi == undefined || this.ejercicioLi == 0) {
        this.ejercicioLi = this.ejercicios[0].ejercicio
      }
      await this.obtenerAllLicitaciones(jwt, this.ejercicioLi)
      this.EjercicioValido()
    },
    async metodoFiltros(){

      await this.getAllRegiones()
      await this.getAllMunicipios()
      await this.getAllLocalidades()
    },
    /*================================================
    =            funciones para registrar            =
    ================================================*/
    async saveNuevLicitacion() {
      this.overlay = true
      this.$v.$touch() 
      if (!this.$v.validando) {
      /*let est=''
      if(this.editedItem.estatus.estatus == null){
        est = this.editedItem.estatus
      }else{
        est = this.editedItem.estatus.estatus
      }*/
        let body = {
          //estatus: est,
          ejercicio: this.editedItem.ejercicio,
          acciones: this.editedItem.acciones,
          descripcion: this.editedItem.descripcion,
          numlicitacion: this.editedItem.numlicitacion,
          fecha_bases: this.editedItem.fecha_bases,
          fecha_envio: this.editedItem.fecha_envio,
          fecha_pub: this.editedItem.fecha_pub,
          fecha_visita: this.editedItem.fecha_visita,
          fecha_junta: this.editedItem.fecha_junta,
          fecha_apertura: this.editedItem.fecha_apertura,
          fecha_fallo: this.editedItem.fecha_fallo,
          monto_base: this.editedItem.monto_base,
          fecha_inicio: this.editedItem.fecha_inicio,
          fecha_termino: this.editedItem.fecha_termino,
        }

        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        if (this.editedIndex > -1) {
          payload.id = this.editedItem.idlicitacion
          await this.$store
            .dispatch('licitaciones/editLicitacion', payload)
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
          Object.assign(this.licitaciones[this.editedIndex], this.editedItem)
        } else {
           //payload.est = this.editedItem.estatus
          await this.$store
            .dispatch('licitaciones/addLicitacion', payload)
            .then((response) => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se creó con éxito',
              })
              this.licitaciones.push(response.data)
              this.overlay = false
            })
           this.Refreesca()
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
        await this.obtenerAllLicitaciones(jwt)
      }
    },
        async Refreesca(){
           this.obtenerAllLicitaciones()
},
     /////////////////////////////////////
    async saveProyectoXLicitar() {
  if (this.selectedItemsTableOne.length > 0) {
    let jwt = await getValidToken(this)
    let idlicitacion = this.editedItem.idlicitacion  //  ajusta el valor de idlicitacion según tus necesidades
    this.error = ''

    for (var i in this.selectedItemsTableOne) {
      let idproy = this.selectedItemsTableOne[i].idproy
      let body = {
        idproy: idproy,
      }
      let payload = { jwt: jwt, body: body, id: idlicitacion }
      this.$store
        .dispatch('licitaciones/moveProyectos', payload)
        .then(() => {
        })
        .catch((err) => {
          this.error = err
        })
    }
    if (this.error === '') {
      //FUNCION PARA MANIPULAR LOS DATOS
      this.moveSelectedItemsTableOne();
    } else {
      this.$store.commit('ALERT', {
        color: 'error',
        text: this.error,
      })
    }
  }
},
 /*NuevoRegistro() {
    this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.EjercicioValido()
    },*/
  EjercicioValido() {
    console.log("this," , this.ejercicio)
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
// para filtro
 async onChangeEjercicio(value) {
      this.editedItem.ejercicio = value.ejercicio
    },
    async onChangePrincipal(value) {
      let jwt = await getValidToken(this)
      this.ejercicioLi = value.ejercicio
      await this.obtenerAllLicitaciones(jwt, value.ejercicio)
    },
   async SetProyectNoLicitados() {
  if (this.selectedItemsTableTwo.length > 0) {
     console.log("arrel", this.selectedItemsTableOne)
    let jwt = await getValidToken(this)
    let idlicitacion = 0  // O ajusta el valor de idlicitacion según tus necesidades
    this.error = ''

    for (var i in this.selectedItemsTableTwo) {
      let idproy = this.selectedItemsTableTwo[i].idproy

      let body = {
        idproy: idproy,
      }
      let payload = { jwt: jwt, body: body, id: idlicitacion }
      this.$store
        .dispatch('licitaciones/moveProyectos', payload)
        .then(() => {
          // Todo correcto, no es necesario hacer nada aquí en este caso
        })
        .catch((err) => {
          this.error = err
        })
    }
    if (this.error === '') {
      //FUNCION PARA MANIPULAR LOS DATOS
      this.moveSelectedItemsTableTwo();
    } else {
      this.$store.commit('ALERT', {
        color: 'error',
        text: this.error,
      })
    }
  }
},
async SetContraXLicitacion() {
  if (this.selectedItemsContra1.length > 0) {
    let jwt = await getValidToken(this)
    let idlicitacion = this.editedItem.idlicitacion 
    this.error = ''
    for (var i in this.selectedItemsContra1) {
    // let idlicitacion = this.selectedItemsContra1[i].idlicitacion
      let idcontratista = this.selectedItemsContra1[i].idcontratista
      let body = {
        idlicitacion: idlicitacion,
        idcontratista: idcontratista
      }
      let payload = { jwt: jwt, body: body, id: idlicitacion }
      this.$store
        .dispatch('licitaciones/addContratistaXLic', payload)
        .then(() => {
        })
        .catch((err) => {
          this.error = err
        })
    }
    if (this.error === '') {
      //FUNCION PARA MANIPULAR LOS DATOS
       this.moveSelectedItemsContra();
    } else {
      this.$store.commit('ALERT', {
        color: 'error',
        text: this.error,
      })
    }
  }
},

    /*=====  End of funciones para registrar  ======*/
    
    /*=============================================
    =    Section funciones para traer datos           =
    =============================================*/
 async obtenerNoLicitaciones(municipiosId, idreg,id) {
    let params = 'filtro?campo1=idlicita&tipo1=igual&valor1=0';

    if (municipiosId > 0 && idreg > 0 && id > 0) {
      params +=
        '&logico2=and&campo2=p.region&tipo2=igual&valor2=' +
        idreg +
        '&logico3=and&campo3=idmun&tipo3=igual&valor3=' +
        municipiosId +  '&logico4=and&campo4=idloc&tipo4=igual&valor4=' + id;
    } else if (municipiosId > 0) {
      params += '&logico2=and&campo2=idmun&tipo2=igual&valor2=' + municipiosId;
    } else if (idreg > 0) {
      params += '&logico2=and&campo2=p.region&tipo2=igual&valor2=' + idreg;
    } else if (id > 0){
      params += '&logico2=and&campo2=idloc&tipo2=igual&valor2=' + id;
    }

  let jwt = await getValidToken(this);

  if (jwt != null) {
    this.noLicitaciones = [];
    let payload = { jwt: jwt, params: params };
    try {
      const response = await this.$store.dispatch("licitaciones/fetchLicit", payload);
      if (response.data.mensaje === undefined) {
        this.noLicitaciones = response.data;
        this.isLoading = false;
        this.idproy = this.noLicitaciones[0].idproy;
      }
    } catch (err) {
      this.isLoading = false;
      this.$store.commit("ALERT", {
        color: "error",
        text: err.response.data.error,
      });
    }
  }
},
async obtenerEjercicios(jwt) {
      //this.isLoading = true
      let params = 'licitacion'
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
async getLictXContra(idlicitacion) {
       this.isLoading = true
      let params = null
      params = idlicitacion
      let jwt = await getValidToken(this)
      if (jwt != null) {
        this.xContratar = []
        let payload = { jwt: jwt, params: params }
        await this.$store
          .dispatch('licitaciones/fetchLicXContratis', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.xContratar = response.data
              this.idlicitacion = this.xContratar[0].idlicitacion
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
    //trae todas ls regiones para el select
     async getAllRegiones() {
      this.isLoading = true
      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: null }
        this.AllRegiones = []
        await this.$store
          .dispatch('licitaciones/fetchProyFilRegion', payload)
          .then((response) => {
            this.AllRegiones = response.data
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
   async getAllMunicipios() {
      this.isLoading = true;
      let jwt = await getValidToken(this);
      if (jwt != null) {
        let payload = { jwt: jwt, params: null };
        this.municipios = [];
        await this.$store
          .dispatch('licitaciones/fetchProyFilMunicipio', payload)
          .then((response) => {
            this.municipios = response.data;
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            this.$store.commit('ALERT', {
              color: 'error',
              text: err.response.data.error,
            });
          });
      }
    },
      async getAllLocalidades() {
      this.isLoading = true
      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: null }
        this.localidades = []
        await this.$store
          .dispatch('licitaciones/fetchProyFilLocalidades', payload)
          .then((response) => {
            this.localidades = response.data
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
async obtenerLicitaciones(idlicitacion, municipiosId, idreg, id) {
  let params = 'filtro?campo1=idlicita&tipo1=igual&valor1=' + idlicitacion;

  // Verificar si se deben aplicar filtros adicionales solo si el switch está activado
  if (this.singleExpand) {
    if (municipiosId > 0 && idreg > 0 && id > 0) {
      params +=
        '&logico2=and&campo2=p.region&tipo2=igual&valor2=' +
        idreg +
        '&logico3=and&campo3=idmun&tipo3=igual&valor3=' +
        municipiosId +
        '&logico4=and&campo4=idloc&tipo4=igual&valor4=' +
        id;
    } else if (municipiosId > 0) {
      params += '&logico2=and&campo2=idmun&tipo2=igual&valor2=' + municipiosId;
    } else if (idreg > 0) {
      params += '&logico2=and&campo2=p.region&tipo2=igual&valor2=' + idreg;
    } else if (id > 0) {
      params += '&logico2=and&campo2=idloc&tipo2=igual&valor2=' + id;
    }
  }
  await this.ejecutarObtenerLicitaciones(params); // Llamada a la función que realiza la obtención de las licitaciones.
},

async ejecutarObtenerLicitaciones(params) {
  let jwt = await getValidToken(this);
  if (jwt != null) {
    this.seleccionados = [];
    let payload = { jwt: jwt, params: params };
    try {
      const response = await this.$store.dispatch('licitaciones/fetchLicit', payload);
      if (response.data.mensaje === undefined) {
        this.seleccionados = response.data;
        this.isLoading = false;
        this.idproy = this.seleccionados[0].idproy;
      }
    } catch (err) {
      this.isLoading = false;
      this.$store.commit('ALERT', {
        color: 'error',
        text: err.response.data.error,
      });
    }
  }
},
    async obtenerAllLicitaciones(jwt, ejercicio) {
      this.isLoading = true
      let params = null
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
      async getContraristasAll(idlicitacion) {
      this.isLoading = true
      let params = null
      params = idlicitacion
      let jwt = await getValidToken(this)
      if (jwt != null) {
        this.contratistas = []
        let payload = { jwt: jwt, params: params }
        await this.$store
          .dispatch('licitaciones/fetchContrXLic', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.contratistas = response.data
              this.idlicitacion = this.contratistas[0].idlicitacion
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
     async getFilterReg(idreg) {
      let params = null
      let jwt = await getValidToken(this)
      if (idreg != null) {
        if (idreg != '') {
          params = 'filtro?campo1=p.region&tipo1=igual&valor1=' + this.editedItem.idreg
        }
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.municipios = []
        await this.$store
          .dispatch('licitaciones/fetchProyFilMunicipio', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.municipios = response.data
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
     async getFilterLocalidades(idmun) {
      let params = null
      let jwt = await getValidToken(this)
      if (idmun != null) {
        if (idmun != '') {
          params = 'filtro?campo1=idmun&tipo1=igual&valor1=' + this.editedItem.idmun
        }
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.localidades = []
        await this.$store
          .dispatch('licitaciones/fetchLicit', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.localidades = response.data
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
    //trae municipios por region
      async getFilterMunicipio(region) {
      let params = null
      let jwt = await getValidToken(this)
      if (region != null) {
        if (region != null) {
          region = 'filtro?campo1=p.region&tipo1=igual&valor1=' + region
        }
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.localidades = []
        await this.$store
          .dispatch('licitaciones/fetchLicit', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.localidades = response.data
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
     async getFilterMuniXLici(idmun, idlicitacion) {
      let params = null
      params = idlicitacion
      let jwt = await getValidToken(this)
      if (idmun != null) {
        if (idmun != '') {
          params = 'filtro?campo1=idlicita&tipo1=igual&valor1='+ this.editedItem.idlicitacion +'&logico2=and&campo2=idmun&tipo2=igual&valor2=' + this.editedItem.idmun
        }
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.seleccionados = []
        await this.$store
          .dispatch('licitaciones/fetchLicit', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.seleccionados = response.data
              this.idproy = this.seleccionados[0].idproy;
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
         async getFilterLocXLici(idloc, idlicitacion) {
      let params = null
      params = idlicitacion
      let jwt = await getValidToken(this)
      if (idloc != null) {
        if (idloc != '') {
          params = 'filtro?campo1=idlicita&tipo1=igual&valor1='+ this.editedItem.idlicitacion +'&logico2=and&campo2=idloc&tipo2=igual&valor2=' + this.editedItem.idloc
        }
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.seleccionados = []
        await this.$store
          .dispatch('licitaciones/fetchLicit', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.seleccionados = response.data
              this.idproy = this.seleccionados[0].idproy;
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
     async getFilterXLoc(idloc) {
      let params = null
      let jwt = await getValidToken(this)
      if (idloc != null) {
        if (idloc != '') {
          params = 'filtro?campo1=idlicita&tipo1=igual&valor1=0&logico2=and&campo2=idloc&tipo2=igual&valor2=' + this.editedItem.idloc
        }
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.noLicitaciones = []
        await this.$store
          .dispatch('licitaciones/fetchLicit', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.noLicitaciones = response.data
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
      async getFilterAllLocXMun(idloc) {
      let params = null
      let jwt = await getValidToken(this)
      if (idloc != null) {
        if (idloc != '') {
          params = 'filtro?campo1=idloc&tipo1=igual&valor1=' + this.idloc
        }
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.localidades = []
        await this.$store
          .dispatch('licitaciones/fetchLicit', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.localidades = response.data
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

async setfilterRegion(value) {
  if (value) {
    this.getAllRegiones(this.editedItem.idreg);
     this.region = this.editedItem.idreg;
     //this.getFilterMunicipio( this.region)
  }
  await this.obtenerNoLicitaciones(' ',this.editedItem.idreg,' ' );
  await this.obtenerLicitaciones(this.editedItem.idlicitacion,' ',this.editedItem.idreg,' ' )
},

async setFilterMunicipio(value) {
  if (value) {
    this.getAllLocalidades(this.editedItem.idmunicipio);
    this.municipiosId = this.editedItem.idmunicipio;
    await this.obtenerNoLicitaciones(this.municipiosId,' ', ' ');
    await this.obtenerLicitaciones(this.editedItem.idlicitacion,this.municipiosId,' ', ' ')
  }
},
 async setfilterXloc(value) {
    if (value) {
      this.getAllLocalidades(this.editedItem.id);
    }
    await this.obtenerNoLicitaciones(' ',' ',this.editedItem.id);
    await this.obtenerLicitaciones(this.editedItem.idlicitacion,' ',' ',this.editedItem.id)
  },
deleteContratistaList() {
  this.deleteContrXLic(this.idcontratista + '/' + this.editedItem.idlicitacion);
},
  async deleteContrXLic() {
  if (this.selectedItemsContra2.length > 0) {
    let idlicitacion = this.editedItem.idlicitacion 
       for (var i in this.selectedItemsContra2) {
      let idcontratista = this.selectedItemsContra2[i].idcontratista
      let body = {
         idcontratista: idcontratista
      }
      let jwt = await getValidToken(this)
      let payload = { jwt: jwt, body: body, id: idlicitacion }
      payload.id = idcontratista + '/' + this.editedItem.idlicitacion
      await this.$store
        .dispatch('licitaciones/deleteContratXLici' , payload)
        .then(() => {
          this.$store.commit('ALERT', {
            color: 'success',
            text: 'El registro se eliminó con éxito',
          })
        })
        .catch((err) => {
          this.$store.commit('ALERT', {
            color: 'error',
            text: err.response.data.msg,
          })
        })
          this.moveSelectedItemsXcontra();
      }
    }
},
    isNumber: function (evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
	//obtener informacion adiccional detalle
        openModal(item) {
             this.modalData = {}
             this.dialogInfo = true
             for (const key in item) {
               const mappedKey = this.headersMap[key]
               if (mappedKey) {
                 this.modalData[mappedKey] = item[key]
               }
             }
		    },
        openModalContra(item) {
             this.modalData = {}
             this.dialogInfo = true
             for (const key in item) {
               const mappedKey = this.headerInfoContra[key]
               if (mappedKey) {
                 this.modalData[mappedKey] = item[key]
               }
             }
        },
        openModalLici(item) {
             this.modalData = {}
             this.dialogInfo = true
             for (const key in item) {
               const mappedKey = this.headerInfoLici[key]
               if (mappedKey) {
                 this.modalData[mappedKey] = item[key]
               }
             }
        },

/*===================================================
=  Funciones para mover datos de tablas licitaciones  =
=====================================================*/
 // SE EJECUTAN AMBAS FUNCIONES PARA MOVER ITEMS DE TALBLA PROYECTOS NO LICITADOS
/*async  someFunction() {
  try {
    await this.saveProyectoXLicitar(); // Primero, ejecuta la función saveProyectoXLicitar para guardar los cambios
    this.moveSelectedItemsTableOne(); // Luego, ejecuta la función moveSelectedItems para mover los items de una tabla a otra
  } catch (error) {
    console.error(error);
    // Manejar el error 
  }
},*/

//MANIPULAR ITEMS PARA DATOS DE TABLAS PROYECTOS NO LICITADOS A PROYECTOS POR LICITAR
  moveSelectedItemsTableOne() {
    //arreglo de la tabla 1 donde se guardan  temporalmente los registros a mover
          this.selectedItemsTableOne.forEach((item) => {
    // Añadir a la lista seleccionados arrglo de tabal 2
          this.seleccionados.unshift(item);
    //noLicitaciones. Array de la lista de la tabla 1, donde se seleccionan los item
    // Eliminar de la lista noLicitaciones
          const index = this.noLicitaciones.indexOf(item);
          this.noLicitaciones.splice(index, 1);
          });
          this.selectedItemsTableOne = [];
          this.$store.commit('ALERT', {
            color: 'success',
            text: 'Se movió correctamente a Licitación',
          });
          this.alert = false;
        },
      //MANIPULAR ITEMS PARA DATOS DE TABLAS PROYECTOR POR LICITAR A PROYECTOS NO LICITADOS
        moveSelectedItemsTableTwo() {
          this.selectedItemsTableTwo.forEach((item) => {
            this.noLicitaciones.unshift(item)
            const index = this.seleccionados.indexOf(item)
            this.seleccionados.splice(index, 1)
            this.noLicitaciones.splice(0, item)
          })
          this.selectedItemsTableTwo = []
          this.$store.commit('ALERT', {
            color: 'success',
            text:  'Se movió correctamente a No Licitados'
          })
          this.alert = false;
        },
/*=====  Termina funciones para mover datos de tablas licitaciones  ======*/
/*===================================================
=  Funciones para mover datos de tablas contratistas  =
=====================================================*/
        moveSelectedItemsContra(){
          this.selectedItemsContra1.forEach((item) =>{
          this.xContratar.unshift(item);
          const index = this.contratistas.indexOf(item);
          this.contratistas.splice(index, 1);
          this.xContratar.splice(0, item)
          })
          this.selectedItemsContra1 =[]
          this.$store.commit('ALERT', {
            color: 'success',
            text: 'El registro se agrego con éxito'
          })
          this.alertContratist = false;
        },
        moveSelectedItemsXcontra(){
          this.selectedItemsContra2.forEach((item) =>{
            this.contratistas.unshift(item);
            const index = this.xContratar.indexOf(item)
            this.xContratar.splice(index, 1);
            this.contratistas.splice(0, item)
          })
          this.selectedItemsContra2 = []
          this.$store.commit('ALERT', {
            color: 'success',
             text: 'El registro se eliminó con éxito',
          })
            this.alertContratist = false;
        },
/*=====  Termina funciones para mover datos de tablas contratistas ======*/
      mounted() {
        this.getAllMunicipios();
      // Recuperar los datos del almacenamiento local
      const seleccionados = localStorage.getItem('seleccionados')

      // Verificar si hay datos en el almacenamiento local
      if (seleccionados !== null) {
        this.seleccionados = JSON.parse(seleccionados)
      }
    },
    async editItem(item) {
      this.isEditing = true
      this.editedIndex = this.licitaciones.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.idlicitacion= this.editedItem.idlicitacion
      console.log("item", item)
      await this.obtenerNoLicitaciones(0)
      await this.obtenerLicitaciones(this.idlicitacion)
      await this.getLictXContra(this.idlicitacion)
      await this.getContraristasAll(this.idlicitacion)
      await this.metodoFiltros()
       await this.obtenerEjercicios()
      this.dialogLicitaciones = true
    },
 
   
    /*=====  End of funciones para traer datos ======*/
    /*=============================================
         =            Section formatos block            =
         =============================================*/
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
  
    /*=====  End of Section formatos block  ======*/
    checkChanges() {
      console.log('checkChanges()')
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
        this.dialogLicitaciones = false
        this.singleExpand = false
      }
      //para formulario de detalle
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
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

  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Nuevo registro'
        : 'Licitación: #' + this.editedItem.idlicitacion
    },
    LicitacionErrors() {
      const errors = []
      if (!this.$v.editedItem.numlicitacion.$dirty) return errors
      !this.$v.editedItem.numlicitacion.required && errors.push('Este campo es requerido')
      return errors
    },
     montoError() {
      const errors = []
      if (!this.$v.editedItem.monto_base.$dirty) return errors
      !this.$v.editedItem.monto_base.required && errors.push('Este campo es requerido')
      return errors
    },
    sp_ejercicioErrors() {
      const errors = []
      if (!this.$v.editedItem.ejercicio.$dirty) return errors
      !this.$v.editedItem.ejercicio.required && errors.push('Este campo es requerido')
      return errors
    },
		 deshabilitaDetalle() {
      let valida = false
      //onsole.log('VERIFICAR ID:', this.editedItem.idMovimiento)
      //activa la pestaña Detalle del dialogDeMov si tiene una id
      if (this.editedItem.idpublicacion == '' 
        /*this.editedItem.motivoCancelacion == ''*/)
       {
        valida = true
      }
      return valida
    },
 validando() {
      let valida = true
      if (
        this.$v.editedItem.monto_base.$model != '' &&
		this.$v.editedItem.numlicitacion.$model !=''
      ) {
        valida = false
      }
      return valida
    },


  },
}
</script>

<style scoped>
  .text-center {
  text-align: center;
}
</style>