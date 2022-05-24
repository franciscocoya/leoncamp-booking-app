<script setup>
import { onMounted } from "vue";

import mapboxgl from "mapbox-gl";

import { useBookingStore } from "@/store/booking";

import { ICON_MAP_MARKER_TENTH } from "@/helpers/iconConstants";

const bookingStore = useBookingStore();

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

onMounted(() => {
  const map = new mapboxgl.Map({
    accessToken: import.meta.env.VITE_MAPBOX_API_TOKEN,
    container: "map-2", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [props.lng, props.lat], // starting position [lng, lat]
    minzoom: 1.3,
    zoom: props.mapZoom, // starting zoom
  });

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
  <div>
    <div id="map-2" :style="`width: ${mapWidth}; height: ${mapHeight};`"></div>
  </div>
</template>