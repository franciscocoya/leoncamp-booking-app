<script setup>
import { useUserStore } from "@/store/user";
import { onMounted } from "@vue/runtime-core";

import { RouterView } from "vue-router";

// Componentes
import AccountSidebarItem from "@/components/Sidebar/AccountSidebarItem.vue";

// Store
const userStore = useUserStore();

onMounted(() => {
  userStore.loadUserData();
});
</script>

<template>
  <div class="account-view">
    <AccountSidebarItem :isUserHost="userStore.datosHost" />
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.account-view {
  @include flex-row-center;
  margin-top: 20px;
}
</style>