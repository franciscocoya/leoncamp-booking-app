<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Servicio
import { signUp } from "@/services/auth/AuthService";

// Store
import { useAuthStore } from "@/store/auth";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import BaseFormInput from "@/components/Forms/BaseFormInput.vue";
import BaseMessageItem from "@/components/Forms/Messages/BaseMessageItem.vue";

// Rutas
import { USER_SIGNIN_ROUTE } from "@/helpers/appRoutes";

// Store
const authStore = useAuthStore();

const router = useRouter();

defineProps({
  title: {
    type: String,
    default: "Crear una cuenta",
  },
});

const showErrors = ref(false);

/**
 * Manejador del evento submit del formulario.
 */
const handleRegister = async () => {
  authStore.errors = [];

  if (authStore.password !== authStore.repeatedPassword) {
    authStore.errors.push("Las contraseñas no coinciden");
    showErrors.value = true;

    setTimeout(() => {
      showErrors.value = false;
    }, 6000);
  } else {
    const data = await signUp(
      authStore.name,
      authStore.surname,
      authStore.email,
      authStore.password,
      authStore.repeatedPassword || "",
      (err) => {
        if (err.data?.errors.length > 0) {
          err.data.errors.forEach((msg) => {
            authStore.errors.push(msg.defaultMessage);
          });

          showErrors.value = true;

          setTimeout(() => {
            showErrors.value = false;
          }, 6000);
        }
      }
    );

    if (data) {
      router.push(USER_SIGNIN_ROUTE);
    }
  }
};
</script>

<template>
  <div class="register-form-container">
    <h1 v-t="'register_view.title'"></h1>
    <form id="form-register">
      <!-- Nombre -->
      <div class="form-group__fullname__name">
        <label for="nombre" v-t="'components.forms.name'"></label>
        <BaseFormInput
          inputType="nombre"
          inputStyleClass="base-input"
          ref="nombre"
          @handleInput="(value) => (authStore.name = value)"
        />
      </div>

      <!-- Apellidos -->
      <div class="form-group__fullname__surname">
        <label for="apellidos" v-t="'components.forms.surname'"></label>
        <BaseFormInput
          inputType="apellidos"
          inputStyleClass="base-input"
          ref="apellidos"
          @handleInput="(value) => (authStore.surname = value)"
        />
      </div>

      <!-- Email -->
      <div class="form-group__email">
        <label for="email" v-t="'components.forms.email'"></label>
        <BaseFormInput
          inputType="email"
          inputStyleClass="base-input"
          ref="email"
          @handleInput="(value) => (authStore.email = value)"
        />
      </div>
      <!-- Contraseña -->
      <div class="form-group__password">
        <label for="password" v-t="'components.forms.password'"></label>
        <BaseFormInput
          inputType="password"
          inputStyleClass="base-input"
          @handleInput="(value) => (authStore.password = value)"
        />
      </div>

      <!-- Repetir ontraseña -->
      <div class="form-group__password">
        <label
          for="repeatedPassword"
          v-t="'components.forms.password_confirmation'"
        ></label>
        <BaseFormInput
          inputType="password"
          inputStyleClass="base-input"
          @handleInput="(value) => (authStore.repeatedPassword = value)"
        />
      </div>

      <BaseButton
        :text="$t('register_view.button_register')"
        buttonStyle="baseButton-primary--filled"
        @click="handleRegister"
        :fullWidth="true"
      />

      <Transition name="fade">
        <div v-if="showErrors == true">
          <BaseMessageItem
            v-for="(errorMsg, index) in authStore.errors"
            :key="index"
            :msg="errorMsg"
            msgType="error"
          />
        </div>
      </Transition>

      <p v-t="'register_view.login_redirect'"></p>

      <BaseButton
        :text="$t('components.buttons.login')"
        buttonStyle="baseButton-secondary--outlined"
        @click="router.push(USER_SIGNIN_ROUTE)"
        :fullWidth="true"
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

  & > div {
    width: 100%;
  }
}

// ------------------------------------------------------------
// -- Responsive design
// ------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .register-form-container {
    height: auto;
  }
}
</style>