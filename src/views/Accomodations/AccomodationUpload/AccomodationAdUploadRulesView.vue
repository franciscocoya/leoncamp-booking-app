<script setup>
import { onMounted, ref } from "vue";

// Componentes
import TextEditChip from "@/components/Chips/TextEditChip.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";

const accomodationStore = useAccomodationStore();

const allAvailableRules = ref([]);

const handleRuleChipChange = (e, ruleToAdd) => {
  let accomodationAccRuleId = {
    idAccomodation: accomodationStore.registerNumber,
    idAccomodationRule: {
      id: ruleToAdd.id,
      rule: ruleToAdd.rule,
    },
  };

  e.target.checked
    ? accomodationStore.accomodationRules.push(accomodationAccRuleId)
    : accomodationStore.accomodationRules.shift(accomodationAccRuleId);
};

onMounted(async () => {
  allAvailableRules.value = await accomodationStore.getAllRules();
});
</script>

<template>
  <div class="accomodation-ad-upload-rules-view">
    <h2 v-once>Normas</h2>
    <p>Marca la casilla de las normas del alojamiento.</p>
    <div class="accomodation-ad-upload-rules__wrapper">
      <TextEditChip
        v-for="rule in allAvailableRules"
        :key="`rule-${rule.id}`"
        :chipTitle="`Haz click para eliminar la norma ${rule.rule}`"
        :chipText="rule.rule"
        :isServiceEnabled="
          accomodationStore.accomodationRules.some(
            (r) => r.idAccomodationRule.id === rule.id
          )
        "
        @handleCheckBoxChange="(e) => handleRuleChipChange(e, rule)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.accomodation-ad-upload-rules-view {
  & > .accomodation-ad-upload-rules__wrapper {
    @include flex-row;
    gap: 10px;
    flex-wrap: wrap;
  }
}
</style>