<script setup>
import Chart from 'chart.js'

const props = defineProps({
    data: {
        type: Object,
        default: () => {},
    },
    labels: {
        type: Array,
        default: () => [],
    }
});

const ctx = document.getElementById('doughnut-chart');
const exampleChart = new Chart(ctx, {
  type: '',
  data: [],
  options: {},
});


</script>

<template>
    <div class="doughnut-chart">
        <canvas id="doughnut-data-chart"></canvas>
    </div>
</template>