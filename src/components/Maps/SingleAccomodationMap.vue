<script setup>
import { onMounted } from "vue";

import mapboxgl from "mapbox-gl";

// import BaseMarker from "@/components/Maps/Marker/BaseMarker.vue";

import { ICON_MAP_MARKER_TENTH } from "@/helpers/iconConstants";

const props = defineProps({
  lat: {
    type: Number,
    default: 42.60613038790926,
  },
  lng: {
    type: Number,
    default: -5.579879833258864,
  },
  mapWidth: {
    type: String,
    default: "100%",
  },
  mapHeight: {
    type: String,
    default: "90vh",
  },
  mapZoom: {
    type: Number,
    default: 14,
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
    zoom: props.mapZoom, // starting zoom
  }).addControl(new mapboxgl.NavigationControl(), "top-right");

  const myMark = document.createElement("div");
  myMark.style.backgroundImage = `url(${ICON_MAP_MARKER_TENTH})`;
  myMark.style.backgroundRepeat = "no-repeat";
  myMark.style.backgroundPosition = "center center";
  myMark.style.backgroundColor = "rgba(245, 86, 42, 0.5)";
  myMark.style.borderRadius = "50%";
  myMark.style.padding = "8px";
  myMark.style.width = "80px";
  myMark.style.height = "80px";

  new mapboxgl.Marker(myMark).setLngLat([props.lng, props.lat]).addTo(map);
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