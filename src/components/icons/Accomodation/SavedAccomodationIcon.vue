<script setup>
import { onBeforeMount, onMounted, ref } from "vue";

// Service
import {
  saveAccomodation,
  removeSavedAccomodation,
  getSavedAccomodation,
} from "@/services/accomodation/AccomodationService";

import { useAuthStore } from "@/store/auth";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  iconWidth: {
    type: Number,
    default: 30,
  },
  iconHeight: {
    type: Number,
    default: 30,
  },
  iconColor: {
    type: String,
    default: "#F5562A",
  },
  regNumber: {
    type: String,
    default: "",
  },
});

const authStore = useAuthStore();

let isIconActive = ref(false);

/**
 * Al hacer click se cambia el estado isActive y se añade el alojamiento
 * a la lista de alojamientos guardados del usuario.
 */
const handleClick = async () => {
  isIconActive.value
    ? await removeSavedAccomodation(props.regNumber, authStore.userData.id)
    : await saveAccomodation(props.regNumber, authStore.userData.id);

  isIconActive.value = !isIconActive.value;
};

onMounted(async () => {
  const savedAccomodation = await getSavedAccomodation(
    props.regNumber,
    authStore.userData.id
  );

  if (savedAccomodation) {
    isIconActive.value = true;
  }
});
</script>

<template>
  <div>
    <svg
      :width="iconWidth"
      :height="iconHeight"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="icon-save-accomodation"
      @click.prevent="handleClick"
    >
      <title v-once>Alojamiento guardado</title>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="Bookmark">
          <rect
            id="Rectangle"
            fill-rule="nonzero"
            x="0"
            y="0"
            width="24"
            height="24"
          ></rect>
          <path
            d="M17,4 L7,4 C5.89543,4 5,4.89543 5,6 L5,18.7929 C5,19.2383 5.53857,19.4614 5.85355,19.1464 L11.6464,13.3536 C11.8417,13.1583 12.1583,13.1583 12.3536,13.3536 L18.1464,19.1464 C18.4614,19.4614 19,19.2383 19,18.7929 L19,6 C19,4.89543 18.1046,4 17,4 Z"
            id="Path"
            :stroke="iconColor"
            stroke-width="2"
            stroke-linecap="round"
            :fill="isIconActive == true ? iconColor : 'none'"
          ></path>
        </g>
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.icon-save-accomodation {
  cursor: pointer;
}
</style>