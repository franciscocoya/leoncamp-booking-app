<script setup>
import { useRouter } from "vue-router";

// Componentes
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";

const router = useRouter();

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

// Redireccionar a los detalles del perfil
const redirectUserProfile = () => {
  router.push({
    name: "user-profile",
  });
};

</script>

<template>
  <div class="account-sidebar">
    <!-- Imagen de perfil -->
    <div class="account-sidebar__profile-image">
      <AccountIcon
        width="150"
        height="150"
        profileImage="../../src/assets/img/icons/profile-image-empty.png"
      />

      <!-- Icono de verficación de un usuario host -->
      <div v-if="isUserHostVerified">
        <img src="@/assets/img/icons/user-verified-icon.png" :alt="`${userStore.name} ${userStore.surname} ha verificado su perfil.`"> 
      </div>
    </div>

    <!-- Menu de usuario -->
    <div class="account-sidebar__menu">
      <ul>
        <li id="user-profile" @click="redirectUserProfile()">Perfil</li>
        <li id="user-security-privacity">Seguridad y privacidad</li>
        <li id="user-bookings">Reservas</li>
        <li id="user-accomodations">Anuncios</li>
        <li id="app-help">Ayuda</li>
        <li id="user-logout">Cerrar sesión</li>
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
  height: 100vh;
  padding: 50px 30px;
  background-color: $color-tertiary-light;

  // Estilos menu del sidebar
  & > .account-sidebar__menu {
    width: 100%;

    & > ul {
      @include flex-column;
      gap: 20px;
      padding: 0;
      margin: 0;
      list-style: none;

      & li {
        @include flex-row-center;

        align-items: center;
        background-color: #ddd;
        border-radius: $global-border-radius;
        height: 50px;
        color: $color-primary;
        cursor: pointer;
        transition: background-color 0.1s ease-in;

        &:hover {
          background-color: $color-primary;
          color: #fff;
        }
      }
    } // fin ul
  } // fin accotun-sidebar__menu
}
</style>