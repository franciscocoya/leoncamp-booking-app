<script setup>
import { onMounted, ref } from "vue";
import{ onBeforeRouteLeave} from 'vue-router';

// Componentes
import TextEditChip from "@/components/Chips/TextEditChip.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useFormErrorsStore } from "@/store/formErrors";

const accomodationStore = useAccomodationStore();
const formErrorsStore = useFormErrorsStore();

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
  formErrorsStore.enableNextButton = true;
});

onBeforeRouteLeave((from, to) => {
  if (
    formErrorsStore.enableNextButton == false &&
    !headerRoutes.includes(to.name)
  ) {
    return false;
  }
});
</script>

<template>
  <div class="accomodation-ad-upload-rules-view">
    <h2 v-once v-t="'upload_accomodation_view.step4.title'"></h2>
    <p v-once v-t="'upload_accomodation_view.step4.subtitle'"></p>
    <div class="accomodation-ad-upload-rules__wrapper">
      <TextEditChip
        v-for="rule in allAvailableRules"
        :key="`rule-${rule.id}`"
        :chipTitle="`Haz click para eliminar la norma ${rule.rule}`"
        :chipText="$tc(`accomodation_rules[${rule.id - 1}]`)"
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