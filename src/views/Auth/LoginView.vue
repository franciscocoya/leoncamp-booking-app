<script setup>
// Componentes
import LoginForm from "@/components/Forms/LoginForm.vue";
import AppLogoIcon from "@/components/icons/AppLogoIcon.vue";
</script>

<template>
  <div class="login-view">
    <div class="login-view-wrapper">
      <AppLogoIcon v-once/>
      <LoginForm title="Iniciar sesión" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.login-view {
  @include flex-row-center;

  & > .login-view-wrapper {
    @include flex-column-center;
    @include full-width;
  }
}

// ------------------------------------------------------------
// -- Responsive design
// ------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .login-view-wrapper {
    height: auto;
  }
}
</style>