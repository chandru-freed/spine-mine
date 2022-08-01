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
        {{ step.name }}
      </v-stepper-step>
    </v-stepper-header>
  {{value}}
    <v-stepper-items>
      <v-stepper-content
        class="pa-4"
        :step="stepIndx"
        v-for="(step, stepIndx) in stepMetaDataListComputed"
        :key="stepIndx"
      >
        <v-card color="grey lighten-5" flat min-height="600">
          <v-card-text class="pb-0">
            <template v-if="!!step.props.component.dataSelectorKey">
              <component
                :ref="step.props.component.componentRef"
                :is="step.props.component.componentName"
                v-model="
                  modelValue[step.props.component.dataSelectorKey]
                "
                v-bind="step.props.component.props"
              />
            </template>
            <template v-if="!step.props.component.dataSelectorKey">
              <component
                :ref="step.props.component.componentRef"
                :is="step.props.component.componentName"
                v-model="modelValue"
                v-bind="step.props.component.props"
              />
            </template>
          </v-card-text>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FForm from "@/components/form/FForm.vue";
import { StepMetaData } from "@/../src-def/form/FormComponentDef";

import FCreditor from "@/section/spineapp/components/task/enrollment/components/FCreditor.vue";
import FBudget from "@/section/spineapp/components/task/enrollment/components/FBudget.vue";
import ModelVue from "src-def/ModelVue";



@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "f-form": FForm,
    "f-creditor": FCreditor,
    "f-budget": FBudget,
  },
})
export default class CollectClientInfoTaskStepper extends ModelVue {

  @Prop({
    default: () => {
      return [];
    },
  })
  stepMetaDataList!: StepMetaData[];

  selectedStep = 0;

  get stepMetaDataListComputed() {
    return this.stepMetaDataList.map((comp) => comp.componentMetaData());
  }

  nextStepper() {
    this.selectedStep = this.selectedStep + 1;
  }

  previousStepper() {
    if (this.selectedStep > 0) {
      this.selectedStep = this.selectedStep - 1;
    }
  }

}
</script>
