<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// Iconos
import {
  IMG_PROFILE_PLACEHOLDER,
  ICON_USER_LANGUAGE,
  ICON_FULL_VERIFIED,
} from "@/helpers/iconConstants";

// Componentes
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";
import AccomodationThumbnailItem from "@/components/Accomodation/AccomodationThumbnailItem.vue";
import VerifiedListItem from "@/components/User/VerifiedListItem.vue";

// Utils
import { formatArrayAsSimpleStringDate } from "@/helpers/utils";

// Store
import { useUserStore } from "@/store/user";
const userStore = useUserStore();

const router = useRouter();

// Datos del usuario a cargar.
const userData = ref(null);
const userLang = ref(null);
const userAccomodationAds = ref([]);
const isHostUser = ref(false);

onBeforeMount(async () => {
  const userIdFromPath = router.currentRoute.value.params.userId;

// Datos del usuario
  userData.value = await userStore.getUserDataById(userIdFromPath);

  // Idioma
  // userLang.value = await userStore.getUserLanguageById(userIdFromPath);

  // Alojamientos publicados
  //userAccomodationAds.value = await userStore.getAllAccomodationsByUserdId(userIdFromPath);

  // Verificar si el usuario es un host
  isHostUser.value =
    userData.value.bio != undefined && userData.value.verified != undefined;
});
</script>

<template>
  <div class="user-profile-view">
    <div class="user-profile__sidebar">
      <!-- Imagen de perfil del usuario -->
      <AccountIcon
        width="120"
        height="120"
        :profileImage="userData.profileImage"
        :username="`${userData.name} ${userData.surname}`"
      />

      <!-- User Host detalles -->
      <div class="user_profile_sidebar__details">
        <p v-if="isHostUser">Usuario Host</p>
        <div class="user_profile_sidebar_details__stars">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.5516 2.90848C11.735 2.53686 12.265 2.53686 12.4484 2.90848L14.8226 7.71918C14.8954 7.86676 15.0362 7.96904 15.1991 7.9927L20.508 8.76414C20.9181 8.82373 21.0818 9.32772 20.7851 9.61698L16.9435 13.3616C16.8257 13.4765 16.7719 13.642 16.7997 13.8042L17.7066 19.0916C17.7766 19.5001 17.3479 19.8116 16.9811 19.6187L12.2327 17.1223C12.087 17.0457 11.913 17.0457 11.7673 17.1223L7.01888 19.6187C6.65207 19.8116 6.22335 19.5001 6.29341 19.0916L7.20028 13.8042C7.2281 13.642 7.17433 13.4765 7.05648 13.3616L3.21491 9.61698C2.91815 9.32772 3.08191 8.82373 3.49202 8.76414L8.80094 7.9927C8.9638 7.96904 9.10458 7.86676 9.17741 7.71918L11.5516 2.90848Z"
              fill="none"
              stroke="#222222"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <p>40 valoraciones</p>
        </div>
        <div v-if="userData.verified" class="user_profile_sidebar_details__fullVerified">
          <img
            :src="ICON_FULL_VERIFIED"
            alt="El usuario ha verificado DNI, correo electrónico y teléfono"
          />
          <p>Identidad verificada</p>
        </div>

        <!-- Verificaciones del usuario -->
        <div v-if="userData.dniVerified || userData.emailVerified || userData.phoneVerified" class="user_profile_sidebar_details__verified">
          <h2>Nombre Apellidos ha confirmado</h2>
          <ul>
            <li v-if="userData.dniVerified"><VerifiedListItem verifiedText="DNI" /></li>
            <li v-if="userData.emailVerified"><VerifiedListItem verifiedText="Correo electrónico" /></li>
            <li v-if="userData.phoneVerified"><VerifiedListItem verifiedText="Teléfono" /></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="user-profile__data">
      <!-- Nombre completo del usuario -->
      <h2>Hola: Soy <span>{{userData.name}} {{userData.surname}}</span></h2>
      <!-- Fecha de registro -->
      <span></span>

      <!-- Acerca del usuario -->
      <section v-if="isHostUser" class="user-profile-data__biography">
        <h3>Acerca de</h3>
        <p v-if="userData.bio">
         {{userData.bio}}
        </p>
        <!-- Idiomas -->
        <div class="user-profile-data_biography__lang">
          <img :src="ICON_USER_LANGUAGE" alt="" />
          <p>Habla: {{userLang}}</p>
        </div>
      </section>

      <!-- Anuncios publicados por el usuario -->
      <section class="user-profile-data__ads">
        <h2>Alojamientos publicados</h2>
        <!-- Alojamientos publicados -->
        <!-- <AccomodationThumbnailItem
        v-for="accomodation in accomodations"
        :key="accomodation.registerNumber"
        :accData="accomodation"
        :isCurrentUserOwner="true"
        :showDeleteButton="false"
      /> -->
      </section>

      <!-- Valoraciones del usuario (Escritas y recibidas) -->
      <section>
        <h2>Valoraciones</h2>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.user-profile-view {
  @include flex-row-center;
  align-items: flex-start;
  gap: 50px;
  margin: 50px;
  $user-profile-view-marginTop: 50px;
  height: 100vh;

  // Estilos sidebar
  & > .user-profile__sidebar {
    @include flex-column;
    gap: 40px;
    width: 33%;
    padding: 40px 20px;
    position: sticky;
    top: calc($header-height + $user-profile-view-marginTop);
    border: 1px solid $color-tertiary-dark;
    border-radius: $global-border-radius;

    & > .user_profile_sidebar__details {
      @include flex-column;
      gap: 20px;

      & p {
        font-size: 1.1rem;
        text-align: left;
        margin: 0;
      }

      & > .user_profile_sidebar_details__stars,
      & > .user_profile_sidebar_details__fullVerified {
        @include flex-row;
        gap: 5px;

        & > img {
          width: 24px;
          height: 24px;
        }
      }

      // Estilos verficación de usuario
      & > .user_profile_sidebar_details__verified {
        margin-top: 30px;
        & > h2 {
          color: $color-dark;
          font-weight: 400;
        }

        & > ul {
          @include flex-column;
          gap: 15px;
          padding: 0;
          list-style: none;
          margin-top: 25px;
        }
      } // Fin estilos user_profile_sidebar_details__verified
    } // Fin estilos user_profile_sidebar__details
  } // Fin estilos user-profile__sidebar

  & > .user-profile__data {
    @include flex-column;
    gap: 20px;

    // Estilos nombre del usuario
    & > h2 {
      color: $color-dark;
      font-size: 2rem;
      font-weight: 600;
    }

    // Estilos para todos los párrafos de esta sección
    & p {
      font-size: 1rem;
      font-weight: 300;
      line-height: 1.5rem;
    }

    // Estilos fecha de registro
    & > span {
      color: gray;
      font-weight: 300;
    }

    // Estilos acerca del usuario
    & > section.user-profile-data__biography {
      width: 70%;
      & > h3 {
        color: $color-dark;
        font-size: 1.5rem;
        font-weight: 400;
      }

      // Estilos idiomas
      & > .user-profile-data_biography__lang {
        @include flex-row;
        align-items: center;
        gap: 10px;

        & > img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
