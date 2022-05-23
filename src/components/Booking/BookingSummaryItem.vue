<script setup>
import { useRouter } from "vue-router";

// Servicios
import { updateBookingStatus } from "@/services/booking/BookingService";

// Utils
import { formatArrayAsDate, getStyleBookingStatusBadge } from "@/helpers/utils";

// i18n
import { translateBookingStatus } from "@/helpers/i18nTranslations";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import DateBadgeIcon from "@/components/icons/DateBadgeIcon.vue";
import BaseBadge from "@/components/Accomodation/Badge/BaseBadge.vue";

// Iconos
import {
  // ICON_PAYMENT_CREDIT_CARD,
  ICON_PAYMENT_PAYPAL,
  ICON_PAYMENT_CREDIT_CARD,
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
    default: null,
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
    type: Object,
    default: null,
  },
  bookingStatus: {
    type: String,
    default: "PENDIENTE",
  },
  showComleteButton: {
    type: Boolean,
    default: false,
  },
  showCancelButton: {
    type: Boolean,
    default: false,
  },
  showConfirmButton: {
    type: Boolean,
    default: false,
  },
});

/**
 * Manejador del evento click de los botones de cambio de estado de las reservas.
 */
const handleChangeBookingStatus = async (bookingId, bookingStatus) => {
  await updateBookingStatus(bookingId, bookingStatus, (err) => {
    console.log(err);
  });
  window.location.reload();
};

/**
 * Redireccionamiento a la página de detalle de la reserva.
 */
const redirectToBookingDetail = () => {
  router.push({
    name: "booking-detail",
    params: {
      bookingId: props.bookingId,
    },
  });
};

const getPaymentType = () => {
  const paymentType = props.paymentType;
  let paymentTypeIcon = null;
  if (paymentType.cardNumber) {
    paymentTypeIcon = ICON_PAYMENT_CREDIT_CARD;
  } else if (paymentType.accountEmail) {
    paymentTypeIcon = ICON_PAYMENT_PAYPAL;
  }
  return paymentTypeIcon;
};
</script>

<template>
  <div class="booking-summary-item">
    <div class="booking-summary-item__status">
      <div :class="`booking-status-icon --booking-${bookingStatus}`">
        <BaseBadge
          :text="$tc(`bookingStatus[${translateBookingStatus(bookingStatus)}]`)"
          :backgroundColor="
            getStyleBookingStatusBadge(bookingStatus).backgroundColor
          "
          :color="getStyleBookingStatusBadge(bookingStatus).color"
          badgeWidth="300px"
          class="booking-status-badge"
        />
      </div>
    </div>
    <div class="booking-summary-item__detail">
      <DateBadgeIcon
        :dateText="formatArrayAsDate(props.checkIn)"
        dateTitle="Fecha check-in"
      />
      <DateBadgeIcon
        :dateText="formatArrayAsDate(props.checkOut)"
        dateTitle="Fecha check-out"
      />
      <div
        class="booking-payment-method-container"
        title="Método de pago utilizado"
      >
        <img :src="getPaymentType()" alt="" />
      </div>
      <p class="booking-total-price" title="Precio total de la reserva">
        {{ props.totalPrice }} {{ $t("currency.symbol") }}
      </p>
      <div class="booking_summary_buttons_container">
        <!-- Ver -->
        <BaseButton
          :text="$t('components.buttons.view')"
          buttonStyle="baseButton-dark--outlined--small"
          @click="redirectToBookingDetail()"
        />
        <!-- Completar -->
        <BaseButton
          v-if="showComleteButton == true"
          :text="$t('components.buttons.booking.complete')"
          buttonStyle="baseButton-primary--outlined--small"
          @click="handleChangeBookingStatus(bookingId, 'COMPLETADA')"
        />
        <!-- Confirmar -->
        <BaseButton
          v-if="showConfirmButton == true"
          :text="$t('components.buttons.booking.confirm')"
          buttonStyle="baseButton-success--outlined--small"
          @click="handleChangeBookingStatus(bookingId, 'CONFIRMADA')"
        />
        <!-- Cancelar -->
        <BaseButton
          v-if="showCancelButton == true"
          :text="$t('components.buttons.booking.cancel')"
          buttonStyle="baseButton-danger--outlined--small"
          @click="handleChangeBookingStatus(bookingId, 'CANCELADA')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.booking-summary-item {
  display: grid;
  grid-template-columns: 20% auto;
  grid-gap: 50px;
  padding: 20px 20px 20px 8px;
  border-bottom: 1px solid $color-tertiary-light;

  &:last-child {
    border-bottom: none;
  }

  & > .booking-summary-item__status {
    @include flex-row-center;
    width: 100px;
    height: 100%;

    & > .booking-status-badge {
      align-self: center;
    }
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

    & > .booking_summary_buttons_container {
      @include flex-row;
      flex-wrap: wrap;
      gap: 10px;
    }
  }
} // fin booking-summary-item

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .booking-summary-item {
    @include flex-column;
    width: 100%;
    align-items: flex-start;
    gap: 20px;

    // Estilos detalle reserva
    & > .booking-summary-item__detail {
      @include flex-row;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
    }
  }
}
</style>