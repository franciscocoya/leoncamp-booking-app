<script setup>
import { onMounted } from "vue";
import { DatePicker } from "v-calendar";

defineProps({
  attrs: [
    {
      key: "today",
      highlight: {
        color: "purple",
        fillMode: "solid",
        contentClass: "italic",
      },
      dates: new Date(2022, 4, 12),
    },
    {
      highlight: {
        color: "purple",
        fillMode: "light",
      },
      dates: new Date(2022, 4, 13),
    },
    {
      highlight: {
        color: "purple",
        fillMode: "outline",
      },
      dates: new Date(2022, 4, 14),
    },
  ],
});
</script>

<template>
  <h1>Hello</h1>
  <DatePicker
    :model="range"
    is-range
    :columns="$screens({ default: 1, lg: 2 })"
    :attributes="attrs"
  />
</template>

<style scoped>
</style>