<script setup>
import { onBeforeMount } from "vue";

import { useRouter } from "vue-router";

// Iconos
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";
import AppLogoIcon from "@/components/icons/AppLogoIcon.vue";

import { IMG_PROFILE_PLACEHOLDER } from "@/helpers/iconConstants";

// Componentes
import SearchBarItem from "./SearchBar/SearchBarItem.vue";
import MenuDesktopItem from "./Menu/MenuDesktopItem.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";
import LanguageSwitchItem from "@/components/Header/LanguageSwitchItem.vue";

import { useAuthStore } from "@/store/auth";
import { useAppContextStore } from "@/store/appContext";

const router = useRouter();

const authStore = useAuthStore();
const appContextStore = useAppContextStore();

onBeforeMount(async () => {
  await authStore.loadCurrentUserData();
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

    <div class="header_left_side">
    <MenuDesktopItem v-if="authStore?.userData" />
      <LanguageSwitchItem />
      <AccountIcon
        v-if="authStore?.userData"
        width="54"
        height="54"
        :username="`${authStore?.userData?.name} ${authStore?.userData?.surname}`"
        :profileImage="
          authStore?.userData?.profileImage ?? IMG_PROFILE_PLACEHOLDER
        "
        :isLinked="true"
      />

      <BaseButton
        v-else
        :text="$t('components.buttons.login')"
        buttonStyle="baseButton-secondary--filled"
        @click="router.push({ name: 'signin' })"
      />

    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

header {
  @include flex-row;
  justify-content: space-between;
  height: $header-height;
  background-color: #ffffff;
  gap: 10px;
  align-items: center;
  margin: 0;
  padding: 0 30px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: $z-index-header;

  & > div{
    flex: 1;
  }

  & > .header_left_side{
    @include flex-row;
    justify-content: flex-end;
    gap: 20px;
  }
}
</style>