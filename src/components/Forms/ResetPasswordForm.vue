<script setup>
import { onMounted, ref } from "vue";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseMessageItem from "@/components/Forms/Messages/BaseMessageItem.vue";

import { checkExistsUser, getUserIdByEmail } from "@/services/user/userService";

// Store
import { useAuthStore } from "@/store/auth";
import { useAppContextStore } from "@/store/appContext";

const authStore = useAuthStore();
const appContextStore = useAppContextStore();

let isResetButtonEnabled = ref(false);
let showErrorMessages = ref(false);
let showSuccessMessage = ref(false);

defineProps({
  title: {
    type: String,
    default: "Restablecer contraseña",
  },
});

const updateUserId = async (value) => {
  const userEmail = await checkExistsUser(value);
  if (userEmail) {
    const userIdNotLoging = await getUserIdByEmail(value);

    if (!authStore?.userData) {
      authStore.userData = {
        id: userIdNotLoging,
      };
    }
  }
};

/**
 * Manejador del evento submit del formulario.
 */
const handleResetPassword = async () => {
  authStore.errors = [];

  await authStore.resetPasswordLoggedUser(authStore?.userData?.id);
  showErrorMessages.value = authStore.errors.length > 0;
  showSuccessMessage.value = authStore.errors.length == 0;

  if (showSuccessMessage.value) {
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 6000);
  }

  if (showErrorMessages.value) {
    setTimeout(() => {
      showErrorMessages.value = false;
    }, 6000);
  }
};

const enablePasswordFields = (callback) => {
  callback();

  isResetButtonEnabled.value =
    authStore.password !== "" &&
    authStore.newPassword !== "" &&
    authStore.repeatedPassword !== "" &&
    authStore.email !== "";
};

onMounted(() => {
  authStore.errors = [];
  authStore.password = "";
  authStore.newPassword = "";
  authStore.repeatedPassword = "";
  authStore.email = "";

  isResetButtonEnabled.value = false;
});
</script>

<template>
  <div class="login-form">
    <h1>{{ title }}</h1>
    <form id="form-login">
      <LabelFormInput
        v-if="!authStore?.userData?.id"
        inputType="email"
        :inputLabel="$t('components.forms.email')"
        inputStyleClass="base-input"
        :inputMaxCharacters="100"
        @handleInput="
          (value) =>
            enablePasswordFields(
              () => (authStore.email = value.replace(' ', ''))
            )
        "
        @handleBlur="(value) => updateUserId(value)"
      />
      <div class="form-group__current-password">
        <LabelFormInput
          inputType="password"
          :inputLabel="$t('components.forms.current_password')"
          inputStyleClass="base-input"
          :inputMaxCharacters="50"
          @handleInput="
            (value) =>
              enablePasswordFields(
                () => (authStore.password = value.replace(' ', ''))
              )
          "
        />
      </div>
      <div class="form-group__new-password">
        <LabelFormInput
          inputType="password"
          :inputLabel="$t('components.forms.new_password')"
          inputStyleClass="base-input"
          :inputMaxCharacters="50"
          @handleInput="
            (value) =>
              enablePasswordFields(
                () => (authStore.newPassword = value.replace(' ', ''))
              )
          "
        />
      </div>
      <div class="form-group__new-password-repeated">
        <LabelFormInput
          inputType="password"
          :inputLabel="$t('components.forms.confirm_new_password')"
          inputStyleClass="base-input"
          :inputMaxCharacters="50"
          @handleInput="
            (value) =>
              enablePasswordFields(
                () => (authStore.repeatedPassword = value.replace(' ', ''))
              )
          "
        />
      </div>
      <BaseButton
        :text="$t('components.buttons.reset')"
        buttonStyle="baseButton-primary--filled"
        :fullWidth="appContextStore.isMobile == true"
        :isDisabled="isResetButtonEnabled == false"
        @click="handleResetPassword"
      />
    </form>
    <Transition name="fade">
      <div v-if="showErrorMessages == true">
        <BaseMessageItem
          v-for="(msgError, index) in authStore.errors"
          :key="index"
          :msg="$t(msgError)"
          msgType="error"
        />
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="showSuccessMessage == true">
        <BaseMessageItem
          :msg="$t('components.forms.messages.password_updated.success')"
          msgType="success"
        />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.login-form {
  @include flex-column-center;

  & > h1 {
    color: $color-dark;
    font-size: $heading-2-fontSize;
    text-align: center;
  }
}

#form-login {
  @include flex-column;
  width: 350px;
  gap: 15px;
  padding: 20px;
  border-radius: $global-border-radius;
}

hr {
  width: 90%;
  border: 1px solid rgb(199, 199, 199);
}
</style>