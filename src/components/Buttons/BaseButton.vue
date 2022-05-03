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
  isDisabled: {
    type: Boolean,
    default: false,
  },
  buttonWidth: {
    type: String,
  },
  buttonId: {
    type: String,
  },
  title: {
    type: String,
  }
});

const emit = defineEmits(["click"]);

function handleClick() {
  emit("click");
}
</script>

<template>
  <div class="base-button-container">
    <button
      :class="buttonStyle"
      @click.prevent="handleClick"
      :style="`${buttonWidth ? `width: ${buttonWidth}` : ''}`"
      :id="buttonId && buttonId"
      :disabled="isDisabled"
      :title="title"
    >
      {{ text }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.base-button-container {
  @include flex-row-center;
  align-items: center;
}
</style>