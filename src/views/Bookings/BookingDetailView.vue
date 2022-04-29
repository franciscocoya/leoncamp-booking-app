<script setup>
// import SingleAccomodationMap from "@/components/Maps/SingleAccomodationMap.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

// Store
import { useBookingStore } from "@/store/booking";
const bookingStore = useBookingStore();

const router = useRouter();

onMounted(async () => {
  const bookingId = router.currentRoute.value.params.bookingId;
  bookingStore.loadBookingDataById(bookingId);
});
</script>

<template>
  <div class="booking-detail-view">
    <div class="booking-detail__data">
      <h1>Reserva</h1>
    </div>
    <div class="booking-detail_map">
      <!-- <SingleAccomodationMap :lat="bookingStore.lat" :lng="bookingStore.lng" /> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.booking-detail-view {
  display: grid;
  grid-template-columns: auto 65%;
  height: 100vh;
}
</style>