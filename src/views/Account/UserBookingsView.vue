<script setup>
import { onMounted, ref } from "vue";

// Componentes
import BookingSummaryItem from "@/components/Booking/BookingSummaryItem.vue";

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
    <h1 v-once>Mis Reservas</h1>
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
    <h2 v-else v-once>Aún no has realizado ninguna reserva</h2>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.user-bookings-view {
  @include flex-column;
  gap: 20px;

  & > h1{
    font-size: 2rem;
    font-weight: 400;
    margin: 0;
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .user-bookings-view {
    margin-top: 0;
    gap: 10px;

    & > h1{
      text-align: center;
    }
  }
}
</style>