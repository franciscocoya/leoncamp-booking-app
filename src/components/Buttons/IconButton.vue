<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  buttonStyle: {
    type: String,
    required: true,
  },
  buttonIcon: {
    type: String,
    required: true,
  },
  iconDirection: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div>
    <button :class="buttonStyle">
      <!-- {{iconDirection === 'left' && <img src='buttonIcon' alt=""/>}} -->
      <img :src="buttonIcon" alt="" />
      {{ text }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 24px;
}
</style>