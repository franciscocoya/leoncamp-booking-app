<script setup>
// Componentes
import ResetPasswordForm from "@/components/Forms/ResetPasswordForm.vue";
</script>

<template>
  <div class="login-view">
    <div class="login-view-wrapper">
      <ResetPasswordForm :title="$t('reset_password.title')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.login-view {
  @include flex-row-center;

  & > .login-view-wrapper {
    @include flex-column;
  }
}
</style>