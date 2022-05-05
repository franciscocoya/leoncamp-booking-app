<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import BaseFormInput from "@/components/Forms/BaseFormInput.vue";

// Store
const userStore = useUserStore();

const router = useRouter();

defineProps({
  title: {
    type: String,
    default: "Crear una cuenta",
  },
});

/**
 * Manejador del evento submit del formulario.
 */
const handleRegister = (e) => {
  e.preventDefault();
  userStore.signUp();
};
</script>

<template>
  <div class="register-form-container">
    <h1>{{ title }}</h1>
    <form id="form-register">
      <!-- Nombre -->
      <div class="form-group__fullname__name">
        <label for="email">Nombre</label>
        <BaseFormInput
          inputType="nombre"
          inputStyleClass="base-input"
          ref="nombre"
          @handleInput="(value) => (userStore.name = value)"
        />
      </div>

      <!-- Apellidos -->
      <div class="form-group__fullname__surname">
        <label for="apellidos">Apellidos</label>
        <BaseFormInput
          inputType="apellidos"
          inputStyleClass="base-input"
          ref="apellidos"
          @handleInput="(value) => (userStore.surname = value)"
        />
      </div>

      <!-- Email -->
      <div class="form-group__email">
        <label for="email">Email</label>
        <BaseFormInput
          inputType="email"
          inputStyleClass="base-input"
          ref="email"
          @handleInput="(value) => (userStore.email = value)"
        />
      </div>
      <!-- Contraseña -->
      <div class="form-group__password">
        <label for="password">Contraseña</label>
        <BaseFormInput
          inputType="password"
          inputStyleClass="base-input"
          @handleInput="(value) => (userStore.password = value)"
        />
      </div>

      <!-- Repetir ontraseña -->
      <div class="form-group__password">
        <label for="repeatedPassword">Repite la contraseña</label>
        <BaseFormInput
          inputType="password"
          inputStyleClass="base-input"
          @handleInput="(value) => (userStore.repeatedPassword = value)"
        />
      </div>

      <BaseButton
        text="Crear cuenta"
        buttonStyle="baseButton-primary--filled"
        @click="handleRegister"
      />

      <p>¿Ya tienes una cuenta?</p>

      <BaseButton
        text="Iniciar sesión"
        buttonStyle="baseButton-secondary--outlined"
        @click="router.push('/signin')"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.register-form-container {
  @include flex-column-center;
  @include full-width;

  & > h1 {
    color: $color-dark;
    font-size: $heading-2-fontSize;
  }
}

#form-register {
  @include flex-column-center;
  width: 350px;
  gap: 15px;
  padding: 20px;
  border-radius: $global-border-radius;
}

// ------------------------------------------------------------
// -- Responsive design
// ------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .register-form-container{
    height: auto;
  }
}


</style>