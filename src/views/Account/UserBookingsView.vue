<script setup>
import { onMounted, reactive, ref } from "vue";

// Servicios
import { listAllBookingsFromUserHostAccomodations } from "@/services/booking/BookingService";
import { checkUserIsHost } from "@/services/user/userService";

// Componentes
import BookingSummaryItem from "@/components/Booking/BookingSummaryItem.vue";

// Gifs
import { GIF_CAMPFIRE } from "@/helpers/iconConstants";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useAuthStore } from "@/store/auth";

const accomodationStore = useAccomodationStore();
const authStore = useAuthStore();

let bookings = reactive({
  all: [],
});
let allUserAccomodationBookings = reactive({
  all: [],
});

const tabs = reactive({
  activeTab: 0,
});

let isUserHost = ref(false);

onMounted(async () => {
  bookings.all = await accomodationStore.getAllUserBookings();

  isUserHost.value = await checkUserIsHost(authStore?.userData?.id);

  tabs.activeTab = isUserHost.value == true ? 0 : 1;

  if (isUserHost.value) {
    allUserAccomodationBookings.all =
      await listAllBookingsFromUserHostAccomodations(authStore?.userData?.id);
  }
});
</script>

<template>
  <div class="user-bookings-view">
    <h1>{{ $t("bookings_view.title") }}</h1>

    <section
      class="bookings_container"
      v-if="
        allUserAccomodationBookings?.all?.length > 0 ||
        bookings?.all?.length > 0
      "
    >
      <div class="bookings_container__tabs">
        <span
          v-if="isUserHost == true && allUserAccomodationBookings?.all?.length > 0"
          role="tab"
          :class="`${tabs.activeTab == 0 && allUserAccomodationBookings?.all?.length > 0 ? '--is-tab-active' : ''}`"
          @click.prevent="tabs.activeTab = 0"
          >{{ $t("bookings_view.tabs.guests") }}</span
        >
        <span
          role="tab"
          :class="`${
            tabs.activeTab == 1 || isUserHost == false || allUserAccomodationBookings?.all?.length == 0 ? '--is-tab-active' : ''
          }`"
          @click.prevent="tabs.activeTab = 1"
          >{{ $t("bookings_view.tabs.host") }}</span
        >
      </div>

      <!-- Reservas recibidas de los alojamientos del usuario -->
      <Transition name="fade">
        <div v-if="tabs.activeTab == 0 && allUserAccomodationBookings?.all?.length > 0" class="bookings_container__guests">
          <BookingSummaryItem
            v-for="booking in allUserAccomodationBookings?.all"
            :key="booking.registerNumber"
            :bookingId="booking.id"
            :checkIn="booking.checkIn"
            :checkOut="booking.checkOut"
            :totalPrice="booking.total"
            :bookingStatus="booking.bookingStatus"
            :paymentType="booking.idPayment"
            :showComleteButton="
              !['COMPLETADA', 'CANCELADA'].includes(booking.bookingStatus)
            "
            :showConfirmButton="
              !['COMPLETADA', 'CANCELADA', 'CONFIRMADA'].includes(
                booking.bookingStatus
              )
            "
            :showCancelButton="
              !['COMPLETADA', 'CANCELADA'].includes(booking.bookingStatus)
            "
          />
        </div>
      </Transition>

      <!-- Reservas realizadas por el usuario -->
      <Transition name="fade">
        <div v-if="tabs.activeTab == 1 || allUserAccomodationBookings?.all?.length == 0" class="bookings_container__user">
          <BookingSummaryItem
            v-for="booking in bookings?.all"
            :key="booking.registerNumber"
            :bookingId="booking.id"
            :checkIn="booking.checkIn"
            :checkOut="booking.checkOut"
            :totalPrice="booking.total"
            :bookingStatus="booking.bookingStatus"
            :paymentType="booking.idPayment"
            :showComleteButton="false"
            :showCancelButton="booking.bookingStatus !== 'CANCELADA'"
          />
        </div>
      </Transition>
    </section>
    <div v-else class="not-booking-now">
      <h2 class="not-booking-now__title">
        {{ $t("bookings_view.not_bookings") }}
      </h2>
      <img :src="GIF_CAMPFIRE" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.user-bookings-view {
  @include flex-column;
  gap: 20px;

  & > h1 {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 20px;
  }

  & > .bookings_container {
    @include flex-column;
    gap: 10px;

    & > .bookings_container__tabs {
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
  }
}

.not-booking-now {
  @include flex-column-center;
  & > .not-booking-now__title {
    text-align: center;
    font-size: 2rem;
    font-weight: 400;
  }

  & > img {
    width: 400px;
    height: auto;
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .user-bookings-view {
    margin-top: 0;
    gap: 10px;

    & > h1 {
      text-align: center;
    }
  }
}
</style>