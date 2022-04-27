<script setup>

// Componentes
import IconButton from "../../Buttons/IconButton.vue";

// Iconos
import {ICON_MAP_MARKER, ICON_CALENDAR, ICON_SEARCH} from  "@/helpers/iconConstants";

</script>

<template>
  <div class="searchBar--light">
    <img
      :src="ICON_MAP_MARKER"
      alt=""
      class="marker-search-icon"
    />

    <input type="text" placeholder="León" />

    <div class="search-filter-button-group">
      <!-- Boton checkIn -->
      <IconButton
        text="check in"
        buttonStyle="iconButton-primary--outlined-small"
        :buttonIcon="ICON_CALENDAR"
      />

      <!-- Boton check out -->
      <IconButton
        text="check out"
        buttonStyle="iconButton-primary--outlined-small"
        :buttonIcon="ICON_CALENDAR"
      />
    </div>

    <img
      :src="ICON_SEARCH"
      alt="Buscar"
      class="search-icon--primary"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

p {
  color: $color;
}

.search-filter-button-group {
  @include flex-row-center;
  gap: 10px;
}

.searchBar--light {
  @include flex-row-space-between;
  // width: 582px;
  height: 50px;
  background: $color-tertiary-light;
  border-radius: 10px;
  padding: 0 10px;
}

input[type="text"] {
  border: none;
  outline: none;
  font-size: 1em;
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
}
</style>