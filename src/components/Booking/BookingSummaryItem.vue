<script setup>
import { reactive } from "vue";

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

defineProps({
  // Número de registro del alojamiento reservado
  regNumber: {
    type: String,
    default: "",
  },
  checkIn: {
    type: String,
    default: "",
  },
  checkout: {
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

//const bookingStatus = reactive(checkIn < Date.now() ? "finished" : "active");
</script>

<template>
  <div class="booking-summary-item">
    <div class="booking-summary-item__status">
      <div id="booking-status-icon"></div>
    </div>
    <div class="booking-summary-item__detail">
        <DateBadgeIcon dateText="20/12/22"/>
        <DateBadgeIcon dateText="21/12/22"/>
      <div class="booking-payment-method-container">
        <img :src="ICON_PAYMENT_PAYPAL" alt="" />
      </div>
      <p class="booking-total-price">100 €</p>
      <BaseButton text="VER" buttonStyle="baseButton-dark--outlined--small" />
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
      
    & > #booking-status-icon {
      width: 12px;
      height: 12px;
      background-color: $color-secondary;
      border-radius: 30px;
    } // fin booking-status-icon
  } // fin booking-summary-item__status

  & > .booking-summary-item__detail {
    @include flex-row-space-between;
    gap: 10px;

    & > .booking-payment-method-container{
        @include flex-row-center;
        & > img{
            width: 24px;
            height: 24px;
        }
    }

    & > .booking-total-price{
        font-size: 18px;
    }
  }
} // fin booking-summary-item
</style>