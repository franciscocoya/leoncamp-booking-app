<script setup>
import { onMounted, ref } from "@vue/runtime-core";

// Componentes
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseFormTextArea from "@/components/Forms/BaseFormTextArea.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";

import { useUserStore } from "@/store/user";
import { useAppContextStore } from "@/store/appContext";

// Store
const userStore = useUserStore();
const appContextStore = useAppContextStore();

const enableEditButton = ref(false);
const enableEditHostButton = ref(false);

// Actualizar datos de la store.
// userStore.loadUserData();

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
  await userStore.updateUserProfile();
};

const handleEditUserHostData = async () => {
  await userStore.updateUserHost();
};

onMounted(async () => {
  await userStore.loadUserData();
  enableEditButton.value = false;
});
</script>

<template>
  <div class="user-profile-view">
    <main>
      <h1 v-once>Información personal</h1>
      <div class="user-profile-view__wrapper">
        <form>
          <!-- Sección nombre y apellidos -->
          <p v-once>Nombre legal</p>
          <div class="user-profile-data__fullname">
            <!-- Nombre -->
            <LabelFormInput
              ref="name"
              type="text"
              inputLabel="Nombre"
              :isReadonly="false"
              :inputValue="userStore.name"
              @handleInput="
                (value) =>
                  updateFieldValue(() => (userStore.name = value), value)
              "
            />

            <!-- Apellidos -->
            <LabelFormInput
              type="text"
              inputLabel="Apellidos"
              :isReadonly="false"
              :inputValue="userStore.surname"
              @handleInput="
                (value) =>
                  updateFieldValue(() => (userStore.surname = value), value)
              "
            />
          </div>

          <p v-once>Datos de contacto</p>
          <!-- Sección teléfono e email -->
          <div class="user-profile-data__contact">
            <!-- Teléfono -->
            <LabelFormInput
              type="text"
              inputLabel="Teléfono"
              :isReadonly="false"
              :inputValue="userStore.phone"
              @handleInput="
                (value) => updateFieldValue(() => (userStore.phone = value))
              "
            />

            <!-- Email -->
            <LabelFormInput
              type="text"
              inputLabel="Correo electrónico"
              :isReadonly="false"
              :inputValue="userStore.email"
              @handleInput="
                (value) => updateFieldValue(() => (userStore.email = value))
              "
            />
          </div>
          <BaseButton
            :text="`${enableEditButton == true ? 'Actualizar' : 'Editar'}`"
            buttonStyle="baseButton-danger--filled"
            class="btEditar-perfil-usuario"
            :isDisabled="enableEditButton == false"
            :fullWidth="appContextStore.isMobile == true"
            @click="handleEditUserProfile"
          />

          <!-- Sección datos del usuario host -->
          <div v-if="userStore.datosHost" class="user-profile-data__host-data">
            <h2 v-once>Datos del host</h2>
            <div class="user-profile-data__host-data__wrapper">
              <LabelFormInput
                type="text"
                inputLabel="DNI"
                :isReadonly="false"
                :inputValue="userStore.datosHost.dni"
                @handleInput="
                  (value) =>
                    updateHostData(() => (userStore.datosHost.dni = value))
                "
              />
              <BaseFormTextArea
                :textAreaContent="userStore.datosHost.bio"
                inputLabel="Biografía"
                @handleInput="
                  (value) =>
                    updateHostData(() => (userStore.datosHost.bio = value))
                "
              />
            </div>
            <BaseButton
              :text="`${
                enableEditHostButton == true ? 'Actualizar' : 'Editar'
              }`"
              buttonStyle="baseButton-danger--filled"
              class="btEditar-perfil-usuario"
              :isDisabled="enableEditHostButton == false"
              :fullWidth="appContextStore.isMobile == true"
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