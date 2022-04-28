<script setup>
import { useRouter } from "vue-router";

import { IMG_PROFILE_PLACEHOLDER } from "@/helpers/iconConstants";

// Store
import { useUserStore } from "@/store/user";
const userStore = useUserStore();

const router = useRouter();

defineProps({
  profileImage: {
    type: String,
    default: IMG_PROFILE_PLACEHOLDER,
  },
  username: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 24,
  },
  height: {
    type: Number,
    default: 24,
  },
  // Indica si la imagen de perfil tendrá un enlace a la página de perfil.
  isLinked: {
    type: Boolean,
    default: false,
  },
});

const redirectToUserProfile = () => {
  const { name, surname } = userStore;
  router.push(
    `/account/${name.toLowerCase()}-${surname.toLowerCase()}/profile`
  );
};
</script>

<template>
  <img
    :src="profileImage"
    :alt="username"
    :width="width"
    :height="height"
    @click.prevent="isLinked ? redirectToUserProfile() : 'null'"
    :style="isLinked ? 'cursor: pointer' : ''"
  />
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

img {
  @include flex-column-center;
  border-radius: 100px;
}
</style>