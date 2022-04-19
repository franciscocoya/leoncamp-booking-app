<script>
export default {
  name: "IconButton",
  props: {
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
  },
  setup(props) {},
};
</script>

<template>
  <div>
    <button :class="buttonStyle">
        <!-- {{iconDirection === 'left' && <img src='buttonIcon' alt=""/>}} -->
        <img :src="buttonIcon" alt="">
        {{text}}
    </button>
  </div>
</template>

<style lang="scss" scoped>

img{
    width: 24px;
}
</style>