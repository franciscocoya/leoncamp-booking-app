<script setup>
// Componentes
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";

// Utils
import { formatArrayAsSimpleStringDate } from "@/helpers/utils";

const props = defineProps({
  review: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <div class="accomodation-review-item-container">
    <div class="accomodation_review__profileImage">
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
        <p>{{ formatArrayAsSimpleStringDate(review.createdAt) }}</p>
      </div>
    </div>
    <div class="accomodation_review__">
      <p>{{ review.content }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.accomodation-review-item-container {
  @include flex-column;
  gap: 5px;

  & > .accomodation_review__profileImage {
    @include flex-row;
    align-items: center;
    gap: 15px;

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
    }
  }
}
</style>
