<script lang="ts" setup>
import { onMounted, onRenderTriggered } from "vue";
import { useRouter } from "vue-router";

// Componentes
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";

// Iconos
import { ICON_VERIFIED_USER } from "@/helpers/iconConstants";

// Store usuario
import { useUserStore } from "@/store/user";
const userStore: any = useUserStore();

const router: any = useRouter();

// const accountSidebarMenuItemActive = "";
defineProps({
  accountSidebarMenuItemActive: {
    type: String,
    default: "profile",
  },
  isUserHostVerified: {
    type: Boolean,
    default: false,
  },
});

/**
 * Resalta el item del menú de la barra lateral cuando se está en la página.
 */
const highlightActiveAccountSidebarMenuItem = (id: string): void => {
  // Eliminar la clase activa de todos los elementos del menú que la tengan.
  Array.from(
    document.getElementsByClassName("sidebar-menu-item--active")
  ).forEach((element) => {
    element.classList.remove("sidebar-menu-item--active");
  });

  // Agregar la clase active al elemento del menú que corresponda.
  const element = document.getElementById(id);
  element?.classList.add("sidebar-menu-item--active");
};

/**
 * Redirecciona a la vista anidada indicada como parámetro.
 */
const redirectAccountChildrenView = (viewName: string) => {
  highlightActiveAccountSidebarMenuItem(viewName);
  router.push({
    name: viewName,
  });
};

onMounted(() => {
  const currentRouteName: string = router.currentRoute.value.name;
  redirectAccountChildrenView(currentRouteName)
});

</script>

<template>
  <div class="account-sidebar">
    <!-- Imagen de perfil -->
    <div class="account-sidebar__profile-image">
      <AccountIcon width="120" height="120" />

      <!-- Icono de verficación de un usuario host -->
      <div v-if="isUserHostVerified" class="user-verified-icon-container">
        <img
          class="user-verified-icon"
          :src="ICON_VERIFIED_USER"
          :alt="`${userStore.name} ${userStore.surname} ha verificado su perfil.`"
        />
      </div>
    </div>

    <!-- Menu de usuario -->
    <div class="account-sidebar__menu">
      <h2>{{ userStore.name }}</h2>
      <ul>
        <li
          id="user-profile"
          @click="redirectAccountChildrenView('user-profile')"
        >
          Perfil
        </li>
        <li id="user-security-privacity">Seguridad y privacidad</li>
        <li id="user-bookings" @click="redirectAccountChildrenView('user-bookings')">Reservas</li>
        <li id="user-ads" @click="redirectAccountChildrenView('user-ads')">
          Anuncios
        </li>
        <li id="app-help">Ayuda</li>
        <hr />
        <li id="user-logout" @click="userStore.logout()">Cerrar sesión</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

// Estilos sidebar de la cuenta de usuario
.account-sidebar {
  @include flex-column;
  align-items: center;
  gap: 40px;
  min-width: 250px;
  max-width: 15%;
  padding: 50px 30px;
  border: 1px solid $color-tertiary-dark;
  border-radius: $global-border-radius;

  // Estilos menu del sidebar
  & > .account-sidebar__menu {
    width: 100%;

    // Estilos nombre de usuario
    & > h2 {
      color: $color-dark;
      font-weight: 400;
      text-align: center;
      margin-bottom: 20px;
    }

    & > ul {
      @include flex-column;
      gap: 20px;
      padding: 0;
      margin: 0;
      list-style: none;

      & li {
        @include flex-row-center;

        align-items: center;
        background-color: $color-tertiary-light;
        border-radius: $global-border-radius;
        height: 50px;
        color: $color-dark;
        cursor: pointer;
        transition: background-color 0.1s ease-in;

        &:hover {
          background-color: $color-primary;
          color: #fff;
        }
      }

      // Estilos boton logout
      & li[id="user-logout"] {
        background: none;
        border: 1px solid $color-dark;
        color: $color-dark;
        transition: background 0.2s ease-in;

        &:hover {
          background: $color-dark;
          color: #fff;
        }
      }
    } // fin ul
  } // fin accotun-sidebar__menu

  // Estilos elemento de menú del sidebar activo
  .sidebar-menu-item--active {
    background-color: #f5562a !important;
    color: #fff !important;
  }

  .account-sidebar__profile-image {
    position: relative;
  }
  // Estilos icono usuario verificado
  .user-verified-icon-container {
    position: absolute;
    bottom: 6px;
    right: 0;
    & > .user-verified-icon {
      width: 30px;
      height: 30px;
    }
  }
}
</style>