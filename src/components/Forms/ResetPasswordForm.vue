<script lang="ts" setup>

// Servicios
// import { checkExistsUser } from "@/services/user/userService";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import BaseFormInput from "@/components/Forms/BaseFormInput.vue";

// Store
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

defineProps({
  title: {
    type: String,
    default: "Restablecer contraseña",
  },
});

const userToken = JSON.parse(localStorage.getItem("token")|| '{}').token;

/**
 * Manejador del evento submit del formulario.
 */
const handleResetPassword = (e : Event) => {
  e.preventDefault();
  console.log("handlee....");
};

const enablePasswordFields = (e : Event) => {
  e.preventDefault();
};
</script>

<template>
  <div class="login-form">
    <h1>{{ title }}</h1>
    <form id="form-login">
      <!-- Email -->
      <div v-if="!userToken" class="form-group__current-password">
        <label for="email-reset">Correo electrónico</label>
        <BaseFormInput
          inputType="email"
          inputStyleClass="base-input"
          @handleInput="(value) => (userStore.email = value || '')"
        />
      </div>

      <div v-if="userToken" class="form-group__current-password">
        <label for="old-password">Contraseña actual</label>
        <BaseFormInput
          inputType="password"
          inputStyleClass="base-input"
          @handleInput="(value) => (userStore.password = value || '')"
        />
      </div>
      <div v-if="userToken" class="form-group__new-password">
        <label for="new-password">Nueva contraseña</label>
        <BaseFormInput
          inputType="password"
          inputStyleClass="base-input"
          @handleInput="(value) => (userStore.newPassword = value || '')"
        />
      </div>
      <div v-if="userToken" class="form-group__new-password-repeated">
        <label for="new-password-repeated">Repetir contraseña</label>
        <BaseFormInput
          inputType="password"
          inputStyleClass="base-input"
          @handleInput="(value) => (userStore.repeatedPassword = value)"
        />
      </div>
      <BaseButton
        v-if="!userToken"
        text="Comprobar"
        buttonStyle="baseButton-primary--filled"
        @click="enablePasswordFields"
      />
      <BaseButton
        v-else
        text="Restablecer"
        buttonStyle="baseButton-primary--filled"
        @click="handleResetPassword"
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