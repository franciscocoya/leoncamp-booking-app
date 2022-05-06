<script setup>
import { defineAsyncComponent, onMounted } from "vue";
import { useUserStore } from "@/store/user";

// Componentes
//import AccountSidebarItem from "@/components/Sidebar/AccountSidebarItem.vue";

const AccountSidebarItem = defineAsyncComponent(() =>
  import("@/components/Sidebar/AccountSidebarItem.vue")
);

// Store
const userStore = useUserStore();

onMounted(() => {
  userStore.loadUserData();
});

const isMobile = window.innerWidth < 768;
</script>

<template>
  <div class="account-view">
    <AccountSidebarItem
      :isUserHost="userStore.datosHost"
      v-if="isMobile == false"
    />

    <Suspense>
      <Transition name="fade">
        <RouterView />
      </Transition>
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.account-view {
  @include flex-row-center;
  gap: 50px;
  margin-top: 20px;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .account-view {
    @include flex-column;
  }
}
</style>