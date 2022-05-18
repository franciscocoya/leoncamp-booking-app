<script setup>
import { useRouter } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";

// Store
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const authStore = useAuthStore();
</script>

<template>
  <div class="account-security-privacy-view">
    <h1>Seguridad y privacidad</h1>
    <div class="account-security-privacy__wrapper">
      <article class="account-security-privacy__resetPassword">
        <h2>Inicio de sesión y seguridad</h2>
        <p>Restablecer contraseña</p>
        <BaseButton
          text="Restablecer"
          buttonStyle="baseButton-dark--outlined"
          @click="
            router.push({
              name: 'reset-password',
              params: {
                username: `${authStore?.name}-${authStore?.surname}`,
              },
            })
          "
        />
      </article>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.account-security-privacy-view {
  @include flex-column;
  gap: 10px;

  & > .account-security-privacy__wrapper {
    @include flex-column;
    gap: 30px;

    & > article {
      @include flex-column-center;
      gap: 10px;
      background-color: $color-tertiary-light;
      padding: 20px;
      border-radius: $global-border-radius;
      border: 1px solid $color-tertiary-dark;
      box-shadow: $global-box-shadow;

      & > h2,
      & > p {
        color: $color-dark;
      }
    }
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .account-security-privacy-view {
    & > h1 {
      font-weight: 400;
      text-align: center;
    }

    & > .account-security-privacy__wrapper {
      margin: 0 30px;
    }
  }
}
</style>