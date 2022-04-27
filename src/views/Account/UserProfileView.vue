<script setup>
import { useUserStore } from "@/store/user";
import { onMounted } from "@vue/runtime-core";

// Componentes
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseFormTextArea from "@/components/Forms/BaseFormTextArea.vue";

// Store
const userStore = useUserStore();

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
              type="text"
              inputLabel="Nombre"
              :isReadonly="true"
              :inputValue="userStore.name"
            />

            <!-- Apellidos -->
            <LabelFormInput
              type="text"
              inputLabel="Apellidos"
              :isReadonly="true"
              :inputValue="userStore.surname"
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
            />

            <!-- Email -->
            <LabelFormInput
              type="text"
              inputLabel="Correo electrónico"
              :isReadonly="true"
              :inputValue="userStore.email"
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
              />
              <BaseFormTextArea
                :textAreaContent="userStore.datosHost.bio"
                inputLabel="Biografía"
              />
            </div>
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
  @include flex-row;
  margin-left: 30px;
}

form {
  @include flex-column;
  gap: 20px;

  & > .user-profile-data__fullname,
  & > .user-profile-data__contact {
    @include flex-row;
    gap: 20px;
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
}
</style>