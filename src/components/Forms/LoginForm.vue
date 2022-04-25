<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import BaseFormInput from "@/components/Forms/BaseFormInput.vue";

defineProps({
  title: {
    type: String,
    default: "Iniciar sesión",
  },
});

const email = ref("");
const password = ref("");

const handleLogin = () => {
  //login(email, password);
  console.log(email, password);
};

const show = () => console.log(email.value?.inputValue);
</script>

<template>
  <div class="login-form">
    <h1 @click="show">{{ title }}</h1>
    <form id="form-login" @submit="handleLogin">
      <div class="form-group__email">
        <label for="email">Email</label>
        <BaseFormInput
          inputType="email"
          inputStyleClass="base-input"
          ref="email"
        />
      </div>
      <div class="form-group__password">
        <label for="password">Contraseña</label>
        <BaseFormInput inputType="password" inputStyleClass="base-input" />
      </div>
      <RouterLink to="reset-password">He olvidado mi contraseña</RouterLink>
      <BaseButton
        text="Iniciar sesión"
        buttonStyle="baseButton-primary--filled"
      />
      <BaseButton
        text="Crear una cuenta"
        buttonStyle="baseButton-secondary--outlined"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.login-form {
  @include flex-column-center;
  @include full-width;

  & > h1 {
    color: $color-dark;
    font-size: $heading-2-fontSize;
  }
}

#form-login {
  @include flex-column-center;
  width: 350px;
  gap: 15px;
  // background-color: $color-tertiary-light;
  border: 2px solid $color-tertiary-light;
  padding: 20px;
  border-radius: $global-border-radius;
}

hr {
  width: 90%;
  border: 1px solid rgb(199, 199, 199);
}
</style>