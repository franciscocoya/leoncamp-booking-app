<script setup>
import { onMounted, ref } from "vue";

// Componentes
import BookingSummaryItem from "@/components/Booking/BookingSummaryItem.vue";

// Gifs
import { GIF_CAMPFIRE } from "@/helpers/iconConstants";

// Store
import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

const bookings = ref([]);

onMounted(async () => {
  bookings.value = await accomodationStore.getAllUserBookings();
});
</script>

<template>
  <div class="user-bookings-view">
    <h1 v-once v-t="'bookings_view.title'"></h1>
    <div class="user-bookings-container" v-if="bookings.length > 0">
      <BookingSummaryItem
        v-for="booking in bookings"
        :key="booking.registerNumber"
        :bookingId="booking.id"
        :checkIn="booking.checkIn"
        :checkOut="booking.checkOut"
        :totalPrice="booking.total"
        :bookingStatus="booking.bookingStatus"
        :paymentType="booking.idPayment"
      />
    </div>
    <div v-else class="not-booking-now">
      <h2 v-once class="not-booking-now__title" v-t="'bookings_view.not_bookings'">
      </h2>
      <img :src="GIF_CAMPFIRE" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.user-bookings-view {
  @include flex-column;
  gap: 20px;

  & > h1 {
    font-size: 2rem;
    font-weight: 400;
    margin: 0;
  }
}

.not-booking-now {
  @include flex-column-center;
  & > .not-booking-now__title {
    text-align: center;
    font-size: 2rem;
    font-weight: 400;
  }

  & > img {
    width: 400px;
    height: auto;
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .user-bookings-view {
    margin-top: 0;
    gap: 10px;

    & > h1 {
      text-align: center;
    }
  }
}
</style>