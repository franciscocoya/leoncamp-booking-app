<script setup>
import SingleAccomodationMap from "@/components/Maps/SingleAccomodationMap.vue";

// Store
import { useBookingStore } from "@/store/booking";
const bookingStore = useBookingStore();
</script>

<template>
  <div class="booking-detail-view">
    <div class="booking-detail__data"></div>
    <div class="booking-detail_map">
      <SingleAccomodationMap />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>