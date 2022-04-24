<script setup>
import { onMounted } from "vue";

import mapboxgl from "mapbox-gl";

import BaseMarker from "@/components/Maps/Marker/BaseMarker.vue";

// Componentes

onMounted(() => {
  const map = new mapboxgl.Map({
    accessToken: import.meta.env.VITE_MAPBOX_API_TOKEN,
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [-5.579879833258864, 42.60613038790926], // starting position [lng, lat]
    minzoom: 1.3,
    zoom: 14, // starting zoom
  }).addControl(new mapboxgl.NavigationControl(), "top-right");

  const myMark = document.createElement("div");
  myMark.innerHTML = BaseMarker.outherHTML;

  new mapboxgl.Marker(myMark)
    .setLngLat([-5.579879833258864, 42.60613038790926])
    .addTo(map);
});
</script>

<template>
  <div id="map"></div>
</template>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
  position: sticky;
}

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