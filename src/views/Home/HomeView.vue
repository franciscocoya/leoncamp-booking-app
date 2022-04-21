<script setup>
import { onMounted } from "vue";
import { DatePicker } from "v-calendar";

const dates = {
  checkIn: Date,
  checkOut: Date,
};

const attrs = [
  {
    customData: {
      type: "date",
      format: "DD/MM/YYYY",
    },
  },
];

onMounted(() => {
  console.log(inputValue);
});
</script>

<template :slot="{inputValue}">
  <h1>Hello</h1>
  <DatePicker
    :model="range"
    is-range
    :columns="$screens({ default: 1, lg: 2 })"
    color="gray"
    :attributes="attrs"
  />
</template>

<style scoped>
</style>