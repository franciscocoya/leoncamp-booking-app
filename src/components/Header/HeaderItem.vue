<script setup>
import { useRouter, RouterLink } from "vue-router";

// Iconos
import { IMG_APP_LOGO } from "@/helpers/iconConstants";
import AccountIcon from "../icons/Account/AccountIcon.vue";
import AppLogoIcon from "../icons/AppLogoIcon.vue";

// Componentes
import SearchBarItem from "./SearchBar/SearchBarItem.vue";
import MenuDesktopItem from "./Menu/MenuDesktopItem.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";

const router = useRouter();

// Token de usuario
const userToken = JSON.parse(sessionStorage.getItem("user") || "{}").token;
</script>

<template>
  <header>
    <AppLogoIcon />

    <SearchBarItem />

    <MenuDesktopItem v-if="userToken" />
    <!-- Si el usuario está logeado -->
    <AccountIcon v-if="userToken" username="Ralph" :isLinked="true" />
    <!-- Si el usuario no está logeado -->
    <BaseButton
      v-else
      text="Iniciar sesión"
      buttonStyle="baseButton-secondary--filled"
      @click="router.push('/signin')"
    />
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

header {
  height: $header-height;
  display: grid;
  grid-template-columns: auto 40% auto auto;
  background-color: #ffffff;
  gap: 10px;
  align-items: center;
  margin: 0;
  padding: 0 30px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: $z-index-header;
}
</style>