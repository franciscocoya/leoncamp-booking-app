<script setup>
import {ref} from 'vue';
import BaseButton from "@/components/Buttons/BaseButton.vue";

// Store
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

const emit = defineEmits([
    'showPanel',
    'hidePanel',
]);

const handleShowPanels = (panelOpt) => {

    let accOpt = document.getElementById('admin-menu-accomodation');
    let userOpt = document.getElementById('admin-menu-user');

    accOpt.classList.remove('--menu-item-active');
    userOpt.classList.remove('--menu-item-active');

    switch (panelOpt) {
        case 1:
            accOpt.classList.add('--menu-item-active');
            break;

        case 2:
            userOpt.classList.add('--menu-item-active');
            break;
    
        default:
            break;
    }
    

    emit("showPanel", panelOpt)
};



</script>

<template>
  <div class="administrator-sidebar">
    <ul>
      <li id="admin-menu-accomodation" class="--menu-item-active" @click.prevent="handleShowPanels(1)">
        {{$t('administrator.menu.accomodations')}}
      </li>
      <li id="admin-menu-user"  @click.prevent="handleShowPanels(2)">
        {{$t('administrator.menu.users')}}
      </li>
    </ul>
    <div>
      <BaseButton
        text="Cerrar sesión"
        buttonStyle="baseButton-dark--outlined"
        @click="userStore.logout()"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.administrator-sidebar {
  @include flex-column;
  gap: 30px;
  width: 250px;
  height: max-content;
  padding: 20px;
  border-radius: $global-border-radius;
  background-color: #fff;
  box-shadow: $global-box-shadow;
  backdrop-filter: blur(10px);

  & > ul {
    @include flex-column;
    gap: 10px;
    list-style: none;
    padding-left: 0;

    & > li {
      color: $color-dark;
      padding: 15px;
      border-radius: $global-border-radius;
      cursor: pointer;
    }

    // Estilo elemento de menú activo
    & > li.--menu-item-active {
      background-color: $color-tertiary-light;
      position: relative;

      &:after {
        content: "";
        height: 100%;
        border-left: 5px solid $color-primary;
        left: -20px;
        bottom: 0;
        border-radius: 10px;
        position: absolute;
      }
    }
  }
}
</style>