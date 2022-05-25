<script setup>
import { defineEmits } from "vue";

// Iconos
import { ICON_MAP_MARKER, ICON_SEARCH } from "@/helpers/iconConstants";

// Store
import { useSearchStore } from "@/store/search";
const searchStore = useSearchStore();

const emit = defineEmits(["show-search-results", "hide-search-results"]);

const showSearchResults = () => {
  emit("show-search-results");
};

const hideSearchResults = () => {
  emit("hide-search-results");
};

const handleSearchInput = (e) => {
  searchStore.searchResults = [];
  e.target.value.length > 0 ? showSearchResults() : hideSearchResults();

  if (e.target.value !== "") {
    searchStore.setSearchResults(e.target.value);
    searchStore.searchQuery = e.target.value;
  }
};
</script>

<template>
  <div class="searchBar--light" role="search">
    <img :src="ICON_MAP_MARKER" alt="" class="marker-search-icon" />

    <input type="text" @input="(e) => handleSearchInput(e)" />

    <!-- <img :src="ICON_SEARCH" alt="Buscar" class="search-icon--primary" /> -->
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.searchBar--light {
  @include flex-row;
  gap: 20px;
  justify-content: flex-start;
  height: 50px;
  background: $color-tertiary-light;
  border-radius: 10px;
  padding: 0 10px;

  & > img {
    @include flex-row;
  }
}

input[type="text"] {
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
  color: $color-primary;
}

.marker-search-icon {
  width: 20px;
}

.search-icon--primary {
  width: 24px;
  padding: 5px;
  background-color: $color-primary;
  border-radius: 25px;
  align-self: center;
}

// --------------------------------------------------------------
// Responsive design
// --------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .searchBar--light {
    width: 100%;
    gap: 5px;
    justify-content: flex-start;

    & > .marker-search-icon {
      width: 30px;
    }

    input[type="text"] {
      width: 100%;
      margin-left: 20px;
    }

    & > .search-icon--primary {
      width: 35px;
      position: absolute;
      right: 30px;
    }
  }
}
</style>