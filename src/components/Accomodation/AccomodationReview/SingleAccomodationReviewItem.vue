<script setup>
import { useRouter } from "vue-router";

// Componentes
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";

// Utils
import { formatArrayAsSimpleStringDate } from "@/helpers/utils";

const router = useRouter();

defineProps({
  review: {
    type: Object,
    default: () => ({}),
  },
  showAccomodationThumbnail: {
    type: Boolean,
    default: false,
  },
  showReviewStars: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="accomodation-review-item-container">
    <div class="accomodation-review-item-container__wrapper">
      <div
        class="accomodation_review__profileImage"
        @click.prevent="router.push(`/u/${review.idUser.id}`)"
        :title="`Ver el perfil de ${review.idUser.name} ${review.idUser.surname}`"
      >
        <AccountIcon
          :profileImage="review.profileImage"
          :username="review.idUser.name"
          :width="50"
          :height="50"
        />
        <div class="accomodation_review__profileImage__userDetails">
          <p>
            <b>{{ review.idUser.name }} {{ review.idUser.surname }}</b>
          </p>
          <p>{{ formatArrayAsSimpleStringDate(review.createdAt, $i18n.locale) }}</p>
        </div>
      </div>
      <div class="accomodation_review__content">
        <div
          v-if="showReviewStars == true"
          class="accomodation_review_content__stars"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            v-for="(star, index) in review.stars"
            :key="index"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.5516 2.90848C11.735 2.53686 12.265 2.53686 12.4484 2.90848L14.8226 7.71918C14.8954 7.86676 15.0362 7.96904 15.1991 7.9927L20.508 8.76414C20.9181 8.82373 21.0818 9.32772 20.7851 9.61698L16.9435 13.3616C16.8257 13.4765 16.7719 13.642 16.7997 13.8042L17.7066 19.0916C17.7766 19.5001 17.3479 19.8116 16.9811 19.6187L12.2327 17.1223C12.087 17.0457 11.913 17.0457 11.7673 17.1223L7.01888 19.6187C6.65207 19.8116 6.22335 19.5001 6.29341 19.0916L7.20028 13.8042C7.2281 13.642 7.17433 13.4765 7.05648 13.3616L3.21491 9.61698C2.91815 9.32772 3.08191 8.82373 3.49202 8.76414L8.80094 7.9927C8.9638 7.96904 9.10458 7.86676 9.17741 7.71918L11.5516 2.90848Z"
              fill="#F5562A"
              stroke="#F5562A"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <p>{{ review.content }}</p>
      </div>
    </div>
    <div
      v-if="showAccomodationThumbnail == true"
      class="accomodation-review-item-container__image_preview"
    >
      <img
        :src="
          review.idAccomodation.accomodationImages[0].accomodationAccImageId
            .idAccomodationImage.imageUrl
        "
        alt=""
        @click.prevent="
          router.push({
            name: 'accomodation-detail',
            params: {
              registerNumber: review.idAccomodation.registerNumber,
            },
          })
        "
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.accomodation-review-item-container {
  @include flex-row;
  gap: 5px;

  & > .accomodation-review-item-container__wrapper {
    @include flex-column;
    gap: 5px;
    & > .accomodation_review__profileImage {
      @include flex-row;
      align-items: center;
      gap: 15px;
      cursor: pointer;

      & > .accomodation_review__profileImage__userDetails {
        @include flex-column;
        gap: 5px;

        & > p {
          margin: 0;
          color: $color-dark;
          font-size: 1rem;
        }

        & > p:last-child {
          font-size: 0.9rem;
          color: gray;
        }
      } // fin estilos accomodation_review__profileImage__userDetails
    } // fin estilos accomodation_review__profileImage

    & > .accomodation_review__content {
      & > .accomodation_review_content__stars {
        margin-top: 10px;
      }
    }
  }

  & > .accomodation-review-item-container__image_preview {
    & > img {
      width: 120px;
      height: 80px;
      border-radius: $global-border-radius;
      object-fit: cover;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: scale(1.03);
        box-shadow: $global-box-shadow;
      }
    }
  }
}
</style>
