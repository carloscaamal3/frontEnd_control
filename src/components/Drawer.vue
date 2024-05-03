<template>
 <!-- <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    src="../assets/login.jpg" pone el fondo al menu
    mobile-breakpoint="960"
    app
    mini-variant-width="80"
    width="260"
    v-bind="$attrs"
  >-->
   <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-breakpoint="960"
    app
    mini-variant-width="80"
    width="260"
    v-bind="$attrs"
  >
    <!-- :src="barImage" -->
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>
    <!-- Encabezado -->
    <v-list-item two-line>
      <v-list-item-content>
        <!--         <v-list-item-title class="text-uppercase font-weight-regular display-1">
          <span class="logo-mini">{{ $t('ct') }} </span>
          <span class="logo-normal">{{ $t('tim') }}</span>
        </v-list-item-title>
 -->
        <v-list-item-title class="font-weight-regular display-1">
          <!-- <span class="logo-mini">{{ $t('ct') }} </span> -->
          <span  class="logo-normal">{{usuario.rol.rol}} </span>
          <!-- <span class="logo-normal">{{ $t('tim') }}</span> -->
        </v-list-item-title>

        <v-list-item-title class="font-weight-regular display-1">
          <span class="logo-normal">Sistema de control ciudadano</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mb-1" />
    <!-- Encabezado con el avatar -->
    <!-- <v-list dense nav>
      <base-item-group :item="profile" />
    </v-list> -->
    <v-list-item two-line :class="false && 'px-0'">
     <v-list-item-content>
     <v-list-item-title><strong>Usuario:</strong></v-list-item-title>
        <v-list-item-subtitle>{{ usuario.nombres }}</v-list-item-subtitle>
        <v-list-item-subtitle>{{ usuario.apellidoPaterno }} {{ usuario.apellidoMaterno }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <!-- Termina encabezado con el avatar -->

    <v-divider class="mb-1" />

    <!-- Menú -->
    <v-list expand nav>
      <div />

      <!-- Sistema Integral de Control financiero de Obra -->
      <!-- Administracion -->
      <template v-if="esAdministrador = true">
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-action>
              <!--  <v-icon>mdi-account-cash-outline</v-icon> -->
              <v-icon>mdi-counter</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Secciones </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="esAdministrador = true" :to="{ path: 'seccion' }">
            <v-list-item-action>
              <v-icon>mdi-counter</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sección</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>

      <!-- Planeacion -->
      <template v-if="esAdministrador = true">
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-action>
              <v-icon>mdi-view-dashboard-edit-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Registros </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="esAdministrador = true" :to="{ path: 'ciudadanos' }">
            <v-list-item-action>
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Ciudadanos </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="esAdministrador = true" :to="{ path: 'eventos' }">
            <v-list-item-action>
              <v-icon>mdi-calendar-range-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Eventos </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>

      <!-- Tecnico -->
      <template v-if="usuario.rol == 'SICFO'">
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-action>
              <v-icon>mdi-account-hard-hat-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Tecnico </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="esSupervisor" :to="{ path: 'crealicita' }">
            <v-list-item-action>
              <v-icon>mdi-form-select</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Licitaciones </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
		  <v-list-item v-if="esSupervisor" :to="{ path: 'viewConvo' }">
            <v-list-item-action>
              <v-icon>mdi-archive-arrow-down-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Convocatoria </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>

      <!-- Vivienda -->
      <template v-if="esAdministrador = false">
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-action>
              <v-icon>mdi-home-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Vivienda </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="esSupervisor" :to="{ path: 'acciones' }">
            <v-list-item-action>
              <v-icon>mdi-floor-plan</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Acciones </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="esSupervisor" :to="{ path: 'programas' }">
            <v-list-item-action>
              <v-icon>mdi-ballot-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Programas </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>

      <!-- Reportes -->
      <template v-if="usuario.rol == 'SICFO'">
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-action>
              <v-icon>mdi-book-open-page-variant-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Reportes </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>

      <template v-if="esAdministrador = true">
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-action>
              <v-icon>mdi-bookshelf</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Catalogos </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="esSupervisor" :to="{ path: 'sistema' }">
            <v-list-item-action>
              <v-icon>mdi-cube-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Sistemas </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: 'usuarios' }">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Usuarios </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: 'colonias-localidad' }">
            <v-list-item-action>
              <v-icon>mdi-drawing</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Colonias/Localidades</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: 'tipos' }">
            <v-list-item-action>
              <v-icon>mdi-shape</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Tipos de eventos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>

      <!--       <template v-if="usuario.rol == 'SICFO'">
        <template v-if="esSupervisor || esAdministrador || esPresupuesto || esContabilidad">
          <v-list-item :to="{ path: 'orders' }">
            <v-list-item-action>
              <v-icon>mdi-cart-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Órdenes de Compra </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
 -->

      <v-divider class="mb-2" />
      <div />
    </v-list>

    <!-- Termina Menú -->
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { getValidToken } from '@/store/helpers.js'
import { mapState } from 'vuex'
import axios from 'axios'
//import ThumborImage from '@/components/general/ThumborImage.vue'

export default {
  components: {
    //ThumborImage,
  },
  name: 'DashboardCoreDrawer',

  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
    adminMode: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    usuario: JSON.parse(localStorage.getItem('user')),
    profileUsr: [],
    profileUsr2: {
      usr_id: '',
      usr_login: '',
      usr_nombre: '',
      usr_correo: '',
      ent_nombre: '',

      //imagen: { avatar: '' },
    },
    items2: [] /* para usar con Json dinamico */,
    settings2: [] /* para usar con Json dinamico */,
    dashboard: [] /* para usar con Json dinamico */,
    config: [] /* para usar con Json dinamico */,
    //Menu Lateral
    items: [
      {
        icon: 'mdi-view-dashboard',
        title: 'dashboard',
        to: '/',
      },
      //Captura
      {
        icon: 'mdi-file-document-edit-outline',
        title: 'all',
        to: '/all',
      },

      //Captura
      {
        icon: 'mdi-file-document-edit-outline',
        title: 'capture',
        to: '/captura',
      },
      //Firma Solicitante
      {
        icon: 'mdi-file-document-edit-outline',
        title: 'firmsol',
        to: '/firmasol',
      },
      //Firma Autoriza
      {
        icon: 'mdi-file-document-edit-outline',
        title: 'firmaut',
        to: '/firmaaut',
      },
      //Pagos Tesoreria
      {
        icon: 'mdi-file-document-edit-outline',
        title: 'pagos',
        to: '/pagos',
      },
      //Ejercido
      {
        icon: 'mdi-file-document-edit-outline',
        title: 'ejercido',
        to: '/ejercido',
      },
      //Devengado y Comprometido
      {
        icon: 'mdi-file-document-edit-outline',
        title: 'Envio a Contabilidad',
        to: '/devengado',
      },
      {
        //group: '/ventas',
        group: '/admon',
        icon: 'mdi-bookshelf',
        title: 'catalogs',
        //icon: 'mdi-account-multiple',
        //title: 'users',
        children: [
          {
            icon: 'mdi-cube-outline',
            title: 'sistem',
            to: 'sistema',
          },

          {
            icon: 'mdi-account',
            title: 'users',
            to: 'usuarios',
          },
          {
            icon: 'mdi-account',
            title: 'employee',
            to: 'empleados',
          },

          {
            title: 'classification',
            icon: 'mdi-cogs',
            to: 'clasificacion',
          },
          {
            icon: 'mdi-account',
            title: 'type',
            to: 'tipos',
          },
          {
            title: 'provider',
            icon: 'mdi-cogs',
            to: 'proveedores',
          },
          {
            title: 'accounts',
            icon: 'mdi-cogs',
            to: 'cuentas',
          },
          /*  {
            title: 'products',
            icon: 'mdi-paperclip',
            to: 'productos',
          }, */
          {
            title: 'vehicles',
            icon: 'mdi-car-pickup',
            to: 'vehiculos',
          },
        ],
      },
    ],
  }),

  computed: {
    ...mapState(['barColor', 'barImage']),
    drawer: {
      get() {
        return this.$store.state.drawer
      },
      set(val) {
        this.$store.commit('SET_DRAWER', val)
      },
    },
    esAdministrador() {
      console.log(this.this.usuario.rol.rol)
      return this.usuario && this.usuario.rol == 'ADMINISTRADOR'
      //return this.usuario && this.usuario.usr_rol == '86'
    },
    esPresupuesto() {
      //console.log(this.usuario.usr_rol)
      return this.usuario && this.usuario.usr_rol == 'PRES'
      //return this.usuario && this.usuario.usr_rol == '87'
    },
    esSupervisor() {
      //console.log(this.usuario.rol)
      return this.usuario && this.usuario.usr_rol == 'SUPER'
      //return this.usuario && this.usuario.usr_rol == '85'
    },
    esContabilidad() {
      //console.log(this.usuario.usr_rol)
      return this.usuario && this.usuario.usr_rol == 'CONTAB'
      //return this.usuario && this.usuario.usr_rol == '88'
    },
    esOwner() {
      //console.log(this.usuario.usr_rol)
      return this.usuario && this.usuario.usr_rol == 'OWNER'
      //return this.usuario && this.usuario.usr_rol == '88'
    },

    computedItems() {
      return this.items.map(this.mapItem)
    },
    computedSettings() {
      return this.settings.map(this.mapItem)
    },
    // computedAdministration() {
    //   return this.administration.map(this.mapItem)
    // },
    profile() {
      return {
        avatar: true,
        // group: '',
        title: this.$t('avatar'),
        children: [
          // {
          //   href: '',
          //   title: this.$t('my-profile'),
          // },
          // {
          //   to: '',
          //   title: this.$t('edit-profile'),
          // },
          // {
          //   to: '',
          //   title: this.$t('settings'),
          // },
        ],
      }
    },
  },

  watch: {
    '$vuetify.breakpoint.smAndDown'(val) {
      this.$emit('update:expandOnHover', !val)
    },
  },
  /*   mounted() {
    axios.get('items.json').then((response) => (this.items2 = response.data))
   },
   */
  created() {
    //OJOOOO
    this.obtenerUsuario()
    console.log('usuario.rol: ' + this.usuario.rol)
    /* para usar con Json dinamico */
    /* this.getConfig()
    this.getDashboard()
    this.getItems()
    this.getSettings() */
  },
  methods: {
    /* para usar con Json dinamico */
    getConfig: function () {
      axios.get('http://localhost:3000/config').then((response) => {
        this.config = response.data
      })
    },
    /* para usar con Json dinamico */
    getDashboard: function () {
      axios.get('http://localhost:3000/dashboard').then((response) => {
        this.dashboard = response.data
      })
    },
    /* para usar con Json dinamico */
    getItems: function () {
      axios.get('http://localhost:3000/grupos').then((response) => {
        this.items = response.data
        this.config.forEach((element) => this.items.unshift(element))
        this.dashboard.forEach((element) => this.items.unshift(element))
      })
    },
    /* para usar con Json dinamico */
    getSettings: function () {
      axios.get('http://localhost:3000/settings').then((response) => {
        this.settings = response.data
        this.dashboard.forEach((element) => this.settings.unshift(element))
      })
    },
    //Roger Gala
    // Obtener todos los Usuarios
    async obtenerUsuario() {
      this.isLoading = true
      let jwt = await getValidToken(this)
      let payload = {
        jwt: jwt,
        //id: this.usuario.id,
        id: this.usuario.id,
      }
      if (jwt !== null) {
        this.$store
          .dispatch('user/fetchUsersId', payload)
          .then((response) => {
            //this.usuarios = response.data
            //console.log(response.data)
            this.profileUsr = response.data
            //console.log(this.profileUsr)
            //this.isLoading = false
            //console.log(this.editedItem.imagen.avatar)
            /*             if (this.editedItem.imagen.avatar == undefined) {
              this.editedItem.imagen.avatar = this.urlSinImagen
            }
 */
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title),
      }
    },
    mapSetting(setting) {
      return {
        ...setting,
        children: setting.children ? setting.children.map(this.mapSetting) : undefined,
        title: this.$t(setting.title),
      }
    },
  },
}
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important

    .v-list-group--sub-group
      display: block !important

  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
      margin-right: 24px
      margin-left: 12px !important

      +rtl()
      margin-left: 24px
      margin-right: 12px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
      padding-left: 8px

      +rtl()
      padding-right: 8px

    .v-list-group__header
      +ltr()
      padding-right: 0

      +rtl()
      padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
        margin-right: 8px

        +rtl()
        margin-left: 8px
</style>
