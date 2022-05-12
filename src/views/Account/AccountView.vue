<script setup>
import { defineAsyncComponent, onMounted } from "vue";
import { useUserStore } from "@/store/user";

const AccountSidebarItem = defineAsyncComponent(() =>
  import("@/components/Sidebar/AccountSidebarItem.vue")
);

// Store
const userStore = useUserStore();

onMounted(async () => {
  await userStore.loadUserData();
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
        <RouterView id="account-children-view" />
      </Transition>
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.account-view {
  @include flex-row;
  justify-content: center;
  gap: 50px;
  margin: 40px 20px;
}

#account-children-view {
  flex: 0 1 60%;
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