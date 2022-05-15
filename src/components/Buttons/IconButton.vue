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
  <div class="icon-button">
    <button
      :class="buttonStyle"
      @click.prevent="handleClick"
      :style="`${buttonWidth ? `width: ${buttonWidth}` : ''};`"
      :id="buttonId && buttonId"
      :disabled="isDisabled"
      :title="title"
    >
      <img :src="buttonIcon" alt="" />
      <p>
        {{ text }}
      </p>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.icon-button {
  & > button {
    @include flex-row-center;
    gap: 10px;

    & > p {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
}
img {
  width: 24px;
}
</style>