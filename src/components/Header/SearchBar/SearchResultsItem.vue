<script setup>
import { defineEmits, onMounted } from "vue";
import { useRouter } from "vue-router";

// Store
import { useSearchStore } from "@/store/search";
const searchStore = useSearchStore();

const router = useRouter();

const emit = defineEmits(["hide-search-results"]);

const handleHideSearchResults = () => {
  emit("hide-search-results");
};

/**
 * Manejador de click del resultado de búsqueda.
 */
const handleSearchAccomodationsByQuery = async (city) => {
  router.push({
    name: 'accomodation-city-list',
    params: {
      city
    }
  });
  handleHideSearchResults();
};

onMounted(() => {
  searchStore.setSearchResults(searchStore.searchQuery);
});
</script>

<template>
  <div class="search-results-container">
    <div
      class="search-results-container__overlay"
      @click.prevent="handleHideSearchResults"
    ></div>
    <div class="search-results-container__wrapper">
      <ul v-if="searchStore.searchResults.length > 0">
        <li
          v-for="(result, index) in searchStore.searchResults"
          :key="index"
          @click.prevent="handleSearchAccomodationsByQuery(result)"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M38 19.6C38 27.517 27.3256 37.162 24.6184 39.481C24.2598 39.788 23.7402 39.788 23.3816 39.481C20.6744 37.162 10 27.517 10 19.6C10 12.0889 16.268 6 24 6C31.732 6 38 12.0889 38 19.6Z"
              stroke="#222222"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M24 24C26.2091 24 28 22.2091 28 20C28 17.7909 26.2091 16 24 16C21.7909 16 20 17.7909 20 20C20 22.2091 21.7909 24 24 24Z"
              stroke="#222222"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <p>{{ result }}</p>
        </li>
      </ul>
      <h2 v-else v-t="'search.search_results.not_results'"></h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.search-results-container {
  @include flex-row-center;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  top: $header-height;
  position: fixed;
  z-index: $z-index-header;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);

  & > .search-results-container__overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: calc($z-index-header + 1);
  }

  & > .search-results-container__wrapper {
    width: 400px;
    margin-top: 20px;
    padding: 50px;
    background-color: #fff;
    box-shadow: $global-box-shadow;
    border-radius: $global-border-radius;
    z-index: calc($z-index-header + 2);

    & > ul {
      list-style: none;
      margin: 0;
      padding: 0;

      & > li {
        @include flex-row;
        align-items: center;
        gap: 20px;
        border-radius: $global-border-radius;
        transition: background-color 0.2s ease-in;

        & > p{
          font-size: 1.2rem;
        }

        & > svg {
          width: 50px;
          height: 50px;
          background-color: $color-tertiary-light;
          padding: 10px;
          border-radius: $global-border-radius;
        }

        &:hover {
          background-color: $color-tertiary-light;
          cursor: pointer;

          & > svg > path {
            stroke: $color-secondary;
          }
        }
      }
    } // Fin estilos ul

    & > h2 {
      font-weight: 400;
      color: $color-primary;
    }
  }
}

// --------------------------------------------------------------
// Responsive design
// --------------------------------------------------------------

@media (max-width: $breakpoint-sm) {
  .search-results-container {
    top: 80px;

    & > .search-results-container__wrapper {
      width: 90%;
      margin-top: 50px;
      height: max-content;

      & > ul {
        & > li {
          & > p {
            font-size: 1.5rem;
          }
          & > svg {
            width: 60px;
            height: 60px;
          }
        }
      }
    }
  }
}
</style>