<script setup>
import { onMounted  } from "vue";
import mapboxgl from "mapbox-gl";

// Iconos
import { ICON_MAP_MARKER_TENTH } from "@/helpers/iconConstants";

// Componentes
// import BaseMarker from "@/components/Maps/Marker/BaseMarker.vue";

const props = defineProps({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
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

onMounted(() => {
  const map = new mapboxgl.Map({
    accessToken: import.meta.env.VITE_MAPBOX_API_TOKEN,
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    // starting position [lng, lat]
    center: [
      props.lng,
      props.lat,
    ],
    minzoom: 1.3,
    zoom: 14, // starting zoom
  });

  // Marcador
  const myMark = document.createElement("div");
  myMark.style.backgroundImage = `url(${ICON_MAP_MARKER_TENTH})`;
  myMark.style.backgroundRepeat = "no-repeat";
  myMark.style.backgroundPosition = "center center";
  myMark.style.backgroundColor = "rgba(245, 86, 42, 0.5)";
  myMark.style.borderRadius = "50%";
  myMark.style.padding = "8px";
  myMark.style.width = "50px";
  myMark.style.height = "50px";

  new mapboxgl.Marker(myMark)
    .setLngLat([
      props.lng,
      props.lat,
    ])
    .addTo(map);
});
</script>

<template>
  <div>
    <div id="map" :style="`width: ${mapWidth}; height: ${mapHeight}`" v-once></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
#map {
  width: 100%;
  height: 450px;
  border-radius: $global-border-radius;
}
</style>