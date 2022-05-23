<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";

// Store
import { useSearchStore } from "@/store/search";

const emit = defineEmits(["closeModal", "handleClick"]);

const router = useRouter();

const searchStore = useSearchStore();

const closeModal = () => {
  emit("closeModal");
};

const handleFilterAccomodationResults = () => {
  //emit("handleClick", filteredAccomodations);

  router.push({
    name: "accomodation-search-results",
    query: {
      minprice: searchStore?.filter?.price.min,
      maxprice: searchStore?.filter?.price.max,
      beds: searchStore.filter?.beds,
      bedrooms: searchStore.filter?.bedrooms,
      bathrooms: searchStore.filter?.bathrooms,
      guests: searchStore.filter?.guests,
    },
  });
};
</script>

<template>
  <div class="base-modal">
    <div class="base_modal__overlay" @click.prevent="closeModal"></div>
    <div class="base-modal-window">
      <BaseButton
        text="x"
        buttonStyle="baseButton-close--filled"
        id="bt-close-modal-filter-modal"
        title="Cerrar la ventana"
        @click="closeModal"
      />
      <h1 v-t="'modals.accomodation_search_filters.title'"></h1>
      <!-- Rando de precios -->
      <div class="price_range_container">
        <h2 v-t="'modals.accomodation_search_filters.price.title'"></h2>
        <div class="price_range_container__wrapper">
          <LabelFormInput
            :inputLabel="$t('modals.accomodation_search_filters.price.min')"
            inputType="number"
            :inputValue="searchStore.filter.price.min"
            @handleInput="
              (value) => (searchStore.filter.price.min = Number(value))
            "
          />
          <LabelFormInput
            :inputLabel="$t('modals.accomodation_search_filters.price.max')"
            inputType="number"
            :inputValue="searchStore.filter.price.max"
            @handleInput="
              (value) => (searchStore.filter.price.max = Number(value))
            "
          />
        </div>
      </div>

      <!-- Número de camas -->
      <div class="beds_container">
        <h2 v-t="'modals.accomodation_search_filters.beds'"></h2>
        <div class="beds_container__wrapper">
          <span
            v-for="(num, index) in [1, 2, 3, 4]"
            :key="`beds_${index}`"
            :class="`filter_number_selector_button ${
              searchStore.filter.beds === num ? '--filter-button-active' : ''
            }`"
            @click.prevent="() => (searchStore.filter.beds = num)"
            >{{ num }}</span
          >
          <span
            :class="`filter_number_selector_button__all ${
              searchStore.filter.beds > 0 ? '--no-show-all-active' : ''
            }`"
            @click.prevent="() => (searchStore.filter.beds = 0)"
          >
            {{ $t("components.buttons.all") }}
          </span>
        </div>
      </div>

      <!-- Habitaciones -->
      <div class="bedrooms_container">
        <h2 v-t="'modals.accomodation_search_filters.bedrooms'"></h2>
        <div class="bedrooms_container__wrapper">
          <span
            v-for="(num, index) in [1, 2, 3, 4]"
            :key="index"
            :id="`filter_bedrooms_${num}`"
            :class="`filter_number_selector_button ${
              searchStore.filter.bedrooms === num
                ? '--filter-button-active'
                : ''
            }`"
            @click.prevent="() => (searchStore.filter.bedrooms = num)"
            >{{ num }}</span
          >
          <span
            :class="`filter_number_selector_button__all ${
              searchStore.filter.bedrooms > 0 ? '--no-show-all-active' : ''
            }`"
            @click.prevent="() => (searchStore.filter.bedrooms = 0)"
          >
            {{ $t("components.buttons.all") }}
          </span>
        </div>
      </div>

      <!-- Baños -->
      <div class="bathrooms_container">
        <h2 v-t="'modals.accomodation_search_filters.bathrooms'"></h2>
        <div class="bathrooms_container__wrapper">
          <span
            v-for="(num, index) in [1, 2, 3, 4]"
            :key="index"
            :class="`filter_number_selector_button ${
              searchStore.filter.bathrooms === num
                ? '--filter-button-active'
                : ''
            }`"
            @click.prevent="() => (searchStore.filter.bathrooms = num)"
            >{{ num }}</span
          >
          <span
            :class="`filter_number_selector_button__all ${
              searchStore.filter.bathrooms > 0 ? '--no-show-all-active' : ''
            }`"
            @click.prevent="() => (searchStore.filter.bathrooms = 0)"
          >
            {{ $t("components.buttons.all") }}
          </span>
        </div>
      </div>

      <!-- Huéspedes -->
      <div class="guests_container">
        <h2 v-t="'modals.accomodation_search_filters.guests'"></h2>
        <div class="guests_container__wrapper">
          <span
            v-for="(num, index) in [1, 2, 3, 4]"
            :key="index"
            :class="`filter_number_selector_button ${
              searchStore.filter.guests === num ? '--filter-button-active' : ''
            }`"
            @click.prevent="() => (searchStore.filter.guests = num)"
            >{{ num }}</span
          >
          <span
            :class="`filter_number_selector_button__all ${
              searchStore.filter.guests > 0 ? '--no-show-all-active' : ''
            }`"
            @click.prevent="() => (searchStore.filter.guests = 0)"
          >
            {{ $t("components.buttons.all") }}
          </span>
        </div>
      </div>

      <BaseButton
        :text="$t('components.buttons.filter')"
        buttonStyle="baseButton-dark--filled"
        @click="handleFilterAccomodationResults"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.base-modal {
  & > .base_modal__overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - $header-height);
    z-index: $z-index-4;
  }

  & > .base_modal__overlay {
    z-index: $z-index-4;
  }

  & > .base-modal-window {
    @include flex-column;
    gap: 20px;
    width: 50%;
    height: 80%;
    padding: 20px 50px;
    background-color: #fff;
    border-radius: $global-border-radius;
    position: relative;
    z-index: $z-index-5;

    & > #bt-close-modal-filter-modal {
      align-self: flex-end;
      position: absolute;
      top: 10px;
      right: 10px;
    }

    & > h1 {
      font-size: 1.5rem;
      margin: 0;
    }

    & h2 {
      color: $color-dark;
      font-size: 1.1rem;
      font-weight: 400;
    }
    // Estilos contenedor del selector de rango de precios
    & > .price_range_container {
      @include flex-column;
      gap: 10px;

      & > .price_range_container__wrapper {
        @include flex-row;
        gap: 10px;
        & > div {
          flex: 1;
        }
      }
    } // Fin estilos price_range_container

    & > div {
      @include flex-column;
      gap: 20px;

      & > div {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
      }
    }
  }
}

// -------------------------------------------------
// -- Responsive design
// -------------------------------------------------
@media screen and (max-width: $breakpoint-md) {
  .base-modal {
    @include flex-column;
    justify-content: center;
    height: 100vh;
    z-index: $z-index-5;

    & > .base-modal-window {
      width: 80%;
      height: 70%;
      margin-bottom: 30%;
      padding: 20px;
    }
  }
}
</style>