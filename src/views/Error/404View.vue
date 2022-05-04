<script setup>
import { useRouter } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";

const router = useRouter();

</script>


<template>
    <div class="error-404">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>
            La página que estás buscando no existe.
        </p>
        <BaseButton text="Volver a inicio" buttonStyle="baseButton-secondary--filled" @click="router.push('/')"/>

    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.error-404{
    @include flex-column-center;
    gap: 10px;

    height: calc(100vh - $header-height);

    & > h1, & > h2, & > p{
        color: $color-dark;
    }

    & > h1{
        font-size: 5rem;
        margin: 0;
        background-color: $color-tertiary-light;
        padding: 10px;
    }

    & > h2{
        font-size: 2rem;
        font-weight: 600;
    }

    & > p{
        font-size: 1rem;
    }
}
</style>