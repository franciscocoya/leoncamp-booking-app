<script setup>
import { onBeforeMount, onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";

// Componentes
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseFormTextArea from "@/components/Forms/BaseFormTextArea.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";
import BaseMessageItem from "@/components/Forms/Messages/BaseMessageItem.vue";

import { useUserStore } from "@/store/user";
import { useAppContextStore } from "@/store/appContext";
import { useAuthStore } from "@/store/auth";

const router = useRouter();

// Store
const userStore = useUserStore();
const appContextStore = useAppContextStore();
const authStore = useAuthStore();

const enableEditButton = ref(false);
const enableEditHostButton = ref(false);

const adminEmail = import.meta.env.VITE_API_ADMIN_EMAIL;

let showSuccessMessage = ref(false);
let showSuccessHostMessage = ref(false);

const updateFieldValue = (callback) => {
  enableEditButton.value = true;
  callback();
};

const updateHostData = (callback) => {
  enableEditHostButton.value = true;
  callback();
};

/**
 * Manejador click botón editar. Edita los datos del usuario.
 */
const handleEditUserProfile = async () => {
  const updated = await authStore.updateUserProfile();
  if (!updated) {
    showSuccessMessage.value = true;

    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 3000);
  }
};

const handleEditUserHostData = async () => {
  const updated = await authStore.updateUserHost();
  if (!updated) {
    showSuccessHostMessage = true;

    setTimeout(() => {
      showSuccessHostMessage = false;
    }, 3000);
  }
};

const handleRedirectAccountUpgrade = () => {
  router.push({
    name: "account-upgrade",
    params: {
      username: `${authStore?.userData?.name}-${authStore?.userData?.surname}`,
    },
  });
};

onMounted(async () => {
  enableEditButton.value = false;
});

onBeforeMount(async () => {
  await authStore.loadCurrentUserData();
});
</script>

<template>
  <div class="user-profile-view">
    <main>
      <h1>{{$t('account_view.user_profile_view.title')}}</h1>
      <AccountIcon
        v-if="appContextStore.isMobile == true"
        width="120"
        height="120"
        :profileImage="`${
          userStore.profileImage == 'null'
            ? IMG_PROFILE_PLACEHOLDER
            : userStore.profileImage
        }`"
        :isUploading="true"
      />
      <BaseButton
        v-if="
          !authStore?.userData?.dni && authStore?.userData?.email !== adminEmail
        "
        :text="$t('account_view.user_profile_view.button_become_host')"
        buttonStyle="baseButton-primary--filled"
        class="btEditar-perfil-usuario"
        title="Comienza a publicar tus alojamientos con solo un click."
        @click="handleRedirectAccountUpgrade"
      />
      <div class="user-profile-view__wrapper">
        <form>
          <!-- Sección nombre y apellidos -->
          <p>{{$t('account_view.user_profile_view.legal_name')}}</p>
          <div class="user-profile-data__fullname">
            <!-- Nombre -->
            <LabelFormInput
              ref="name"
              type="text"
              :inputLabel="$t('components.forms.name')"
              :isReadonly="false"
              :inputValue="authStore?.userData?.name"
              @handleInput="
                (value) =>
                  updateFieldValue(
                    () => (authStore.userData.name = value),
                    value
                  )
              "
            />

            <!-- Apellidos -->
            <LabelFormInput
              type="text"
              :inputLabel="$t('components.forms.surname')"
              :isReadonly="false"
              :inputValue="authStore?.userData?.surname"
              @handleInput="
                (value) =>
                  updateFieldValue(
                    () => (authStore.userData.surname = value),
                    value
                  )
              "
            />
          </div>

          <p>{{$t('account_view.user_profile_view.contact_data')}}</p>
          <!-- Sección teléfono e email -->
          <div class="user-profile-data__contact">
            <!-- Teléfono -->
            <LabelFormInput
              type="text"
              :inputLabel="$t('components.forms.phone')"
              :isReadonly="false"
              :inputValue="authStore?.userData?.phone"
              @handleInput="
                (value) =>
                  updateFieldValue(() => (authStore.userData.phone = value))
              "
            />

            <!-- Email -->
            <LabelFormInput
              type="text"
              :inputLabel="$t('components.forms.email')"
              :isReadonly="false"
              :inputValue="authStore?.userData?.email"
              @handleInput="
                (value) =>
                  updateFieldValue(() => (authStore.userData.email = value))
              "
            />
          </div>
          <Transition name="fade">
            <div v-if="showSuccessMessage == true">
              <BaseMessageItem
                :msg="$t('components.forms.messages.user.update.success')"
                msgType="success"
              />
            </div>
          </Transition>
          <BaseButton
            :text="`${
              enableEditButton == true
                ? $t('components.buttons.update')
                : $t('components.buttons.edit')
            }`"
            buttonStyle="baseButton-danger--filled"
            class="btEditar-perfil-usuario"
            :isDisabled="enableEditButton == false"
            :fullWidth="appContextStore.isMobile == true"
            @click="handleEditUserProfile"
          />

          <!-- Sección datos del usuario host -->
          <div
            v-if="authStore.userData?.dni || authStore?.userData?.bio"
            class="user-profile-data__host-data"
          >
            <h2>{{$t('account_view.user_profile_view.host_data.title')}}</h2>
            <div class="user-profile-data__host-data__wrapper">
              <LabelFormInput
                type="text"
                :inputLabel="$t('components.forms.dni')"
                :isReadonly="false"
                :inputValue="authStore?.userData?.dni"
                @handleInput="
                  (value) =>
                    updateHostData(() => (authStore.userData.dni = value))
                "
              />
              <BaseFormTextArea
                :textAreaContent="authStore?.userData?.bio"
                :inputLabel="$t('components.forms.bio')"
                @handleInput="
                  (value) =>
                    updateHostData(() => (authStore.userData.bio = value))
                "
              />
            </div>
            <Transition name="fade">
              <div v-if="showSuccessHostMessage == true">
                <BaseMessageItem
                  :msg="$t('components.forms.messages.user.update.success')"
                  msgType="success"
                />
              </div>
            </Transition>
            <BaseButton
              :text="`${
                enableEditButton == true
                  ? $t('components.buttons.update')
                  : $t('components.buttons.edit')
              }`"
              buttonStyle="baseButton-danger--filled"
              class="btEditar-perfil-usuario"
              :isDisabled="enableEditHostButton == false"
              :fullWidth="appContextStore?.isMobile == true"
              @click="handleEditUserHostData"
            />
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.user-profile-view {
  @include flex-column;

  & > main {
    & > h1 {
      font-size: 2rem;
      font-weight: 400;
    }
  }
}

form {
  @include flex-column;
  gap: 20px;

  & > .user-profile-data__fullname,
  & > .user-profile-data__contact {
    @include flex-row;
    gap: 20px;
    flex-wrap: wrap;
    & > div {
      flex: 1;
    }
  }

  // Estilos sección datos del usuario host
  & > .user-profile-data__host-data {
    @include flex-column;
    gap: 20px;

    & > .user-profile-data__host-data__wrapper {
      @include flex-column;
      width: 100%;
      gap: 20px;
    }
  }

  & > .btEditar-perfil-usuario {
    margin-top: 20px;
    align-self: flex-start;
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .user-profile-view {
    margin-top: 0;

    & > main {
      & > h1 {
        text-align: center;
      }

      & > .btEditar-perfil-usuario {
        margin-top: 20px;
      }
    }
  }

  .account-view {
    margin-top: 0;
    @include flex-column;
  }

  .user-profile-data__host-data__wrapper {
    margin: 0;
  }

  .btEditar-perfil-usuario {
    width: 100%;
  }
}
</style>