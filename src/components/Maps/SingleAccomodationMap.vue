<script setup>
import { onMounted } from "vue";

import mapboxgl from "mapbox-gl";

// import BaseMarker from "@/components/Maps/Marker/BaseMarker.vue";

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
    type: String,
    default: "100%",
  },
  mapHeight: {
    type: String,
    default: "90vh",
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
  <div id="map" :style="`width: ${mapWidth}; height: ${mapHeight};`"></div>
</template>

<style lang="scss" scoped>
// #map {
//   position: sticky;
// }

.marker {
  background-color: #ff0000 !important;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  z-index: 1;
}
</style>