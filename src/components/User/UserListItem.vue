<script setup>
import {useRouter} from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";

// Servicios
import { removeUserById } from "@/services/user/userService";

// Utils
import { formatArrayAsDate } from "@/helpers/utils";

import { IMG_PROFILE_PLACEHOLDER } from "@/helpers/iconConstants";

const router = useRouter();

/**
 * Manejador click mostrar alojamiento.
 */
const handleShowUser = (userId) => {
  router.push({
    name: "user-profile-public",
    params: {
      userId,
    },
  });
};

/**
 * Manejador click eliminar alojamiento.
 */
const handleRemoveUser = async (userId) => {
  const opt = window.confirm("¿Estás seguro de eliminar este usuario?");

  if (!opt) {
    return;
  }

  await removeUserById(userId);
};

defineProps({
  users: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="user-list-item">
    <ul>
      <li v-for="(user, index) in users" :key="index">
        <img :src="user?.profileImage ?? IMG_PROFILE_PLACEHOLDER" alt="" />
        <span>{{ formatArrayAsDate(user.createdAt) }}</span>
        <span>{{ user.name }} {{ user.surname }}</span>
        <span>{{ user.dni ? "HOST" : "BASE" }}</span>
        <BaseButton
          text="Ver"
          buttonStyle="baseButton-dark--filled--small"
          @click="handleShowUser(user.id)"
        />
        <BaseButton
          text="Eliminar"
          buttonStyle="baseButton-danger--filled--small "
          @click="handleRemoveUser(user.id)"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.user-list-item {
  & > ul {
    @include flex-column;
    gap: 20px;
    list-style: none;
    padding-left: 0;

    & > li {
      @include flex-row;
      align-items: center;
      gap: 20px;

      & > img {
        width: 50px;
        height: auto;
        border-radius: $global-border-radius;
      }

      & > span {
        @include flex-column-center;
        gap: 10px;
        color: $color-dark;
      }
    }
  }
}
</style>