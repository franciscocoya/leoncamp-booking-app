<script setup>

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import EditForm from "@/components/Forms/EditForm.vue";

</script>

<template>
    <div class="accomodation-edit-view">
        <h1>Editar el alojamiento</h1>
        <div class="accomodation-edit__wrapper">
            <h2>Datos del alojamiento</h2>
            <EditForm />
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.accomodation-edit-view{
    margin: 50px;

    & > .accomodation-edit__wrapper{
        @include flex-column-center;
    }
}
</style>