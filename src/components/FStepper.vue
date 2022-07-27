<template>
  <v-stepper v-model="selectedStep" flat non-linear >
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
    

    <v-stepper-items>
      <v-stepper-content
        class="pa-4"
        :step="stepIndx"
        v-for="(step, stepIndx) in stepMetaDataListComputed"
        :key="stepIndx"
      >
        <v-card color="grey lighten-5" flat min-height="600">
          Stepper Data : {{stepperDataComputed}}
          <v-card-text class="pb-0">
            <template
              v-for="(formComponent, formComponentIndx) in step.props
                .formList"
            >
              <template v-if="!!formComponent.dataSelectorKey">
                <component
                  :ref="formComponent.formRef"
                  :key="formComponentIndx"
                  :is="formComponent.componentName"
                  v-model="stepperDataComputed[formComponent.dataSelectorKey]"
                  v-bind="formComponent.props"
                />
              </template>
              <template v-if="!formComponent.dataSelectorKey">
                <component
                  :ref="formComponent.formRef"
                  :key="formComponentIndx"
                  :is="formComponent.componentName"
                  v-model="stepperDataComputed"
                  v-bind="formComponent.props"
                />
              </template>
            </template>
            <template
              v-for="(componentMetaData, componentMetaDataIndx) in step.props
                .componentList"
            >
              <template v-if="!!componentMetaData.dataSelectorKey">
                <component
                  :ref="componentMetaData.formRef"
                  :key="componentMetaDataIndx"
                  :is="componentMetaData.componentName"
                  v-model="stepperDataComputed[componentMetaData.dataSelectorKey]"
                  v-bind="componentMetaData.props"
                />
              </template>
              <template v-if="!componentMetaData.dataSelectorKey">
                <component
                  :ref="componentMetaData.formRef"
                  :key="componentMetaDataIndx"
                  :is="componentMetaData.componentName"
                  v-model="stepperDataComputed"
                  v-bind="componentMetaData.props"
                />
              </template>
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

import FPaymentPlan from "@/section/spineapp/components/task/enrollment/components/FPaymentPlan.vue";

@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "f-form": FForm,
    "f-payment-plan": FPaymentPlan
  },
})
export default class FStepper extends Vue {
  

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

  set stepperDataComputed(value) {
    this.stepperData = value;
  }

  // WATCH as the MODEL VALUE is a OBJ -
  // And Fields inside the Object if change does not call set of Computed
  @Watch("stepperData")
  updateMyForm(value: any, oldValue: any) {
    this.$emit("input", value);
  }

  mounted() {
    this.stepperData = this.value;
  }
  // V-MODEL END

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
