<template>
  <v-stepper v-model="selectedStep" flat non-linear>
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
            <template v-if="!!step.stepContent.dataSelectorKey">
              <component
                :ref="step.stepContent.myRefName"
                :is="step.stepContent.componentName"
                v-model="modelValue[step.stepContent.dataSelectorKey]"
                v-bind="step.stepContent.props"
              />
            </template>
            <template v-if="!step.stepContent.dataSelectorKey">
              <component
                :ref="step.stepContent.myRefName"
                :is="step.stepContent.componentName"
                v-model="modelValue"
                v-bind="step.stepContent.props"
              />
            </template>
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
import CCITCreditorStep from "@/section/spineapp/components/task/enrollment/collectClientInfoTask/step2/CCITCreditorStep.vue";
import CCITBudgetStep from "@/section/spineapp/components/task/enrollment/collectClientInfoTask/step3/CCITBudgetStep.vue";

@Component({
  components: {
    FForm,
    CCITCreditorStep,
    CCITBudgetStep
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
