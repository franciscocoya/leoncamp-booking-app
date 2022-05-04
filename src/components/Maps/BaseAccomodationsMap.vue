<script setup>
import { onMounted } from "vue";

import { useRouter } from "vue-router";

import mapboxgl from "mapbox-gl";

const router = useRouter();

// Componentes
// import BaseMarker from "@/components/Maps/Marker/BaseMarker.vue";

const props = defineProps({
  markers: {
    type: Array,
    default: () => [],
  },
  selectedMarker: {
    type: String,
    default: "",
  },
});

onMounted(async () => {
  const map = await new mapboxgl.Map({
    accessToken: import.meta.env.VITE_MAPBOX_API_TOKEN,
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    // [-5.579879833258864, 42.60613038790926]
    // props.markers[0].coords.lng, props.markers[0].coords.lat
    center: [-5.579879833258864, 42.60613038790926],
    minzoom: 1.3,
    zoom: 14, // starting zoom
  }).addControl(new mapboxgl.NavigationControl(), "top-right");

  // Representar los markers en el mapa.
  await props.markers.forEach((marker) => {
    const priceMark = document.createElement("div");
    priceMark.id = `marker_${marker.registerNumber}`;

    const isMarkerSelected = props.selectedMarker === marker.registerNumber;

    // Estilos marker
    // priceMark.className = "price-marker";
    priceMark.style.width = "35px";
    priceMark.style.textAlign = "center";
    priceMark.style.backgroundColor = isMarkerSelected ? "#222222" : "#FFFFFF";
    priceMark.style.color = isMarkerSelected ? "#FFFFFF" : "#222222";
    priceMark.style.fontSize = "1.1rem";
    priceMark.style.fontWeight = "700";
    priceMark.style.border = "1px solid rgb(221, 221, 221)";
    priceMark.style.borderRadius = "50px";
    priceMark.style.padding = "5px 10px";
    priceMark.style.boxShadow = "rgb(0 0 0 / 12%) 0px 6px 16px";
    priceMark.style.cursor = "pointer";
    priceMark.style.transition = "all 0.3s ease-in";

    priceMark.innerText = `${marker.price} €`;

    // Redirección a la vista de detalle del alojamiento
    priceMark.addEventListener("click", () => {
      router.push(`/accomodation/${marker.registerNumber}`);
    });

    priceMark.addEventListener("mouseover", () => {
      priceMark.style.backgroundColor = "#222222";
      priceMark.style.color = "#FFFFFF";
    });

    priceMark.addEventListener("mouseleave", () => {
      priceMark.style.backgroundColor = "#FFFFFF";
      priceMark.style.color = "#222222";
    });

    new mapboxgl.Marker(priceMark)
      .setLngLat([marker.coords.lng, marker.coords.lat])
      .addTo(map);
  });
});
</script>

<template>
  <div id="map"></div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

#map {
  width: 100%;
  height: 100%;
}

// .marker {
//   background-color: #ff0000 !important;
//   color: #fff;
//   padding: 5px 10px;
//   border-radius: 5px;
//   font-size: 12px;
//   font-weight: bold;
//   text-align: center;
//   line-height: 1;
//   box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
//   z-index: 1;
// }

.price-marker {
  background-color: #fff;
  color: $color-dark;
  font-weight: 600;
  padding: 5px 8px;
  border-radius: 50%;
}
</style>