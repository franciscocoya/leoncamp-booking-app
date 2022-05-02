<script setup>
import { onMounted, ref } from "vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

// Servicios
import { getLatestAccomodationReviewsByRegisterNumber } from "@/services/accomodation/AccomodationService";

// Componentes
import SingleAccomodationReviewItem from "@/components/Accomodation/AccomodationReview/SingleAccomodationReviewItem.vue";

const props = defineProps({
  registerNumber: {
    type: String,
    default: "",
  },
});

const reviews = ref([]);

onMounted(async () => {
  reviews.value = await getLatestAccomodationReviewsByRegisterNumber(
    props.registerNumber
  );
});
</script>

<template>
  <div class="accomodation-reviews-container">
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.5516 2.90848C11.735 2.53686 12.265 2.53686 12.4484 2.90848L14.8226 7.71918C14.8954 7.86676 15.0362 7.96904 15.1991 7.9927L20.508 8.76414C20.9181 8.82373 21.0818 9.32772 20.7851 9.61698L16.9435 13.3616C16.8257 13.4765 16.7719 13.642 16.7997 13.8042L17.7066 19.0916C17.7766 19.5001 17.3479 19.8116 16.9811 19.6187L12.2327 17.1223C12.087 17.0457 11.913 17.0457 11.7673 17.1223L7.01888 19.6187C6.65207 19.8116 6.22335 19.5001 6.29341 19.0916L7.20028 13.8042C7.2281 13.642 7.17433 13.4765 7.05648 13.3616L3.21491 9.61698C2.91815 9.32772 3.08191 8.82373 3.49202 8.76414L8.80094 7.9927C8.9638 7.96904 9.10458 7.86676 9.17741 7.71918L11.5516 2.90848Z"
          fill="#F5562A"
          stroke="#F5562A"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      <span>{{ accomodationStore.stars }}</span>
    </div>
    <h2>Valoraciones ({{ reviews.length }})</h2>
    <ul>
      <li v-for="(review, index) in reviews" :key="index">
        <SingleAccomodationReviewItem :review="review" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
</style>