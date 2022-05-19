<script setup>
// Componentes
import BaseCard from "@/components/Card/BaseCardItem.vue";
</script>

<template>
  <div class="help-view">
    <div class="help-view-wrapper">
      <h1 v-once v-t="$t('account_view.help_view.title')"></h1>
      <div class="help-options">
        <!-- Pricing -->
        <!-- <BaseCard
          v-once
          title="Planes y precios"
          buttonText="Ver planes"
          description="Actualiza al plan de Host para comenzar a subir anuncios de tus alojamientos."
        /> -->

        <!-- FAQ -->
        <BaseCard
          v-once
          :title="$t('account_view.help_view.faq.title')"
          :buttonText="$t('components.buttons.info')"
          :description="$t('account_view.help_view.faq.subtitle')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.help-view-wrapper {
  margin: 50px;

  & > .help-options {
    @include flex-row-center;
    gap: 30px;
  }
}
// -------------------------------------------------
// -- Responsive design
// -------------------------------------------------
@media screen and (max-width: $breakpoint-sm) {
  .help-view-wrapper {
    margin: 30px;
    text-align: center;

    & > h1{
      font-weight: 400;
    }
  }
}
</style>