<script setup>
// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  buttonText: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="card-container">
    <div class="card-container__wrapper">
      <h2>{{props.title}}</h2>
      <p>{{props.description}}</p>
      <BaseButton :text="props.buttonText" buttonStyle="baseButton-dark--outlined " />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.card-container {
  @include flex-column;
  gap: 20px;
  background-color: $color-tertiary-light;
  border-radius: $global-border-radius;
  padding: 20px;
  transition: box-shadow 0.3s ease-in;

  & > .card-container__wrapper{
    @include flex-column;
    gap: 10px;

    & > h2{
        color: $color-dark;
        font-weight: 600;
        text-align: center;
    }
  } // Fin estilos card-container__wrapper

  &:hover{
      border: 1px solid $color-tertiary-dark;
      box-shadow: $global-box-shadow;
  }
}
</style>