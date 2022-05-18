<script setup>
import { onBeforeMount, ref } from "vue";

// Componentes
import AdministratorSidebar from "@/components/Sidebar/AdministratorSidebar.vue";
import AccomodationList from "@/components/Accomodation/AccomodationList/AccomodationList.vue";
import UserListItem from "@/components/User/UserListItem.vue";

import { getAllAccomodations } from "@/services/accomodation/AccomodationService";
import { getAllUsers } from "@/services/user/userService";

const showAccomodationPanel = ref(true);
const showUsersPanel = ref(false);

/**
 * Manejador click items del menú del sidebar.
 */
const handleShowPanelOption = (opt) => {
  switch (opt) {
    case 1:
      showUsersPanel.value = false;
      showAccomodationPanel.value = true;
      break;
    case 2:
      showAccomodationPanel.value = false;
      showUsersPanel.value = true;
      break;
    default:
      showAccomodationPanel.value = true;
      showUsersPanel.value = false;
      break;
  }
};

const allAccomodations = ref([]);
const allUsers = ref([]);

onBeforeMount(async () => {
  allAccomodations.value = await getAllAccomodations();
  allUsers.value = await getAllUsers();
});
</script>

<template>
  <div class="administrator-dashboard-view">
    <h1 v-t="'administrator.title'"></h1>
    <div class="administrator-dashboard__wrapper">
      <AdministratorSidebar @showPanel="(opt) => handleShowPanelOption(opt)" />
      <AccomodationList
        v-if="showAccomodationPanel == true"
        :accomodations="allAccomodations"
      />
      <UserListItem v-if="showUsersPanel == true" :users="allUsers" />
      <div class=""></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.administrator-dashboard-view {
  margin: 30px 50px;

  & > h1 {
    font-weight: 400;
  }

  & > .administrator-dashboard__wrapper {
    @include flex-row;
    gap: 20px;
  }
}
</style>