<script setup>
// Componentes
import RegisterForm from "@/components/Forms/RegisterForm.vue";
import AppLogoIcon from "@/components/icons/AppLogoIcon.vue";
</script>

<template>
  <div class="register-view">
    <div class="register-view-wrapper">
      <AppLogoIcon v-once/>
      <RegisterForm title="Crear una cuenta" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.register-view {
  @include flex-row-center;
  
  & > .register-view-wrapper {
    @include flex-column-center;
  }
}
</style>