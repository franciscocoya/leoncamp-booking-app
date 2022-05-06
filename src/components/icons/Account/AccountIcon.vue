<script setup>
import { useRouter } from "vue-router";

import {
  IMG_PROFILE_PLACEHOLDER,
} from "@/helpers/iconConstants";

// Utils
import { convertImageToBase64 } from "@/helpers/utils";

// Servicios
import { uploadUserProfileImage } from "@/services/User/userService";

// Store
import { useUserStore } from "@/store/user";
const userStore = useUserStore();


const router = useRouter();

const props = defineProps({
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
  isUploading: {
    type: Boolean,
    default: false,
  },
  isOnMenuMobile: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["showMenu"]);

const showMenuMobile = () => {
  emit("showMenu");
};

const redirectToUserProfile = () => {
  const { name, surname } = userStore;
  if (props.isOnMenuMobile) {
    showMenuMobile();
  } else {
    router.push(
      `/account/${name.toLowerCase()}-${surname.toLowerCase()}/profile`
    );
  }
};

const handleUpdateImage = async (img) => {
  const imgEncoded = await convertImageToBase64(img);
  const newImg = await uploadUserProfileImage(userStore.id, imgEncoded);
  userStore.profileImage = decodeURI(newImg);
  window.location.reload();
};
</script>

<template>
  <div class="profile-image-container">
    <img
      :src="props.profileImage || IMG_PROFILE_PLACEHOLDER"
      :alt="props.username"
      :width="props.width"
      :height="props.height"
      :title="props.username"
      @click.prevent="props.isLinked == true || props.isOnMenuMobile == true
       ? redirectToUserProfile() : 'null'"
      :style="props.isLinked ? 'cursor: pointer' : ''"
    />

    <!-- Subir imagen para actualizar -->
    <form
      enctype="multipart/form-data"
      novalidate
      v-if="isUploading === true"
      class="uploadImage-container"
    >
      <img :src="ICON_UPLOAD_IMAGE" alt="" />
      <input
        v-once
        type="file"
        accept=".png, .jpg, .jpeg, .gif, .webp"
        @input="handleUpdateImage($event.target.files[0])"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.profile-image-container {
  @include flex-column-center;
  border-radius: 100px;
  position: relative;

  &:hover > img {
    opacity: 0.5;
    background: $color-tertiary-light;
  }

  &:hover > .uploadImage-container {
    display: flex;
  }
  & > img {
    border-radius: 100px;
    transition: 0.2s ease-in;
  }

  // Estilos contenedor de subida de la imagen de perfil
  & > .uploadImage-container {
    @include flex-column-center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: none;
    position: absolute;

    & > input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }
}
</style>