<script setup>
defineProps({
  text: {
    type: String,
    default: "",
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
  },
});

const emit = defineEmits(["click"]);

function handleClick() {
  emit("click");
}
</script>

<template>
  <div>
    <button
      :class="buttonStyle"
      @click.prevent="handleClick"
      :style="`${buttonWidth ? `width: ${buttonWidth}` : ''};`"
      :id="buttonId && buttonId"
      :disabled="isDisabled"
      :title="title"
    >
      <img :src="buttonIcon" alt="" />
      {{ test && text }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 24px;
}
</style>