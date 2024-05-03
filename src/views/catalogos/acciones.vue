<template>
  <v-tabs fixed-tabs background-color="brown darken-1" dark>
    <v-tabs-slider color="yellow"></v-tabs-slider>
    <v-tab><v-icon left> mdi-floor-plan </v-icon>Acciones</v-tab>
    <v-tab><v-icon right> mdi-ballot-outline</v-icon>Detalle Acciones </v-tab>
    <!--INICIA ACCIONES-->
    <v-tab-item>
      <base-material-card icon="mdi-floor-plan" color="brown darken-1" inline class="px-5 py-3">
        <template v-slot:after-heading></template>
        <template v-slot:corner-button>
          <v-btn small class="ma-2" elevation="2" color="brown darken-1" @click.stop="dialog = true"
            >Nueva Accion</v-btn
          >
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

          <v-divider class="mt-3" />
          <!------DATA TABLE-->
          <v-data-table
            :headers="headers"
            :items="acciones"
            dense
            :search.sync="search"
            :loading="isLoading"
            loading-text="Cargando... Espere por favor"
            disable-pagination
            hide-default-footer
            ><template v-slot:[`item.activo`]="{ item }">
              <Status :activostr="item.activo" tipo="String"
            /></template>
            <template v-slot:[`item.actions`]="{ item }">
              <!--- <v-icon small class="mr-2" @click.stop="dialog = true">mdi-eye</v-icon>-->
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>

            <template v-slot:no-data> ¡No hay datos para mostrar! </template>
          </v-data-table>
          <DataExporter
            :dataArray="acciones"
            :dataFields="fields"
            fileName="ReporteAcciones"
            pdfView="none"
          />

          <!---TERMINA DATA TABLE-->
          <ConfirmationDialog v-model="isSure" @click="cancel" />
          <!---DIALOG-->
          <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-card-title>
                    <span class="headline">{{ formTitle }} </span>
                  </v-card-title>
                  <!---Tipo-->
                  <v-row>
                    <v-col>
                      <v-row cols="6" md="4">
                        <v-col cols="2">
                          <v-select
                            :menu-props="{ top: true, offsetY: true }"
                            v-model="$v.editedItem.tipo.$model"
                            label="Tipo"
                            :items="selecciona"
                            hint="Seleccione  una opción"
                            persistent-hint
                            item-value="tipo"
                            :error-messages="tipoError"
                            required
                            @input="changed = true"
                            @blur="$v.editedItem.tipo.$touch()"
                          ></v-select>
                        </v-col>
                      </v-row> </v-col
                  ></v-row>
                  <!---ACCION, ACCION MIN, UBP-->
                  <v-row>
                    <v-col>
                      <v-row cols="6" md="4"
                        ><v-col
                          ><v-text-field
                            v-model="$v.editedItem.accion.$model"
                            dense
                            maxlength="100"
                            required
                            :error-messages="accionError"
                            label="Acción*"
                            persistent-hint
                            counter="250"
                            @blur="$v.editedItem.accion.$touch()"
                            @input="
                              $v.editedItem.accion.$reset(),
                                (editedItem.accion = editedItem.accion.toUpperCase())
                              changed = true
                            "
                          ></v-text-field
                        ></v-col>
                        <v-col
                          ><v-text-field
                            v-model="$v.editedItem.accion_min.$model"
                            counter="250"
                            dense
                            maxlength="100"
                            label="Acción Min*"
                            persistent-hint
                            required
                            :error-messages="AcMinError"
                            @blur="$v.editedItem.accion_min.$touch()"
                            @input="
                              $v.editedItem.accion_min.$reset(),
                                (editedItem.accion_min =
                                  editedItem.accion_min.charAt(0).toUpperCase() +
                                  editedItem.accion_min.slice(1).toLowerCase())
                              changed = true
                            "
                          ></v-text-field
                        ></v-col>
                        <v-col cols="3"
                          ><v-text-field
                            v-model="$v.editedItem.UBP.$model"
                            counter="10"
                            dense
                            @keypress="isNumber($event)"
                            maxlength="100"
                            label="UBP*"
                            persistent-hint
                            required
                            :error-messages="errorUBP"
                            @input="$v.editedItem.UBP.$reset(), (changed = true)"
                            @blur="$v.editedItem.UBP.$touch()"
                          ></v-text-field></v-col
                      ></v-row> </v-col
                  ></v-row>

                  <!---SUB CLASE, SUBCMIN, RUBRO-->
                  <v-row>
                    <v-col>
                      <!--Empresa-->
                      <v-row cols="6" md="4"
                        ><v-col
                          ><v-text-field
                            v-model="$v.editedItem.subcla.$model"
                            dense
                            maxlength="100"
                            label="Sub Clase*"
                            persistent-hint
                            counter="250"
                            required
                            :error-messages="SubClaError"
                            @blur="$v.editedItem.subcla.$touch()"
                            @input="
                              $v.editedItem.subcla.$reset(),
                                (editedItem.subcla = editedItem.subcla.toUpperCase())
                              changed = true
                            "
                          ></v-text-field></v-col
                        ><!--RFC-->
                        <v-col
                          ><v-text-field
                            v-model="$v.editedItem.subcla_min.$model"
                            counter="250"
                            dense
                            maxlength="100"
                            label="Sub Clase Min*"
                            persistent-hint
                            required
                            :error-messages="subClaMinError"
                            @blur="$v.editedItem.subcla_min.$touch()"
                            @input="
                              $v.editedItem.subcla_min.$reset(),
                                (editedItem.subcla_min =
                                  editedItem.subcla_min.charAt(0).toUpperCase() +
                                  editedItem.subcla_min.slice(1).toLowerCase())
                              changed = true
                            "
                          ></v-text-field
                        ></v-col>
                        <v-col cols="3"
                          ><v-text-field
                            v-model="editedItem.modalidad"
                            counter="50"
                            dense
                            maxlength="100"
                            label="Modalidad"
                            persistent-hint
                            @input="$v.editedItem.modalidad.$reset(), (changed = true)"
                            @blur="$v.editedItem.modalidad.$touch()"
                          ></v-text-field></v-col
                      ></v-row> </v-col
                  ></v-row>
                  <!---IMPORTANCIA, INFORMACION, PARTICIPACION-->
                  <v-row>
                    <v-col>
                      <v-row cols=" 6" md="4"
                        ><v-col cols="4">
                          <span style="color: #d2d2d2; font-size: medium">Importancia </span>
                          <textarea
                            v-model="editedItem.importancia"
                            dense
                            maxlength="300"
                            style="resize: none; border: groove 1.5px #d2d2d2"
                            rows="3"
                            cols="30"
                            outline
                            label="Importancia"
                            persistent-hint
                            counter="300"
                            @input="$v.editedItem.importancia.$reset(), (changed = true)"
                            @blur="$v.editedItem.importancia.$touch()"
                          ></textarea>
                        </v-col>
                        <v-col cols="4">
                          <span style="color: #d2d2d2; font-size: medium">Beneficios </span>
                          <textarea
                            v-model="editedItem.beneficios"
                            dense
                            maxlength="250"
                            style="resize: none; border: groove 1.5px #d2d2d2"
                            rows="3"
                            cols="30"
                            outline
                            persistent-hint
                            counter="250"
                            @input="$v.editedItem.beneficios.$reset(), (changed = true)"
                            @blur="$v.editedItem.beneficios.$touch()"
                          ></textarea>
                        </v-col>
                        <v-col cols="4"
                          ><span style="color: #d2d2d2; font-size: medium">Participación </span>
                          <textarea
                            v-model="editedItem.participacion"
                            dense
                            maxlength="250"
                            required
                            style="resize: none; border: groove 1.5px #d2d2d2"
                            rows="3"
                            cols="30"
                            outline
                            persistent-hint
                            counter="250"
                          ></textarea>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="4">
                          <span style="color: #d2d2d2; font-size: medium">Informe </span>
                          <textarea
                            v-model="editedItem.informe"
                            counter="300"
                            dense
                            maxlength="300"
                            label="Informe"
                            persistent-hint
                            style="resize: none; border: groove 1.5px #d2d2d2"
                            rows="3"
                            cols="30"
                            outline
                            @input="$v.editedItem.informe.$reset(), (changed = true)"
                            @blur="$v.editedItem.informe.$touch()"
                          ></textarea>
                        </v-col>
                        <v-col cols="4">
                          <span style="color: #d2d2d2; font-size: medium">Inicio Min* </span
                          ><textarea
                            v-model="$v.editedItem.inicio_min.$model"
                            dense
                            maxlength="200"
                            counter="200"
                            persistent-hint
                            style="resize: none; border: groove 1.5px #d2d2d2"
                            rows="3"
                            cols="30"
                            outline
                            required
                            :error-messages="inicioMinError"
                            @blur="$v.editedItem.inicio_min.$touch()"
                            @input="
                              $v.editedItem.inicio_min.$reset(),
                                (editedItem.inicio_min =
                                  editedItem.inicio_min.charAt(0).toUpperCase() +
                                  editedItem.inicio_min.slice(1).toLowerCase())
                              changed = true
                            "
                          >
                          </textarea>
                        </v-col>
                        <v-col cols="4">
                          <span style="color: #d2d2d2; font-size: medium">Termino Min* </span>
                          <textarea
                            v-model="$v.editedItem.termino_min.$model"
                            dense
                            maxlength="300"
                            counter="300"
                            persistent-hint
                            style="resize: none; border: groove 1.5px #d2d2d2"
                            rows="3"
                            cols="30"
                            outline
                            required
                            :error-messages="terminoMinError"
                            @blur="$v.editedItem.termino_min.$touch()"
                            @input="
                              $v.editedItem.termino_min.$reset(),
                                (editedItem.termino_min =
                                  editedItem.termino_min.charAt(0).toUpperCase() +
                                  editedItem.termino_min.slice(1).toLowerCase())
                              changed = true
                            "
                          >
                          </textarea>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="4">
                          <span style="color: #d2d2d2; font-size: medium"
                            >Descripción De Trabajo 1
                          </span>
                          <textarea
                            style="resize: none; border: groove 1.5px #d2d2d2"
                            v-model="editedItem.desc_t1"
                            rows="3"
                            cols="30"
                            maxlength="50"
                            counter="50"
                            outline
                            required
                            @input="$v.editedItem.desc_t1.$reset(), (changed = true)"
                            @blur="$v.editedItem.desc_t1.$touch()"
                          ></textarea>
                        </v-col>

                        <v-col cols="4"
                          ><span style="color: #d2d2d2; font-size: medium"
                            >Descripción De Trabajo 2 </span
                          ><textarea
                            style="resize: none; border: groove 1.5px #d2d2d2"
                            v-model="editedItem.desc_t2"
                            rows="3"
                            cols="30"
                            maxlength="250"
                            counter="250"
                            outline
                            @input="$v.editedItem.desc_t2.$reset(), (changed = true)"
                            @blur="$v.editedItem.desc_t2.$touch()"
                          ></textarea>
                        </v-col>
                        <v-col cols="4"
                          ><span style="color: #d2d2d2; font-size: medium"
                            >Descripción De Trabajo 3</span
                          ><textarea
                            style="resize: none; border: groove 1.5px #d2d2d2"
                            v-model="editedItem.desc_t3"
                            rows="3"
                            cols="30"
                            maxlength="250"
                            counter="250"
                            outline
                            @input="$v.editedItem.desc_t3.$reset(), (changed = true)"
                            @blur="$v.editedItem.desc_t3.$touch()"
                          ></textarea></v-col></v-row></v-col
                  ></v-row>
                  <v-row>
                    <v-col cols="4"
                      ><v-text-field
                        v-model="editedItem.tipo_fin"
                        maxlength="25"
                        counter="25"
                        persistent-hint
                        label="Tipo Fin"
                        required
                        @input="$v.editedItem.tipo_fin.$reset(), (changed = true)"
                        @blur="$v.editedItem.tipo_fin.$touch()"
                      >
                      </v-text-field
                    ></v-col>
                    <v-col cols="4"
                      ><v-text-field
                        counter="30"
                        v-model="editedItem.rubro"
                        maxlength="30"
                        label="Rubro"
                        persistent-hint
                        required
                        @input="$v.editedItem.rubro.$reset(), (changed = true)"
                        @blur="$v.editedItem.rubro.$touch()"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="4"
                      ><v-text-field
                        v-model="editedItem.m2"
                        maxlength="10"
                        counter="10"
                        persistent-hint
                        label="Metros Cuadrados"
                        required
                        @input="$v.editedItem.m2.$reset(), (changed = true)"
                        @blur="$v.editedItem.m2.$touch()"
                      >
                      </v-text-field
                    ></v-col>
                  </v-row>
                  <v-divider class="mt-3" />
                  <v-row md="4"
                    ><v-col cols="2"
                      ><v-text-field
                        v-model="editedItem.porinicio"
                        md="4"
                        dense
                        maxlength="3"
                        required
                        persistent-hint
                        label="% Inicio"
                        @input="$v.editedItem.porinicio.$reset(), (changed = true)"
                        @blur="$v.editedItem.porinicio.$touch()"
                      ></v-text-field></v-col
                    ><!--RFC-->
                    <v-col
                      ><v-text-field
                        v-model="editedItem.inicio"
                        dense
                        maxlength="300"
                        counter="300"
                        persistent-hint
                        label="Descripción De Inicio"
                        required
                        @input="$v.editedItem.inicio.$reset(), (changed = true)"
                        @blur="$v.editedItem.inicio.$touch()"
                      >
                      </v-text-field></v-col
                  ></v-row>
                  <v-row md="4"
                    ><v-col cols="2"
                      ><v-text-field
                        v-model="editedItem.porcproceso"
                        md="4"
                        dense
                        maxlength="3"
                        required
                        persistent-hint
                        label="% Proceso"
                        @input="$v.editedItem.porcproceso.$reset(), (changed = true)"
                        @blur="$v.editedItem.porcproceso.$touch()"
                      ></v-text-field></v-col
                    ><!--RFC-->
                    <v-col
                      ><v-text-field
                        v-model="editedItem.proceso"
                        dense
                        maxlength="300"
                        counter="300"
                        persistent-hint
                        label="Descripción De Proceso"
                        required
                        @input="$v.editedItem.proceso.$reset(), (changed = true)"
                        @blur="$v.editedItem.proceso.$touch()"
                      >
                      </v-text-field></v-col
                  ></v-row>
                  <v-row md="4"
                    ><v-col cols="2"
                      ><v-text-field
                        v-model="editedItem.porctermino"
                        md="4"
                        dense
                        maxlength="3"
                        required
                        persistent-hint
                        label="% Termino"
                        @input="$v.editedItem.porctermino.$reset(), (changed = true)"
                        @blur="$v.editedItem.porctermino.$touch()"
                      ></v-text-field
                    ></v-col>
                    <v-col
                      ><v-text-field
                        v-model="editedItem.termino"
                        dense
                        maxlength="300"
                        counter="300"
                        persistent-hint
                        label="Descripción De Termino"
                        required
                        @input="$v.editedItem.termino.$reset(), (changed = true)"
                        @blur="$v.editedItem.termino.$touch()"
                      >
                      </v-text-field></v-col
                  ></v-row>

                  <v-divider class="mt-3" />
                  <v-row
                    ><v-col cols="3"
                      ><v-text-field
                        v-model="editedItem.totalavance"
                        maxlength="10"
                        label="Total De Avance"
                        required
                        @input="$v.editedItem.totalavance.$reset(), (changed = true)"
                        @blur="$v.editedItem.totalavance.$touch()"
                      >
                      </v-text-field></v-col
                    ><v-col cols="3"
                      ><v-text-field
                        v-model="$v.editedItem.total_accion.$model"
                        maxlength="100"
                        prefix="$"
                        label="Total De Acción*"
                        required
                        :error-messages="total_accionError"
                        @keypress="isNumber($event)"
                        @input="$v.editedItem.total_accion.$reset(), (changed = true)"
                        @blur="$v.editedItem.total_accion.$touch()"
                      >
                      </v-text-field
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
                  <small>*Campo Obligatorio</small>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" @click="checkChanges" text>Cancelar</v-btn>
                    <v-btn color="blue darken-1" @click="save" text :disabled="validando"
                      >Guardar</v-btn
                    >
                  </v-card-actions>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!--TERMINA DIALOG-->
        </v-card>
      </base-material-card>
    </v-tab-item>
    <!--TERMINA ACCIONES-->
    <!--INICIA  DETALLE ACCIONES-->
    <v-tab-item>
      <base-material-card icon="mdi-ballot-outline" color="brown darken-1" inline class="px-5 py-3"
        ><template v-slot:after-heading></template>
        <template v-slot:corner-button>
          <v-btn
            small
            class="ma-2"
            elevation="2"
            color="brown darken-1"
            @click.stop="dialog2 = true"
            >Nuevo Registro</v-btn
          >
        </template>

        <!---CAMPO DE BUSQUEDA-->
        <v-text-field
          v-model="search2"
          append-icon="mdi-magnify"
          class="ml-auto"
          label="Búsqueda"
          hide-details
          single-line
          style="max-width: 250px"
        ></v-text-field>
        <!---CAMPO DE BUSQUEDA-->
        <v-divider class="mt-3" />
        <v-card flat>
          <v-data-table
            :headers="headersD"
            :items="accionesDetalle"
            dense
            :search.sync="search2"
            :loading="isLoading"
            loading-text="Cargando... Espere por favor"
            disable-pagination
            hide-default-footer
          >
            <template v-slot:[`item.activo`]="{ item }">
              <Status :activostr="item.activo" tipo="String"
            /></template>
            <template v-slot:[`item.actions`]="{ item }">
              <!--- <v-icon small class="mr-2" @click.stop="dialog = true">mdi-eye</v-icon>-->
              <v-icon small class="mr-2" @click="editItem2(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem2(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
          <ConfirmationDialog v-model="isSure" @click="cancel2" />
          <v-dialog v-model="dialog2" persistent max-width="500px"
            ><v-card
              ><v-card-text
                ><v-container>
                  <v-card-title>
                    <span class="headline">{{ formTitle2 }} </span> </v-card-title
                  ><v-row>
                    <v-col>
                      <v-row md="4"
                        ><v-col
                          ><v-text-field
                            v-model="$v.editedItem2.ejercicio.$model"
                            maxlength="4"
                            label="Ejercicio*"
                            required
                            dense
                            :error-messages="ejercicioError"
                            @keypress="isNumber($event)"
                            @input="$v.editedItem2.ejercicio.$reset(), (changed = true)"
                            @blur="$v.editedItem2.ejercicio.$touch()"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="$v.editedItem2.UBP.$model"
                            dense
                            @keypress="isNumber($event)"
                            maxlength="100"
                            label="UBP*"
                            persistent-hint
                            required
                            :error-messages="errorUBP2"
                            @input="$v.editedItem2.UBP.$reset(), (changed = true)"
                            @blur="$v.editedItem2.UBP.$touch()"
                          ></v-text-field> </v-col
                      ></v-row>

                      <v-col>
                        <v-select
                          :menu-props="{ top: true, offsetY: true }"
                          v-model="editedItem2.idAccion"
                          label="Acción*"
                          :items="acciones"
                          :item-text="(item) => item.id + ' - ' + item.accion"
                          hint="Seleccione  una opción"
                          persistent-hint
                          item-value="id"
                          @input="$v.editedItem2.idAccion.$reset(), (changed = true)"
                          @blur="$v.editedItem2.idAccion.$touch()"
                        ></v-select
                      ></v-col>
                      <v-col>
                        <v-select
                          v-model="editedItem2.idPrograma"
                          :menu-props="{ top: true, offsetY: true }"
                          label="Programa*"
                          :items="progra"
                          hint="Seleccione  una opción"
                          persistent-hint
                          :item-text="(item) => item.idprograma + ' - ' + item.nombre"
                          item-value="idprograma"
                          @input="$v.editedItem2.idPrograma.$reset(), (changed = true)"
                          @blur="$v.editedItem2.idPrograma.$touch()"
                        ></v-select
                      ></v-col>
                    </v-col>
                  </v-row>
                  <small>*Campo Obligatorio</small>
                  <v-col>
                    <v-checkbox
                      v-model="editedItem2.activo"
                      :label="`Estatus: ${
                        editedItem2.activo.toString() == 'true' ? 'Activo' : 'Inactivo'
                      }`"
                      @input="$v.editedItem2.activo.$reset(), (changed = true)"
                      @blur="$v.editedItem2.activo.$touch()"
                    ></v-checkbox>
                  </v-col>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" @click="checkChanges" text>Cancelar</v-btn>
                    <v-btn color="blue darken-1" @click="saveDet" text :disabled="$v.$invalid2"
                      >Guardar</v-btn
                    >
                  </v-card-actions></v-container
                ></v-card-text
              ></v-card
            ></v-dialog
          >
        </v-card>
      </base-material-card></v-tab-item
    >
    <!--TERMINA  DETALLE ACCIONES-->
  </v-tabs>
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
    Status,
    DataExporter,
    ConfirmationDialog,
  },
  data: () => ({
    search: undefined,
    search2: undefined,
    isLoading: false,
    dialog: false,
    dialog2: false,
    isEditing: false,
    select: null,
    checkbox: false,
    changed: false,
    isSure: false,
    headers: [
      { text: 'Id', value: 'id' },
      { text: 'Accion', value: 'accion' },
      { text: 'Tipo', value: 'tipo' },
      { text: 'Rubro', value: 'rubro' },
      { text: 'Modalidad', value: 'modalidad' },
      { text: 'UBP', value: 'UBP' },
      { text: 'Activo', value: 'activo' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    headersD: [
      { text: 'Ejercido', value: 'ejercicio' },
      { text: 'Accion', value: 'accion' },
      { text: 'UBP', value: 'UBP' },
      { text: 'Programa', value: 'nombre' },
      { text: 'Activo', value: 'activo' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    value: [],
    acciones: [],
    progra: [],
    ejercicios: [],
    accionesDetalle: [],
    selecciona: [
      { value: 'Directa', text: 'Directa' },
      { value: 'Indirecta', text: 'Indirecta' },
    ],
    editedIndex: -1,

    editedItem: {
      id: 0,
      accion: '',
      accion_min: '',
      tipo: false,
      rubro: '',
      subcla: '',
      subcla_min: '',
      modalidad: '',
      UBP: '',
      desc_t1: '',
      desc_t2: '',
      desc_t3: '',
      importancia: '',
      informe: '',
      participacion: '',
      beneficios: '',
      inicio: '',
      porinicio: '',
      proceso: '',
      porcproceso: '',
      termino: '',
      porctermino: '',
      total_accion: '',
      m2: '',
      totalavance: '',
      inicio_min: '',
      tipo_fin: '',
      activo: true,
    },
    editedIndex2: -1,
    editedItem2: { idAccion: 0, idPrograma: 0, ejercicio: '', UBP: '', activo: true },
    defaultItem: {
      id: 0,
      accion: '',
      accion_min: '',
      tipo: false,
      rubro: '',
      subcla: '',
      subcla_min: '',
      modalidad: '',
      UBP: '',
      desc_t1: '',
      desc_t2: '',
      desc_t3: '',
      importancia: '',
      informe: '',
      participacion: '',
      beneficios: '',
      inicio: '',
      porinicio: '',
      proceso: '',
      porcproceso: '',
      termino: '',
      porctermino: '',
      total_accion: '',
      m2: '',
      totalavance: '',
      inicio_min: '',
      tipo_fin: '',
      activo: true,
    },
    defaultItemDet: {
      ejercicio: '',
      idAccion: 0,
      idPrograma: 0,
      UBP: '',
      activo: true,
    },

    fields: {
      id: 'id',
      accion: 'accion',
      accion_min: 'accion_min',
      tipo: 'tipo',
      rubro: 'rubro',
      subcla: 'subcla',
      subcla_min: 'subcla_min',
      modalidad: 'modalidad',
      UBP: '  UBP',
      desc_t1: 'desc_t1',
      desc_t2: 'desc_t2',
      desc_t3: 'desc_t3',
      importancia: 'importancia',
      informe: 'informe',
      participacion: 'participacion',
      beneficios: 'beneficios',
      inicio: 'inicio',
      porinicio: 'porinicio',
      proceso: 'proceso',
      porcproceso: 'porcproceso',
      termino: 'termino',
      porctermino: 'porctermino',
      total_accion: 'total_accion',
      m2: 'm2',
      totalavance: 'totalavance',
      inicio_min: 'inicio_min',
      tipo_fin: 'tipo_fin',
      activo: 'activo',
    },
    mixins: [validationMixin],
  }),
  validations: {
    editedItem: {
      accion: { required },
      UBP: { required },
      total_accion: { required },
      tipo: { required },
      accion_min: { required },
      subcla: { required },
      subcla_min: { required },
      termino_min: { required },
      inicio_min: { required },
      modalidad: { required },
    },
    editedItem2: {
      ejercicio: { required },
      idAccion: { required },
      idPrograma: { required },
      UBP: { required },
    },
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
      await this.obtenerAcciones(jwt)
      await this.obtenerProgramas(jwt)
      await this.obtenerAccionesDetalle(jwt)
      //await this.AccionesFiltroAct(jwt)
    },
    async obtenerAcciones(jwt) {
      this.isLoading = true
      if (jwt != null) {
        let payload = { jwt: jwt }
        this.acciones = []
        await this.$store
          .dispatch('accion/fetchAccion', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.acciones = response.data
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
    /* async AccionesFiltroAct(jwt) {
      this.isLoading = true
      let params = null
      params = 'filtro?campo1=activo&tipo1=igual&valor1=1'

      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.accionesAct = []
        await this.$store
          .dispatch('accion/fetchAccion', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.accionesAct = response.data
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
    },*
    /*async obtenerProgramas(jwt) {
      this.isLoading = true
      let params = null
      params = 'filtro?campo1=activo&tipo1=igual&valor1=1'

      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
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
    },**/
    //ACCIONDES DETALLE VISTA DE LA TABLA
    async obtenerAccionesDetalle(jwt) {
      this.isLoading = true
      if (jwt != null) {
        let payload = { jwt: jwt }
        this.accionesDetalle = []
        await this.$store
          .dispatch('accionDetalle/fetchAccionD', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.accionesDetalle = response.data
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

    editItem(item) {
      this.isEditing = true
      console.log('item', item)
      this.editedIndex = this.acciones.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.activo = this.editedItem.activo == 1 ? true : false
      this.dialog = true
    },
    editItem2(item) {
      this.isEditing = true
      this.editedIndex2 = this.accionesDetalle.indexOf(item)
      this.editedItem2 = Object.assign({}, item)
      console.log('this.editedItem2', this.editedItem2)
      this.editedItem2.activo = this.editedItem2.activo == 1 ? true : false
      this.dialog2 = true
    },
    // Evalua el caracter para saber si es un numero
    isNumber: function (evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    async save() {
      this.overlay = true
      this.$v.$touch()
      if (!this.$v.validando) {
        let body = {
          accion: this.editedItem.accion,
          accion_min: this.editedItem.accion_min,
          tipo: this.editedItem.tipo,
          rubro: this.editedItem.rubro,
          subcla: this.editedItem.subcla,
          subcla_min: this.editedItem.subcla_min,
          modalidad: this.editedItem.modalidad,
          UBP: this.editedItem.UBP,
          desc_t1: this.editedItem.desc_t1,
          desc_t2: this.editedItem.desc_t2,
          desc_t3: this.editedItem.desc_t3,
          importancia: this.editedItem.importancia,
          informe: this.editedItem.informe,
          participacion: this.editedItem.participacion,
          beneficios: this.editedItem.beneficios,
          inicio: this.editedItem.inicio,
          porinicio: this.editedItem.porinicio,
          proceso: this.editedItem.proceso,
          porcproceso: this.editedItem.porcproceso,
          termino: this.editedItem.termino,
          porctermino: this.editedItem.porctermino,
          total_accion: this.editedItem.total_accion,
          m2: this.editedItem.m2,
          totalavance: this.editedItem.totalavance,
          inicio_min: this.editedItem.inicio_min,
          termino_min: this.editedItem.termino_min,
          tipo_fin: this.editedItem.tipo_fin,
          activo: this.editedItem.activo == true ? 1 : 0,
        }
        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        if (this.editedIndex > -1) {
          payload.id = this.editedItem.id
          await this.$store
            .dispatch('accion/editAccion', payload)
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
          Object.assign(this.acciones[this.editedIndex], this.editedItem)
        } else {
          await this.$store
            .dispatch('accion/addAccion', payload)
            .then((response) => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se creó con éxito',
              })
              this.acciones.push(response.data)
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
        await this.obtenerAcciones(jwt)
      }
    },
    deleteItem(item) {
      const index = this.acciones.indexOf(item)
      confirm('Esta seguro que desea eliminar este registro?') && this.acciones.splice(index, 1)
      this.Borrar(item.id)
    },
    deleteItem2(item) {
      const index = this.accionesDetalle.indexOf(item)
      confirm('Esta seguro que desea eliminar este registro?') &&
        this.accionesDetalle.splice(index, 1)
      this.delteActionDetails(item.id)
    },
    async Borrar(index) {
      this.overlay = true
      this.$v.$touch()
      let body = {
        id: index,
        activo: 0,
      }
      let jwt = await getValidToken(this)
      let payload = { jwt: jwt, body: body }
      payload.id = index
      await this.$store
        .dispatch('accion/deleteAccion', payload)
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
      Object.assign(this.acciones[this.editedIndex], this.editedItem)
    },
    async delteActionDetails(index) {
      this.overlay = true
      this.$v.$touch()
      let body = {
        id: index,
        activo: 0,
      }
      let jwt = await getValidToken(this)
      let payload = { jwt: jwt, body: body }
      payload.id = index
      await this.$store
        .dispatch('accionDetalle/deleteAccionD', payload)
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
      Object.assign(this.accionesDetalle[this.editedIndex2], this.editedItem2)
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
        this.dialog2 = false
        this.isEditing = false
      }
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }),
        this.$nextTick(() => {
          this.editedItem2 = Object.assign({}, this.defaultItemDet)
          this.editedIndex2 = -1
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
    cancel2(isSure) {
      this.isSure = isSure
      if (this.isSure) {
        this.close(false)
        this.changed = false
      }
    },
    /* cancel2(isSure  ) {
      this.isSure   = isSure  
      if (this.isSure  ) {
        this.close(false)
        this.changed = false
      }
    },*/
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    async saveDet() {
      console.log()
      this.overlay = true
      this.$v.$touch()
      if (!this.$v.$invalid2) {
        let body = {
          idAccion: this.editedItem2.idAccion,
          idPrograma: this.editedItem2.idPrograma,
          UBP: this.editedItem2.UBP,
          ejercicio: this.editedItem2.ejercicio,
          activo: this.editedItem2.activo == true ? 1 : 0,
        }
        //console.log(body)
        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        if (this.editedIndex2 > -1) {
          payload.id = this.editedItem2.id
          await this.$store
            .dispatch('accionDetalle/editAccionD', payload)
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
          //console.log('this.editedItem3', this.editedItem2)
          Object.assign(this.accionesDetalle[this.editedIndex2], this.editedItem2)
        } else {
          await this.$store
            .dispatch('accionDetalle/addAccionD', payload)
            .then(() => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se creó con éxito',
              })
              //this.Tipos.push(response.data)
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
        await this.iniciando()
      }
    },
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nueva Acción' : 'Editar Acción'
    },
    formTitle2() {
      return this.editedIndex2 === -1 ? 'Nueva Acción Detalle' : 'Editar Acción Detalle'
    },

    errorUBP2() {
      const errors = []
      if (!this.$v.editedItem2.UBP.$dirty) return errors
      !this.$v.editedItem2.UBP.required && errors.push('Este campo es requerido')
      return errors
    },
    ejercicioError() {
      const errors = []
      if (!this.$v.editedItem2.ejercicio.$dirty) return errors
      !this.$v.editedItem2.ejercicio.required && errors.push('Este campo es requerido')
      return errors
    },
    accionError() {
      const errors = []
      if (!this.$v.editedItem.accion.$dirty) return errors
      !this.$v.editedItem.accion.required && errors.push('Este campo es requerido')
      return errors
    },
    errorUBP() {
      const errors = []
      if (!this.$v.editedItem.UBP.$dirty) return errors
      !this.$v.editedItem.UBP.required && errors.push('Este campo es requerido')
      return errors
    },
    total_accionError() {
      const errors = []
      if (!this.$v.editedItem.total_accion.$dirty) return errors
      !this.$v.editedItem.total_accion.required && errors.push('Este campo es requerido')
      return errors
    },
    tipoError() {
      const errors = []
      if (!this.$v.editedItem.tipo.$dirty) return errors
      !this.$v.editedItem.tipo.required && errors.push('Este campo es requerido')
      return errors
    },
    AcMinError() {
      const errors = []
      if (!this.$v.editedItem.accion_min.$dirty) return errors
      !this.$v.editedItem.accion_min.required && errors.push('Este campo es requerido')
      return errors
    },
    subClaMinError() {
      const errors = []
      if (!this.$v.editedItem.subcla_min.$dirty) return errors
      !this.$v.editedItem.subcla_min.required && errors.push('Este campo es requerido')
      return errors
    },
    terminoMinError() {
      const errors = []
      if (!this.$v.editedItem.termino_min.$dirty) return errors
      !this.$v.editedItem.termino_min.required && errors.push('Este campo es requerido')
      return errors
    },
    inicioMinError() {
      const errors = []
      if (!this.$v.editedItem.inicio_min.$dirty) return errors
      !this.$v.editedItem.inicio_min.required && errors.push('Este campo es requerido')
      return errors
    },
    SubClaError() {
      const errors = []
      if (!this.$v.editedItem.subcla.$dirty) return errors
      !this.$v.editedItem.subcla.required && errors.push('Este campo es requerido')
      return errors
    },
    //////////////////////////////////

    validando() {
      let valida = true
      if (
        this.$v.editedItem.accion.$model != '' &&
        this.$v.editedItem.accion_min.$model != '' &&
        this.$v.editedItem.tipo.$model != '' &&
        this.$v.editedItem.UBP.$model != '' &&
        this.$v.editedItem.subcla.$model != '' &&
        this.$v.editedItem.subcla_min.$model != '' &&
        this.$v.editedItem.total_accion.$model != '' &&
        this.$v.editedItem.inicio_min.$model != '' &&
        this.$v.editedItem.termino_min.$model != ''
      ) {
        valida = false
      }

      //valida = false
      return valida
    },
  },
}
</script>
