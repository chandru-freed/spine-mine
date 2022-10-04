<template>
  <v-stepper :value="selectModel(selectedStep, undefined)"
  @change="newVal => changeStepQuery(newVal)"
  flat non-linear>
    <v-stepper-header flat>
      <!-- :editable="stepIndx<selectedStep" -->
      <v-stepper-step
        :editable="stepsEditable"
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
import FCreditor from "@/components/generic/file/creditor/FCreditor.vue";
import FBudget from "@/components/generic/file/budget/FBudget.vue";
import FPaymentPlan from "@/components/generic/file/paymentPlan/FPaymentPlan.vue";
import FDocument from "@/components/generic/file/documentUpload/FDocument.vue";
import CLProfile from "./clientProfile/CLProfile.vue";
import FMarkComplete from "./file/markcomplete/FMarkComplete.vue";
import FEMandate from "./file/eMandate/FEMandate.vue";

@Component({
  components: {
    FForm,
    CLProfile,
    FCreditor,
    FBudget,
    FPaymentPlan,
    FDocument,
    FMarkComplete,
    FEMandate
  },
})
export default class FFooStepper extends ModelVue {
  // selectedStep = 0;

  get selectedStep(): number {
    const step = this.$route.query.step ? Number(this.$route.query.step) : 0;
    return step;
  }

  @Prop()
  myRefName: string;

  @Prop()
  stepMetaDataList: any[];
  
  @Prop({
    default: false
  })
  stepsEditable: boolean;

  changeStepQuery(val: any) {
    console.log(val)
    this.$router.push({ query: { step: val.toString()  }});
  }
}
</script>
