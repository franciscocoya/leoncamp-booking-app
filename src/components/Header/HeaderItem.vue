<script setup>
import { defineEmits, onMounted, ref } from "vue";

import { useRouter } from "vue-router";

// Iconos
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";
import AppLogoIcon from "@/components/icons/AppLogoIcon.vue";

import {IMG_PROFILE_PLACEHOLDER} from '@/helpers/iconConstants';

// Componentes
import SearchBarItem from "./SearchBar/SearchBarItem.vue";
import MenuDesktopItem from "./Menu/MenuDesktopItem.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";

import { useUserStore } from "@/store/user";
import { useAppContextStore } from "@/store/appContext";

const router = useRouter();

// Store usuario
const userStore = useUserStore();

const appContextStore = useAppContextStore();

// Nombre y apellidos del usuario
const userData = ref({});

onMounted(async () => {
  if (userData.id) {
    await userStore.loadUserData(userData.id);
  }
  userData.value = await userStore.getUserDataById(JSON.parse(sessionStorage.getItem("user") || "{}")?.id);
});
</script>

<template>
  <header>
    <AppLogoIcon v-once :iconWidth="200" :iconHeight="100" />

    <SearchBarItem
      v-once
      @show-search-results="appContextStore.showSearchResults = true"
      @hide-search-results="appContextStore.showSearchResults = false"
    />

    <MenuDesktopItem v-if="userData" v-once />
    <!-- Si el usuario está logeado -->
    <AccountIcon
      v-if="userData"
      width="54"
      height="54"
      :username="`${userData?.name} ${userData?.surname}`"
      :profileImage="`${
        !userData?.profileImage ? IMG_PROFILE_PLACEHOLDER : userData?.profileImage
      }`"
      :isLinked="true"
    />

    <!-- Si el usuario no está logeado -->
    <BaseButton
      v-else
      v-once
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
  grid-template-columns: 200px 40% auto auto;
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