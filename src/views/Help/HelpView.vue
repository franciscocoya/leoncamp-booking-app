<script setup>
// Componentes
import BaseCard from "@/components/Card/BaseCardItem.vue";
</script>

<template>
  <div class="help-view">
    <div class="help-view-wrapper">
      <h1>Ayuda</h1>
      <div class="help-options">
        <!-- Pricing -->
        <BaseCard
          title="Planes y precios"
          buttonText="Ver planes"
          description="Actualiza al plan de Host para comenzar a subir anuncios de tus alojamientos."
        />

        <!-- FAQ -->
        <BaseCard
          title="FAQ"
          buttonText="Más información"
          description="Cómo publicar anuncios, pasos a seguir para reservar un alojamiento y más. "
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";


.help-view-wrapper{
    margin: 50px;

    & > .help-options{
    @include flex-row-center;
    gap: 30px;
}
}

</style>