<script setup>
import { onMounted, onUpdated, ref } from "vue";

import { useRouter } from "vue-router";

import { useAppContextStore } from "@/store/appContext";

import mapboxgl from "mapbox-gl";

import i18n from "@/i18n";

let map = ref({});

const router = useRouter();

const appContextStore = useAppContextStore();

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

onMounted(() => {
  map = new mapboxgl.Map({
    accessToken: import.meta.env.VITE_MAPBOX_API_TOKEN,
    container: "map-1",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [
      props?.markers[0]?.coords?.lng ?? -5.579879833258864,
      props?.markers[0]?.coords?.lat ?? 42.60613038790926,
    ],
    minzoom: 1.3,
    zoom: 14, // starting zoom
  }).addControl(new mapboxgl.NavigationControl(), "top-right");

  map.value.on("load", () => {
    props.markers.forEach((markerToAdd) => {
      const priceMark = document.createElement("div");
      priceMark.id = `marker_${markerToAdd.registerNumber}`;

      const isMarkerSelected =
        props.selectedMarker === markerToAdd.registerNumber;

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
      priceMark.style.cursor = "pointer";
      priceMark.style.transition = "all 0.3s ease-in";

      priceMark.innerText = `${markerToAdd.price} ${
        appContextStore?.selectedLanguage == "es" ||
        appContextStore?.selectedLanguage == "es-es"
          ? "€"
          : appContextStore?.selectedLanguage == "en" ||
            appContextStore?.selectedLanguage == "en-en"
          ? "£"
          : ""
      }`;

      // Redirección a la vista de detalle del alojamiento
      priceMark.addEventListener("click", () => {
        router.push({
          name: "accomodation-detail",
          params: {
            registerNumber: markerToAdd.registerNumber,
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
        .setLngLat([markerToAdd.coords.lng, markerToAdd.coords.lat])
        .addTo(map);
    });

    map.value.flyTo({
      center: [
        props?.markers[0]?.coords?.lng ?? -5.579879833258864,
        props?.markers[0]?.coords?.lat ?? 42.60613038790926,
      ],
      zoom: 14,
      speed: 0.8,
      curve: 1,
      easing(t) {
        return t;
      },
    });
  });
});

onUpdated(() => {
  // Representar los markers en el mapa.
  props.markers.forEach((markerToAdd) => {
    const priceMark = document.createElement("div");
    priceMark.id = `marker_${markerToAdd.registerNumber}`;

    const isMarkerSelected =
      props.selectedMarker === markerToAdd.registerNumber;

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
    priceMark.style.cursor = "pointer";
    priceMark.style.transition = "all 0.3s ease-in";

    priceMark.innerText = `${markerToAdd.price} €`;

    // Redirección a la vista de detalle del alojamiento
    priceMark.addEventListener("click", () => {
      router.push({
        name: "accomodation-detail",
        params: {
          registerNumber: markerToAdd.registerNumber,
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
      .setLngLat([markerToAdd.coords.lng, markerToAdd.coords.lat])
      .addTo(map);
  });
});
</script>

<template>
  <div id="map-1"></div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

#map {
  width: 100%;
  height: 100%;
}
</style>