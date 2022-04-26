<script setup>
import { login } from "@/services/auth/AuthService";

// Componentes
import RegisterForm from "@/components/Forms/RegisterForm.vue";
import AppLogoIcon from "@/components/icons/AppLogoIcon.vue";
</script>

<template>
  <div class="login-view">
    <div class="login-view-wrapper">
      <AppLogoIcon />
      <RegisterForm title="Crear una cuenta" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.login-view {
  @include flex-row-center;
  
  & > .login-view-wrapper {
    @include flex-column-center;
    @include full-width;
  }
}
</style>