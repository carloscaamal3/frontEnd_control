<template>
  <v-container id="montos" tag="section">
    <v-tabs fixed-tabs background-color="brown darken-1" dark>
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab><v-icon left>mdi-cash-100</v-icon>Movimientos</v-tab>
      <v-tab><v-icon left>mdi-cash-100</v-icon>Presupuesto anual</v-tab>
      <!---INICIA TAB ITEM PRESUPUES-->
      <v-tab-item>
        <base-material-card icon="mdi-cash-100" color="brown darken-1" inline class="px-5 py-3">
<<<<<<< HEAD
                    <!--------CANCELAR MOVIMIENTO PRINCIPAL----------->
   <v-dialog
              hide-overlay
              v-model="dialogCancelaPrin"
              persistent
              width="600px"
              height="600px"
            > <ConfirmationDialog v-model="isSureDetalleMov" @click="cancelDetMov" />
              <v-toolbar dark color="brown">
                <v-btn icon dark @click="checkChangesCancel">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Cancelar movimiento</v-toolbar-title> </v-toolbar
              ><v-card
                ><v-card-text
                  ><template>
                   <v-alert
                    dense
                    border="left"
                    colored-border
                    type="warning"
                    elevation="1"
                    icon="mdi-alert-outline"
                  >
                   <h4> <strong>Detalle de movimiento a cancelar:</strong></h4>
                  </v-alert></template
                  >
                  <v-container>
                    <template> </template>
                    <v-row>
                      <v-col>
                        <div>
                          <div>
                            <strong>Tipo de presupuesto por:</strong>
                          </div>
                          <div>
                            {{ this.editedItemDet.nomTipoMonto }}
                          </div>
                        </div>
                      </v-col>
                      <v-col>
                        <div>
                          <div>
                            <strong> Monto:</strong>
                          </div>
                          <div>
                             {{ formato(eFormatos.MONEDA, this.editedItemDet.monto) }}
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <div>
                          <div>
                            <strong>Tipo de monto:</strong>
                          </div>
                          <div>
                           {{ this.editedItemDet.nomTipoMov}}
                          </div>
                        </div>
                      </v-col>
                      <v-col>
                        <div>
                          <strong> Motivo de cancelacion:</strong>
                        </div>
                        <v-text-field
                      v-model="$v.editedItemDetCancel.motivoCancelacion.$model"
                      @blur="$v.editedItemDetCancel.motivoCancelacion.$touch()"
                      @input="changed = true"
                      append-icon="mdi-tooltip-question-outline"
                      class="ml-auto"
                      required
                       counter="150"
                        maxlength="150"
                      :error-messages="cancelacionError"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" @click="checkChangesCancel" text>Salír</v-btn
                      ><v-btn color="blue darken-1" text @click="valueCancelDet = true" :disabled="validandoCaDet"
                        >Continuar</v-btn
                      >
                    </v-card-actions>
                      <!-- Empieza el dialogo de confirmación -->
  <v-dialog v-model="valueCancelDet" persistent max-width="330px">
    <v-card>
      <!-- Empieza titulo y texto del dialogo-->
      <!-- Titulo y texto personalizable -->
      <v-card-title class="headline font-weight-medium">¿Seguro quiere cancelar?</v-card-title>
      <v-card-text>¡Se perderán los datos de este movimiento!</v-card-text>
      <!-- Termina titulo y texto del dialogo -->

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Empieza Botón 1 (color y texto personalizable)-->
        <v-btn
          class="font-weight-medium"
          color="red darken-1"
          text
          @click="checkChangesCancel"
        >Salír</v-btn>
        <!-- Termina Botón 1 -->
        <!-- Empieza Botón 2 (color y texto personalizable) -->
        <v-btn
          class="font-weight-medium"
          color="green darken-1"
          text
          @click="GuardaCancelarDetalle"
          :disabled="validandoCaDet"
        >Aceptar</v-btn>
        <!-- Termina Botón 2 -->
      </v-card-actions>
    </v-card>
  </v-dialog>
 </v-container>
 </v-card-text>
 </v-card>
 </v-dialog> 
  
  <!--------FINALIZA CANCELAR MOVIMIENTO PRINCIOPAL------------->  
            <!-- Empieza el dialogo de confirmación -->
  <v-dialog v-model="valueCancel" persistent max-width="330px">
    <v-card>
      <!-- Empieza titulo y texto del dialogo-->
      <!-- Titulo y texto personalizable -->
      <v-card-title class="headline font-weight-medium">¿Seguro quiere cancelar?</v-card-title>
      <v-card-text>¡Se perderán los datos de este movimiento!</v-card-text>
      <!-- Termina titulo y texto del dialogo -->
=======
          <!-- Empieza el dialogo de confirmación -->
          <v-dialog v-model="valueCancel" persistent max-width="330px">
            <v-card>
              <!-- Empieza titulo y texto del dialogo-->
              <!-- Titulo y texto personalizable -->
              <v-card-title class="headline font-weight-medium"
                >¿Seguro quiere cancelar?</v-card-title
              >
              <v-card-text>¡Se perderán los datos de este movimiento!</v-card-text>
              <!-- Termina titulo y texto del dialogo -->
>>>>>>> 58d7e389a49fbc03f152aa96b67e94c5fe483574

              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- Empieza Botón 1 (color y texto personalizable)-->
                <v-btn class="font-weight-medium" color="red darken-1" text @click="checkChanges"
                  >Salír</v-btn
                >
                <!-- Termina Botón 1 -->
                <!-- Empieza Botón 2 (color y texto personalizable) -->
                <v-btn
                  class="font-weight-medium"
                  color="green darken-1"
                  text
                  @click="GuardaCancelar"
                  :disabled="validandoCa"
                  >Aceptar</v-btn
                >
                <!-- Termina Botón 2 -->
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Termina el dialogo de confirmación -->
          <!-- Dialogo Motivo de cancelacion -->
          <v-dialog
            hide-overlay
            transition="dialog-bottom-transition"
            v-model="dialogCancelarMovimiento"
            persistent
            width="600px"
<<<<<<< HEAD
            height="600px"> 
=======
            height="600px"
          >
>>>>>>> 58d7e389a49fbc03f152aa96b67e94c5fe483574
            <v-toolbar dark color="brown">
              <v-btn icon dark @click="checkChanges">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Cancelar Movimiento</v-toolbar-title> </v-toolbar
            ><v-card
              ><v-card-text
                ><template>
                  <v-alert
                    dense
                    border="left"
                    colored-border
                    transition="fade-transition"
                    type="warning"
                    elevation="1"
                    icon="mdi-alert-outline"
                  >
                    <h4><strong>Movimiento a cancelar:</strong></h4>
                  </v-alert></template
                >
                <v-container>
                  <template> </template>
                  <v-row>
                    <v-col>
                      <div>
                        <div>
                          <strong>Movimiento Número: :</strong>
                        </div>
                        <div>
                          {{ editedItem.idMovimiento }}
                        </div>
                      </div>
                    </v-col>
                    <v-col>
                      <div>
                        <div>
                          <strong>Documento:</strong>
                        </div>
                        <div>
                          {{ editedItem.documento }}
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <div>
                        <div>
                          <strong> Monto:</strong>
                        </div>
                        <div>
                          {{ formato(eFormatos.MONEDA, editedItem.monto) }}
                        </div>
                      </div>
                    </v-col>
                    <v-col>
                      <div>
                        <strong> Montivo de cancelación:</strong>
                      </div>
                      <v-text-field
                        v-model="$v.editedItemCan.motivoCancelacion.$model"
                        @blur="$v.editedItemCan.motivoCancelacion.$touch()"
                        @input="changed = true"
                        append-icon="mdi-tooltip-question-outline"
                        class="ml-auto"
                        required
                        counter="150"
                        color="brown darken-1"
                        maxlength="150"
                        :error-messages="cancelacionError"
                        style="max-width: 250px"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" @click="checkChanges" text>Salir</v-btn
                    ><v-btn
                      color="blue darken-1"
                      text
                      @click="valueCancel = true"
                      :disabled="validandoCa"
                      >Continuar</v-btn
                    >
                  </v-card-actions>
                </v-container></v-card-text
              ></v-card
            >
          </v-dialog>
          <!-- Termina dialogo Motivo de cancelacion -->
          <template v-slot:after-heading></template>
          <template v-slot:corner-button>
            <v-btn
              small
              class="ma-2"
              elevation="2"
              @click.stop="dialogDeMov = true"
              color="brown darken-1"
              >Nuevo Movimiento</v-btn
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

            <!---INICIA DATA TABLE-->
            <v-data-table
              :headers="headers"
              :items="montos"
              :search.sync="search"
              :loading="isLoading"
              dense
              loading-text="Cargando... Espere por favor"
              disable-pagination
              hide-default-footer
            >
              <template v-slot:no-data> ¡No hay datos para mostrar! </template>
              <!--formatos de cantidades-->
              <template v-slot:item.monto="{ item }">
                {{ formato(eFormatos.MONEDA, item.monto) }}
              </template>
              <template v-slot:[`item.fechaDocumento`]="{ item }">
                <div class="name-info-title">
                  {{ formato(eFormatos.FECHA, item.fechaDocumento) }}
                </div>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  class="mr-2"
                  X-large
                  @change="validaMaximoPresupuesto()"
                  @click="editItem(item)"
                  >mdi-eye</v-icon
                >
                <v-icon class="mr-2" @click="cancelItemPrincipal(item)"> mdi-close-circle</v-icon>
              </template>
            </v-data-table>
            <!--FINALIZA DATA TABLE-->

            <!--Dialogo detalle movimiento-->
            <v-col cols="auto">
              <ConfirmationDialog v-model="isSure" @click="cancel" />
              <!---inicia dialogo de visaluizar moviminento incial--->
              <v-dialog
                transition="dialog-bottom-transition"
                max-width="1920"
                v-model="dialogDeMov"
                persistent
              >
                <template>
                  <v-card>
                    <v-toolbar dense flat color="brown darken-1" dark>
                      <!--<span class="headline">{{ formTitleView }} </span>-->
                    </v-toolbar>

                    <v-card flat
                      ><v-tabs fixed-tabs background-color="">
                        <v-tabs-slider color="brown darken-1"></v-tabs-slider
                        ><v-tab>
                          <v-icon left> mdi-card-bulleted-outline</v-icon> Movimiento #:
                          {{ editedItem.idMovimiento }}</v-tab
                        >
                        <v-tab v-if="editedItem.idMovimiento">
                          <v-icon right> mdi-format-list-bulleted-type </v-icon>Detalle
                        </v-tab>
                        <!---FIN TAB ITEM EDIT-->
                        <v-tab-item
                          ><v-card inline flat color="white" class="px-5 py-3"
                            ><v-card-text
                              ><v-container class="elevation-1">
                                <ConfirmationDialog v-model="isSureDet" @click="cancelDet" />
                                <v-img
                                  src="@/assets/logo_ivey.jpg"
                                  width="20%"
                                  height="20%"
                                ></v-img>
                                <v-card-title>
                                  <span class="headline">{{ formTitle }} </span></v-card-title
                                >
                                <v-divider class="mt-3" />

                                <v-row
                                  ><v-col>
                                    <!--campo ejercicio-->
                                    <v-row>
                                      <v-col
                                        ><v-text-field
                                          v-model="$v.editedItem.ejercicio.$model"
                                          @blur="$v.editedItem.ejercicio.$touch()"
                                          @input="changed = true"
                                          dense
                                          @keypress="isNumber($event)"
                                          label="Ejercicio*"
                                          :error-messages="EjercicioErrors"
                                          persistent-hint
                                          counter="4"
                                          required
                                          maxlength="4"
                                        ></v-text-field
                                      ></v-col>
                                      <!--campo documento-->
                                      <v-col
                                        ><v-text-field
                                          v-model="editedItem.documento"
<<<<<<< HEAD
                                          
=======
                                          @blur="$v.editedItem.documento.$touch()"
>>>>>>> 58d7e389a49fbc03f152aa96b67e94c5fe483574
                                          @input="changed = true"
                                          counter="50"
                                          maxlength="50"
                                          dense
                                          label="Documento"
                                          persistent-hint
                                        ></v-text-field
                                      ></v-col>
                                    </v-row>

                                    <v-row
                                      ><!--campo tipo movimiento--><v-col
                                        ><v-select
                                          :menu-props="{ top: true, offsetY: true }"
                                          v-model="editedItem.tipoMov"
                                          label="Tipo de movimiento"
                                          dense
                                          :items="tipoMovimiento"
                                          :item-text="(item) => item.tipo_descripcion"
                                          hint="Seleccione  una opción"
                                          persistent-hint
                                          item-value="tipo_clave"
                                        ></v-select
                                      ></v-col>
                                      <!--campo tipo de monto--><v-col
                                        ><v-select
                                          :menu-props="{ top: true, offsetY: true }"
                                          v-model="editedItem.tipoMonto"
                                          label="Tipo de monto"
                                          dense
                                          :items="tipoMonto"
                                          :item-text="(item) => item.tipo_descripcion"
                                          hint="Seleccione  una opción"
                                          persistent-hint
                                          item-value="tipo_clave"
                                        ></v-select
                                      ></v-col>
                                    </v-row>
                                    <v-row
                                      ><!--observaciones--><v-col
                                        ><v-text-field
                                          v-model="editedItem.observaciones"
                                          @blur="$v.editedItem.observaciones.$touch()"
                                          @input="changed = true"
                                          dense
                                          label="Observaciones"
                                          persistent-hint
                                          counter="150"
                                          maxlength="150"
                                        ></v-text-field
                                      ></v-col>
                                    </v-row>
                                    <!--campo fecha-->
                                    <v-row cols="6" md="4"
                                      ><v-col>
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
                                              v-model="editedItem.fechaDocumento"
                                              label="Fecha Solicitud"
                                              prepend-icon="mdi-calendar-month"
                                              v-bind="attrs"
                                              v-on="on"
                                              id="fechaDocumento"
                                            ></v-text-field>
                                          </template>
                                          <v-date-picker
                                            locale="en-in"
                                            year-icon="mdi-calendar-blank"
                                            prev-icon="mdi-skip-previous"
                                            next-icon="mdi-skip-next"
                                            color="brown darken-1"
                                            :min="minDate"
                                            :max="maxDate"
                                            v-model="editedItem.fechaDocumento"
                                            @input=";(fromDateMenu = false), (changed = true)"
                                          ></v-date-picker>
                                        </v-menu>
                                      </v-col>
                                      <!--monto--><v-col
                                        ><v-text-field
                                          v-model="$v.editedItem.monto.$model"
                                          @blur="$v.editedItem.monto.$touch()"
                                          @input="$v.editedItem.monto.$reset(), (changed = true)"
                                          text-xs-right
                                          id="monedaInput"
                                          label="Monto"
                                          required
                                          :error-messages="montoErrors"
                                          @keypress="isNumber($event)"
                                          prepend-icon="mdi-currency-usd"
                                          persistent-hint
                                        ></v-text-field
                                      ></v-col>
                                    </v-row>
                                    <v-row> </v-row> <v-divider class="mt-3" />
                                    <v-card-actions
                                      ><v-spacer></v-spacer>
                                      <v-btn color="red darken-1" @click="checkChanges" text
                                        >Cancelar</v-btn
                                      >
                                      <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="save"
                                        :disabled="validando"
                                        >Guardar</v-btn
                                      ></v-card-actions
                                    >
                                  </v-col></v-row
                                >
                              </v-container></v-card-text
                            >
                          </v-card></v-tab-item
                        >
                        <!---FIN TAB ITEM EDIT-->

                        <!--INICIA TAB ITEM DTALLE-->
                        <v-tab-item>
                          <v-card-text
                            ><v-container class="elevation-1">
                              <!--aqui estaba nuevo detalle--->

                              <!-- Boton nuevo registro Detalle -->
                              <template>
                                <v-btn
                                  right
                                  class="ma-2"
                                  color="brown"
                                  :disabled="deshabilitaDetalle"
                                  elevation="2"
                                  small
                                  @click.stop="dialogNewMovDet = true"
                                  @click="
                                    ;(alert = false),
                                      (alert2 = false),
                                      (alertAdvertencia = true),
                                      (alertSaldo = false)
                                  "
                                  >Nuevo Detalle</v-btn
                                >
                              </template>

                              <v-card-title
                                ><v-img
                                  src="@/assets/logo_ivey.jpg"
                                  width="20%"
                                  height="20%"
                                ></v-img>

                                <span class="headline">Detalle de movimiento</span>
                              </v-card-title>

                              <template v-slot:after-heading></template>
                              <!--INICIA DIALOG nuevo mov det-->

                              <v-dialog
                                v-model="dialogNewMovDet"
                                persistent
                                max-width="620px"
                                max-height="820px"
                              >
                                <ConfirmationDialog v-model="isSure" @click="cancel" />
                                <v-card
                                  ><v-card-title class="text-h5 brown lighten"> </v-card-title
                                  ><v-card-text
                                    ><span class="headline" style="text-align: center">{{
                                      formTitleDet
                                    }}</span
                                    ><v-container>
                                      <v-row
                                        ><v-col>
                                          <v-row>
                                            <!--campo ejercicio-->
                                            <v-col
                                              ><v-text-field
                                                v-model="editedItem.ejercicio"
                                                label="Ejercicio"
                                                dense
                                                :disabled="true"
                                                persistent-hint
                                                item-value="ejercicio"
                                              ></v-text-field
                                            ></v-col>
                                            <!--campo tipo presupuesto-->
                                            <v-col>
                                              <v-select
                                                :menu-props="{ top: true, offsetY: true }"
                                                v-model="editedItemDet.idTipoPres"
                                                label="Tipo de presupuesto"
                                                dense
                                                :items="tipoDetalle"
                                                :item-text="(item) => item.tipo_clave"
                                                hint="Seleccione  una opción"
                                                persistent-hint
                                                @input="setfilter"
                                                @change="viewItemDetSaldo"
                                                @click="alertSaldo = false"
                                                item-value="tipo_clave"
                                              ></v-select
                                            ></v-col>
                                          </v-row>
                                          <v-row
                                            ><!--campo clave tipo presupuesto--><v-col>
                                              <v-select
                                                :menu-props="{ top: true, offsetY: true }"
                                                v-model="editedItemDet.idClaveTipoPres"
                                                label="Descripción de presupuesto"
                                                dense
                                                :items="TipoDes"
                                                :item-text="(item) => item.tipo_descripcion"
                                                hint="Seleccione  una opción"
                                                persistent-hint
                                                :enabled="isSolicita"
                                                :disabled="verificaMonto"
                                                item-value="tipo_clave"
                                              ></v-select
                                            ></v-col>
                                            <!--monto--><v-col
                                              ><v-text-field
                                                v-model="$v.editedItemDet.monto.$model"
                                                @blur="$v.editedItemDet.monto.$touch()"
                                                @change="
                                                  $v.editedItemDet.monto.$reset(),
                                                    (changedDet = true)
                                                "
                                                @input="validaMaximoPresupuesto(true)"
                                                text-xs-right
                                                :error-messages="montoDetErrors"
                                                label="Monto"
                                                dense
                                                return-object
                                                :enabled="verificaMonto"
                                                :disabled="verificaMonto"
                                                required
                                                @keypress="isNumber($event)"
                                                prepend-icon="mdi-currency-usd"
                                                persistent-hint
                                              ></v-text-field
                                            ></v-col>
                                          </v-row>
                                          <template>
                                            <v-alert
                                              v-model="alert2"
                                              dense
                                              border="left"
                                              transition="fade-transition"
                                              colored-border
                                              type="success"
                                              elevation="1"
                                              icon="mdi-check-circle"
                                            >
                                              Saldo disponible:
                                              <strong>{{
                                                formato(eFormatos.MONEDA, saldoTitle)
                                              }}</strong>
                                            </v-alert>
                                            <v-alert
                                              v-model="alert"
                                              dense
                                              border="left"
                                              transition="fade-transition"
                                              colored-border
                                              type="error"
                                              elevation="1"
                                              icon="mdi-alert-circle"
                                            >
                                              No cuenta con presupuesto:
                                              <strong>{{
                                                formato(eFormatos.MONEDA, saldoTitle)
                                              }}</strong>
                                            </v-alert>
                                            <v-alert
                                              v-model="alertAdvertencia"
                                              dismissible
                                              dense
                                              border="left"
                                              colored-border
                                              transition="fade-transition"
                                              type="warning"
                                              elevation="1"
                                              icon="mdi-alert-outline"
                                            >
                                              Seleccione un tipo de presupuesto para ver el saldo
                                            </v-alert>
                                            <v-alert
                                              dismissible
                                              dense
                                              v-model="alertSaldo"
                                              text
                                              transition="fade-transition"
                                              type="error"
                                            >
                                              La cantidad ingresasa supera el saldo restante:
                                              <strong>{{
                                                formato(eFormatos.MONEDA, saldoTitle)
                                              }}</strong>
                                            </v-alert>
                                          </template>
                                          <v-card-actions
                                            ><v-spacer></v-spacer
                                            ><v-btn
                                              color="red darken-1"
                                              @click="checkChangesDet"
                                              text
                                              >Cancelar</v-btn
                                            ><v-btn
                                              color="blue darken-1"
                                              @click="saveMovimientoDet"
                                              text
                                              :enabled="validaGuardar"
                                              :disabled="validaGuardar"
                                              >Guardar</v-btn
                                            ></v-card-actions
                                          ></v-col
                                        ></v-row
                                      ></v-container
                                    ></v-card-text
                                  ></v-card
                                ></v-dialog
                              >
                              <v-spacer></v-spacer>
                              <v-divider class="mt-5" />
                              <v-spacer></v-spacer>
                              <div class="text-overline mb-3"></div>
                              <template>
                                <v-row>
                                  <v-card
                                    :disabled="deshabilitaDetalle"
                                    class="mx-auto"
                                    width="344"
                                    outlined
                                  >
                                    <v-list-item three-line>
                                      <v-list-item-content>
                                        <div class="text-overline mb-4">Por:</div>
                                        <v-list-item-title class="text-h5 mb-1">
                                          RECURSOS
                                        </v-list-item-title>
                                        <!--<v-list-item-subtitle >Total:{{ formato(eFormatos.MONEDA, MontoSaldo('MontoTotalTipo')) }}</v-list-item-subtitle>-->
                                      </v-list-item-content>
                                      <v-list-item-avatar tile size="80" color="brown"
                                        ><v-icon large center dark
                                          >mdi-file-document-outline</v-icon
                                        ></v-list-item-avatar
                                      >
                                    </v-list-item>
                                    <v-btn
                                      color="brown"
                                      outlined
                                      value="actions"
                                      rounded
                                      text
                                      depressed
                                      class="ma-2"
                                      @click="
                                        viewItemDet('RECURSOS'), validaMaximoPresupuesto(true)
                                      "
                                      >Ver</v-btn
                                    ><v-btn
                                      color="error"
                                      outlined
                                      value="actions"
                                      rounded
                                      :disabled="true"
                                      text
                                      depressed
                                      @click="cancelItemDet('RECURSOS')"
                                      class="mx-2"
                                      >Cancelar</v-btn
                                    >
                                  </v-card>
                                  <!---UGI--->
                                  <v-card
                                    class="mx-auto"
                                    width="344"
                                    outlined
                                    :disabled="deshabilitaDetalle"
                                  >
                                    <v-list-item three-line>
                                      <v-list-item-content>
                                        <div class="text-overline mb-4">Por:</div>
                                        <v-list-item-title class="text-h5 mb-1">
                                          UGI
                                        </v-list-item-title>
                                        <!--<v-list-item-subtitle >Total:{{ formato(eFormatos.MONEDA, MontoSaldo('MontoTotalTipo')) }}</v-list-item-subtitle>-->
                                      </v-list-item-content>
                                      <v-list-item-avatar tile size="80" color="brown"
                                        ><v-icon large center dark
                                          >mdi-clipboard-list-outline</v-icon
                                        ></v-list-item-avatar
                                      >
                                    </v-list-item>
                                    <v-btn
                                      outlined
                                      depressed
                                      rounded
                                      class="ma-2"
                                      @click="viewItemDet('UGI')"
                                      color="brown"
                                      text
                                    >
                                      Ver </v-btn
                                    ><v-btn
                                      color="error"
                                      outlined
                                      value="actions"
                                      rounded
                                      text
                                      depressed
                                      :disabled="true"
                                      @click="cancelItemDet('UGI')"
                                      class="mx-2"
                                      >Cancelar</v-btn
                                    >
                                  </v-card>
                                  <!--UBP--->
                                  <v-card
                                    class="mx-auto"
                                    width="344"
                                    :disabled="deshabilitaDetalle"
                                    outlined
                                  >
                                    <v-list-item three-line
                                      ><v-list-item-content>
                                        <div class="text-overline mb-4">Por:</div>
                                        <v-list-item-title class="text-h5 mb-1"
                                          >UBP
                                        </v-list-item-title>
                                        <!---<v-list-item-subtitle>Total:{{ formato(eFormatos.MONEDA, MontoSaldo('MontoTotalTipo')) }}</v-list-item-subtitle>---></v-list-item-content
                                      >
                                      <v-list-item-avatar tile size="80" color="brown">
                                        <v-icon large center dark
                                          >mdi-home-analytics</v-icon
                                        ></v-list-item-avatar
                                      >
                                    </v-list-item>
                                    <!--<v-card-actions>-->
                                    <v-btn
                                      color="brown"
                                      outlined
                                      rounded
                                      depressed
                                      text
                                      class="ma-2"
                                      @click="viewItemDet('UBP')"
                                    >
                                      Ver </v-btn
                                    ><v-btn
                                      color="error"
                                      outlined
                                      value="actions"
                                      rounded
                                      text
                                      depressed
                                      :disabled="true"
                                      class="mx-2"
                                      @click="cancelItemDet('UBP')"
                                      >Cancelar</v-btn
                                    ><!--</v-card-actions>--></v-card
                                  ></v-row
                                >
                                <v-spacer></v-spacer><v-divider class="mt-3" />
                                <v-spacer></v-spacer>
                                <div class="mt-3"></div>
                                <h4 class="total">
                                  Monto del movimiento {{ editedItem.idMovimiento }} :
                                  {{ formato(eFormatos.MONEDA, editedItem.monto) }}
                                </h4>
                                <v-divider class="mt-3" />
                                <div class="mt-3"></div>
                                Documento: {{ editedItem.documento }}</template
                              >
                              <!--FINALIZA DIALOG nuevo mov det-->
                              <!--<v-data-table
                                class="Black--text"
                                dense
                                loading-text="Cargando... Espere por favor"
                                :headers="headerMovtoDet"
                                :items="movimientosDet"
                                :loading="isLoading"
                                :search.sync="search"
                                disable-pagination
                                hide-default-footer
                               
                              >
                                <template v-slot:no-data>
                                  ¡No hay datos para mostrar en este movimiento!
                                </template>
                                <template v-slot:item.monto="{ item }">
                                  {{ formato(eFormatos.MONEDA, item.monto) }}
                                </template>
                                <template v-slot:item.actions="{ item }">
                                  <v-btn  color="brown" x-small  depressed class="mx-2" @click="editItemDet(item)"
                                    ><v-icon center dark> mdi-eye</v-icon></v-btn
                                  >
                             
                                </template>

                                <template v-slot:footer> <v-divider class="mt-3" />
                                  <h4 class="total">
                                    Total restante del movimiento: {{ editedItem.idMovimiento }} :
                                    {{ formato(eFormatos.MONEDA, sumaCampo('osDetSubtotal')) }}
                                  </h4>
                                  Documento: {{ editedItem.documento }}</template
                                >
                                <template slot="body.append">
                                  <tr class="Black--text">
                                    <th> <h2 class="centrado">TOTAL</h2></th>
                                    
                                    <th>
                                     
                                    </th>
                                    <th>
                                      <h2 class="total">
                                       {{ formato(eFormatos.MONEDA, sumaCampo('MontoInicial')) }}
                                      </h2>
                                    </th>
                                  </tr>
                                </template></v-data-table
                                >-->
                              <v-row> </v-row> <v-divider class="mt-3" />
                              <v-card-actions
                                ><v-spacer></v-spacer>
                                <v-btn color="red darken-1" @click="checkChanges" text
                                  >Salir</v-btn
                                ></v-card-actions
                              ></v-container
                            ></v-card-text
                          >
                        </v-tab-item>
                      </v-tabs>
                    </v-card>
                  </v-card>
                </template>
              </v-dialog>
              <!---inicia finaliza de visaluizar moviminento incial--->
            </v-col>
            <!---Inicia dialogo de movimientos cancelados---->
            <v-dialog
              hide-overlay
              transition="dialog-bottom-transition"
              v-model="dialogDetxMovimientoCancelado"
              persistent
              max-width="720"
              ><v-card
                ><v-toolbar dark color="brown">
                  <v-btn icon dark @click="dialogDetxMovimientoCancelado = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-tittle>Movimientos Cancelados:</v-toolbar-tittle>
                </v-toolbar>
                <v-card-text
                  ><v-container class="elevation-1">
                    <v-card-title
                      ><span class="headline">Movimientos Cancelados:</span>
                    </v-card-title>
                    <v-spacer></v-spacer><v-divider class="mt-3" />
                    <v-data-table
                      class="Black--text"
                      dense
                      loading-text="Cargando... Espere por favor"
                      :headers="headerMvtosCanceladosDet"
                      :items="MovimientosCancelados"
                      :loading="isLoading"
                      hide-default-footer
                    >
                      > <template v-slot:no-data> ¡No hay datos para mostrar! </template>
                      <!--formatos de cantidades-->
                      <template v-slot:item.monto="{ item }">
                        {{ formato(eFormatos.MONEDA, item.monto) }}
                      </template>
                      <template v-slot:[`item.fechaDocumento`]="{ item }">
                        <div class="name-info-title">
                          {{ formato(eFormatos.FECHA, item.cancelado_el) }}
                        </div>
                      </template>
                    </v-data-table>
                  </v-container></v-card-text
                >
              </v-card>
            </v-dialog>
            <!--finaliza dialogo de movimientos cancelados-->
            <!--Finaliza dialogo detalle movimiento-->
            <v-dialog
              hide-overlay
              transition="dialog-bottom-transition"
              v-model="dialogDetxMovimiento"
              persistent
              max-width="1920"
            >
              <v-card>
                <v-toolbar dark color="brown">
                  <v-btn icon dark @click="checkChangesDialogDet">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Movimiento por:</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <!--<v-toolbar-items>
            <v-btn
            dark
            text
            @click="dialog = false"
            >
            Salir
          </v-btn>
        </v-toolbar-items>-->
                </v-toolbar>
                <v-card-text>
                  <v-container class="elevation-1">
                    <v-card-title
                      ><v-img src="@/assets/logo_ivey.jpg" width="20%" height="20%"> </v-img>
                      <span class="headline">Detalle de movimiento</span>
                    </v-card-title>

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
                    <v-data-table
                      class="Black--text"
                      dense
                      loading-text="Cargando... Espere por favor"
                      :headers="headerMovtoDet"
                      :items="MovimientoRecursos"
                      :loading="isLoading"
                      :search.sync="search"
                    >
                      <template v-slot:no-data>
                        ¡No hay datos para mostrar en este movimiento!
                      </template>
                      <template v-slot:item.monto="{ item }">
                        {{ formato(eFormatos.MONEDA, item.monto) }}
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <!--cancelar movimiento de presupuesto-->
                        <v-btn
                          color="error"
                          text
                          outlined
                          x-small
                          depressed
                          class="mx-2"
                          @click="cancelItem(item)"
                          >Cancelar<v-icon center dark> mdi-x</v-icon></v-btn
                        >
                      </template>

                      <template v-slot:footer>
                        <v-divider class="mt-3" />
                        <div class="mt-3"></div>
                        <h3 class="total">
                          Total: {{ formato(eFormatos.MONEDA, MontoSaldo('MontoTotalTipo')) }}
                        </h3>
                        <v-divider class="mt-3" />
                        <h4>
                          Saldo restante: {{ formato(eFormatos.MONEDA, MontoSaldo('SaldoxTipo')) }}
                        </h4>
                        <v-spacer></v-spacer>
                        <v-divider class="mt-3" />

                        <v-flex text-xs-left>
                          <v-btn
                            color="error"
                            text
                            outlined
                            small
                            depressed
                            class="ma-2"
                            @click="dialogDetxMovimientoCancelado = true"
                            >Ver movimientos cancelados</v-btn
                          >
                        </v-flex>
                      </template>
                    </v-data-table>
                    <!----FINALIZA DATA TABLE MOVIMIENTO DETALLE--->
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
            <!---DIALOGO CANCELAR DETALLE POR TIPO-->

            <v-dialog
              hide-overlay
              transition="dialog-bottom-transition"
              v-model="dialogCancelar"
              persistent
              width="600px"
              height="600px"
            >
              <ConfirmationDialog v-model="isSureDetalleMov" @click="cancelDetMov" />
              <v-toolbar dark color="brown">
                <v-btn icon dark @click="checkChangesCancel">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Cancelar detalle de movimiento</v-toolbar-title> </v-toolbar
              ><v-card
                ><v-card-text
                  ><template>
                    <v-alert
                      dense
                      border="left"
                      colored-border
                      transition="fade-transition"
                      type="warning"
                      elevation="1"
                      icon="mdi-alert-outline"
                    >
                      <h4><strong>Detalle de movimiento a cancelar:</strong></h4>
                    </v-alert></template
                  >
                  <v-container>
                    <template> </template>
                    <v-row>
                      <v-col>
                        <div>
                          <div>
                            <strong>Tipo de presupuesto por:</strong>
                          </div>
                          <div>
                            {{ this.editedItemDet.idTipoPres }}
                          </div>
                        </div>
                      </v-col>
                      <v-col>
                        <div>
                          <div>
                            <strong> Monto:</strong>
                          </div>
                          <div>
                            {{ formato(eFormatos.MONEDA, this.editedItemDet.monto) }}
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <div>
                          <div>
                            <strong>Tipo de monto:</strong>
                          </div>
                          <div>
                            {{ this.editedItemDet.idClaveTipoPres }}
                          </div>
                        </div>
                      </v-col>
                      <v-col>
                        <div>
                          <strong> Motivo de cancelacion:</strong>
                        </div>
                        <v-text-field
                          v-model="$v.editedItemDetCancel.motivoCancelacion.$model"
                          @blur="$v.editedItemDetCancel.motivoCancelacion.$touch()"
                          @input="changed = true"
                          append-icon="mdi-tooltip-question-outline"
                          class="ml-auto"
                          required
                          counter="150"
                          maxlength="150"
                          :error-messages="cancelacionError"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" @click="checkChangesCancel" text>Salír</v-btn
                      ><v-btn
                        color="blue darken-1"
                        text
                        @click="valueCancelDet = true"
                        :disabled="validandoCaDet"
                        >Continuar</v-btn
                      >
                    </v-card-actions>
                    <!-- Empieza el dialogo de confirmación -->
                    <v-dialog v-model="valueCancelDet" persistent max-width="330px">
                      <v-card>
                        <!-- Empieza titulo y texto del dialogo-->
                        <!-- Titulo y texto personalizable -->
                        <v-card-title class="headline font-weight-medium"
                          >¿Seguro quiere cancelar?</v-card-title
                        >
                        <v-card-text>¡Se perderán los datos de este movimiento!</v-card-text>
                        <!-- Termina titulo y texto del dialogo -->

<<<<<<< HEAD
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Empieza Botón 1 (color y texto personalizable)-->
        <v-btn
          class="font-weight-medium"
          color="red darken-1"
          text
          @click="checkChangesCancel"
        >Salír</v-btn>
        <!-- Termina Botón 1 -->
        <!-- Empieza Botón 2 (color y texto personalizable) -->
        <v-btn
          class="font-weight-medium"
          color="green darken-1"
          text
          @click="GuardaCancelarDetalle"
          :disabled="validandoCaDet"
        >Aceptar</v-btn>
        <!-- Termina Botón 2 -->
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- Termina el dialogo de confirmación -->
                </v-container></v-card-text
=======
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <!-- Empieza Botón 1 (color y texto personalizable)-->
                          <v-btn
                            class="font-weight-medium"
                            color="red darken-1"
                            text
                            @click="checkChangesCancel"
                            >Salír</v-btn
                          >
                          <!-- Termina Botón 1 -->
                          <!-- Empieza Botón 2 (color y texto personalizable) -->
                          <v-btn
                            class="font-weight-medium"
                            color="green darken-1"
                            text
                            @click="GuardaCancelarDetalle"
                            :disabled="validandoCaDet"
                            >Aceptar</v-btn
                          >
                          <!-- Termina Botón 2 -->
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- Termina el dialogo de confirmación -->
                  </v-container></v-card-text
>>>>>>> 58d7e389a49fbc03f152aa96b67e94c5fe483574
                ></v-card
              >
            </v-dialog>
            <!---FINALIZA DIALOGO CANCELAR DETALLE POR TIPO-->
          </v-card>

        </base-material-card>
      </v-tab-item>
      <!---FINALIZA TAB ITEM PRESUPUES-->
      <!-- ---------------------------------------------------------------- -->
      <!---INICIA TAB ITEM PRESUPUE ANUAL-->
      <v-tab-item>
        <base-material-card icon="mdi-cash-100" color="brown darken-1" inline class="px-5 py-3">
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
            <!---INICIA DATA TABLE   PRESUPUESTO ANUAL-->
            <v-data-table
              :headers="headerPresAnual"
              :items="presupuestoAnual"
              :search.sync="search"
              :loading="isLoading"
              dense
              loading-text="Cargando... Espere por favor"
              disable-pagination
              hide-default-footer
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon X-large class="mr-2" @click="editItemPres(item)">mdi-eye</v-icon>
                <!-- <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>-->
                <!--<v-icon small @click="deleteItem(item)">mdi-delete</v-icon>-->
              </template>
              <template v-slot:item.Monto="{ item }">
                {{ formato(eFormatos.MONEDA, item.Monto) }}
              </template>
              <template v-slot:no-data> ¡No hay datos para mostrar! </template></v-data-table
            >
            <!---FIN DATA TABLE   PRESUPUESTO ANUAL-->
            <!--Dialogo detalle presupuesto anul-->
            <v-col cols="auto">
              <ConfirmationDialog v-model="isSure" @click="cancel" />
              <!---inicia dialogo de visaluizar presupuesto anual--->
              <v-dialog
                transition="dialog-bottom-transition"
                max-width="1920"
                v-model="dialogDePresAnual"
                persistent
              >
                <template>
                  <v-card>
                    <v-toolbar dense flat color="brown darken-1" dark>
                      <!--<span class="headline">{{ formTitleView }} </span>-->
                    </v-toolbar>

                    <v-card flat
                      ><v-tabs fixed-tabs background-color="">
                        <v-tabs-slider color="brown darken-1"></v-tabs-slider>
                        <v-tab>
                          <v-icon left> mdi-card-bulleted-outline</v-icon>Presupuesto Anual</v-tab
                        >

                        <!--INICIA TAB ITEM DTALLE ANUAL-->
                        <v-tab-item
                          ><v-card-text
                            ><v-container class="elevation-1">
                              <v-card-title
                                ><v-img
                                  src="@/assets/logo_ivey.jpg"
                                  width="20%"
                                  height="20%"
                                ></v-img>
                                <span class="headline">{{ formTitleAnual }}</span>
                              </v-card-title>

                              <v-spacer></v-spacer>
                              <template v-slot:after-heading></template>
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
                              <!--Data tble presupuesto anual det--->
                              <v-data-table
                                class="Black--text"
                                dense
                                loading-text="Cargando... Espere por favor"
                                :headers="headerPresAnualDet"
                                :items="presupuestoAnualDet"
                                :loading="isLoading"
                                :search.sync="search"
                                disable-pagination
                                hide-default-footer
                              >
                                <template v-slot:no-data>
                                  ¡No hay datos para mostrar en este ejercicio!
                                </template>
                                <template v-slot:item.monto="{ item }">
                                  {{ formato(eFormatos.MONEDA, item.monto) }}
                                </template>
                                <template v-slot:item.actions="{ item }">
                                  <v-btn
                                    color="success"
                                    outlined
                                    text
                                    x-small
                                    depressed
                                    class="mx-2"
                                    @click="viewItemDetAnual(item)"
                                    >Detalle<v-icon center dark> mdi-x</v-icon></v-btn
                                  >
                                  <!--<v-icon small @click="deleteItem(item)">mdi-delete</v-icon>-->
                                </template>

                                <!-- FOOTER -->

                                <template v-slot:footer>
                                  <v-divider class="mt-3" />
                                  <h4 class="total">
                                    MONTO TOTAL :
                                    {{
                                      formato(eFormatos.MONEDA, sumaPresupuestoAnual('TotalAnual'))
                                    }}
                                  </h4>
                                </template>
                                <template slot="body.append">
                                  <tr class="Black--text">
                                    <!--  <th></th>
                                    <th></th>-->
                                    <!--  <th></th> -->
                                    <!--<th>
                                      <h2 class="centrado">TOTAL</h2>
                                    </th>
                                    <th>
                                      <h2 class="total">
                                       {{ formato(eFormatos.MONEDA, sumaCampo('Smonto')) }}
                                      </h2>
                                    </th>-->
                                  </tr>
                                </template></v-data-table
                              ><v-row> </v-row> <v-divider class="mt-3" />
                              <v-card-actions
                                ><v-spacer></v-spacer>
                                <!--<v-btn
                                        color="blue darken-1"
                                        text
                                        @click="save"
                                        :disabled="validando"
                                        >Guardar</v-btn
                                      >--><v-btn
                                  color="red darken-1"
                                  @click="checkChangesDetAnual"
                                  text
                                  >Salir</v-btn
                                ></v-card-actions
                              ></v-container
                            ></v-card-text
                          >
                        </v-tab-item>
                      </v-tabs>
                      <!---------------------------------------------------------------------------------------->

                      <v-dialog
                        hide-overlay
                        transition="dialog-bottom-transition"
                        v-model="dialogDetxAnual"
                        persistent
                        width="620px"
                        height="920px"
                      >
                        <v-card flat>
                          <v-toolbar dark color="brown">
                            <v-btn icon dark @click="checkChanges">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Detalle:</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <!--<v-toolbar-items>
            <v-btn
            dark
            text
            @click="dialog = false"
            >
            Salir
          </v-btn>
        </v-toolbar-items>-->
                          </v-toolbar>
                          <v-card-text>
                            <v-container class="elevation-1">
                              <v-card-title>
                                <span class="font-weight-medium"
                                  >Tipo de presupuesto: {{ editedItemPres.idTipoPres }}</span
                                >
                                <div>
                                  <span class="font-weight-medium">{{
                                    editedItemPres.idClaveTipoPres
                                  }}</span>
                                </div>
                              </v-card-title>
                              <!--  v-for="title in itemAnual" :key="title.text"-->
                              <template>
                                <div>
                                  <v-expansion-panels class="mb-6" focusable>
                                    <v-expansion-panel>
                                      <v-expansion-panel-header class="font-weight-bold">
                                        Proyectos
                                      </v-expansion-panel-header>
                                      <v-expansion-panel-content>
                                        <div>
                                          Número de proyectos: {{ editedItemPres.proyectos }}
                                        </div>
                                        <div>
                                          Monto:
                                          {{
                                            formato(eFormatos.MONEDA, editedItemPres.montoProyectos)
                                          }}
                                        </div>
                                      </v-expansion-panel-content>
                                    </v-expansion-panel>
                                    <!------------------------------------------------------------->
                                    <v-expansion-panel>
                                      <v-expansion-panel-header class="font-weight-bold">
                                        Licitaciones
                                      </v-expansion-panel-header>
                                      <v-expansion-panel-content>
                                        <div>
                                          Número de licitaciones: {{ editedItemPres.licitaciones }}
                                        </div>
                                        <div>
                                          Monto:
                                          {{
                                            formato(
                                              eFormatos.MONEDA,
                                              editedItemPres.montoLicitaciones
                                            )
                                          }}
                                        </div>
                                      </v-expansion-panel-content>
                                    </v-expansion-panel>
                                    <!------------------------------------------------------------->
                                    <v-expansion-panel>
                                      <v-expansion-panel-header class="font-weight-bold">
                                        Contratos
                                      </v-expansion-panel-header>
                                      <v-expansion-panel-content>
                                        <div>
                                          Número de contratos: {{ editedItemPres.contratos }}
                                        </div>
                                        <div>
                                          Monto:
                                          {{
                                            formato(eFormatos.MONEDA, editedItemPres.montoContratos)
                                          }}
                                        </div>
                                      </v-expansion-panel-content>
                                    </v-expansion-panel>
                                    <!------------------------------------------------------------->

                                    <v-expansion-panel>
                                      <v-expansion-panel-header class="font-weight-bold">
                                        Estimaciones
                                      </v-expansion-panel-header>
                                      <v-expansion-panel-content>
                                        <div>
                                          Número de estimaciones: {{ editedItemPres.estimaciones }}
                                        </div>
                                        <div>
                                          Monto:
                                          {{
                                            formato(
                                              eFormatos.MONEDA,
                                              editedItemPres.montoEstimaciones
                                            )
                                          }}
                                        </div>
                                      </v-expansion-panel-content>
                                    </v-expansion-panel>
                                    <!------------------------------------------------------------->
                                    <v-expansion-panel>
                                      <v-expansion-panel-header class="font-weight-bold">
                                        Anticipos
                                      </v-expansion-panel-header>
                                      <v-expansion-panel-content>
                                        <div>
                                          Número de anticipos: {{ editedItemPres.anticipos }}
                                        </div>
                                        <div>
                                          Monto:
                                          {{
                                            formato(eFormatos.MONEDA, editedItemPres.montoAnticipos)
                                          }}
                                        </div>
                                      </v-expansion-panel-content>
                                    </v-expansion-panel>
                                    <!------------------------------------------------------------->
                                  </v-expansion-panels>
                                </div>
                              </template>
                            </v-container></v-card-text
                          >
                        </v-card>
                      </v-dialog>
                      <!----------------------------------------------------------------------------------------->
                    </v-card>

                    <!-- <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Cerrar</v-btn>
                  </v-card-actions>-->
                  </v-card>
                </template>
              </v-dialog>
              <!---inicia finaliza de visaluizar presupuesto anual--->
            </v-col>
            <!--Finaliza dialogo detalle presupuesto anual-->
          </v-card></base-material-card
        >
      </v-tab-item>
      <!---FINALIZA TAB ITEM PRESUPUES ANUAL-->
    </v-tabs></v-container
  >
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
    dialogNewMovDet: false,
    dialog2: false,
    dialogDetxMovimiento: false,
    dialogDetxMovimientoCancelado: false,
    dialogDePresAnual: false,
    dialogCancelar: false,
    dialogDetxAnual: false,
    dialogCancelarMovimiento: false,
    dialogCancelaPrin:false,
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
      { text: 'Movimiento', value: 'idMovimiento' },
      { text: 'Ejercicio', value: 'ejercicio' },
      { text: 'Documento', value: 'documento' },
      { text: 'Fecha', value: 'fechaDocumento' },
      { text: '$ Monto', value: 'monto' },
      //{ text: 'Cancelado', value: 'cancelado' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    headerMovtoDet: [
      // { text: 'Movimiento', value: 'idMovimiento', class: 'blue accent-2' },
      { text: 'Ejercicio', value: 'ejercicio' },
      { text: 'Clave Presupuesto', value: 'idClaveTipoPres' },
      { text: 'Tipo', value: 'idTipoPres' },
      { text: 'Descripción', value: 'nomClaveTipoPres' },
      { text: 'Monto', value: 'monto' },
      //{ text: 'Monto total de movimiento', value: '' },
      { text: 'Acciones', value: 'actions', sortable: false },
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
    montos: [],
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
    MovimientosCancelados: [],
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
    },
    editedItemCanDet: {
      motivoCancelacion: '',
    },
    editedItemCan: {
      motivoCancelacion: '',
    },
    editedItemDet: {
      idMovimiento: 0,
      ejercicio: '',
      idTipoPres: '',
      idClaveTipoPres: '',
      monto: 0,
      motivoCancelacion: '',
    },
    editedItemDetCancel: {
      motivoCancelacion: '',
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
      motivoCancelacion: '',
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
      monto: { required },
      //tipoMonto: { required },
    },
    editedItemCan: {
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
      await this.obtenerMovimientos(jwt, '')
      this.obtenerPresupuestoAnual()
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
      await this.verificarMonto('', '')
      console.log()
    },

    /*=============================================
    =            OBTENER DATOS            =
    =============================================*/
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
    async obtenerMovimientos(jwt, filtro) {
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
    },
    async obtenerDetxMovimientoCancelados(idTipoPres) {
      params = idTipoPres
      let params = null
      let jwt = await getValidToken(this)
      params =
        'filtro?campo1=idTipoPres&tipo1=igual&valor1=' +
        idTipoPres +
        '&logico2=and&campo2=idMovimiento&tipo2=igual&valor2=' +
        this.idMovimiento +
        '&logico3=and&tipo3=igual&campo3=cancelado&valor3=1'
      if (jwt != null) {
        this.MovimientosCancelados = []
        let payload = { jwt: jwt, params: params }
        await this.$store
          .dispatch('mvtoDetalle/fetchMontoDet', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.MovimientosCancelados = response.data
              this.isLoading = false
              this.idMovimiento = this.MovimientosCancelados[0].idMovimiento
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
        this.idMovimiento +
        '&logico3=and&tipo3=igual&campo3=cancelado&valor3=0'
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

    //obtener movimientos
    /* async obtenerMovimientos() {
      this.isLoading = true
      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: null }
        this.montos = []
        await this.$store
          .dispatch('monto/fetchMonto', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.montos = response.data
              this.isLoading = false
              console.log('monto', this.idMovimiento)
              this.idMovimiento = this.montos[0].idMovimiento
              //this.idTipoPres= this.movimientosDet[0].idTipoPres
            }
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
    //OBTENER PRESUPUESTO ANUAL
    async obtenerPresupuestoAnual() {
      console.log
      this.isLoading = true
      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: null }
        this.presupuestoAnual = []
        await this.$store
          .dispatch('prespuestoAnual/fetchPresupuestoAnual', payload)
          .then((response) => {
            this.presupuestoAnual = response.data
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
          motivoCancelacion: this.editedItemCan.motivoCancelacion,
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
          motivoCancelacion: this.editedItemDetCancel.motivoCancelacion,
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
        let body = {
          ejercicio: this.editedItem.ejercicio,
          documento: this.editedItem.documento,
          fechaDocumento: this.editedItem.fechaDocumento,
          tipoMov: this.editedItem.tipoMov,
          tipoMonto: this.editedItem.tipoMonto,
          //tipo_descripcion: this.editedItem.tipo_descripcion,
          monto: this.editedItem.monto,
          observaciones: this.editedItem.observaciones,
        }

        let jwt = await getValidToken(this)
        let payload = { jwt: jwt, body: body }
        if (this.editedIndex > -1) {
          payload.id = this.editedItem.idMovimiento
          await this.$store
            .dispatch('monto/addMvto', payload)
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
          Object.assign(this.montos[this.editedIndex], this.editedItem)
        } else {
          await this.$store
            .dispatch('monto/addMvto', payload)
            .then((response) => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se creó con éxito',
              })
              this.montos.push(response.data)
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
        await this.obtenerMovimientos(jwt, '')
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
      this.isEditingDet = true
      this.isEditing = true
      console.log('Detalle de item princioal', item)
      this.editedIndex = this.montos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      //aqui se cambia el valor del id
      console.log('editedItem', this.editedItem)
      this.idMovimiento = this.editedItem.idMovimiento
      //this.idTipoPres = this.editedItemDet.idTipoPres
      await this.obtenerMovimientosDeta(this.idMovimiento)
      console.log('valor de ', this.obtenerMovimientosDeta(this.idMovimiento))
      this.dialogDeMov = true
      //this.viewItemDetSaldos()
      //await this.validaMaximoPresupuesto(true)
      //console.log('orden', this.validaMaximoPresupuesto(true))
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
    async viewItemDet(idTipoPres) {
      this.idTipoPres = idTipoPres
      await this.obtenerDetxMovimiento(idTipoPres)
      this.dialogDetxMovimiento = true
      await this.obtenerDetxMovimientoSaldo(this.idMovimiento + '/' + idTipoPres)
      await this.obtenerDetxMovimientoCancelados(idTipoPres)
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
      this.isSureDetalleMov = isSureDetalleMov
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
        this.dialogDetxAnual = false
        this.dialogCancelarMovimiento = false
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
      return this.MovimientoRecursos.map((item) =>
        Object.assign({}, { random: Math.random() }, item)
      )
    },
    /*itemAnual()
      {
        return this.itemsAnual.filter(title =>{
          return title.text === 'Proyectos'  
        })
      }
    ,*/
    formTitle() {
      return this.editedIndex === -1
        ? 'Nuevo Movimiento'
        : 'Movimiento: #' + this.editedItem.idMovimiento
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
    montoErrors() {
      const errors = []
      if (!this.$v.editedItem.monto.$dirty) return errors
      !this.$v.editedItem.monto.required && errors.push('Ingrese un monto incial')
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
      if (
        !this.$v.editedItemCan.motivoCancelacion.$dirty &&
        !this.$v.editedItemDetCancel.motivoCancelacion.$dirty
      )
        return errors
      !this.$v.editedItemCan.motivoCancelacion.required &&
        !this.$v.editedItemDetCancel.motivoCancelacion.required &&
        errors.push('Ingrese un motivo de cancelacion')
      return errors
    },

    /*fin detalle*/
    /*=============================================a
    =            Validador comment block            =
    =============================================*/
    validandoCa() {
      let valida = true
      if (this.$v.editedItemCan.motivoCancelacion.$model != '') {
        valida = false
      }

      //valida = false
      return valida
    },
    validandoCaDet() {
      let valida = true
      if (this.$v.editedItemDetCancel.motivoCancelacion.$model != '') {
        valida = false
      }

      //valida = false
      return valida
    },
    validando() {
      let valida = true
      if (
        this.$v.editedItem.ejercicio.$model != '' &&
        //this.$v.editedItem.motivoCancelacion.$model != '' &&
        this.editedItem.documento.$model != '' &&
        this.editedItem.observaciones.$model != '' &&
        this.editedItem.tipoMonto.$model != '' &&
        this.editedItem.fechaDocumento.$model != '' &&
        this.editedItem.tipoMov.$model != '' &&
        this.$v.editedItem.monto.$model != ''
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
      if (
        this.editedItem.idMovimiento == ''
        /*this.editedItem.motivoCancelacion == ''*/
      ) {
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
