<script setup>
defineProps({
  msg: {
    type: String,
    default: "Iniciar sesión",
  },
  msgType: {
    type: String,
    default: "info",
  }
});
</script>

<template>
  <div :class="`base-message msg-${msgType}`">
    <p>{{ msg }}</p>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.base-message {
  border-radius: $global_border_radius;
  padding: 10px 20px;
  margin-bottom: 5px;

  & > p {
    font-size: 0.9rem;
    text-align: center;
    margin: 0;
     color: #fff;
  }
}

// Estilo mensaje de error
.msg-error {
  background-color: $color_danger;
  color: #fff;
}

// Estilo mensage de información
.msg-info {
  background-color: $color_tertiary_light;
  color: $color-dark;
}
</style>