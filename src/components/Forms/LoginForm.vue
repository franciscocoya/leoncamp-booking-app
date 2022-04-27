<script setup>
import { useRouter } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import BaseFormInput from "@/components/Forms/BaseFormInput.vue";

// Store
import { useUserStore } from "@/store/user";
const userStore = useUserStore();

const router = useRouter();

defineProps({
  title: {
    type: String,
    default: "Iniciar sesión",
  },
});

/**
 * Manejador del evento submit del formulario.
 */
const handleLogin = (e) => {
  e.preventDefault();
  userStore.login();
};
</script>

<template>
  <div class="login-form">
    <h1>{{ title }}</h1>
    <form id="form-login">
      <div class="form-group__email">
        <label for="email">Email</label>
        <BaseFormInput
          inputType="email"
          inputStyleClass="base-input"
          :inputValue="userStore.email"
          @handleInput="(value) => userStore.email = value"
        />
      </div>
      <div class="form-group__password">
        <label for="password">Contraseña</label>
        <BaseFormInput
          inputType="password"
          inputStyleClass="base-input"
          @handleInput="(value) => (userStore.password = value)"
        />
      </div>
      <RouterLink to="/password/reset">He olvidado mi contraseña</RouterLink>
      <BaseButton
        text="Iniciar sesión"
        buttonStyle="baseButton-primary--filled"
        @click="handleLogin"
      />
      <BaseButton
        text="Crear una cuenta"
        buttonStyle="baseButton-secondary--outlined"
        @click="router.push('/signup')"
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
  //border: 2px solid $color-tertiary-light;
  padding: 20px;
  border-radius: $global-border-radius;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
}

hr {
  width: 90%;
  border: 1px solid rgb(199, 199, 199);
}
</style>