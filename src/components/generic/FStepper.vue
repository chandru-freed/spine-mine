<template>
  <v-stepper
    :value="selectModel(selectedStep, undefined)"
    @change="(newValue) => updateModel(selectedStep, newValue, undefined)"
    flat
    non-linear
  >
    <v-stepper-header flat>
      <v-stepper-step
        editable
        :complete="selectedStep > stepIndx"
        :step="stepIndx"
        v-for="(step, stepIndx) in stepMetaDataList"
        :key="stepIndx"
      >
        {{ step.stepName }}
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content
        class="pa-4"
        :step="stepIndx"
        v-for="(step, stepIndx) in stepMetaDataList"
        :key="stepIndx"
      >
        <v-card color="grey lighten-4" flat min-height="600">
          <v-card-text class="pa-0">
            <component
              :ref="step.stepContent.myRefName"
              :is="step.stepContent.componentName"
              :value="selectModel(modelValue, step.stepContent.dataSelectorKey)"
              @input="
                (newValue) =>
                  updateModel(
                    modelValue,
                    newValue,
                    step.stepContent.dataSelectorKey
                  )
              "
              v-bind="step.stepContent.props"
            />
          </v-card-text>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import ModelVue from "./ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import CCITCreditorStep from "@/section/spineapp/components/task/enrollment/collectClientInfo/step2/CCITCreditorStep.vue";
import CCITBudgetStep from "@/section/spineapp/components/task/enrollment/collectClientInfo/step3/CCITBudgetStep.vue";
import CCITPaymentPlanStep from "@/section/spineapp/components/task/enrollment/collectClientInfo/step4/CCITPaymentPlanStep.vue";
import CCITDocumentStep from "@/section/spineapp/components/task/enrollment/collectClientInfo/step6/CCITDocumentStep.vue";

@Component({
  components: {
    FForm,
    CCITCreditorStep,
    CCITBudgetStep,
    CCITPaymentPlanStep,
    CCITDocumentStep,
  },
})
export default class FStepper extends ModelVue {
  selectedStep = 0;

  @Prop()
  myRefName: string;

  @Prop()
  stepMetaDataList: any[];
}
</script>
