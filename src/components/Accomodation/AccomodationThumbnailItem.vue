<script setup>
import { onMounted, reactive, ref } from "vue";
import BaseCarousel from "@/components/Carousel/BaseCarousel.vue";
import BaseBadge from "@/components/Accomodation/Badge/BaseBadge.vue";
// import { getAllAccomodations } from "@/services/accomodation/AccomodationService";

// let accomodations = ref([]);

// onMounted(async () => {
//   accomodations.value = await getAllAccomodations();
// });
</script>

<template>
  <article class="accomodation-thumbnail-base">
    <BaseCarousel
      :images="[
        'https://images.unsplash.com/photo-1553444836-bc6c8d340ba7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
        'https://images.unsplash.com/photo-1553444836-bc6c8d340ba7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
        'https://images.unsplash.com/photo-1553444836-bc6c8d340ba7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
      ]"
    />

    <!-- Detalles del alojamiento -->
    <div class="accomodation-thumbnail-detail-container">
      <div class="accomodation-thumbnail-detail-container__header">
        <div>
          <!-- Categoría del alojamiento -->
          <BaseBadge text="Apartamento" backgroundColor="#F0F0F0" />
          <!-- Nombre del alojamiento -->
          <h2>Nombre alojamiento</h2>
        </div>
        <div>
          <!-- Icono guardar alojamiento -->
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <title>Bookmark</title>
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g id="Bookmark">
                <rect
                  id="Rectangle"
                  fill-rule="nonzero"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                ></rect>
                <path
                  d="M17,4 L7,4 C5.89543,4 5,4.89543 5,6 L5,18.7929 C5,19.2383 5.53857,19.4614 5.85355,19.1464 L11.6464,13.3536 C11.8417,13.1583 12.1583,13.1583 12.3536,13.3536 L18.1464,19.1464 C18.4614,19.4614 19,19.2383 19,18.7929 L19,6 C19,4.89543 18.1046,4 17,4 Z"
                  id="Path"
                  stroke="#F5562A"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div class="accomodation-thumbnail-detail-container__body">
        <p>Ubicación</p>
        <div class="accomodation-thumbnail-detail-container__services"></div>
      </div>
      <div class="accomodation-thumbnail-detail-container__footer">
        <div class="accomodation-star-average-container">
          <!-- Icono de estrella -->
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.5516 2.90848C11.735 2.53686 12.265 2.53686 12.4484 2.90848L14.8226 7.71918C14.8954 7.86676 15.0362 7.96904 15.1991 7.9927L20.508 8.76414C20.9181 8.82373 21.0818 9.32772 20.7851 9.61698L16.9435 13.3616C16.8257 13.4765 16.7719 13.642 16.7997 13.8042L17.7066 19.0916C17.7766 19.5001 17.3479 19.8116 16.9811 19.6187L12.2327 17.1223C12.087 17.0457 11.913 17.0457 11.7673 17.1223L7.01888 19.6187C6.65207 19.8116 6.22335 19.5001 6.29341 19.0916L7.20028 13.8042C7.2281 13.642 7.17433 13.4765 7.05648 13.3616L3.21491 9.61698C2.91815 9.32772 3.08191 8.82373 3.49202 8.76414L8.80094 7.9927C8.9638 7.96904 9.10458 7.86676 9.17741 7.71918L11.5516 2.90848Z"
              fill="#F5562A"
              stroke="#F5562A"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <span>4,7</span>
        </div>
        <div class="accomodation-price-per-night">
          <span>100 €</span>
          <span>&nbsp; / noche</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.accomodation-thumbnail-base {
  @include flex-row;
  gap: 20px;

  // Estilos parte derecha (Detalles del alojamiento)
  & > .accomodation-thumbnail-detail-container {
    @include flex-column-between;

    // Estilos header
    & > .accomodation-thumbnail-detail-container__header {
      @include flex-row-space-between;
      gap: 20px;

      & > div {
        // Contenedor nombre y categoría del alojamiento
        &:first-of-type {
          & > span {
            font-size: 14px;
            font-weight: 300;
            color: #828282;
          }

          // Estilos nombre del alojamiento
          & > h2 {
            font-size: 18px;
            font-weight: 500;
            color: #1a1a1a;
          }
        }
        // Contenedor icono guardar alojamiento
        &:last-of-type {
          @include flex-column-center;
        }
      }
    }

    // Estilos body
    & > .accomodation-thumbnail-detail-container__body {
      @include flex-column-start;
    }

    // Estilos footer
    & > .accomodation-thumbnail-detail-container__footer {
      @include flex-row-space-between;

      // Estilos contenedor de valoración media
      & > .accomodation-star-average-container {
        @include flex-row-center;
        gap: 5px;
      }

      // Estilos precio por noche
      & > .accomodation-price-per-night {
        @include flex-row-center;
        color: #1a1a1a;

        // Precio
        & > span:first-of-type {
          font-size: 1.3em;
          font-weight: 700;
        }
      }
    }
  }
}
</style>