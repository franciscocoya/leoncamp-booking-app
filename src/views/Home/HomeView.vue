<script setup>
import { onMounted, ref } from "vue";
import { DatePicker } from "v-calendar";

const selectedDates = {
  checkIn: new Date(),
  checkOut: null,
};

const datePicker = ref(null);

const handleChange = () => {
  console.log(datePicker);
};
</script>

<template :slot="{inputValue}">
  <h1>Hello</h1>
  <DatePicker
    ref="datePicker"
    :model="range"
    :from-page="new Date()"
    :value="selectedDates"
    is-range
    :columns="$screens({ default: 1, lg: 2 })"
    color="gray"
    :min-date="new Date()"
    transition="slide-h"
  />
</template>

<style scoped>
</style>