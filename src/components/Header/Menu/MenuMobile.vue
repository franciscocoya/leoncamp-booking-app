<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { useAuthStore } from "@/store/auth";

import { useRouter } from "vue-router";
const router = useRouter();

const userStore = useUserStore();
const authStore = useAuthStore();

const redirectAccountChildrenView = (viewName) => {
  router.push({
    name: viewName,
    params: {
      username: `${authStore.userData.name}-${authStore.userData.surname}`,
    },
  });

  handleHideMenu();
};

const emit = defineEmits(["hideMenu"]);

const handleHideMenu = () => {
  emit("hideMenu");
};

onMounted(async () => {
  await authStore.loadCurrentUserData();
});
</script>

<template>
  <div class="menu-mobile-responsive">
    <div class="menu-mobile-responsive__overlay"></div>
    <div class="menu-mobile-responsive__wrapper">
      <ul>
        <li id="menu-mobile-username">
          {{
            $tc('header.menu_mobile.title', {
            name: authStore?.userData?.name
          })
          }}
        </li>
        <li
          id="user-profile"
          @click.prevent="redirectAccountChildrenView('user-profile')"
        >
          {{$t('header.menu_mobile.profile')}}
        </li>
        <li
          id="user-account-security"
          @click.prevent="redirectAccountChildrenView('user-privacy')"
        >
         {{$t('header.menu_mobile.security')}}
        </li>
        <li
          id="user-account-configuration"
          @click.prevent="redirectAccountChildrenView('user-configuration')"
        >
          {{$t('header.menu_mobile.config')}}
        </li>
        <li
          id="user-bookings"
          @click.prevent="redirectAccountChildrenView('user-bookings')"
        >
          {{$t('header.menu_mobile.bookings')}}
        </li>
        <li
          v-if="authStore?.userData?.dni"
          id="user-ads"
          @click.prevent="redirectAccountChildrenView('user-ads')"
        >
          {{$t('header.menu_mobile.ads')}}
        </li>
        <li id="user-logout" @click.prevent="userStore.logout()">
         {{$t('components.buttons.close_session')}}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.menu-mobile-responsive {
  @include flex-column-center;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: $z-index-3;

  & > .menu-mobile-responsive__overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    z-index: $z-index-3;
  }

  & > .menu-mobile-responsive__wrapper {
    width: 90%;
    height: 70%;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid $color-tertiary-light;
    border-radius: $global-border-radius;
    box-shadow: $global-box-shadow;
    z-index: $z-index-4;

    & > ul {
      @include flex-column-center;
      height: 100%;
      justify-content: space-evenly;
      list-style: none;
      padding: 20px;
      margin: 0 auto;

      & > #menu-mobile-username {
        font-size: 1.7rem;
        font-weight: 600;
        color: $color-primary;
      }

      & > li {
        width: 100%;
        text-align: center;
        padding: 20px 0;
        border-radius: $global-border-radius;
        cursor: pointer;

        &:not(#menu-mobile-username):hover {
          background-color: $color-tertiary-light;
        }

        &:last-child {
          background: none;
          border: 1px solid #000;

          &:hover {
            background-color: $color-dark;
          }
        }
      }
    }
  }
}
</style>