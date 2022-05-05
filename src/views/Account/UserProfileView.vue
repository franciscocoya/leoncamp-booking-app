<script setup>
import { useUserStore } from "@/store/user";
import { onMounted, onUnmounted, onUpdated, ref } from "@vue/runtime-core";

// Componentes
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseFormTextArea from "@/components/Forms/BaseFormTextArea.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";

// Store
const userStore = useUserStore();

const enableEditButton = ref(false);

// Actualizar datos de la store.
// userStore.loadUserData();

const updateFieldValue = (callback, value) => {
  callback();
  enableEditButton.value = true;
};

onMounted(() => {
  userStore.loadUserData();
});
</script>

<template>
  <div class="user-profile-view">
    <main>
      <h1>Información personal</h1>
      <div class="user-profile-view__wrapper">
        <form>
          <!-- Sección nombre y apellidos -->
          <p>Nombre legal</p>
          <div class="user-profile-data__fullname">
            <!-- Nombre -->
            <LabelFormInput
              ref="name"
              type="text"
              inputLabel="Nombre"
              :isReadonly="true"
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
              :isReadonly="true"
              :inputValue="userStore.surname"
              @handleInput="
                (value) =>
                  updateFieldValue(() => (userStore.surname = value), value)
              "
            />
          </div>

          <p>Datos de contacto</p>
          <!-- Sección teléfono e email -->
          <div class="user-profile-data__contact">
            <!-- Teléfono -->
            <LabelFormInput
              type="text"
              inputLabel="Teléfono"
              :isReadonly="true"
              :inputValue="userStore.phone"
              @handleInput="
                (value) => updateFieldValue(() => (userStore.phone = value))
              "
            />

            <!-- Email -->
            <LabelFormInput
              type="text"
              inputLabel="Correo electrónico"
              :isReadonly="true"
              :inputValue="userStore.email"
              @handleInput="
                (value) => updateFieldValue(() => (userStore.email = value))
              "
            />
          </div>

          <!-- Sección datos del usuario host -->
          <div v-if="userStore.datosHost" class="user-profile-data__host-data">
            <h2>Datos del host</h2>
            <div class="user-profile-data__host-data__wrapper">
              <LabelFormInput
                type="text"
                inputLabel="DNI"
                :isReadonly="true"
                :inputValue="userStore.datosHost.dni"
                @handleInput="
                  (value) =>
                    updateFieldValue(() => (userStore.datosHost.dni = value))
                "
              />
              <BaseFormTextArea
                :textAreaContent="userStore.datosHost.bio"
                inputLabel="Biografía"
                @handleInput="
                  (value) =>
                    updateFieldValue(() => (userStore.datosHost.bio = value))
                "
              />
            </div>
          </div>
          <BaseButton
            :text="`${enableEditButton == true ? 'Actualizar' : 'Editar'}`"
            buttonStyle="baseButton-danger--filled"
            class="btEditar-perfil-usuario"
            :isDisabled="!enableEditButton"
            @click="handleEditUserProfile"
          />
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
}

form {
  @include flex-column;
  gap: 20px;

  & > .user-profile-data__fullname,
  & > .user-profile-data__contact {
    @include flex-row;
    gap: 20px;
    flex-wrap: wrap;
  }

  // Estilos sección datos del usuario host
  & > .user-profile-data__host-data {
    @include flex-column;
    gap: 20px;

    & > .user-profile-data__host-data__wrapper {
      @include flex-column;
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
  .account-view {
    @include flex-column;
  }

  .user-profile-data__host-data__wrapper{
   margin: 0 auto;
   padding: 10px;
  }

  .btEditar-perfil-usuario{
    align-self: center;
  }
}

</style>