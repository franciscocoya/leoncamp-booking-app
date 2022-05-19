<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

// Iconos
import {
  ICON_USER_LANGUAGE,
  ICON_FULL_VERIFIED,
} from "@/helpers/iconConstants";

// Componentes
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";
import VerifiedListItem from "@/components/User/VerifiedListItem.vue";
import AccomodationThumbnailItem from "@/components/Accomodation/AccomodationThumbnailItem.vue";
import SingleAccomodationReviewItem from "@/components/Accomodation/AccomodationReview/SingleAccomodationReviewItem.vue";

// Servicios
import {
  getAllUserAccomodations,
  getAllAccomodationReviewsSendByUser,
  getAllAccomodationReviewsReceivedByUserId,
} from "@/services/accomodation/AccomodationService";

// Store
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

const router = useRouter();

// Datos del usuario a cargar.
const userData = ref(null);
const userLang = ref(null);
const userAccomodationAds = ref([]);
const userAccomodationReviewsSent = ref([]);
const userAccomodationReviewsReceived = ref([]);
const showUserReviewsSent = ref(false);
const showUserReviewsReceived = ref(true);
const isHostUser = ref(false);

onBeforeMount(async () => {
  const userIdFromPath = router.currentRoute.value.params.userId;

  // Datos del usuario
  userData.value = await userStore.getUserDataById(userIdFromPath);

  // Idioma
  userLang.value = await userStore.getUserLanguageById(userIdFromPath);

  // Alojamientos publicados
  if (userData?.value.dni) {
    userAccomodationAds.value = await getAllUserAccomodations(userIdFromPath);
  }

  // Valoraciones realizadas por el usuario
  userAccomodationReviewsSent.value = await getAllAccomodationReviewsSendByUser(
    userIdFromPath
  );

  // Valoraciones recibidas de todos los alojamientos del usuario.
  userAccomodationReviewsReceived.value =
    await getAllAccomodationReviewsReceivedByUserId(userIdFromPath);

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
        :profileImage="userData?.profileImage"
        :username="`${userData?.name} ${userData?.surname}`"
      />

      <!-- User Host detalles -->
      <div class="user_profile_sidebar__details">
        <p v-if="isHostUser" v-once v-t="'user_public_profile.userType.host'"></p>
        <div
          v-if="userData?.verified"
          class="user_profile_sidebar_details__fullVerified"
        >
          <img
            v-once
            :src="ICON_FULL_VERIFIED"
            alt="El usuario ha verificado DNI, correo electrónico y teléfono"
          />
          <p v-once v-t="'user_public_profile.verified.title'">Identidad verificada</p>
        </div>

        <!-- Verificaciones del usuario -->
        <div
          v-if="
            userData?.dniVerified == true ||
            userData?.emailVerified == true ||
            userData?.phoneVerified == true
          "
          class="user_profile_sidebar_details__verified"
        >
          <h2>
            {{
              $tc('user_public_profile.verified.subtitle', {
                name: `${userData?.name} ${userData?.surname}`
              })
            }}
          </h2>
          <ul>
            <li v-if="userData?.dniVerified">
              <VerifiedListItem :verifiedText="$t('components.forms.dni')" />
            </li>
            <li v-if="userData?.emailVerified">
              <VerifiedListItem :verifiedText="$t('components.form.email')" />
            </li>
            <li v-if="userData?.phoneVerified">
              <VerifiedListItem :verifiedText="$t('components.forms.phone')" />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="user-profile__data">
      <!-- Nombre completo del usuario -->
      <h2>
        {{
          $tc('user_public_profile.title', {
            name: `${userData?.name} ${userData?.surname}`
          })
        }}
      </h2>
      <!-- Fecha de registro -->
      <span> </span>

      <!-- Acerca del usuario -->
      <section v-if="isHostUser" class="user-profile-data__biography">
        <h3 v-t="'user_public_profile.about.title'"></h3>
        <p v-if="userData?.bio">
          {{ userData?.bio }}
        </p>
        <!-- Idiomas -->
        <div class="user-profile-data_biography__lang">
          <img :src="ICON_USER_LANGUAGE" alt="" />
          <p>
            {{
              $t('user_public_profile.about.lang.title')
            }}: {{
              $t(`user_public_profile.about.lang.languages[
              ${
                userLang?.idLanguage?.language == "ES"
                ? 0
                : userLang?.idLanguage?.language == "EN"
                ? 1
                : 2
              }]`)
            }}
          </p>
        </div>
      </section>

      <!-- Anuncios publicados por el usuario -->
      <section class="user-profile-data__ads">
        <h2 v-t="'user_public_profile.ads.title'"></h2>
        <div
          v-if="userAccomodationAds.length > 0"
          class="user-profile-data_ads__wrapper"
        >
          <AccomodationThumbnailItem
            v-for="accomodation in userAccomodationAds"
            :key="accomodation.registerNumber"
            :accData="accomodation"
            :isCurrentUserOwner="false"
            :showDeleteButton="false"
            :showEditButton="true"
          />
        </div>
        <div v-else>
          <h3 v-t="'user_public_profile.ads.no_ads'"></h3>
        </div>
      </section>

      <!-- Sección valoraciones -->
      <section class="user-profile-data__reviews">
        <h2 v-t="'user_public_profile.reviews.title'"></h2>
        <div class="user-profile-data_reviews__tabs">
          <span
            title="Valoraciones realizadas por los huéspedes que se han alojado en alguno de los alojamientos del usuario"
            role="tab"
            :class="`${showUserReviewsReceived == true && '--is-tab-active'}`"
            @click.prevent="
              showUserReviewsSent = false;
              showUserReviewsReceived = true;
            "
            v-t="'user_public_profile.reviews.tabs.users'"
            ></span
          >
          <span
            title="Valoraciones realizadas por el usuario en otros alojamientos"
            role="tab"
            :class="`${showUserReviewsSent == true && '--is-tab-active'}`"
            @click.prevent="
              showUserReviewsReceived = false;
              showUserReviewsSent = true;
            "
            v-t="'user_public_profile.reviews.tabs.host'"
            ></span
          >
        </div>

        <!-- Valoraciones recibidas -->
        <div
          v-if="showUserReviewsReceived == true"
          class="user-profile-data_reviews__guests"
        >
          <SingleAccomodationReviewItem
            v-for="(review, index) in userAccomodationReviewsReceived"
            :key="index"
            :review="review"
            :showAccomodationThumbnail="true"
            :showReviewStars="false"
          />
        </div>

        <!-- Valoraciones escritas por el usuario -->
        <div
          v-if="showUserReviewsSent == true"
          class="user-profile-data_reviews__user"
        >
          <SingleAccomodationReviewItem
            v-for="(review, index) in userAccomodationReviewsSent"
            :key="index"
            :review="review"
            :showAccomodationThumbnail="true"
            :showReviewStars="false"
          />
        </div>
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
  height: max-content;

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

    // Estilos sección anuncios usuario
    & > .user-profile-data__ads {
      @include flex-column;
      gap: 20px;

      & > .user-profile-data_ads__wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
    }

    // Estilos sección valoraciones
    & > section.user-profile-data__reviews {
      @include flex-column;
      gap: 20px;

      // Estilos tabs
      & > .user-profile-data_reviews__tabs {
        @include flex-row;
        gap: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid $color-tertiary-light;

        & > span {
          color: gray;
          font-weight: 400;
          font-size: 1rem;
          cursor: pointer;
          padding: 8px 20px;
          border-radius: $global-border-radius;

          &:hover {
            background-color: $color-tertiary-light;
          }
        }

        & > span.--is-tab-active {
          color: $color-dark;
          font-weight: 600;
          border: 2px solid $color-dark;
          position: relative;
          &:hover {
            background: none;
          }
          &:after {
            content: "";
            position: absolute;
            bottom: -13px;
            left: 0;
            width: 100%;
            // height: 2px;
            border-bottom: 2px solid $color-dark;
          }
        }
      }

      & > .user-profile-data_reviews__guests,
      & > .user-profile-data_reviews__user {
        @include flex-column;
        gap: 40px;
      }
    }
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------

// Tablet
@media (max-width: $breakpoint-md) {
  .user-profile-view {
    & > .user-profile__sidebar {
      display: none;
    }
    & > .user-profile__data {
      & > .user-profile-data__ads {
        @include flex-column;

        & > .user-profile-data_ads__wrapper {
          @include flex-column;
          gap: 20px;
        }
      }
    }
  }
}

// Mobile
@media (max-width: $breakpoint-sm) {
  .user-profile-view {
    @include flex-row-center;
    align-items: flex-start;
    gap: 50px;
    margin: 30px;
    $user-profile-view-marginTop: 30px;
    height: max-content;

    & > .user-profile__sidebar {
      display: none;
    }
  }
}
</style>
