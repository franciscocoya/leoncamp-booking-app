<script setup>
// Componentes
import MenuIcon from "@/components/Header/Menu/MenuIcon.vue";
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";

// Iconos
import {
  ICON_BOOKMARK,
  ICON_MENU_CALENDAR_OUTLINE,
  ICON_MENU_HOME,
  ICON_ADD,
} from "@/helpers/iconConstants";
</script>

<template>
  <div class="header-mobile">
    <div class="header-mobile-wrapper">
      <ul>
        <!-- Icono Inicio -->
        <li class="menu-mobile-item--active"><MenuIcon :icon="ICON_MENU_HOME" :iconSize="40" title="Inicio" path="/" /></li>

        <!-- Icono guardados -->
        <li>
          <MenuIcon :icon="ICON_BOOKMARK" :iconSize="26" title="Guardados" path="/saved"/>
        </li>

        <!-- Icono subir alojamiento -->
        <li>
          <MenuIcon
            :icon="ICON_ADD"
            path="/bookings"
            :iconSize="50"
            id="add-accomodation-menu-mobile"
          />
        </li>

        <!-- Icono reservas -->
        <li>
          <MenuIcon :icon="ICON_MENU_CALENDAR_OUTLINE" :iconSize="40" title="Reservas" path="/bookings"/>
        </li>

        <!-- Icono cuenta personal -->
        <li>
          <AccountIcon
            :width="50"
            :height="50"
            username="Cuenta"
            :isLinked="true"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.header-mobile {
  position: fixed;
  height: 90px;
  width: 100%;
  margin: 0 auto;
  bottom: 10px;
  left: 0;
  background: transparent;
  z-index: $z-index-header;

  & > .header-mobile-wrapper {
    height: 80px;
    background-color: #fff;
    box-shadow: $global-box-shadow;
    border-radius: $global-border-radius;
    width: 90%;
    margin: 0 auto;
    padding: 5px 5px;
    position: sticky;

    & > ul {
      @include flex-row;
      justify-content: space-evenly;
      align-items: center;
      gap: 5px;
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;

      & > li{
          & img {
              fill: red;
          }
      }

      & > .menu-mobile-item--active{
          background-color: $color-tertiary-dark;
          padding: 10px;
          border-radius: $global-border-radius;
      }
    }
  }
}
</style>