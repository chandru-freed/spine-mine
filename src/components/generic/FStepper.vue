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
          <v-card-text class="pa-0 d-flex justify-center">
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
import FCreditor from "@/components/generic/file/creditor/FCreditor.vue";
import FBudget from "@/components/generic/file/budget/FBudget.vue";
import FPaymentPlan from "@/components/generic/file/paymentPlan/FPaymentPlan.vue";
import FDocument from "@/components/generic/file/documentUpload/FDocument.vue";

@Component({
  components: {
    FForm,
    FCreditor,
    FBudget,
    FPaymentPlan,
    FDocument,
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
