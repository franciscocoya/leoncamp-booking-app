<script setup>
</script>

<template>
  <footer>
    <p>
      {{ $t('footer.copyright') }}
    </p>
  </footer>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

footer {
  height: 100px;
  padding: 30px;
  text-align: center;
  background-color: $color-tertiary-light;
  color: $color-dark;
}
</style>