<script>
export default {
  name: "AccountIcon",
  props: {
    profileImage: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  setup(props) {},
};
</script>

<template>
  <img :src="profileImage" :alt="username" />
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

img {
  @include flex-column-center;
  border-radius: 25px;
}


</style>