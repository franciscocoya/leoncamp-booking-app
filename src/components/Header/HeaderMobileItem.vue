<script setup>
import { ref, onMounted, onUpdated } from "vue";
import { useRouter } from "vue-router";

// Componentes
import MenuIcon from "@/components/Header/Menu/MenuIcon.vue";
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";

// Iconos
import {
  ICON_BOOKMARK,
  ICON_MENU_CALENDAR_OUTLINE,
  ICON_MENU_HOME,
  ICON_ADD,
} from "@/helpers/iconConstants";

const router = useRouter();

const emit = defineEmits(["showMenuMobile"]);

const handleShowMenuMobile = () => {
  emit("showMenuMobile");
};

const isLogged = ref(false);

onMounted(() => {
  isLogged.value =
    JSON.parse(localStorage.getItem("user"))?.token !== undefined;
});

onUpdated(() => {
  isLogged.value =
    JSON.parse(localStorage.getItem("user"))?.token !== undefined;
});
</script>

<template>
  <div class="header-mobile">
    <div class="header-mobile-wrapper">
      <ul>
        <!-- Icono Inicio -->
        <li class="menu-mobile-item--active">
          <MenuIcon
            v-once
            :icon="ICON_MENU_HOME"
            :iconSize="40"
            title="Inicio"
            path="/"
          />
        </li>

        <!-- Icono guardados -->
        <li v-if="isLogged == true">
          <MenuIcon
            v-once
            :icon="ICON_BOOKMARK"
            :iconSize="26"
            title="Guardados"
            path="/saved"
          />
        </li>

        <!-- Icono subir alojamiento -->
        <li v-if="isLogged == true">
          <MenuIcon
            v-once
            :icon="ICON_ADD"
            path="/bookings"
            :iconSize="50"
            id="add-accomodation-menu-mobile"
          />
        </li>

        <!-- Icono reservas -->
        <li v-if="isLogged == true">
          <MenuIcon
            v-once
            :icon="ICON_MENU_CALENDAR_OUTLINE"
            :iconSize="40"
            title="Reservas"
            path="/bookings"
          />
        </li>

        <!-- Icono cuenta personal -->
        <li>
          <AccountIcon
            v-if="isLogged == true"
            :width="50"
            :height="50"
            username="Cuenta"
            :isOnMenuMobile="true"
            @showMenu="handleShowMenuMobile"
          />
        </li>
        <li v-if="isLogged == false">
          <!-- Botón Registro -->
          <BaseButton
            text="Crear cuenta"
            buttonWidth="140px"
            buttonStyle="baseButton-secondary--filled"
            @click="router.push('/signup')"
          />
        </li>
        <li v-if="isLogged == false">
          <!-- Botón Iniciar sesión -->
          <BaseButton
            text="Iniciar sesión"
            buttonWidth="140px"
            buttonStyle="baseButton-primary--outlined"
            @click="router.push('/signin')"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.header-mobile {
  position: fixed;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  top: 87%;
  background: transparent;
  z-index: $z-index-header;

  & > .header-mobile-wrapper {
    height: 80px;
    background-color: #fff;
    box-shadow: $global-box-shadow;
    border-radius: $global-border-radius;
    width: 90%;
    margin: 0 auto;
    padding: 5px 5px;
    position: sticky;

    & > ul {
      @include flex-row;
      justify-content: space-evenly;
      align-items: center;
      gap: 5px;
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;

      & > li {
        & img {
          fill: red;
        }
      }

      & > .menu-mobile-item--active {
        background-color: $color-tertiary-dark;
        padding: 10px;
        border-radius: $global-border-radius;
      }
    }
  }
}
</style>