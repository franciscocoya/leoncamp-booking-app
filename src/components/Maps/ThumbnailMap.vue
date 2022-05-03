<script setup>
import { onMounted } from "vue";
import mapboxgl from "mapbox-gl";

const props = defineProps({
  lat: {
    type: Number,
    default: 0,
  },
  lng: {
    type: Number,
    default: 0,
  },
  mapWidth: {
    type: Number,
    default: 600,
  },
  mapHeight: {
    type: Number,
    default: 400,
  },
});

// Componentes

onMounted(() => {
  const map = new mapboxgl.Map({
    accessToken: import.meta.env.VITE_MAPBOX_API_TOKEN,
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [props.lng, props.lat], // starting position [lng, lat]
    minzoom: 1.3,
    zoom: 14, // starting zoom
  }).addControl(new mapboxgl.NavigationControl(), "top-right");

  //const myMark = document.createElement("div");

  new mapboxgl.Marker().setLngLat([props.lng, props.lat]).addTo(map);
});
</script>

<template>
  <div id="map"></div>
</template>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>