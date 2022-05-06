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
      />
    </div>
    <h2 v-else v-once>Aún no has realizado ninguna reserva</h2>
  </div>
</template>

<style lang="scss" scoped>
</style>