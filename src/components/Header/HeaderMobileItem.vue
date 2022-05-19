<script setup>
import { ref, onMounted, onUpdated, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

// Componentes
import MenuIcon from "@/components/Header/Menu/MenuIcon.vue";
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";

// Service
import { getUserDataById } from "@/services/user/userService";

// Iconos
import {
  ICON_BOOKMARK,
  ICON_MENU_CALENDAR_OUTLINE,
  ICON_MENU_HOME,
  ICON_ADD,
} from "@/helpers/iconConstants";

import { UPLOAD_ACCOMODATION_ROUTE } from "@/helpers/appRoutes";

import { useUserStore } from "@/store/user";
import { useAuthStore } from "@/store/auth";

const userStore = useUserStore();
const authStore = useAuthStore();

const router = useRouter();

const emit = defineEmits(["showMenuMobile"]);

const handleShowMenuMobile = () => {
  emit("showMenuMobile");
};

const isLogged = ref(false);

let userToken = ref(null);
let userData = ref(null);

const redirectToUserBookings = () => {
  router.push({
    name: "user-bookings",
    params: {
      username: `${userStore.name}-${userStore.surname}`,
    },
  });
};

onBeforeMount(async () => {
  await authStore.loadCurrentUserData();
});

onMounted(async () => {
  userToken.value = JSON.parse(sessionStorage.getItem("user"))?.token;

  if (userToken.value) {
    userData.value = await getUserDataById(
      JSON.parse(sessionStorage.getItem("user"))?.id
    );

    isLogged.value = userToken.value !== null;
  }
});

onUpdated(() => {
  isLogged.value = authStore?.userData?.id !== null && userToken.value;
});
</script>

<template>
  <div class="header-mobile">
    <div class="header-mobile-wrapper">
      <ul>
        <!-- Icono Inicio -->
        <!-- class="menu-mobile-item--active" -->
        <li>
          <MenuIcon
            v-once
            :icon="ICON_MENU_HOME"
            :iconSize="40"
            :title="$t('header.menu.home')"
            path="/"
          />
        </li>

        <!-- Icono guardados -->
        <li v-if="authStore?.userData?.id">
          <MenuIcon
            v-once
            :icon="ICON_BOOKMARK"
            :iconSize="26"
            :title="$t('header.menu.saved')"
            path="/saved"
          />
        </li>

        <!-- Icono subir alojamiento -->
        <li v-if="authStore?.userData?.dni">
          <MenuIcon
            v-once
            :icon="ICON_ADD"
            :path="`/account/${authStore?.userData?.name}-${authStore?.userData?.surname}${UPLOAD_ACCOMODATION_ROUTE}`"
            :iconSize="50"
            :title="$t('header.menu.publish.title')"
            id="add-accomodation-menu-mobile"
          />
        </li>

        <!-- Icono reservas -->
        <li v-if="authStore?.userData?.id">
          <MenuIcon
            v-once
            :icon="ICON_MENU_CALENDAR_OUTLINE"
            :iconSize="40"
            :title="$t('header.menu.bookings')"
            path="/bookings"
            @click="redirectToUserBookings"
          />
        </li>

        <!-- Icono cuenta personal -->
        <li>
          <AccountIcon
            v-if="authStore?.userData?.id"
            :width="50"
            :height="50"
            :username="
              $tc('header.menu.profile_icon', {
                name: authStore?.userData?.name,
              })
            "
            :profileImage="userData?.profileImage"
            :isOnMenuMobile="true"
            :isUploading="false"
            @showMenu="handleShowMenuMobile"
          />
        </li>
        <li v-if="!authStore?.userData?.id">
          <!-- Botón Registro -->
          <BaseButton
            :text="$t('components.buttons.register')"
            buttonWidth="140px"
            buttonStyle="baseButton-secondary--filled"
            @click="router.push({ name: 'signup' })"
          />
        </li>
        <li v-if="!authStore?.userData?.id">
          <!-- Botón Iniciar sesión -->
          <BaseButton
            :text="$t('components.buttons.login')"
            buttonWidth="140px"
            buttonStyle="baseButton-primary--outlined"
            @click="router.push({ name: 'signin' })"
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
  // height: 100vh;
  width: 100%;
  margin: 0 auto;
  // top: 89vh;
  bottom: 2%;
  background: transparent;
  transition: all 0.5s linear;
  z-index: $z-index-header;

  & > .header-mobile-wrapper {
    height: 100px;
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