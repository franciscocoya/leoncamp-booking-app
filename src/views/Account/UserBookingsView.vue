<script lang="ts" setup>
import { onMounted, ref } from "vue";

// Componentes
import BookingSummaryItem from "@/components/Booking/BookingSummaryItem.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

let bookings: any = ref([]);

onMounted(async () => {
  bookings.value = await accomodationStore.getAllUserBookings();
});
</script>

<template>
  <div class="user-bookings-view">
    <h1>Mis Reservas</h1>
    <div class="user-bookings-container" v-if="bookings.length > 0">
      <BookingSummaryItem
        v-for="booking in bookings"
        :key="booking.registerNumber"
      />
    </div>
    <h2 v-else>Aún no has realizado ninguna reserva</h2>
  </div>
</template>

<style lang="scss" scoped>
</style>