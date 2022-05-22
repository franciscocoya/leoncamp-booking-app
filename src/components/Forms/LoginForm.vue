<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import BaseFormInput from "@/components/Forms/BaseFormInput.vue";
import BaseMessageItem from "@/components/Forms/Messages/BaseMessageItem.vue";

// Store
import { useUserStore } from "@/store/user";
import { useAuthStore } from "@/store/auth";

// Routes
import { USER_SIGNUP_ROUTE } from "@/helpers/appRoutes";

// Validacion formularios
import { checkFieldNotBlank, checkValidEmail } from "@/helpers/formValidator";

const userStore = useUserStore();
const authStore = useAuthStore();

const router = useRouter();

defineProps({
  title: {
    type: String,
    default: "Iniciar sesión",
  },
});

/**
 * Realizar las comprobaciones del formulario
 */
const formCheck = () => {
  let isValid = true;
  // Comprobar que los campos no estén vacíos
  if (!checkFieldNotBlank(userStore.email)) {
    authStore.errors.push("components.forms.messages.email.required");
    isValid = false;
  }

  if (!checkFieldNotBlank(userStore.password)) {
    authStore.errors.push("components.forms.messages.password.required");
    isValid = false;
  }

  if (!checkValidEmail(userStore.email)) {
    authStore.errors.push("components.forms.messages.email.invalid");
    isValid = false;
  }

  return isValid;
};

const showErrors = ref(false);

/**
 * Manejador del evento submit del formulario.
 */
const handleLogin = async () => {
  authStore.errors = [];
  if (formCheck()) {
    const err = await userStore.login();
    if (err !== null) {
      authStore.errors.push("components.forms.messages.login.invalid");
    }
  }
  if (authStore.errors.length > 0) {
    showErrors.value = true;
    // Cerrar automáticamente los mensajes de error transcurridos 6 segundos.
    setTimeout(() => {
      showErrors.value = false;
      authStore.errors = [];
    }, 6000);
  }
};
</script>

<template>
  <div class="login-form-container">
    <h1 v-t="'login_view.title'"></h1>

    <form id="form-login">
      <div class="form-group__email">
        <label for="email" v-t="'components.forms.email'"></label>
        <BaseFormInput
          inputType="email"
          inputStyleClass="base-input"
          :inputValue="userStore.email"
          @handleInput="(value) => (userStore.email = value)"
        />
      </div>
      <div class="form-group__password">
        <label for="password" v-t="'components.forms.password'"></label>
        <BaseFormInput
          inputType="password"
          inputStyleClass="base-input"
          @handleInput="(value) => (userStore.password = value)"
        />
      </div>
      <Transition name="slide-fade">
        <div v-if="showErrors == true">
          <BaseMessageItem
            v-for="(err, index) in authStore.errors"
            :key="index"
            :msg="$t(err)"
            msgType="error"
            :autoClose="true"
          />
        </div>
      </Transition>
      <a href="/password/reset">He olvidado mi contraseña</a>
      <BaseButton
        :text="$t('login_view.button_login')"
        buttonStyle="baseButton-primary--filled"
        @click="handleLogin"
        :fullWidth="true"
        type="submit"
      />
      <BaseButton
        :text="$t('login_view.button_register')"
        buttonStyle="baseButton-secondary--outlined"
        @click="router.push(USER_SIGNUP_ROUTE)"
        :fullWidth="true"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.login-form-container {
  @include flex-column-center;

  & > h1 {
    font-weight: 400;
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

  & > div {
    width: 100%;
  }
}

hr {
  width: 90%;
  border: 1px solid rgb(199, 199, 199);
}

// ------------------------------------------------------------
// -- Responsive design
// ------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .login-form {
    height: auto;
  }
}
</style>