<script setup>
// Componentes
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";

// Utils
import { formatArrayAsSimpleStringDate } from "@/helpers/utils";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  surname: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="user-account-summary-item">
    <AccountIcon
      :profileImage="props.profileImage"
      :username="`${props.name} ${props.surname}`"
      :width="50"
      :height="50"
    />
    <div class="user-account-summary__userDetails">
      <p>
        <b>{{ props.name }} {{ props.surname }}</b>
      </p>
      <p>{{ formatArrayAsSimpleStringDate(props.createdAt) }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.user-account-summary-item {
  @include flex-row;
  gap: 20px;

  & > .user-account-summary__userDetails {
    @include flex-column;
    justify-content: center;
    gap: 10px;

    & > p {
      margin: 0;
    }
  }
}
</style>
