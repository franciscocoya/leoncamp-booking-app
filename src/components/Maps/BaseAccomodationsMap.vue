<script setup>
import { onMounted } from "vue";

import { useRouter } from "vue-router";

import mapboxgl from "mapbox-gl";

import i18n from "@/i18n";

const router = useRouter();

const props = defineProps({
  markers: {
    type: Array,
    default: () => [],
  },
  selectedMarker: {
    type: String,
    default: "",
  },
  center: {
    type: Array,
    default: () => [-5.579879833258864, 42.60613038790926],
  },
});

onMounted(async () => {
  const map = await new mapboxgl.Map({
    accessToken: import.meta.env.VITE_MAPBOX_API_TOKEN,
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [
      props?.markers[0]?.coords?.lng ?? -5.579879833258864,
      props?.markers[0]?.coords?.lat ?? 42.60613038790926,
    ],
    minzoom: 1.3,
    zoom: 14, // starting zoom
  }).addControl(new mapboxgl.NavigationControl(), "top-right");

  map.on("load", () => {
    map.setLayoutProperty("country-label", "text-field", [
      "get",
      `name_${i18n.locale}`,
    ]);
  });

  // Representar los markers en el mapa.
  await props.markers.forEach((marker) => {
    const priceMark = document.createElement("div");
    priceMark.id = `marker_${marker.registerNumber}`;

    const isMarkerSelected = props.selectedMarker === marker.registerNumber;

    // Estilos marker
    priceMark.style.width = "max-content";
    priceMark.style.textAlign = "center";
    priceMark.style.backgroundColor =
      isMarkerSelected == true ? "#222222" : "#FFFFFF";
    priceMark.style.color = isMarkerSelected == true ? "#FFFFFF" : "#222222";
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
      router.push({
        name: "accomodation-detail",
        params: {
          registerNumber: marker.registerNumber,
        },
      });
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
</style>