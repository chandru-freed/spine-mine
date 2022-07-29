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
                :key="stepIndx"
                :is="step.props.component.componentName"
                v-model="
                  stepperDataComputed[step.props.component.dataSelectorKey]
                "
                v-bind="step.props.component.props"
              />
            </template>
            <template v-if="!step.props.component.dataSelectorKey">
              <component
                :ref="step.props.component.componentRef"
                :key="stepIndx"
                :is="step.props.component.componentName"
                v-model="stepperDataComputed"
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

abstract class ModelVue extends Vue {
  // V-MODEL START
  @Prop({
    default: () => {
      return {};
    },
  })
  value!: any;

  stepperData: any = {};

  get stepperDataComputed(): any {
    return this.stepperData;
  }

  set stepperDataComputed(passingValue) {
    this.stepperData = passingValue;
  }

  // WATCH as the MODEL VALUE is a OBJ -
  // And Fields inside the Object if change does not call set of Computed
  @Watch("stepperData")
  updateStepperData(newValue: any, oldValue: any) {
    this.$emit("input", newValue);
  }

  mounted() {
    this.stepperData = this.value;
    this.mounted2();
  }

  abstract mounted2(): void;
  // V-MODEL END
}

@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "f-form": FForm,
    "f-creditor": FCreditor,
    "f-budget": FBudget,
  },
})
export default class CollectClientInfoTaskStepper extends Vue {

  // mounted2(){
  //   console.log("I am in mounted2");
  // }

  // V-MODEL START
  @Prop({
    default: () => {
      return {};
    },
  })
  value!: any;

  stepperData: any = {};

  get stepperDataComputed(): any {
    return this.stepperData;
  }

  set stepperDataComputed(passingValue) {
    this.stepperData = passingValue;
  }

  // WATCH as the MODEL VALUE is a OBJ -
  // And Fields inside the Object if change does not call set of Computed
  @Watch("stepperData")
  updateStepperData(newValue: any, oldValue: any) {
    console.log("stepper watch");
    console.log(newValue)
    this.$emit("input", newValue);
  }

  mounted() {
    console.log("I am in stepper mounted")
    console.log(this.value);
    this.stepperData = this.value;
  }

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
