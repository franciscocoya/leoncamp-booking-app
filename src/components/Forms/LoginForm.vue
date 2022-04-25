<script setup>
import { RouterLink } from "vue-router";
import { ref } from "@vue/reactivity";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import BaseFormInput from "@/components/Forms/BaseFormInput.vue";


defineProps({
  title: {
    type: String,
    default: "Iniciar sesión",
  },
});

const email = "";
const password = "";

</script>

<template>
  <div class="login-form">
    <h1>{{ title }}</h1>
    <form action="#" method="post" id="form-login">
      <div class="form-group__email">
        <label for="email">Email</label>
        <BaseFormInput inputType="email" inputStyleClass="base-input" :inputValue="email"/>
      </div>
      <div class="form-group__password">
        <label for="password">Contraseña</label>
        <BaseFormInput inputType="password" inputStyleClass="base-input"/>
      </div>
      <RouterLink to="reset-password">He olvidado mi contraseña</RouterLink>
      <BaseButton
        text="Iniciar sesión"
        buttonStyle="baseButton-primary--filled"
      />
      <hr />
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

#form-login {
  @include flex-column-center;
  width: 250px;
  gap: 15px;
  background-color: $color-tertiary-light;
  padding: 20px;
  border-radius: $global-border-radius;
}

hr{
    width: 90%;
    color: #000;
}

</style>