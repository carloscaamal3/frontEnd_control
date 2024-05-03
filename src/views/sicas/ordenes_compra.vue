<template>
  <v-container id="ordenes" tag="section">
    <base-material-card
      class="px-5 py-3"
      color="primary"
      icon="mdi-cart-outline"
      inline
      :title="$t('orders')"
    >
      <v-spacer></v-spacer>
      <template v-slot:after-heading></template>

      <!-- Boton nuevo registro -->
      <template v-slot:corner-button>
        <v-btn
          class="ma-2"
          color="primary"
          elevation="2"
          small
          @click="nuevaCaptura"
          @click.stop="dialog = true"
          >Nueva órden de compra</v-btn
        >
      </template>

      <!-- Overlay para retroalimentar al usuario -->
      <v-overlay :value="overlay">
        <v-progress-circular color="success" indeterminate :size="50"></v-progress-circular>
      </v-overlay>

      <!-- Textfield para la barra de Búsqueda -->
      <v-text-field
        append-icon="mdi-magnify"
        class="ml-auto"
        hide-details
        label="Búsqueda"
        single-line
        style="max-width: 250px"
        v-model="search"
      />

      <!-- Dialogo -->
      <v-dialog v-model="dialog" max-width="1200px">
        <v-tabs v-model="tabs" fixed-tabs background-color="indigo" dark>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab> <v-icon left> mdi-card-bulleted-outline</v-icon>Cabecero </v-tab>
          <v-tab> <v-icon right> mdi-format-list-bulleted-type </v-icon>Detalle </v-tab>
          <v-tabs-items v-model="tabs">
            <!-- Cabecero -->
            <v-tab-item>
              <base-material-card
                color="blue"
                icon="mdi-card-bulleted-outline"
                inline
                class="px-5 py-3"
              >
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    <v-img src="@/assets/logo_ivey.jpg" width="20%" height="20%"></v-img>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <!-- Nº Orden -->
                        <v-col cols="2" class="v-text">
                          <v-text-field
                            class="DocumentoId"
                            id="osNumDoc"
                            autofocus
                            dense
                            :disabled="!existeOrden"
                            label="Nº Orden de Compra*"
                            maxlength="20"
                            required
                            v-model="editedItem.osNumDoc"
                            @blur="$v.editedItem.osNumDoc.$touch()"
                            @input="$v.editedItem.osNumDoc.$reset()"
                            @change="validaExisteOrden()"
                          ></v-text-field>
                        </v-col>
                        <!-- Fecha de Orden -->
                        <v-col cols="4" class="v-text">
                          <v-menu
                            v-model="fromDateMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.osFecha"
                                label="Fecha Orden"
                                prepend-icon="mdi-calendar-month"
                                v-bind="attrs"
                                v-on="on"
                                dense
                                id="osFecha"
                                :disabled="existeOrden"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              locale="en-in"
                              :min="minDate"
                              :max="maxDate"
                              v-model="editedItem.osFecha"
                              @input=";(fromDateMenu = false), (changed = true)"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <!-- Tipo Adjudicacion -->
                        <v-col cols="4" class="v-text">
                          <v-select
                            v-model="$v.editedItem.osTipoAdjudicacion.$model"
                            :items="tipoAdjudicacion"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Tipo de Adjudicacion*"
                            item-text="tipo_descripcion"
                            item-value="tipo_clave"
                            persistent-hint
                            dense
                            :disabled="existeOrden"
                            return-object
                            :error-messages="osTipoAdjudicacionErrors"
                            @blur="$v.editedItem.osTipoAdjudicacion.$touch()"
                          >
                          </v-select>
                        </v-col>
                        <!-- Genero Adjudicacion -->
                        <v-col cols="2" class="v-text">
                          <v-select
                            v-model="$v.editedItem.osgenAdjudicacion.$model"
                            :items="genAdjudicacion"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Género de Adjudicacion*"
                            item-text="tipo_descripcion"
                            item-value="tipo_clave"
                            persistent-hint
                            dense
                            disabled
                            return-object
                            :error-messages="osgenAdjudicacionErrors"
                            @blur="$v.editedItem.osgenAdjudicacion.$touch()"
                          >
                          </v-select>
                        </v-col>
                        <!-- Conceptos para solicitud -->
                        <v-col cols="4" class="v-text">
                          <v-select
                            v-model="$v.editedItem.sp_concepto.$model"
                            :items="conceptos"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Concepto*"
                            item-text="tipo_descripcion"
                            item-value="tipo_clave"
                            persistent-hint
                            dense
                            :disabled="existeOrden"
                            @input="setfilterProveedor"
                            return-object
                            :error-messages="sp_conceptoErrors"
                            @blur="$v.editedItem.sp_concepto.$touch()"
                          >
                          </v-select>
                        </v-col>
                        <!-- Proveedor -->
                        <v-col cols="6" class="v-text">
                          <v-autocomplete
                            v-model="$v.editedItem.prov_id.$model"
                            :items="proveedores"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Proveedor*"
                            item-text="prov_razon_social"
                            item-value="prov_id"
                            persistent-hint
                            append-outer-icon="mdi-pencil"
                            dense
                            :disabled="existeOrden"
                            return-object
                            :error-messages="prov_idErrors"
                            @input="setfilterCuentas"
                            @blur="$v.editedItem.prov_id.$touch()"
                            @click:append-outer="editarProveedor"
                          >
                          </v-autocomplete>
                          <!-- @input="changed = true" -->
                        </v-col>
                        <!-- Cuenta Contable -->
                        <v-col cols="2" class="v-text">
                          <v-select
                            v-model="$v.editedItem.cuecon_cuenta.$model"
                            :items="cuentas"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Cuenta*"
                            item-text="cuecon_cuenta"
                            item-value="cuecon_cuenta"
                            persistent-hint
                            dense
                            :disabled="existeOrden"
                            return-object
                            :error-messages="cuecon_cuentaErrors"
                            @input="changed = true"
                            @blur="$v.editedItem.cuecon_cuenta.$touch()"
                          >
                          </v-select>
                        </v-col>
                        <!-- Correo Electronico Proveedor -->
                        <!--  <v-col cols="6" class="v-text">
                          <v-text-field
                            dense
                            disabled
                            label="Correo Electrónico"
                            maxlength="200"
                            v-model="editedItem.prov_email"
                            @blur="$v.editedItem.prov_email.$touch()"
                            @input="$v.editedItem.prov_email.$reset()"
                          ></v-text-field>
                        </v-col> -->
                        <!-- Correo Electronico Proveedor 2-->
                        <!--  <v-col cols="6" class="v-text">
                          <v-text-field
                            dense
                            disabled
                            label="Correo Electrónico 2"
                            maxlength="200"
                            v-model="editedItem.prov_email2"
                            @blur="$v.editedItem.prov_email2.$touch()"
                            @input="$v.editedItem.prov_email2.$reset()"
                          ></v-text-field>
                        </v-col> -->
                        <!-- CR/FF-->
                        <!-- <v-col cols="2" class="v-text">
                        <v-text-field
                          dense
                          disabled
                          label="CR/FF"
                          maxlength="45"
                          v-model="editedItem.osCRFF"
                          @blur="$v.editedItem.osCRFF.$touch()"
                          @input="$v.editedItem.osCRFF.$reset()"
                        ></v-text-field>
                      </v-col> -->
                        <!-- Direccion Proveedor -->
                        <v-col cols="5" class="v-text">
                          <v-text-field
                            dense
                            :disabled="existeOrden"
                            label="Direccion"
                            maxlength="300"
                            v-model="editedItem.prov_direccion"
                            @blur="$v.editedItem.prov_direccion.$touch()"
                            @input="$v.editedItem.prov_direccion.$reset()"
                          ></v-text-field>
                        </v-col>
                        <!-- Ciudad Proveedor-->
                        <v-col cols="5" class="v-text">
                          <v-text-field
                            dense
                            :disabled="existeOrden"
                            label="Ciudad"
                            maxlength="100"
                            v-model="editedItem.prov_ciudad"
                            @blur="$v.editedItem.prov_ciudad.$touch()"
                            @input="$v.editedItem.prov_ciudad.$reset()"
                          ></v-text-field>
                        </v-col>

                        <!-- Fecha Limite de Entrega -->
                        <v-col cols="4" class="v-text">
                          <v-menu
                            v-model="fromDateMenuFLM"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.osFechaLimEntrega"
                                label="Fecha Limite de Entrega"
                                prepend-icon="mdi-calendar-month"
                                v-bind="attrs"
                                v-on="on"
                                dense
                                id="osFechaLimEntrega"
                                :disabled="existeOrden"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              locale="en-in"
                              :min="minDate"
                              :max="maxDate"
                              v-model="editedItem.osFechaLimEntrega"
                              @input=";(fromDateMenuFLM = false), (changed = true)"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <!-- Lugar de Entrega -->
                        <v-col cols="6" class="v-text">
                          <v-autocomplete
                            v-model="$v.editedItem.osLugarEntrega.$model"
                            :items="lugaresEntrega"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Lugar de Entrega*"
                            item-text="tipo_descripcion"
                            item-value="tipo_descripcion"
                            persistent-hint
                            dense
                            :disabled="existeOrden"
                            return-object
                            :error-messages="osLugarEntregaErrors"
                            @blur="$v.editedItem.osLugarEntrega.$touch()"
                          >
                          </v-autocomplete>
                        </v-col>
                        <!-- Dias de Credito -->
                        <v-col cols="2" class="v-text">
                          <v-text-field
                            dense
                            :disabled="existeOrden"
                            type="number"
                            label="Dias de Credito"
                            v-model="editedItem.osDiasCredito"
                            @blur="$v.editedItem.osDiasCredito.$touch()"
                            @input="$v.editedItem.osDiasCredito.$reset()"
                          ></v-text-field>
                        </v-col>
                        <!-- Descripcion -->
                        <v-col cols="12" class="v-text">
                          <v-textarea
                            v-model="editedItem.osDescripcion"
                            label="Descripción"
                            :disabled="existeOrden"
                            counter="250"
                            dense
                            no-resize
                            rows="1"
                            @input="$v.editedItem.osDescripcion.$reset(), (changed = true)"
                            @blur="$v.editedItem.osDescripcion.$touch()"
                          ></v-textarea>
                        </v-col>
                        <!-- Campo Observacion -->
                        <v-col cols="12" class="v-text">
                          <v-text-field
                            v-model="editedItem.osObservacion"
                            label="Observaciones"
                            counter="255"
                            :disabled="existeOrden"
                            dense
                            @input="$v.editedItem.osObservacion.$reset(), (changed = true)"
                            @blur="$v.editedItem.osObservacion.$touch()"
                          ></v-text-field>
                        </v-col>
                        <!-- Empleado Solicita -->
                        <v-col cols="4" class="v-text">
                          <v-select
                            v-model="$v.editedItem.osEmpSolicita.$model"
                            :items="empSolicita"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Empleado Solicita*"
                            :item-text="(item) => item.emp_nombre + ' - ' + item.emp_puesto"
                            item-value="emp_id"
                            persistent-hint
                            dense
                            :disabled="existeOrden"
                            :error-messages="osEmpSolicitaErrors"
                            hint="Seleciona Empleado Solicita"
                            @input="setfilterDirSolicita"
                            return-object
                            @blur="$v.editedItem.osEmpSolicita.$touch()"
                          >
                          </v-select>
                        </v-col>
                        <!-- direccion Solicita -->
                        <v-col cols="4" class="v-text">
                          <v-select
                            v-model="$v.editedItem.osDirSolicita.$model"
                            :items="dirSolicita"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Direccion Solicita*"
                            item-text="emp_direccion"
                            item-value="emp_direccion"
                            persistent-hint
                            dense
                            :disabled="existeOrden"
                            :error-messages="osDirSolicitaErrors"
                            return-object
                            @change="onChangeDirSolicita"
                            @blur="$v.editedItem.osDirSolicita.$touch()"
                          >
                          </v-select>
                        </v-col>
                        <!-- Departamento Solicita -->
                        <v-col cols="4" class="v-text">
                          <v-select
                            v-model="$v.editedItem.osDeptoSolicita.$model"
                            :items="deptoSolicita"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Departamento Solicita*"
                            item-text="emp_departamento"
                            item-value="emp_departamento"
                            persistent-hint
                            dense
                            :disabled="existeOrden"
                            :error-messages="osDeptoSolicitaErrors"
                            return-object
                            @blur="$v.editedItem.osDeptoSolicita.$touch()"
                          >
                          </v-select>
                        </v-col>
                        <!-- direccion Destino -->
                        <v-col cols="6" class="v-text">
                          <v-select
                            v-model="$v.editedItem.osDirDestino.$model"
                            :items="dirDestino"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Direccion Destino*"
                            item-text="emp_direccion"
                            item-value="emp_direccion"
                            persistent-hint
                            dense
                            :disabled="existeOrden"
                            :error-messages="osDirDestinoErrors"
                            return-object
                            @blur="$v.editedItem.osDirDestino.$touch()"
                          >
                          </v-select>
                        </v-col>
                        <!-- Departamento Destino -->
                        <v-col cols="6" class="v-text">
                          <v-select
                            v-model="$v.editedItem.osDeptoDestino.$model"
                            :items="deptoDestino"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Departamento Destino*"
                            item-text="emp_departamento"
                            item-value="emp_departamento"
                            persistent-hint
                            dense
                            :disabled="existeOrden"
                            :error-messages="osdeptoDestinoErrors"
                            return-object
                            @blur="$v.editedItem.osDeptoDestino.$touch()"
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-checkbox
                      v-model="checkbox"
                      label="Crear otro"
                      :disabled="isEditing"
                    ></v-checkbox>
                    <v-btn color="red darken-1" text @click="checkChanges">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="save" :disabled="validando"
                      >Guardar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </base-material-card>
            </v-tab-item>
            <!-- Detalle -->
            <v-tab-item>
              <base-material-card
                color="blue"
                icon="mdi-format-list-bulleted-type"
                inline
                class="px-5 py-3"
              >
                <v-spacer></v-spacer>
                <template v-slot:after-heading></template>

                <!-- Boton nuevo registro Detalle -->
                <template v-slot:corner-button>
                  <v-btn
                    class="ma-2"
                    color="primary"
                    elevation="2"
                    small
                    @click="nuevaCapturaDet"
                    @click.stop="dialog = true"
                    :disabled="existeOrden"
                    >nuevo Detalle</v-btn
                  >
                </template>
                <!-- Tabla de DETALLE de Ordenes de compra-->
                <v-data-table
                  class="Black--text"
                  dense
                  loading-text="Cargando... Espere por favor"
                  :headers="headersDet"
                  :items="ordenesDet"
                  :loading="isLoading"
                  :search.sync="search"
                  hide-default-footer
                >
                  <template v-slot:[`item.osDetPrecio`]="{ item }">
                    {{ formato(eFormatos.MONEDA, item.osDetPrecio) }}
                  </template>
                  <template v-slot:[`item.osDetDescuento`]="{ item }">
                    {{ formato(eFormatos.MONEDA, item.osDetDescuento) }}
                  </template>
                  <template v-slot:[`item.osDetIVA`]="{ item }">
                    {{ formato(eFormatos.MONEDA, item.osDetIVA) }}
                  </template>
                  <template v-slot:[`item.osDetTotal`]="{ item }">
                    {{ formato(eFormatos.MONEDA, item.osDetTotal) }}
                  </template>

                  <!-- Acciones de la Tabla Principal -->
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon class="mr-2" small @click="editItemDet(item)">mdi-pencil</v-icon>
                    <v-icon small @click="deleteItemDet(item)">mdi-delete</v-icon>
                  </template>

                  <!-- FOOTER -->
                  <template v-slot:footer>Orden de Compra: {{ editedItem.osNumDoc }}</template>
                  <template slot="body.append">
                    <tr class="Black--text">
                      <th></th>
                      <th></th>
                      <th>
                        <h2 class="centrado">TOTAL</h2>
                      </th>
                      <th class="total">
                        <h2>
                          {{ formato(eFormatos.IMPORTE, sumaCampo('osDetCantidad')) }}
                        </h2>
                      </th>
                      <th></th>
                      <th class="total">
                        <h2 class="total">
                          {{ formato(eFormatos.MONEDA, sumaCampo('osDetDescuento')) }}
                        </h2>
                      </th>
                      <th>
                        <h2 class="total">
                          {{ formato(eFormatos.MONEDA, sumaCampo('osDetSubtotal')) }}
                        </h2>
                      </th>
                      <th>
                        <h2 class="total">
                          {{ formato(eFormatos.MONEDA, sumaCampo('osDetIVA')) }}
                        </h2>
                      </th>
                      <th>
                        <h2 class="total">
                          {{ formato(eFormatos.MONEDA, sumaCampo('osDetTotal')) }}
                        </h2>
                      </th>
                    </tr>
                  </template>
                </v-data-table>
              </base-material-card>

              <!-- dialogo Detalle -->
              <v-dialog v-model="dialogDet" max-width="800px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    <v-img src="@/assets/logo_ivey.jpg" width="20%" height="20%"></v-img>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <!-- Producto, Marca y unidad -->
                      <v-row>
                        <!-- Nº Posicion -->
                        <v-col cols="1" class="v-text">
                          <v-text-field
                            background-color="yellow"
                            label="Nº Posición*"
                            maxlength="20"
                            required
                            disabled
                            v-model="editedItemDet.osDetPosicion"
                            @blur="$v.editedItemDet.osDetPosicion.$touch()"
                            @input="$v.editedItemDet.osDetPosicion.$reset()"
                          ></v-text-field>
                        </v-col>
                        <!-- Familias -->
                        <v-col cols="3" class="v-text">
                          <v-autocomplete
                            autofocus
                            v-model="editedItemDet.familia_id"
                            :items="familias"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Familias*"
                            item-text="tipo_descripcion"
                            item-value="tipo_clave"
                            persistent-hint
                            hint="Seleciona Familia"
                            return-object
                            @change="setfilterFamilias"
                            @input="changedDet = true"
                            @blur="$v.editedItemDet.familia_id.$touch()"
                          >
                          </v-autocomplete>
                        </v-col>
                        <!-- Producto -->
                        <v-col cols="8" class="v-text">
                          <v-autocomplete
                            v-model="$v.editedItemDet.prod_id.$model"
                            :items="productos"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Producto*"
                            item-text="prod_descripcion"
                            item-value="prod_id"
                            persistent-hint
                            hint="Seleciona Producto"
                            return-object
                            :error-messages="prod_idErrors"
                            @change="setfilterProductos"
                            @input="changedDet = true"
                            @blur="$v.editedItemDet.prod_id.$touch()"
                          >
                          </v-autocomplete>
                        </v-col>
                        <!-- <v-col cols="3">
                          <v-checkbox
                            dense
                            label="Todos"
                            v-model="chkAllProd"
                            @change="onChangeAllProd"
                          ></v-checkbox>
                        </v-col> -->
                        <!-- Unidades -->
                        <v-col cols="6" class="v-text">
                          <v-select
                            v-model="$v.editedItemDet.unidad_id_det.$model"
                            :items="unidades"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Unidad*"
                            item-text="tipo_descripcion"
                            item-value="tipo_clave"
                            persistent-hint
                            dense
                            hint="Seleciona la Unidad"
                            return-object
                            :error-messages="unidad_idErrors"
                            @blur="$v.editedItemDet.unidad_id_det.$touch()"
                            @input="changedDet = true"
                          >
                          </v-select>
                        </v-col>
                        <!-- Marcas -->
                        <v-col cols="6" class="v-text">
                          <v-autocomplete
                            v-model="$v.editedItemDet.marca_id.$model"
                            :items="marcas"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Marca*"
                            item-text="tipo_descripcion"
                            item-value="tipo_clave"
                            persistent-hint
                            dense
                            hint="Seleciona la Marca"
                            return-object
                            :error-messages="marca_idErrors"
                            @blur="$v.editedItemDet.marca_id.$touch()"
                            @input="changedDet = true"
                          >
                          </v-autocomplete>
                        </v-col>
                      </v-row>
                      <!-- Cantidad -->
                      <v-row justify="end">
                        <v-col class="v-text" cols="3">
                          <v-text-field
                            class="v-text-Right"
                            label="Cantidad*"
                            maxlength="20"
                            required
                            dense
                            v-model="editedItemDet.osDetCantidad"
                            @blur="$v.editedItemDet.osDetCantidad.$touch()"
                            @input=";(changedDet = true), $v.editedItemDet.osDetCantidad.$reset()"
                            id="osDetCantidad"
                            ref="input"
                            @change="CalcularDetalle"
                            @focus="focusField('osDetCantidad')"
                            v-on:keyup.enter="NextField('osDetPrecio')"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <!-- Precio -->
                      <v-row justify="end">
                        <v-col class="v-text" cols="3">
                          <v-text-field
                            class="v-text-Right"
                            label="Precio*"
                            maxlength="20"
                            required
                            dense
                            id="osDetPrecio"
                            v-model="editedItemDet.osDetPrecio"
                            @blur="$v.editedItemDet.osDetPrecio.$touch()"
                            @input=";(changedDet = true), $v.editedItemDet.osDetPrecio.$reset()"
                            v-on:keyup.enter="NextField('osPorcDcto')"
                            @change="CalcularDetalle"
                            @focus="focusField('osDetPrecio')"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <!-- CAMPOS Descuento -->
                      <v-row justify="end">
                        <!-- Porcentaje -->
                        <v-col class="v-text" cols="3">
                          <v-text-field
                            class="v-text-Right"
                            label="Porcentaje Descuento"
                            maxlength="20"
                            dense
                            id="osPorcDcto"
                            v-model="editedItemDet.osPorcDcto"
                            @input="changedDet = true"
                            v-on:keyup.enter="NextField('osDetDescuento')"
                            @change="CalcularDetalle"
                            @focus="focusField('osPorcDcto')"
                          ></v-text-field>
                        </v-col>
                        <!-- Descuento -->
                        <v-col class="v-text" cols="3">
                          <v-text-field
                            class="v-text-Right"
                            label="Descuento"
                            maxlength="20"
                            dense
                            id="osDetDescuento"
                            v-model="editedItemDet.osDetDescuento"
                            @input="changedDet = true"
                            v-on:keyup.enter="NextField('osDetSubtotal')"
                            @change="CalcularDetalle"
                            @focus="focusField('osDetDescuento')"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <!-- SubTotal -->
                      <v-row justify="end">
                        <v-col class="v-text" cols="3">
                          <v-text-field
                            class="v-text-Right"
                            label="Sub Total"
                            maxlength="20"
                            readonly
                            dense
                            id="osDetSubtotal"
                            v-model="editedItemDet.osDetSubtotal"
                            @blur="$v.editedItemDet.osDetSubtotal.$touch()"
                            @input=";(changedDet = true), $v.editedItemDet.osDetSubtotal.$reset()"
                            v-on:keyup.enter="NextField('osDetIVA')"
                            @change="CalcularDetalle"
                            @focus="focusField('osDetSubtotal')"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <!-- CAMPOS IVA -->
                      <v-row justify="end">
                        <v-col class="v-text" cols="3">
                          <v-select
                            id="osDetTasaIVA"
                            v-model="$v.editedItemDet.osDetTasaIVA.$model"
                            :items="tasaIvas"
                            :menu-props="{ top: true, offsetY: true }"
                            label="Tasa IVA*"
                            item-text="tipo_descripcion"
                            item-value="tipo_clave"
                            persistent-hint
                            dense
                            hint="Seleciona la Tasa de IVA"
                            return-object
                            :error-messages="osDetTasaIVAErrors"
                            @blur="$v.editedItemDet.osDetTasaIVA.$touch()"
                            v-on:keyup.enter="NextField('osDetIVA')"
                            @input="CalcularDetalle, (changedDet = true)"
                            @change="CalcularDetalle"
                            @focus="focusField('osDetTasaIVA')"
                          >
                          </v-select>
                        </v-col>
                        <v-col class="v-text" cols="3">
                          <v-text-field
                            class="v-text-Right"
                            label="IVA*"
                            maxlength="20"
                            required
                            dense
                            id="osDetIVA"
                            v-model="editedItemDet.osDetIVA"
                            @blur="$v.editedItemDet.osDetIVA.$touch()"
                            @input=";(changedDet = true), $v.editedItemDet.osDetIVA.$reset()"
                            @change="CalcularDetalle"
                            @focus="focusField('osDetIVA')"
                            v-on:keyup.enter="NextField('osDetTotal')"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <!-- Total -->
                      <v-row justify="end">
                        <v-col class="v-text" cols="3">
                          <p class="font-weight-black">
                            <v-text-field
                              class="v-text-Right"
                              label="Total"
                              background-color="yellow"
                              maxlength="20"
                              required
                              id="osDetTotal"
                              readonly
                              dense
                              v-model="editedItemDet.osDetTotal"
                              @blur="$v.editedItemDet.osDetTotal.$touch()"
                              @input=";(changedDet = true), $v.editedItemDet.osDetTotal.$reset()"
                              @focus="focusField('osDetIVA')"
                            ></v-text-field>
                          </p>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-checkbox
                      v-model="checkboxDet"
                      label="Crear otro"
                      :disabled="isEditingDet"
                    ></v-checkbox>
                    <v-btn color="red darken-1" text @click="checkChangesDet">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="SaveDet" :disabled="validandoDet"
                      >Guardar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <ConfirmationDialog v-model="isSureDet" @click="cancelDet" />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-dialog>
      <!-- Fin dialogo -->

      <ConfirmationDialog v-model="isSure" @click="cancel" />

      <!-- Dialogo Editar Proveedor-->
      <EditaProveedor
        v-model="dialogEditProv"
        @click="cancel"
        :esEdicion="true"
        :proveedor="editedItem.prov_id"
        :editaCorreo1="false"
        :editaCorreo2="false"
        :editaDireccion="false"
        :editaCiudad="false"
        :editaRFC="false"
        :editaEmpYuc="false"
        :editaRegPad="false"
      />

      <v-divider class="mt-3" />

      <!-- Tabla de Ordenes de compra-->
      <v-data-table
        dense
        loading-text="Cargando... Espere por favor"
        :headers="headers"
        :items="ordenes"
        :loading="isLoading"
        :search.sync="search"
        hide-default-footer
        disable-pagination
      >
        <!-- Template para Fecha -->
        <template v-slot:[`item.osFecha`]="{ item }">
          <div class="name-info-title">
            {{ formato(eFormatos.FECHA_NUM, item.osFecha) }}
          </div>
        </template>

        <template v-slot:[`item.osTotal`]="{ item }">
          {{ formato(eFormatos.MONEDA, item.osTotal) }}
        </template>

        <!-- Acciones de la Tabla Principal -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="mr-2" small @click="editItem(item)">mdi-pencil</v-icon>
          <!--<v-icon class="mr-2" small @click="editItemDet(item)">mdi-view-grid-outline</v-icon> -->
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          <v-icon small @click="printItem(item)">mdi-printer</v-icon>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
/**
 * @fileoverview Pantalla para Captura de Ordenes de Compra
 *
 * @version 1.0
 *
 * @author Roger Paulino Gala Pacheo rogapa@hotmail.com
 *
 * @copyright DesignSoft
 *
 * Historial
 * ---------
 * La primera versión fue escrita por Roger Gala Pacheco
 */
import ConfirmationDialog from '@/components/general/ConfirmationDialog.vue'
import EditaProveedor from '@/components/general/EditaProveedor.vue'
import { getValidToken } from '@/store/helpers.js'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import * as tools from '@/store/modules/tools.store.js'
import { imprimeFormatoOrdenCompra } from '@/store/modules/sica/impresionesSica.store.js'
//D:\DEVELOP\IVEY\solicitud_pagos\src\store\modules\sica\impresionesSica.store.js

import Vue from 'vue'
export default {
  components: {
    ConfirmationDialog,
    EditaProveedor,
    //DataExporter,
  },
  data: () => ({
    eFormatos: tools.formatos,
    dialog: false,
    dialogDet: false,
    dialogEditProv: false,

    editedIndex: -1,
    editedIndexDet: -1,

    fromDateMenu: false,
    fromDateMenuFLM: false,

    idEmpleadoAut: 0,
    idEmpleadoSolFirma: 0,

    isEditing: false,
    isEditingDet: false,

    isLoading: false,

    isSure: false,
    isSureDet: false,

    chkAllProd: false,
    checkboxDet: false,
    checkbox: false,

    changed: false,
    changedDet: false,

    existeOrden: true,

    tipo_temp: 0,
    clave_temp: '',
    familiaAct: '',

    //Detalle
    contPosiciones: 0,
    subTotalCalculado: 0,
    descuentoCalculado: 0,
    ivaCalculado: 0,
    TotalCalculado: 0,
    //manejo de secuencia de escoger selects
    //isTipo: true,
    minDate: '2021-01-01',
    maxDate: '2050-01-31',

    overlay: false,
    search: null,
    bandValidaCampos: false,

    tabs: 0,
    headers: [
      { text: 'Nº Doc', align: 'start', value: 'osNumDoc', sortable: true },
      //      { text: 'Tipo Doc', align: 'center', value: 'osTipoDoc', sortable: true },
      //    { text: 'Tipo Os', align: 'center', value: 'osTipoOs', sortable: true },
      { text: 'Fecha', align: 'center', value: 'osFecha', sortable: true },
      { text: 'Solicita', align: 'center', value: 'osEmpSolicitaNombre', sortable: true },
      { text: 'Descripción', align: 'center', value: 'osDescripcion', sortable: true },
      //{ text: 'Observación', align: 'center', value: 'osObservacion', sortable: true },
      { text: 'Comite', align: 'center', value: 'concom_descripcion', sortable: true },
      //{ text: 'Partida Gobal', align: 'center', value: 'osPartidaGlobal', sortable: true },

      //{ text: 'Partida Generica', align: 'center', value: 'osPartidaGenerica', sortable: true },
      //{ text: 'Dir Solicita', align: 'center', value: 'osDirSolicita', sortable: true },
      //{ text: 'Dir Destino', align: 'center', value: 'osDirDestino', sortable: true },
      { text: 'Total', align: 'center', value: 'osTotal', sortable: true },
      //{ text: 'Descuento', align: 'center', value: 'osDescuento', sortable: true },
      //{ text: 'IVA', align: 'center', value: 'osIva', sortable: true },
      //{ text: 'Tipo Adjudicacion', align: 'center', value: 'osTipoAdjudicacion', sortable: true },
      //{ text: 'OsAdjudicacion', align: 'center', value: 'osgenAdjudicacion', sortable: true },
      { text: 'Proveedor ID', align: 'center', value: 'prov_razon_social', sortable: true },
      //{ text: 'cuecon_cuenta', align: 'center', value: 'cuecon_cuenta', sortable: true },
      { text: 'Estatus', align: 'center', value: 'estatus_nombre', sortable: true },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    headersDet: [
      { text: 'Posicion', align: 'start', value: 'osDetPosicion', sortable: true },
      //{ text: 'Producto', align: 'center', value: 'prod_id', sortable: true },
      { text: 'Descripcion', align: 'center', value: 'prod_descripcion', sortable: true },
      { text: 'Unidad', align: 'center', value: 'unidad_id_det_desc', sortable: true },
      //{ text: 'Familia', align: 'center', value: 'familia_desc', sortable: true },
      //{ text: 'Marca', align: 'center', value: 'marca_desc', sortable: true },

      { text: 'Cantidad', align: 'start', value: 'osDetCantidad', sortable: true },
      { text: 'Precio  ', align: 'start', value: 'osDetPrecio', sortable: true },
      { text: 'Descuento', align: 'right', value: 'osDetDescuento', sortable: true },
      { text: 'osDetSubTotal', align: 'right', value: 'osDetSubtotal', sortable: true },
      //{ text: 'subTotal', align: 'right', value: 'osDetSubTotal', sortable: true },

      { text: 'IVA', align: 'right', value: 'osDetIVA', sortable: true },
      { text: 'TOTAL', align: 'right', value: 'osDetTotal', sortable: true },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    defaultItem: {
      osNumDoc: '',
      osTipoDoc: '',
      osTipoOs: '',
      osFecha: '',
      osEmpSolicita: '',
      osUserCrea: '',
      osFechaElabora: '',
      osDescripcion: '',
      osObservacion: '',
      osDirSolicita: '',
      osDeptoSolicita: '',
      osDirDestino: '',
      osDeptoDestino: '',
      osSubTotal: 0,
      osDescuento: 0,
      osIva: 0,
      osTipoAdjudicacion: '',
      osgenAdjudicacion: '',
      sp_ejercicio: 0,
      sp_id: 0,
      sp_tipo_sol: 0,
      sp_concepto: 0,
      prov_id: 0,
      cuecon_cuenta: '',
      osEstatus: '',
      osUserMod: '',
      osFechaMod: '',
      //prov_email: '',
      //prov_email2: '',
      osFechaLimEntrega: '',
      osLugarEntrega: '',
      osDiasCredito: '',
      prov_direccion: '',
      prov_ciudad: '',
    },
    defaultItemDet: {
      osNumDoc: '',
      prod_id: '',
      unidad_id_det: '',
      marca_id: '',
      osDetCantidad: 0,
      osDetPrecio: 0,
      osPorcDcto: 0,
      osDetDescuento: 0,
      osDetSubtotal: 0,
      osDetTasaIVA: '',
      osDetIVA: 0,
      osDetTotal: 0,
      osDetActivo: '',
      familia_id: '',
    },
    editedItem: {
      osNumDoc: '',
      osTipoDoc: '',
      osTipoOs: '',
      osFecha: '',
      osEmpSolicita: '',
      osUserCrea: '',
      osFechaElabora: '',
      osDescripcion: '',
      osObservacion: '',
      //familiaComite: '',
      osDirSolicita: '',
      osDeptoSolicita: '',
      osDirDestino: '',
      osDeptoDestino: '',
      osSubTotal: 0,
      osDescuento: 0,
      osIva: 0,
      osTipoAdjudicacion: '',
      osgenAdjudicacion: '',
      sp_ejercicio: 0,
      sp_id: 0,
      sp_tipo_sol: 0,
      sp_concepto: 0,
      prov_id: 0,
      cuecon_cuenta: '',
      osEstatus: '',
      osUserMod: '',
      osFechaMod: '',
      //prov_email: '',
      //prov_email2: '',
      osFechaLimEntrega: '',
      osLugarEntrega: '',
      osDiasCredito: '',
      prov_direccion: '',
      prov_ciudad: '',
    },
    editedItemDet: {
      osNumDoc: '',
      prod_id: '',
      unidad_id_det: '',
      marca_id: '',
      osDetCantidad: 0,
      osDetPrecio: 0,
      osPorcDcto: 0,
      osDetDescuento: 0,
      osDetSubtotal: 0,
      osDetTasaIVA: '',
      osDetIVA: 0,
      osDetTotal: 0,
      osDetActivo: '',
      familia_id: '',
    },
    editedItemProv: {
      prov_id: 0,
      prov_razon_social: '',
      prov_tipo: 0,
      prov_activo: true,
      prov_RFC: '',
      prov_empresayuc: false,
      prov_NumRegPadProv: '',
      prov_email: '',
      prov_email2: '',
      prov_direccion: '',
      prov_ciudad: '',
    },
    conceptos: [],
    //ctaContable: [],
    cuentas: [],
    deptoDestino: [],
    deptoSolicita: [],
    dirDestino: [],
    dirSolicita: [],
    empSolicita: [],
    familias: [],
    genAdjudicacion: [],
    generales: [],
    tasaIvas: [],
    marcas: [],
    ordenes: [],
    ordenesDet: [],
    productos: [],
    proveedores: [],
    tipoAdjudicacion: [],
    unidades: [],
    lugaresEntrega: [],
  }),
  mixins: [validationMixin],
  //Validaciones para los campos del formulario
  validations: {
    editedItem: {
      osNumDoc: { required },
      prov_id: { required },
      osDirSolicita: { required },
      osDeptoSolicita: { required },
      osDirDestino: { required },
      osDeptoDestino: { required },
      osEmpSolicita: { required },
      osTipoAdjudicacion: { required },
      osgenAdjudicacion: { required },
      sp_concepto: { required },
      osLugarEntrega: { required },
      cuecon_cuenta: { required, minLength: minLength(3), maxLength: maxLength(20) },
    },
    editedItemDet: {
      osNumDoc: { required },
      prod_id: { required },
      unidad_id_det: { required },
      marca_id: { required },
      osDetTasaIVA: { required },
      osDetCantidad: { required },
      osDetPrecio: { required },
      osDetIVA: { required },
    },
  },
  watch: {
    dialogDet(val) {
      val || this.closeDet()
    },
    async dialogEditProv(val) {
      console.log('Watch', 'dialogEditProv(val)', val)
      /*if (!val) {
        await this.actualizaProveedor()
      }
      */
    },
  },
  async created() {
    this.Refreesca()
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Nueva Órden de Compra'
        : 'Editar Órden de Compra: ' + this.editedItem.osNumDoc
    },
    sp_conceptoErrors() {
      const errors = []
      if (!this.$v.editedItem.sp_concepto.$dirty) return errors
      !this.$v.editedItem.sp_concepto.required && errors.push('Este campo es requerido')
      return errors
    },
    prov_idErrors() {
      const errors = []
      if (!this.$v.editedItem.prov_id.$dirty) return errors
      !this.$v.editedItem.prov_id.required && errors.push('Este campo es requerido')
      return errors
    },
    cuecon_cuentaErrors() {
      const errors = []
      if (!this.$v.editedItem.cuecon_cuenta.$dirty) return errors
      !this.$v.editedItem.cuecon_cuenta.required && errors.push('Este campo es requerido')
      !this.$v.editedItem.cuecon_cuenta.minLength &&
        errors.push('Este campo debe de tener un mínimo de 3 caracteres.')
      !this.$v.editedItem.cuecon_cuenta.maxLength &&
        errors.push('Este campo debe de tener un máximo de 20 caracteres.')
      return errors
    },
    osDirDestinoErrors() {
      const errors = []
      if (!this.$v.editedItem.osDirDestino.$dirty) return errors
      !this.$v.editedItem.osDirDestino.required && errors.push('Este campo es requerido')
      return errors
    },
    osDirSolicitaErrors() {
      const errors = []
      if (!this.$v.editedItem.osDirSolicita.$dirty) return errors
      !this.$v.editedItem.osDirSolicita.required && errors.push('Este campo es requerido')
      return errors
    },
    osDeptoSolicitaErrors() {
      const errors = []
      if (!this.$v.editedItem.osDeptoSolicita.$dirty) return errors
      !this.$v.editedItem.osDeptoSolicita.required && errors.push('Este campo es requerido')
      return errors
    },
    osdeptoDestinoErrors() {
      const errors = []
      if (!this.$v.editedItem.osDeptoDestino.$dirty) return errors
      !this.$v.editedItem.osDeptoDestino.required && errors.push('Este campo es requerido')
      return errors
    },
    osEmpSolicitaErrors() {
      const errors = []
      if (!this.$v.editedItem.osEmpSolicita.$dirty) return errors
      !this.$v.editedItem.osEmpSolicita.required && errors.push('Este campo es requerido')
      return errors
    },
    osLugarEntregaErrors() {
      const errors = []
      if (!this.$v.editedItem.osLugarEntrega.$dirty) return errors
      !this.$v.editedItem.osLugarEntrega.required && errors.push('Este campo es requerido')
      return errors
    },

    prod_idErrors() {
      const errors = []
      if (!this.$v.editedItemDet.prod_id.$dirty) return errors
      !this.$v.editedItemDet.prod_id.required && errors.push('Este campo es requerido')
      return errors
    },
    osTipoAdjudicacionErrors() {
      const errors = []
      if (!this.$v.editedItem.osTipoAdjudicacion.$dirty) return errors
      !this.$v.editedItem.osTipoAdjudicacion.required && errors.push('Este campo es requerido')
      return errors
    },
    osgenAdjudicacionErrors() {
      const errors = []
      if (!this.$v.editedItem.osgenAdjudicacion.$dirty) return errors
      !this.$v.editedItem.osgenAdjudicacion.required && errors.push('Este campo es requerido')
      return errors
    },
    unidad_idErrors() {
      const errors = []
      if (!this.$v.editedItemDet.unidad_id_det.$dirty) return errors
      !this.$v.editedItemDet.unidad_id_det.required && errors.push('Este campo es requerido')
      return errors
    },
    marca_idErrors() {
      const errors = []
      if (!this.$v.editedItemDet.marca_id.$dirty) return errors
      !this.$v.editedItemDet.marca_id.required && errors.push('Este campo es requerido')
      return errors
    },
    osDetTasaIVAErrors() {
      const errors = []
      if (!this.$v.editedItemDet.osDetTasaIVA.$dirty) return errors
      !this.$v.editedItemDet.osDetTasaIVA.required && errors.push('Este campo es requerido')
      return errors
    },
    validando() {
      let valida = true

      /* console.log('***************************************************************')
      console.log('this.editedItem.osNumDoc', this.editedItem.osNumDoc)

      console.log(
        'this.$v.editedItem.osTipoAdjudicacion.$model',
        this.$v.editedItem.osTipoAdjudicacion.$model
      )

      console.log(
        'this.$v.editedItem.osTipoAdjudicacion.$model.tipo_clave',
        this.$v.editedItem.osTipoAdjudicacion.$model.tipo_clave
      )

      console.log('this.$v.editedItem.prov_id.$model', this.$v.editedItem.prov_id.$model)
      console.log(
        'this.$v.editedItem.osDirSolicita.$model',
        this.$v.editedItem.osDirSolicita.$model
      )

            console.log(
        'this.$v.editedItem.osDeptoSolicita.$model',
        this.$v.editedItem.osDeptoSolicita.$model
      )
       console.log(
        'this.$v.editedItem.osDirDestino.$model',
        this.$v.editedItem.osDirDestino.$model
      )
       console.log(
        'this.$v.editedItem.osDeptoDestino.$model',
        this.$v.editedItem.osDeptoDestino.$model
      )
console.log(
        ' this.$v.editedItem.osEmpSolicita.$model',
         this.$v.editedItem.osEmpSolicita.$model
      )
console.log(
        ' this.$v.editedItem.osEmpSolicita.$model',
         this.$v.editedItem.osEmpSolicita.$model
      ) */

      if (
        this.editedItem.osNumDoc != '' &&
        (this.$v.editedItem.osTipoAdjudicacion.$model != '' ||
          this.$v.editedItem.osTipoAdjudicacion.$model.tipo_clave != '') &&
        this.$v.editedItem.prov_id.$model != '' &&
        this.$v.editedItem.osDirSolicita.$model != '' &&
        this.$v.editedItem.osDeptoSolicita.$model != '' &&
        this.$v.editedItem.osDirDestino.$model != '' &&
        this.$v.editedItem.osDeptoDestino.$model != '' &&
        this.$v.editedItem.osEmpSolicita.$model != '' &&
        this.$v.editedItem.osgenAdjudicacion.$model != '' &&
        this.$v.editedItem.osLugarEntrega.$model != '' &&
        this.editedItem.osDiasCredito != ''
        //&& this.editedItem.osDescripcion != ''
      ) {
        valida = false
      }

      //valida = false
      return valida
    },
    validandoDet() {
      let valida = true
      if (
        (this.$v.editedItemDet.prod_id.$model.prod_id != '' ||
          this.$v.editedItemDet.prod_id.$model != '') &&
        this.$v.editedItemDet.unidad_id_det.$model != '' &&
        (this.$v.editedItemDet.marca_id.$dirty || this.$v.editedItemDet.marca_id.$model != '') &&
        Number(this.editedItemDet.osDetCantidad) > 0 &&
        Number(this.editedItemDet.osDetPrecio) > 0 &&
        Number(this.editedItemDet.osDetTasaIVA) > 0 &&
        Number(this.editedItemDet.osDetIVA) > 0
      ) {
        valida = false

        //valida = false
      }

      return valida
    },
  },
  methods: {
    //C A B E C E R O

    //Actualizar Proveedor
    async actualizaProveedor() {
      await this.obtenerProveedores(this.tipo_temp)
      this.editedItemProv = Object.assign({}, this.editedItem.prov_id)
      console.log('this.editedItemProv', this.editedItemProv)
      this.editedItem.prov_email = this.editedItemProv.prov_email
      this.editedItem.prov_email2 = this.editedItemProv.prov_email2
      this.editedItem.prov_direccion = this.editedItemProv.prov_direccion
      this.editedItem.prov_ciudad = this.editedItemProv.prov_ciudad
    },

    //Cancelar dialogo Principal
    cancel(isSure) {
      this.isSure = isSure
      if (this.isSure) {
        this.close(false)
        this.changed = false
      }
    },
    // Revisar los cambios en el formulario Principal
    checkChanges() {
      if (this.changed) {
        this.isSure = true
      } else {
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
        //this.dialogEditProv = false
        this.isEditing = false
      }
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        var fecha = new Date()
        //this.editedItem.osFecha = this.fechaformato(fecha)
        this.editedItem.osFecha = this.formato(this.eFormatos.FECHA_NUM, fecha)
        this.editedItem.osFechaLimEntrega = this.formato(this.eFormatos.FECHA_NUM, fecha)
      })
      this.$v.$reset()
    },
    /**
     * @description Obtiene el indice del elemento seleccionado y lo signa al array editedItem
     * @param {object} item elemento seleccionado
     */
    //Obtiene el indice del elemento seleccionado y lo signa al array editedItem
    editItem(item) {
      console.log('ENTRA A: editItem(item)', 'item: ', item)
      this.isEditing = true
      this.editedIndex = this.ordenes.indexOf(item)

      console.log('this.editedIndex: ', this.editedIndex)
      this.editedItem = Object.assign({}, item)
      console.log('this.editedItem: ', this.editedItem)

      this.editedItem.osFecha = this.formato(this.eFormatos.FECHA_NUM, this.editedItem.osFecha)
      this.editedItem.osFechaLimEntrega = this.formato(
        this.eFormatos.FECHA_NUM,
        this.editedItem.osFecha
      )
      this.obtenerOrdenesDet(this.editedItem.osNumDoc)
      this.existeOrden = false
      //this.isTipo = false
      this.dialog = true
    },
    //Editar Proveedor
    async editarProveedor() {
      this.dialogEditProv = false
      console.log('this.dialogEditProv', this.dialogEditProv)
      /* NO BORRAR
      this.editedItemProv = Object.assign({}, this.editedItem.prov_id)
      this.editedItem.prov_email = this.editedItemProv.prov_email
      this.editedItem.prov_email2 = this.editedItemProv.prov_email2
      this.editedItem.prov_direccion = this.editedItemProv.prov_direccion
      this.editedItem.prov_ciudad = this.editedItemProv.prov_ciudad
      */
      if (this.editedItem.prov_id.prov_id != undefined || this.editedItem.prov_id != undefined) {
        console.log('Proveedor valido !!!')
        this.dialogEditProv = true
        console.log('this.dialogEditProv', this.dialogEditProv)
      }
    },
    /**
     * @description Elimina una orden de compra
     * @param {object} item elemento seleccionado
     */
    //Elimina una orden de compra
    deleteItem(item) {
      const index = this.ordenes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      //Confirma cerrar formulario
      if (confirm('Esta seguro que desea eliminar este registro?')) {
        this.BorrarRegistro()
        this.ordenes.splice(index, 1)
      }
    },

    async Refreesca() {
      this.ObtenerGenerales()
      this.obtenerConceptos()
      this.obtenerProveedores()
      //this.obtenerCtaContable()
      await this.obtenerCuentas(0, 0)
      this.obtenerEmpleadoSolicita()
      this.obtenerDirSolicita()
      this.obtenerDeptoSolicita('')
      this.obtenerDirDestino()
      this.obtenerDeptoDestino()
      this.obtenerTipoAdjudica()
      this.obtenerGeneroAdjudica()
      this.obtenerLugaresEntrega()

      //Detalle
      this.obtenerFamilias()
      this.obtenerUnidades()
      this.obtenerMarcas()
      this.obtenerTasaIvas()

      this.obtenerOrdenes()
    },
    //Preparar para nueva Captura de Orden de Compra
    nuevaCaptura() {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      var fecha = new Date()
      //this.editedItem.osFecha = this.fechaformato(fecha)
      this.editedItem.osFecha = this.formato(this.eFormatos.FECHA_FORMATO, fecha)
      this.editedItem.osFechaLimEntrega = this.formato(this.eFormatos.FECHA_FORMATO, fecha)
      this.editedItem.osEstatus = 'CAP_OS'
      this.editedItem.osTipoDoc = 'COMPRA'
      this.editedItem.osTipoOs = 'ADQUI'
      this.editedItem.osgenAdjudicacion = 'B'
      this.existeOrden = true
      this.ordenesDet = []
    },
    /**
     * @description Obtiene los conceptos para la solicitud de pago
     * @return {array} arreglo con todaos los conceptos
     */
    //Obtiene los conceptos para la solicitud de pago
    async obtenerConceptos() {
      this.isLoading = true
      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: null }
        this.conceptos = []
        await this.$store
          .dispatch('consulta/fetchGetConceptosSica', payload)
          .then((response) => {
            this.conceptos = response.data
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
    /**
     * @description Obtiene los conceptos de comite
     * @return {array} arreglo con todaos los conceptos de comite
     */
    //Obtiene Todas las Cuentas
    async obtenerCuentas(prov, tipo) {
      this.isLoading = true
      let params = null
      let opcion = 0
      let jwt = await getValidToken(this)
      //Se agrego para cuenta multi conceptos
      //if (prov == undefined) prov = 999999

      if (prov == 0 && tipo == 0) {
        opcion = 1
        params = 'filtro?campo1=cuecon_activo&tipo1=igual&valor1=1'
      } else if (prov == 0) {
        opcion = 1
        params = 'filtro?campo1=c.tipo_id&tipo1=igual&valor1=' + tipo
      } else if (tipo == 0) {
        opcion = 1
        params =
          'filtro?campo1=c.prov_id&tipo1=igual&valor1=' +
          prov +
          '&logico2=and&campo2=es_multi_concepto&tipo2=igual&valor2=1'
      } else {
        opcion = 2

        params = prov + '/' + tipo
      }

      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.cuentas = []
        if (opcion == 1) {
          await this.$store
            .dispatch('cuenta/fetchCuenta', payload)
            .then((response) => {
              if (response.data.mensaje == undefined) {
                this.cuentas = response.data
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
        } else {
          await this.$store
            .dispatch('consulta/fetchCuentaxProvxTipo', payload)
            .then((response) => {
              this.cuentas = []
              if (response.data.mensaje == undefined) {
                this.cuentas = response.data
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
      }
    },
    /**
     * @description Obtiene las departamentos que Destino
     * @return {array} arreglo con todas los departamentos que Destino
     */
    //Obtiene las departamentos para Destino
    async obtenerDeptoDestino() {
      this.isLoading = true
      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: null }
        this.$store
          .dispatch('consulta/fetchGetDepartamentos', payload)
          .then((response) => {
            this.deptoDestino = response.data
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
    /**
     * @description Obtiene las departamentos que solicitan
     * @return {array} arreglo con todas los departamentos que solicitan
     */
    //Obtiene las departamentos que solicitan
    async obtenerDeptoSolicita(direccion) {
      this.isLoading = true
      let jwt = await getValidToken(this)
      let params = null
      if (direccion != '') {
        params = `emp_direccion = '` + direccion + `'`
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.$store
          .dispatch('consulta/fetchGetDepartamentos', payload)
          .then((response) => {
            this.deptoSolicita = response.data
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
    /**
     * @description Obtiene las direcciones que solicitan
     * @return {array} arreglo con todas las direcciones que solicitan
     */
    //Obtiene las direcciones que solicitan
    async obtenerDirDestino() {
      this.isLoading = true
      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: null }
        this.$store
          .dispatch('consulta/fetchDireccion', payload)
          .then((response) => {
            this.dirDestino = response.data
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
    /**
     * @description Obtiene las Direcciones que solicitan
     * @return {array} arreglo con todas las Direcciones
     */
    //Obtiene las Direcciones que solicitan
    async obtenerDirSolicita() {
      this.isLoading = true
      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: null }
        this.$store
          .dispatch('consulta/fetchDireccion', payload)
          .then((response) => {
            this.dirSolicita = response.data
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
    /**
     * @description Obtiene Loe empleados que solicitan
     * @return {array} arreglo con todas las Empleados
     */
    //Obtiene Loe empleados que solicitan
    async obtenerEmpleadoSolicita() {
      this.isLoading = true
      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: null }
        this.$store
          .dispatch('empleado/fetchEmpleado', payload)
          .then((response) => {
            this.empSolicita = response.data
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
    /**
     * @description Obtiene los Generos de Adjudicacion
     * @return {array} arreglo con todos los generos de adjudicacion
     */
    //Obtiene los Generos de Adjudicacion
    async obtenerGeneroAdjudica() {
      this.isLoading = true
      let params = null

      params =
        'filtro?campo1=t.clatip_id&tipo1=igual&valor1=GENADJ&logico2=and&campo2=t.tipo_activo&tipo2=igual&valor2=1'

      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.$store
          .dispatch('tipo/fetchTipo', payload)
          .then((response) => {
            this.genAdjudicacion = response.data
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
    /**
     * @description Obtiene lugares de entrega para  Ordenes de compra
     * @return {array} arreglo con todas los lugares para las Ordendes de compra
     */
    //Obtiene Lugares de Emtrega para Ordenes de compra
    async obtenerLugaresEntrega() {
      this.isLoading = true
      let params = null

      //params ='filtro?campo1=t.clatip_id&tipo1=igual&valor1=LUGENT&logico2=and&campo2=t.tipo_activo&tipo2=igual&valor2=1'
      params = "t.clatip_id = 'LUGENT'/t.tipo_orden"

      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.lugaresEntrega = []
        await this.$store
          //.dispatch('tipo/fetchTipo', payload)
          .dispatch('consulta/fetchGetTipos', payload)
          .then((response) => {
            this.lugaresEntrega = response.data
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

    /**
     * @description Obtiene las Ordenes de compra
     * @return {array} arreglo con todaos las Ordendes de compra
     */
    //Obtiene las Ordenes de compra
    async obtenerOrdenes() {
      this.isLoading = true
      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: null }
        this.ordenes = []
        await this.$store
          .dispatch('ordencompra/fetchOrden', payload)
          .then((response) => {
            this.ordenes = response.data
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
    /**
     * @description Obtiene los Proveedores
     * @return {array} arreglo con todos los proveedores
     */
    //Obtiene los Proveedores
    async obtenerProveedores(tipo) {
      this.isLoading = true
      let jwt = await getValidToken(this)
      //solo los proveedores que tengan el tipo = proveedor
      //let param = 'filtro?campo1=prov_tipo&tipo1=igual&valor1=tipproveed'
      let param = tipo
      if (jwt != null) {
        let payload = { jwt: jwt, params: param }
        await this.$store
          //.dispatch('proveedor/fetchProveedor', payload)
          .dispatch('consulta/fetchProvTipo', payload)
          .then((response) => {
            this.proveedores = response.data
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
    /**
     * @description Obtiene los tipos de adjudicacion
     * @return {array} arreglo con todos los tipos de adjudicacion
     */
    //Obtiene los tipos de adjudicacion
    async obtenerTipoAdjudica() {
      this.isLoading = true
      let params = null

      params =
        'filtro?campo1=t.clatip_id&tipo1=igual&valor1=ADJUDICA&logico2=and&campo2=t.tipo_activo&tipo2=igual&valor2=1'

      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.$store
          .dispatch('tipo/fetchTipo', payload)
          .then((response) => {
            this.tipoAdjudicacion = response.data
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
    //al cambiar direccion que solicita
    onChangeDirSolicita(value) {
      //this.editedItem.sp_vobo_emp_id = 0
      this.obtenerDeptoSolicita(value.emp_direccion)
    },
    async save() {
      this.overlay = true

      //if (this.changed) {
      let tipoAdjudicacion = ''
      if (this.editedItem.osTipoAdjudicacion.tipo_clave == null) {
        tipoAdjudicacion = this.editedItem.osTipoAdjudicacion
      } else {
        tipoAdjudicacion = this.editedItem.osTipoAdjudicacion.tipo_clave
      }
      let generoAdjudicacion = ''
      if (this.editedItem.osgenAdjudicacion.tipo_clave == null) {
        generoAdjudicacion = this.editedItem.osgenAdjudicacion
      } else {
        generoAdjudicacion = this.editedItem.osgenAdjudicacion.tipo_clave
      }
      let concepto = ''
      if (this.editedItem.sp_concepto.tipo_clave == null) {
        concepto = this.editedItem.sp_concepto
      } else {
        concepto = this.editedItem.sp_concepto.tipo_clave
      }
      let tipo_sol = ''
      if (this.editedItem.sp_concepto.sp_tipo_sol == null) {
        tipo_sol = this.editedItem.sp_tipo_sol
      } else {
        tipo_sol = this.editedItem.sp_concepto.sp_tipo_sol
      }
      let prov = 0
      if (this.editedItem.prov_id.prov_id == null) {
        prov = this.editedItem.prov_id
      } else {
        prov = this.editedItem.prov_id.prov_id
      }
      let cuenta = 0
      if (this.editedItem.cuecon_cuenta.cuecon_cuenta == null) {
        cuenta = this.editedItem.cuecon_cuenta
      } else {
        cuenta = this.editedItem.cuecon_cuenta.cuecon_cuenta
      }
      let solicita = 0
      if (this.editedItem.osEmpSolicita.emp_id == null) {
        solicita = this.editedItem.osEmpSolicita
      } else {
        solicita = this.editedItem.osEmpSolicita.emp_id
      }
      let dirSolicita = 0
      if (this.editedItem.osDirSolicita.emp_direccion == null) {
        dirSolicita = this.editedItem.osDirSolicita
      } else {
        dirSolicita = this.editedItem.osDirSolicita.emp_direccion
      }
      let deptoSolicita = 0
      if (this.editedItem.osDeptoSolicita.emp_departamento == null) {
        deptoSolicita = this.editedItem.osDeptoSolicita
      } else {
        deptoSolicita = this.editedItem.osDeptoSolicita.emp_departamento
      }
      let dirDestino = 0
      if (this.editedItem.osDirDestino.emp_direccion == null) {
        dirDestino = this.editedItem.osDirDestino
      } else {
        dirDestino = this.editedItem.osDirDestino.emp_direccion
      }
      let deptoDestino = 0
      if (this.editedItem.osDeptoDestino.emp_departamento == null) {
        deptoDestino = this.editedItem.osDeptoDestino
      } else {
        deptoDestino = this.editedItem.osDeptoDestino.emp_departamento
      }
      let lugEntrega = ''
      if (this.editedItem.osLugarEntrega.tipo_descripcion == null) {
        lugEntrega = this.editedItem.osLugarEntrega
      } else {
        lugEntrega = this.editedItem.osLugarEntrega.tipo_descripcion
      }

      let body = {}
      let payload = {}
      let jwt = await getValidToken(this)

      if (this.editedIndex > -1) {
        //MODIFICAR
        await this.obtenerOrdenesDet(this.editedItem.osNumDoc)
        let descuento = this.sumaCampo('osDetDescuento')
        let iva = this.sumaCampo('osDetIVA')
        let subtotal = Number(this.sumaCampo('osDetSubtotal'))
        let total = this.sumaCampo('osDetTotal')

        if (!Number.isInteger(descuento)) descuento = 0
        if (!Number.isInteger(iva)) iva = 0
        if (!Number.isInteger(subtotal)) subtotal = 0
        if (!Number.isInteger(total)) total = 0

        body = {
          osNumDoc: this.editedItem.osNumDoc,
          osTipoDoc: this.editedItem.osTipoDoc,
          osTipoOs: this.editedItem.osTipoOs,
          osFecha: this.editedItem.osFecha,
          osEmpSolicita: solicita,
          osDescripcion: this.editedItem.osDescripcion,
          osObservacion: this.editedItem.osObservacion,
          osDirSolicita: dirSolicita,
          osDeptoSolicita: deptoSolicita,
          osDirDestino: dirDestino,
          osDeptoDestino: deptoDestino,
          osSubTotal: subtotal == undefined ? 0 : subtotal,
          osDescuento: descuento == undefined ? 0 : descuento,
          osIva: iva == undefined ? 0 : iva,
          osTotal: total == undefined ? 0 : total,
          osTipoAdjudicacion: tipoAdjudicacion,
          osgenAdjudicacion: generoAdjudicacion,
          prov_id: prov,
          cuecon_cuenta: cuenta,
          sp_tipo_sol: tipo_sol,
          sp_concepto: concepto,
          osEstatus: this.editedItem.osEstatus,
          osFechaLimEntrega: this.editedItem.osFechaLimEntrega,
          osLugarEntrega: lugEntrega,
          osDiasCredito: this.editedItem.osDiasCredito,
          prov_direccion: this.editedItem.prov_direccion,
          prov_ciudad: this.editedItem.prov_ciudad,
          //prov_email: this.editedItem.prov_email,
          //prov_email2: this.editedItem.prov_email2,
          //osCRFF: this.editedItem.osCRFF,
          osEmpSolFir: this.idEmpleadoSolFirma,
          osEmpAut: this.idEmpleadoAut,
        }
        payload = {
          jwt: jwt,
          body: body,
        }
        payload.id = this.editedItem.osNumDoc
        await this.$store
          .dispatch('ordencompra/editOrden', payload)
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
      } else {
        //NUEVO
        body = {
          osNumDoc: this.editedItem.osNumDoc,
          osTipoDoc: this.editedItem.osTipoDoc,
          osTipoOs: this.editedItem.osTipoOs,
          osFecha: this.editedItem.osFecha,
          osEmpSolicita: solicita,
          osDescripcion: this.editedItem.osDescripcion,
          osObservacion: this.editedItem.osObservacion,
          osDirSolicita: dirSolicita,
          osDeptoSolicita: deptoSolicita,
          osDirDestino: dirDestino,
          osDeptoDestino: deptoDestino,
          osSubTotal: 0,
          osDescuento: 0,
          osIva: 0,
          osTotal: 0,
          osTipoAdjudicacion: tipoAdjudicacion,
          osgenAdjudicacion: generoAdjudicacion,
          prov_id: prov,
          cuecon_cuenta: cuenta,
          sp_tipo_sol: tipo_sol,
          sp_concepto: concepto,
          osEstatus: this.editedItem.osEstatus,
          //osCRFF: this.editedItem.osCRFF,
          osFechaLimEntrega: this.editedItem.osFechaLimEntrega,
          osLugarEntrega: lugEntrega,
          osDiasCredito: this.editedItem.osDiasCredito,
          prov_direccion: this.editedItem.prov_direccion,
          prov_ciudad: this.editedItem.prov_ciudad,
          osEmpSolFir: this.idEmpleadoSolFirma,
          osEmpAut: this.idEmpleadoAut,
        }
        payload = {
          jwt: jwt,
          body: body,
        }
        //console.log('body en CREAR', body)
        await this.$store
          .dispatch('ordencompra/addOrden', payload)
          .then(() => {
            //this.editedItem.osNumDoc = response.data.id
            //this.editedItem= response.data
            this.$store.commit('ALERT', {
              color: 'success',
              text: 'El registro se Inserto con éxito',
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
      }
      this.overlay = false
      this.changed = false
      //this.obtenerOrdenes()
      this.Refreesca()
      var opcion = confirm('Desea Imprimir la orden de Compra: ' + this.editedItem.osNumDoc + ' ?')
      var opcion2 = confirm('Desea Salir de la captura de Orden de Compra?')
      if (opcion) {
        //Se imprime
        //console.log('AQUI IMPRIME')
        imprimeFormatoOrdenCompra(this.editedItem.osNumDoc, this)
        //alert('IMPRIMIENDO')
        //imprimeFormatoSolPag(sp_folio, this, year)
        if (opcion2) {
          //SALIR
          this.close(this.checkbox)
        }
      } else if (opcion2) {
        //SALIR
        this.close(this.checkbox)
      } else {
        //NO SALIR
        console.log('SE CUMPLE EL NO SALIR')
        await this.validaExisteOrden(false)
        if (this.existeOrden) {
          //this.editItem(this.editedItem)
          this.editedIndex = this.editedItem.osNumDoc
          this.existeOrden = false
          this.isEditing = true
        }
      }

      //}
    },
    async validaExisteOrden(muestraMensaje = true) {
      let existe = false
      if (Number(this.editedItem.osNumDoc) > 0)
        existe = await this.verificarOrden(this.editedItem.osNumDoc)

      if (existe) {
        //Indicar que ya existe, seleccionar y regregresar foco
        if (muestraMensaje) {
          this.$store.commit('ALERT', {
            color: 'error',
            text: 'Ya Existe el Documento: ' + this.editedItem.osNumDoc,
            // Enviar a inicio de sesión
          })
        }
        this.existeOrden = true
        this.focusField('osNumDoc')

        //this.existeOrden = false
      } else {
        this.existeOrden = false
        this.focusField('osFecha')
      }
    },

    async verificarOrden(osNumDoc, osDetPosicion) {
      let resultado = false
      let jwt = await getValidToken(this)
      let param = null

      let payload = {}
      if (osDetPosicion != null && osDetPosicion > 0) {
        //verificar Detalle
        param =
          'filtro?campo1=osDetPosicion&tipo1=igual&valor1=' +
          osDetPosicion +
          '&logico2=and&campo2=osNumDoc&tipo2=igua&valor2=' +
          osNumDoc
        payload = { jwt: jwt, params: param }
        await this.$store
          .dispatch('ordencompra/fetchOrdenDet', payload)
          .then((response) => {
            if (response.data.length > 0) resultado = true
          })
          .catch((err) => {
            this.isLoading = false
            this.$store.commit('ALERT', {
              color: 'error',
              text: err.response.data.error,
              // Enviar a inicio de sesión
            })
          })
      } else {
        //Verificar Cabecero
        param = osNumDoc
        payload = { jwt: jwt, params: param }
        await this.$store
          .dispatch('ordencompra/fetchOrden', payload)
          .then((response) => {
            //this.ordenes = response.data
            if (response.data.length > 0) resultado = true

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
    /**
     * @description filtra los productos dependiendo de la familia
     * @return {array} arreglo
     */
    //filtra las cuentas del proveedor
    async setfilterFamilias(value) {
      //console.log('value:', value)
      await this.obtenerProuctos(value.tipo_clave)
    },
    /**
     * @description filtra las cuentas del proveedor
     * @return {array} arreglo
     */
    //filtra las cuentas del proveedor
    async setfilterCuentas(value) {
      //C H E C A R
      // secuencia : 3
      let jwt = await getValidToken(this)
      //let casoEspecial = false
      //verificar si es caso especial, para poder escoger que folio aplica
      //let tipo_sol = this.editedItem.sp_tipo_sol.tipo_id

      //Concepto aplicando
      //Seleccionar un

      /*
      let conceptoP = this.editedItem.sp_concepto.tipo_id
      if (this.editedItem.sp_tipo_sol.tipo_descripcion === 'Presupuestal') {
        for (var i in this.casosEspeciales) {
          if (this.casosEspeciales[i].ce_concepto_P == conceptoP) {
            this.ce_concepto_NP = this.casosEspeciales[i].ce_concepto_NP
            this.ce_faltante = this.casosEspeciales[i].ce_faltante
            this.ce_excedente = this.casosEspeciales[i].ce_excedente
            this.ce_concepto_excedente = this.casosEspeciales[i].ce_concepto_excedente
            this.isCasoEspecial = true
            await this.ObtenerSolpagosAfectar(jwt, 2, this.ce_concepto_NP, value.prov_id)
            //verificar que hay solpagos por afectar
            if (this.solpagosAfectar.length > 0) {
              //Abrir nuevo modal para escoger
              this.dialogce = true
            }
          }
        }
      }
      */

      //this.dialogEditProv = false
      this.editedItem.prov_email = ''
      this.editedItem.prov_email2 = ''
      this.editedItem.prov_direccion = ''
      this.editedItem.prov_ciudad = ''

      this.prov_temp = value.prov_id
      if (value.cuecon_cuenta == undefined) {
        this.editedItem.sp_pago_nombre_de = value.prov_razon_social
        if (this.clave_temp == 'finlaboral') {
          await this.obtenerCuentas(jwt, value.prov_id, this.tipo_temp)
          this.DisabledPagoNombreDe = false
        } else if (this.clave_temp == 'devsalemp') {
          await this.obtenerCuentas(jwt, 0, this.tipo_temp)
          this.DisabledPagoNombreDe = true
        } else if (this.clave_temp == 'concdevror') {
          await this.obtenerCuentas(jwt, 0, this.tipo_temp)
          this.editedItem.sp_pago_nombre_de = ''
          this.DisabledPagoNombreDe = false
        } else if (this.clave_temp == 'penalim') {
          await this.obtenerCuentas(jwt, 0, this.tipo_temp)
          this.editedItem.sp_pago_nombre_de = value.prov_razon_social
          this.DisabledPagoNombreDe = true
        } else {
          await this.obtenerCuentas(value.prov_id, this.tipo_temp)

          if (this.cuentas.length == 0) {
            await this.obtenerCuentas(jwt, this.prov_temp, 0)
          }
          this.DisabledPagoNombreDe = true
        }
      } else if (value.cuecon_cuenta != '') {
        //penalim
        //await this.obtenerCuentas(jwt, 0, this.tipo_temp)

        await this.obtenerCuentas(jwt, this.prov_temp, this.tipo_temp)
        if (this.cuentas.length == 0) {
          await this.obtenerCuentas(jwt, this.prov_temp, 0)
        }

        this.editedItem.sp_pago_nombre_de = value.prov_razon_social
        this.DisabledPagoNombreDe = true
      }

      this.editedItem.cuecon_cuenta = this.cuentas[0].cuecon_cuenta
      if (this.editedItem.prov_email == '') this.editedItem.prov_email = value.prov_email

      if (this.editedItem.prov_email2 == '') this.editedItem.prov_email2 = value.prov_email2

      if (this.editedItem.prov_direccion == '')
        this.editedItem.prov_direccion = value.prov_direccion
      if (this.editedItem.prov_ciudad == '') this.editedItem.prov_ciudad = value.prov_ciudad
      //this.isTipo = false
      //this.isConcepto = false
      //this.isProveedor = false
    },
    // al escoger direccion solicita
    async setfilterDirSolicita(value) {
      //let jwt = await getValidToken(this)

      //Segun elnombre del empleado debe de determinar:
      //la emp_direccion a la que pertenece y el departamento
      //await this.obtenerEmpleadoSolicita(jwt, value.emp_direccion)
      this.editedItem.osDirSolicita = value.emp_direccion
      //se obtiene los departamentos de la direccion
      this.obtenerDeptoSolicita(value.emp_direccion)
      this.editedItem.osDeptoSolicita = value.emp_departamento
      this.editedItem.osDirDestino = value.emp_direccion
      this.editedItem.osDeptoDestino = value.emp_departamento
    },
    // al escoger direccion solicita
    async setIngresaPartida(value) {
      if (this.editedItem.osPartidaGlobal == '') {
        this.editedItem.osPartidaGlobal = value.concom_partida_global
      }
      if (this.editedItem.osPartidaGenerica == '') {
        this.editedItem.osPartidaGenerica = value.concom_partida_especifica
      }
    },
    async setfilterProveedor(value) {
      // secuencia : 2
      //let jwt = await getValidToken(this)

      this.tipo_temp = value.tipo_id
      this.clave_temp = value.tipo_clave
      await this.obtenerProveedores(value.tipo_id)
      //this.editedItem.sp_pago_nombre_de = ''
      //this.isTipo = false
      //this.isConcepto = false
      //this.isProveedor = true
      await this.obtenerCuentas(this.editedItem.prov_id.prov_id, this.tipo_temp)
    },

    validandoCampos() {
      this.validaCampos = true
      if (
        this.editedItem.osNumDoc != '' &&
        (this.$v.editedItem.osTipoAdjudicacion.$model != '' ||
          this.$v.editedItem.osTipoAdjudicacion.$model.tipo_clave != '') &&
        this.$v.editedItem.prov_id.$model != '' &&
        this.$v.editedItem.osDirSolicita.$model != '' &&
        this.$v.editedItem.osDeptoSolicita.$model != '' &&
        this.$v.editedItem.osDirDestino.$model != '' &&
        this.$v.editedItem.osDeptoDestino.$model != '' &&
        this.$v.editedItem.osEmpSolicita.$model != '' &&
        this.$v.editedItem.osgenAdjudicacion.$model != ''
        //&& this.editedItem.osDescripcion != ''
      ) {
        this.validaCampos = false
      }
    },
    //D  E  T  A  L  L  E
    //Cancelar dialogo Detalle
    cancelDet(isSure) {
      console.log('cancelDet(isSure)')
      console.log(isSure, isSure)
      this.isSureDet = isSure
      if (this.isSureDet) {
        this.closeDet(false)
        this.changedDet = false
      }
    },
    //Verificar Cambios en el Dialog Detalle
    checkChangesDet() {
      console.log('checkChangesDet()')
      if (this.changedDet) {
        this.isSureDet = true
      } else {
        this.closeDet(false)
        this.changedDet = false
      }
    },
    // Cerrar el formulario del Dialogo Detalle
    async closeDet(checkbox) {
      //console.log('closeDet(checkbox)')
      //console.log('checkbox', checkbox)

      if (checkbox == undefined) checkbox = false
      this.isSureDet = false
      this.checkboxDet = checkbox
      if (!this.checkboxDet) {
        this.dialogDet = false
        this.isEditingDet = false
        //await this.obtenerOrdenesDet(this.editedItem.osNumDoc)
      }
      await this.$nextTick(() => {
        if (this.editedItem.osNumDoc != undefined) {
          this.nuevaCapturaDet(this.dialogDet)
        }

        //this.editedItemDet = Object.assign({}, this.defaultItemDet)
        //this.editedIndexDet = -1
        //this.nuevaCapturaDet()
        //var fecha = new Date()
        //this.editedItem.sp_fecha_solicitud = this.fechaformato(fecha)
      })
      this.$v.$reset()
    },
    //Calcular el detalle
    CalcularDetalle() {
      //CALCULOS
      if (
        !(
          Number(this.editedItemDet.osPorcDcto) == 0 &&
          Number(this.editedItemDet.osDetDescuento) == 0
        )
      ) {
        if (Number(this.editedItemDet.osPorcDcto) != 0) {
          this.editedItemDet.osDetDescuento =
            (Number(this.editedItemDet.osPorcDcto) / 100) *
            (Number(this.editedItemDet.osDetCantidad) * Number(this.editedItemDet.osDetPrecio))
        }
        if (Number(this.editedItemDet.osDetDescuento) != 0) {
          this.editedItemDet.osPorcDcto =
            (Number(this.editedItemDet.osDetDescuento) /
              (Number(this.editedItemDet.osDetCantidad) * Number(this.editedItemDet.osDetPrecio))) *
            100
        }
      }

      this.descuentoCalculado = this.editedItemDet.osDetDescuento
      this.editedItemDet.osDetSubtotal =
        Number(this.editedItemDet.osDetCantidad) * Number(this.editedItemDet.osDetPrecio) -
        Number(this.editedItemDet.osDetDescuento)

      this.subTotalCalculado = this.editedItemDet.osDetSubtotal
      this.editedItemDet.osDetIVA =
        (Number(this.editedItemDet.osDetTasaIVA) / 100) * Number(this.editedItemDet.osDetSubtotal)

      this.ivaCalculado = this.editedItemDet.osDetIVA
      this.editedItemDet.osDetTotal =
        Number(this.editedItemDet.osDetSubtotal) + Number(this.editedItemDet.osDetIVA)

      this.TotalCalculado = this.editedItemDet.osDetTotal
      this.formatoDetalle()
    },
    /**
     * @description Obtiene el indice del elemento seleccionado y lo signa al array editedItem
     * @param {object} item elemento seleccionado
     */
    editItemDet(item) {
      this.isEditingDet = true
      this.editedIndexDet = this.ordenesDet.indexOf(item)
      this.editedItemDet = Object.assign({}, item)

      //se filtra por familia comite
      //this.obtenerProuctos('FAMTOD')
      this.obtenerProuctos(this.editedItem.familiaComite)
      /*
      this.editedItemDet.osDetTotal = this.formato(

        this.eFormatos.MONEDA_RIGHT,
        this.editedItemDet.osDetTotal
      )
      */
      this.formatoDetalle()
      this.dialogDet = true

      //Para posicionarse en el Campo Cantidad
      Vue.nextTick().then(() => {
        document.getElementById('osDetCantidad').select()
        document.getElementById('osDetCantidad').focus()
        //this.$refs.input.focus()
      })
    },
    formatoDetalle() {
      //FORMATOS
      //Precio
      /*
      this.editedItemDet.osDetPrecio = this.formato(
        this.eFormatos.MONEDA_RIGHT,
        this.editedItemDet.osDetPrecio
      )
      //Descuento
      this.editedItemDet.osDetDescuento = this.formato(
        this.eFormatos.MONEDA_RIGHT,
        this.editedItemDet.osDetDescuento
      )
      //Iva
      this.editedItemDet.osDetIVA = this.formato(
        this.eFormatos.MONEDA_RIGHT,
        this.editedItemDet.osDetIVA
      )
      */
      //SubTotal
      this.editedItemDet.osDetSubtotal = this.formato(
        this.eFormatos.MONEDA_RIGHT,
        this.editedItemDet.osDetSubtotal
      )

      //Total
      this.editedItemDet.osDetTotal = this.formato(
        this.eFormatos.MONEDA_RIGHT,
        this.editedItemDet.osDetTotal
      )
    },
    async nuevaCapturaDetFin(valorDialog) {
      if (valorDialog == undefined) valorDialog = true
      this.editedItemDet = Object.assign({}, this.defaultItemDet)

      this.editedIndexDet = -1
      this.editedItemDet.osDetActivo = 1
      await this.obtenerUltimaPosicion(this.editedItem.osNumDoc)
      this.contPosiciones = Number(this.contPosiciones) + 1
      this.editedItemDet.osDetPosicion = this.contPosiciones
      this.isEditingDet = false
      this.editedItemDet.osDetTasaIVA = '16.00'

      console.log('this.familiaAct: ', this.familiaAct)
      if (this.familiaAct != '') {
        this.editedItemDet.familia_id = this.familiaAct
        this.obtenerProuctos(this.familiaAct)
      } else {
        this.obtenerProuctos()
      }
      this.chkAllProd = false
      this.dialogDet = valorDialog
      this.formatoDetalle()
    },

    async nuevaCapturaDet(valorDialog) {
      //Verificar si esta guardada la orden de compra
      await this.validaExisteOrden(false)
      //console.log('this.existeOrden', this.existeOrden)
      if (!this.existeOrden) {
        //validaciones
        //let band = this.$computed.validando
        this.validandoCampos()
        //console.log('bandValidaCampos', this.bandValidaCampos)
        if (this.bandValidaCampos) {
          //Datos Capturados completos
          //Grabar
          console.log('GRABAR SIN MENSJAES')
          this.nuevaCapturaDetFin(valorDialog)
        } else {
          //mandar a pestaña de captura !
          this.tabs = 0
          //focus a N° de orden de compra
          this.focusField('osNumDoc')
          //console.log('this.tab', this.tabs)
        }
      } else {
        this.nuevaCapturaDetFin(valorDialog)
      }
    },
    /**
     * @description Obtiene las Marcas
     * @return {array} arreglo con todos las Marcas
     */
    async obtenerFamilias() {
      this.isLoading = true
      let params = null

      params =
        'filtro?campo1=t.clatip_id&tipo1=igual&valor1=FAMPROD&logico2=and&campo2=t.tipo_activo&tipo2=igual&valor2=1'

      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.familias = []
        this.$store
          .dispatch('tipo/fetchTipo', payload)
          .then((response) => {
            this.familias = response.data
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
    /**
     * @description Obtiene las tasa de ivas activas
     * @return {array} arreglo con todas las tasa de ivas
     */
    async obtenerTasaIvas() {
      this.isLoading = true
      let params = null

      params =
        'filtro?campo1=t.clatip_id&tipo1=igual&valor1=IVAS&logico2=and&campo2=t.tipo_activo&tipo2=igual&valor2=1'

      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.$store
          .dispatch('tipo/fetchTipo', payload)
          .then((response) => {
            this.tasaIvas = response.data
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
    /**
     * @description Obtiene las Marcas
     * @return {array} arreglo con todos las Marcas
     */
    async obtenerMarcas() {
      this.isLoading = true
      let params = null

      params =
        'filtro?campo1=t.clatip_id&tipo1=igual&valor1=MARCAPROD&logico2=and&campo2=t.tipo_activo&tipo2=igual&valor2=1'

      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.$store
          .dispatch('tipo/fetchTipo', payload)
          .then((response) => {
            this.marcas = response.data
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
    /**
     * @description Obtiene las Ordenes de compra Detalle
     * @return {array} arreglo con todaos las Ordendes de compra Detalle de un folio especifico
     */
    async obtenerOrdenesDet(osNumDoc) {
      this.isLoading = true
      let params = null
      params = osNumDoc
      let jwt = await getValidToken(this)
      //this.contPosiciones = 0
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        await this.$store
          .dispatch('ordencompra/fetchOrdenDet', payload)
          .then((response) => {
            this.ordenesDet = response.data
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
      //console.log('obtenerOrdenesDet()')
      //console.log('this.contPosiciones', this.contPosiciones)
    },
    /**
     * @description Obtiene los productos
     * @return {array} arreglo con todos los productos
     */
    async obtenerProuctos(familia) {
      this.isLoading = true
      let params = null
      let jwt = await getValidToken(this)
      if (familia != null) {
        if (familia != 'FAMTOD') {
          params = 'filtro?campo1=familia_id&tipo1=igual&valor1=' + familia
        }
      }
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.$store
          .dispatch('producto/fetchProducto', payload)
          .then((response) => {
            this.productos = response.data
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
    async obtenerUltimaPosicion(numdoc) {
      //console.log('obtenerUltimaPosicion()', numdoc)
      //console.log('this.contPosiciones', this.contPosiciones)
      this.isLoading = true
      let params = numdoc

      //params ='filtro?campo1=t.clatip_id&tipo1=igual&valor1=UNIPROD&logico2=and&campo2=t.tipo_activo&tipo2=igual&valor2=1'

      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        //this.contPosiciones = 0
        await this.$store
          .dispatch('ordencompra/fetchUltimaPosicion', payload)
          .then((response) => {
            //console.log('response.data', response.data)
            //console.log('response.data.ultimaposicion', response.data[0].ultimaposicion)
            this.contPosiciones = response.data[0].ultimaposicion
            //this.unidades = response.data
            this.isLoading = false
          })
          .catch((err) => {
            //console.log('err', err)
            this.isLoading = false
            this.$store.commit('ALERT', {
              color: 'error',
              text: err.response.data.error,
              // Enviar a inicio de sesión
            })
          })
      }
    },
    /**
     * @description Obtiene las unidades
     * @return {array} arreglo con todos las unidades
     */
    async obtenerUnidades() {
      this.isLoading = true
      let params = null

      params =
        'filtro?campo1=t.clatip_id&tipo1=igual&valor1=UNIPROD&logico2=and&campo2=t.tipo_activo&tipo2=igual&valor2=1'

      let jwt = await getValidToken(this)
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.$store
          .dispatch('tipo/fetchTipo', payload)
          .then((response) => {
            this.unidades = response.data
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
    //Grabar Detalle de Orden de compra
    async SaveDet() {
      this.overlay = true
      let jwt = await getValidToken(this)

      this.familiaAct = this.editedItemDet.familia_id.tipo_clave

      if (this.changedDet) {
        let producto = ''
        if (this.editedItemDet.prod_id.prod_id == null) {
          producto = this.editedItemDet.prod_id
        } else {
          producto = this.editedItemDet.prod_id.prod_id
        }
        let unidad = ''
        if (this.editedItemDet.unidad_id_det.tipo_clave == null) {
          unidad = this.editedItemDet.unidad_id_det
        } else {
          unidad = this.editedItemDet.unidad_id_det.tipo_clave
        }
        let marca = ''
        if (this.editedItemDet.marca_id.tipo_clave == null) {
          marca = this.editedItemDet.marca_id
        } else {
          marca = this.editedItemDet.marca_id.tipo_clave
        }

        let body = {}
        body = {
          osNumDoc: this.editedItem.osNumDoc,
          osDetPosicion: this.editedItemDet.osDetPosicion,
          prod_id: producto,
          unidad_id: unidad,
          marca_id: marca,
          osDetCantidad: this.editedItemDet.osDetCantidad,
          osDetPrecio: this.editedItemDet.osDetPrecio,
          osPorcDcto: this.editedItemDet.osPorcDcto,
          osDetDescuento: this.editedItemDet.osDetDescuento,
          osDetSubtotal: this.subTotalCalculado,
          osDetTasaIVA: this.editedItemDet.osDetTasaIVA,
          osDetIVA: this.editedItemDet.osDetIVA,
          osDetTotal: this.TotalCalculado,
          osDetActivo: this.editedItemDet.osDetActivo,
        }

        let payload = {
          jwt: jwt,
          body: body,
        }
        if (this.editedIndexDet > -1) {
          //MODIFICAR
          body = {
            prod_id: producto,
            unidad_id: unidad,
            marca_id: marca,
            osDetCantidad: this.editedItemDet.osDetCantidad,
            osDetPrecio: this.editedItemDet.osDetPrecio,
            osPorcDcto: this.editedItemDet.osPorcDcto,
            osDetDescuento: this.editedItemDet.osDetDescuento,
            osDetSubtotal: this.subTotalCalculado,
            osDetTasaIVA: this.editedItemDet.osDetTasaIVA,
            osDetIVA: this.editedItemDet.osDetIVA,
            osDetTotal: this.TotalCalculado,
            osDetActivo: this.editedItemDet.osDetActivo,
          }

          payload = {
            jwt: jwt,
            body: body,
          }
          payload.id = this.editedItem.osNumDoc
          payload.posicion = this.editedItemDet.osDetPosicion
          await this.$store
            .dispatch('ordencompra/editOrdenDet', payload)
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
        } else {
          //NUEVO
          await this.$store
            .dispatch('ordencompra/addCreaDet', payload)
            .then(() => {
              this.$store.commit('ALERT', {
                color: 'success',
                text: 'El registro se Inserto con éxito',
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
        }

        //Actualiza Productos
        let prov = 0
        if (this.editedItem.prov_id.prov_id == null) {
          prov = this.editedItem.prov_id
        } else {
          prov = this.editedItem.prov_id.prov_id
        }
        body = {
          prod_ultMarca: marca,
          prod_ultProv: prov,
          prod_ultPrecio: this.editedItemDet.osDetPrecio,
        }
        //console.log('body Actualiza Articulo', body2)
        payload = {
          jwt: jwt,
          body: body,
        }
        payload.id = producto
        this.$store
          .dispatch('producto/editUltimoProducto', payload)
          .then(() => {
            this.$store.commit('ALERT', {
              color: 'success',
              text: 'Producto actualizado con Exito',
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
        //await this.obtenerOrdenesDet(this.editedItem.osNumDoc)
        //console.log('DEspues de grabar')
        await this.obtenerOrdenesDet(this.editedItem.osNumDoc)

        this.closeDet(this.checkboxDet)

        this.changedDet = false

        //await this.iniciando()
      }
    },
    // al escoger familia
    async setfilterProductos(value) {
      console.log(value)
      if (!this.isEditingDet) {
        this.editedItemDet.unidad_id_det = value.unidad_id

        //console.log('value.UltimaMarca', value.UltimaMarca)
        //console.log('this.editedItemDet.marca_id', this.editedItemDet.marca_id)
        /* console.log(
          'this.editedItemDet.marca_id.tipo_clave',
          this.editedItemDet.marca_id.tipo_clave
        ) */
        if (value.prod_ultMarca != null) {
          this.editedItemDet.marca_id = value.prod_ultMarca
        }
      }
    },
    //al cambiar CheckBox de Productos en el Detalle
    onChangeAllProd(value) {
      //this.editedItem.sp_vobo_emp_id = 0
      //if (this.chkAllProd) {
      if (value) {
        this.obtenerProuctos('FAMTOD')
      } else {
        this.obtenerProuctos(this.editedItem.familiaComite)
      }
    },
    //G E N E R A L E S
    /**
     * @description Diferentes Formatos para los campos
     * @param {object} item elemento seleccionado
     */
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
    /**
     * @description Selecciona y obtiene Focus de campo
     * @param {object} item elemento seleccionado
     */
    NextField(id) {
      // Obtenemos la tecla pulsada
      //var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode
      // Si la tecla pulsada es enter (codigo ascii 13)
      //if (keyCode == 13) {
      // Si la variable id contiene "submit" salvar()
      if (id == 'submit') {
        //document.forms[0].submit()
        console.log('para grabar ???')
      } else {
        //Seleccionar todo el Campo
        document.getElementById(id).select()
        // nos posicionamos en el siguiente input
        document.getElementById(id).focus()
      }
      //}
    },
    sumaCampo(key) {
      let suma = 0
      for (let x in this.ordenesDet) {
        if (key == 'osDetCantidad') {
          suma += Number(this.ordenesDet[x].osDetCantidad)
        } else if (key == 'osDetDescuento') {
          suma += Number(this.ordenesDet[x].osDetDescuento)
        } else if (key == 'osDetIVA') {
          suma += Number(this.ordenesDet[x].osDetIVA)
        } else if (key == 'osDetTotal') {
          suma += Number(this.ordenesDet[x].osDetTotal)
        } else if (key == 'osDetSubtotal') {
          suma +=
            Number(this.ordenesDet[x].osDetCantidad) * Number(this.ordenesDet[x].osDetPrecio) -
            Number(this.ordenesDet[x].osDetDescuento)
        }
      }
      return suma
      //var totalAges = arr.reduce((sum, value) => (typeof value.Edad == "number" ? sum + value.Edad : sum), 0);
    },
    async printItem(item) {
      this.editedItem = Object.assign({}, item)
      console.log('this.editedItem.osNumDoc', this.editedItem.osNumDoc)
      imprimeFormatoOrdenCompra(this.editedItem.osNumDoc, this)
    },
    async ObtenerGenerales() {
      this.isLoading = true
      let params = null
      let jwt = await getValidToken(this)
      params = 'filtro?campo1=id_sistema&tipo1=igual&valor1=1'
      if (jwt != null) {
        let payload = { jwt: jwt, params: params }
        this.generales = []
        this.idEmpleadoAut = 0
        await this.$store
          .dispatch('general/fetchGeneral', payload)
          .then((response) => {
            if (response.data.mensaje == undefined) {
              this.generales = response.data
              this.idEmpleadoAut = this.generales[0].id_emp_aut
              this.idEmpleadoSolFirma = this.generales[0].id_emp_sol_sicas
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
