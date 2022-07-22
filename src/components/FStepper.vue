<template>
  <v-stepper v-model="selectedStep" flat>
    <v-stepper-header flat>
      <v-stepper-step
        :complete="selectedStep > stepIndx"
        :step="stepIndx"
        v-for="(step, stepIndx) in stepList"
        :key="stepIndx"
      >
        {{ step.name }}
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content
        class="pa-4"
        :step="stepIndx"
        v-for="(step, stepIndx) in stepListComputed"
        :key="stepIndx"
      >
        <v-card color="grey lighten-5" flat min-height="600">
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
                  v-model="stepperData[formComponent.dataSelectorKey]"
                  v-bind="formComponent.props"
                />
              </template>
              <template v-if="!formComponent.dataSelectorKey">
                <component
                  :ref="formComponent.formRef"
                  :key="formComponentIndx"
                  :is="formComponent.componentName"
                  v-model="stepperData"
                  v-bind="formComponent.props"
                />
              </template>
            </template>
          </v-card-text>
          <v-card-actions class="">
            <v-btn
              text
              small
              color="secondary"
              outlined
              @click="previousStepper"
              >Previous</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn text small color="secondary" outlined @click="nextStepper"
              >Next</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FForm from "@/components/FForm.vue";
import { Step } from "@/../src-def/form/FormComponentDef";
@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "f-form": FForm,
  },
})
export default class FStepper extends Vue {
  @Prop({
    default: () => {
      return {};
    },
  })
  value!: any;

  @Prop({
    default: () => {
      return [];
    },
  })
  stepList!: Step[];

  selectedStep = 0;

  get stepListComputed() {
    return this.stepList.map((comp) => comp.componentData());
  }

  get stepperData(): any {
    return this.value;
  }

  set stepperData(value: any) {
    this.value = value;
  }

  @Watch("stepperData")
  updateMyForm(value: any, oldValue: any) {
    this.$emit("input", value);
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
