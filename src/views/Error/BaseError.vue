<script setup>
import { useRouter } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";

const router = useRouter();
</script>


<template>
  <KeepAlive>
    <div class="base-error" v-once>
      <slot />
      <BaseButton
        text="Volver a inicio"
        buttonStyle="baseButton-secondary--filled"
        @click="router.push('/')"
      />
    </div>
  </KeepAlive>
</template>

<style lang="scss" scoped deep>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.base-error {
  @include flex-column-center;
  gap: 10px;
  height: calc(100vh - $header-height);
}
</style>