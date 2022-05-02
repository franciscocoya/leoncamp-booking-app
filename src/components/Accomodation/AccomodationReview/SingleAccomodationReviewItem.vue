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
      <div>
        <p>
          <b>{{ review.idUser.name }} {{ review.idUser.surname }}</b>
        </p>
        <p>{{}} {{ formatArrayAsSimpleStringDate(review.createdAt) }}</p>
      </div>
    </div>
    <div class="accomodation_review__">
      <p>{{ review.content }}</p>
    </div>
  </div>
</template>
