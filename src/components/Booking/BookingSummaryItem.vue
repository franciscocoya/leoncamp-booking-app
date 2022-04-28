<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

// Formateador de fecha
import { formatArrayAsDate, convertArrayToDate } from "@/helpers/utils";

// Tipo de pago
import { PaymentMethod } from "@/models/payment/payment.enum";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import DateBadgeIcon from "@/components/icons/DateBadgeIcon.vue";

// Iconos
import {
  ICON_PAYMENT_CREDIT_CARD,
  ICON_PAYMENT_PAYPAL,
} from "@/helpers/iconConstants";

const router = useRouter();

const props = defineProps({
  // Número de registro del alojamiento reservado
  regNumber: {
    type: String,
    default: "",
  },
  bookingId: {
    type: Number,
    default: "",
  },
  checkIn: {
    type: String,
    default: "",
  },
  checkOut: {
    type: String,
    default: "",
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  // Método de pago utilizado a la hora de la reserva
  paymentType: {
    type: String,
    default: PaymentMethod.CREDIT_CARD,
  },
});

const bookingStatus = reactive(
  convertArrayToDate(props.checkOut) < new Date() ? "--booking-finished" : ""
);

const redirectToBookingDetail = () => {
  router.push({
    name: "booking-detail",
    params: {
      bookingId: props.bookingId,
    },
  });
};
</script>

<template>
  <div class="booking-summary-item">
    <div class="booking-summary-item__status">
      <div :class="`booking-status-icon ${bookingStatus}`"></div>
    </div>
    <div class="booking-summary-item__detail">
      <DateBadgeIcon :dateText="formatArrayAsDate(props.checkIn)" />
      <DateBadgeIcon :dateText="formatArrayAsDate(props.checkOut)" />
      <div class="booking-payment-method-container">
        <img :src="ICON_PAYMENT_PAYPAL" alt="" />
      </div>
      <p class="booking-total-price">{{ totalPrice }} €</p>
      <BaseButton
        text="VER"
        buttonStyle="baseButton-dark--outlined--small"
        @click="redirectToBookingDetail()"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.booking-summary-item {
  @include flex-row-center;
  padding: 10px 20px 10px 8px;
  box-shadow: $global-box-shadow;
  border: 1px solid $color-tertiary-light;
  border-radius: $global-border-radius;

  & > .booking-summary-item__status {
    height: 100%;
    margin-right: 10px;
    align-self: flex-start;

    & > .booking-status-icon {
      width: 12px;
      height: 12px;
      background-color: $color-secondary;
      border-radius: 30px;
    } // fin booking-status-icon
  } // fin booking-summary-item__status

  & > .booking-summary-item__detail {
    @include flex-row-space-between;
    gap: 10px;

    & > .booking-payment-method-container {
      @include flex-row-center;
      & > img {
        width: 24px;
        height: 24px;
      }
    }

    & > .booking-total-price {
      font-size: 18px;
    }
  }

  .--booking-finished {
    background-color: $color-primary;
  }
} // fin booking-summary-item
</style>