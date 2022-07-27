<template>
  <v-stepper v-model="selectedStep" flat non-linear>
    <v-stepper-header flat>
      <v-stepper-step
        editable
        :complete="selectedStep > stepIndx"
        :step="stepIndx"
        v-for="(step, stepIndx) in stepMetaDataListComputed"
        :key="stepIndx"
      >
        {{ step.name }}
      </v-stepper-step>
    </v-stepper-header>
  
    <v-stepper-items>
      <v-stepper-content
        class="pa-4"
        :step="stepIndx"
        v-for="(stepMetaData, stepIndx) in stepMetaDataListComputed"
        :key="stepIndx"
      >
        <v-card color="grey lighten-5" flat min-height="600">
          Stepper Data : {{ stepperDataComputed }}
          <!-- StepMetaData: {{stepMetaData}} -->
          <v-card-text class="pb-0">
            <!-- <template v-if="!!stepMetaData.props.dataSelectorKey">
              <component
                :ref="stepMetaData.props.formRef"
                :key="'form'+stepIndx"
                :is="stepMetaData.props.componentName"
                v-model="stepperDataComputed[stepMetaData.props.dataSelectorKey]"
                v-bind="stepMetaData.props.props"
              />
            </template>
            <template v-if="!stepMetaData.props.dataSelectorKey">
              <component
                :ref="stepMetaData.props.formRef"
                :key="'form'+stepIndx"
                :is="stepMetaData.props.componentName"
                v-model="stepperDataComputed"
                v-bind="stepMetaData.props.props"
              />
            </template> -->
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

@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "f-form": FForm,
  },
})
export default class CollectClientInfoTaskStepper extends Vue {
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
    return this.stepMetaDataList;
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
