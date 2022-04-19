<script>
export default {
  name: "BaseButton",
  props: {
    text: {
      type: String,
      required: true,
    },
    buttonStyle: {
      type: String,
      required: true,
    },
  },
  setup(props) {},
};
</script>

<template>
  <div>
    <button :class="buttonStyle">{{ text }}</button>
  </div>
</template>

<style lang="scss" scoped>
</style>