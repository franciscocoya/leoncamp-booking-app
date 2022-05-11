<script setup>
import { onMounted } from "vue";
import mapboxgl from "mapbox-gl";

// Store
import { useAccomodationStore } from "@/store/accomodation";

// Iconos
import { ICON_MAP_MARKER_TENTH } from "@/helpers/iconConstants";

// Service
import {getAccomodationLocationByCoords} from '@/services/accomodation/AccomodationService';

const accomodationStore = useAccomodationStore();

// Componentes
// import BaseMarker from "@/components/Maps/Marker/BaseMarker.vue";

const props = defineProps({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  mapWidth: {
    type: String,
    default: "100%",
  },
  mapHeight: {
    type: String,
    default: "100%",
  },
  isMarkerDraggable: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  const map = new mapboxgl.Map({
    accessToken: import.meta.env.VITE_MAPBOX_API_TOKEN,
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    // starting position [lng, lat]
    center: [props.lng, props.lat],
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

  const marker = new mapboxgl.Marker(myMark, {
    draggable: props.isMarkerDraggable,
  })
    .setLngLat([props.lng, props.lat])
    .addTo(map);

  marker.on("dragend", onDragEnd);

  async function onDragEnd() {
    const lngLat = await marker.getLngLat();
    accomodationStore.accomodationLocation.coords.lat = lngLat.lat;
    accomodationStore.accomodationLocation.coords.lng = lngLat.lng;
    const resultLocation = await getAccomodationLocationByCoords({lat: lngLat.lat, lng: lngLat.lng});

    accomodationStore.accomodationLocation.direction = resultLocation.address;
    accomodationStore.accomodationLocation.city = resultLocation.city;
    accomodationStore.accomodationLocation.zip = resultLocation.cp;
  }
});
</script>

<template>
  <div class="map-container">
    <div id="map" :style="`width: ${mapWidth}; height: ${mapHeight}`"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.map-container {
  width: 100%;
  height: 100%;
}
#map {
  width: 100%;
  height: 100%;
  border-radius: $global-border-radius;
}
</style>