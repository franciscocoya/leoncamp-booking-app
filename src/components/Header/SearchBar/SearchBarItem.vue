<script setup>
import IconButton from "../../Buttons/IconButton.vue";
</script>

<template>
  <div class="searchBar--light">
    <img
      src="@/assets/img/icons/marker-icon.svg"
      alt=""
      class="marker-search-icon"
    />

    <input type="text" placeholder="León" />

    <div class="search-filter-button-group">
      <!-- Boton checkIn -->
      <IconButton
        text="check in"
        buttonStyle="iconButton-primary--outlined-small"
        buttonIcon="src/assets/img/icons/calendar-icon.svg"
      />

      <!-- Boton check out -->
      <IconButton
        text="check out"
        buttonStyle="iconButton-primary--outlined-small"
        buttonIcon="src/assets/img/icons/calendar-icon.svg"
      />
    </div>

    <img
      src="@/assets/img/icons/search-icon.svg"
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