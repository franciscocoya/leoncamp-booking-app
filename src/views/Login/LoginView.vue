<script setup>
import { onMounted } from "vue";
import { login } from "@/services/auth/AuthService";

// Componentes
import LoginForm from "@/components/Forms/LoginForm.vue";

onMounted(() => {
  //login("samuel.cooper@gmail.com", "password1");
});
</script>

<template>
  <div class="login-view">
      <div class="login-view-wrapper">
    <LoginForm title="Iniciar sesión"/>
      </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.login-view{
    @include flex-column-center;
    @include full-width;
}
</style>