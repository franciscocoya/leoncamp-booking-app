<script>
import { RouterView, RouterLink } from "vue-router";
import SearchBarItem from "./SearchBar/SearchBarItem.vue";
import MenuDesktopItem from "./Menu/MenuDesktopItem.vue";
import AccountIcon from "../icons/Account/AccountIcon.vue";

export default {
  name: "HeaderItem",
  components: {
    RouterView,
    RouterLink,
    SearchBarItem,
    MenuDesktopItem,
    AccountIcon,
  },
  setup(props) {},
};
</script>

<template>
  <header>
    <RouterLink to="/">
      <img src="@/assets/img/logo.png" alt="" class="app-logo" />
    </RouterLink>
    <SearchBarItem />
    <MenuDesktopItem />
    <AccountIcon profileImage="src/assets/img/users/sample_img.png" username="Ralph" />
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
header {
  display: grid;
  grid-template-columns: auto 40% auto auto;
  gap: 10px;
  align-items: center;
  margin: 0;
  padding: 0 30px;
}

.app-logo{
  width: 100px;
  height: auto;
}
</style>