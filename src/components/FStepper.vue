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
        v-for="(step, stepIndx) in stepListX"
        :key="stepIndx"
      >
        <v-card color="grey lighten-5" flat min-height="600">
          <v-card-text class="pb-0">
            <template
              v-for="(stepComponent, stepComponentIndx) in step.props.componentList"
            >
              <template v-if="!!stepComponent.modelId">
                <component
                  :ref="stepComponent.ref"
                  :key="stepComponentIndx"
                  :form-disabled="stepComponent.disabled"
                  dense
                  :is="stepComponent.componentName"
                  v-model="stepperData[stepComponent.modelId]"
                  v-bind="stepComponent.props"
                />
              </template>
              <template v-if="!stepComponent.modelId">
                <component
                  :ref="stepComponent.ref"
                  :key="stepComponentIndx"
                  :form-disabled="stepComponent.disabled"
                  dense
                  :is="stepComponent.componentName"
                  v-model="stepperData"
                  v-bind="stepComponent.props"
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
        <kbd>{{ stepperData }}</kbd>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import {
  VTextField,
  VSelect,
  VCheckbox,
  VSwitch,
  VTextarea,
  VCombobox,
  VAutocomplete,
  VFileInput,
} from "vuetify/lib";
import { Field } from "src-def/form/FormComponentDef";
import FBtn from "@/components/FBtn.vue";
import FForm from "@/components/FForm.vue";
import {
  TextField,
  EmailField,
  SelectField,
  CheckboxField,
  SwitchField,
  TextareaField,
  ComboboxField,
  AutocompleteField,
  FileField,
  MiniForm,
  Form,
  Button,
  Stepper,
  Step
} from "@/../src-def/form/FormComponentDef";
@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "v-text-field": VTextField,
    "v-select": VSelect,
    "v-checkbox": VCheckbox,
    "v-switch": VSwitch,
    "v-textarea": VTextarea,
    "v-combobox": VCombobox,
    "v-autocomplete": VAutocomplete,
    "v-file-input": VFileInput,
    "mini-form": MiniForm,
    "f-btn": FBtn,
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

  get stepListX() {
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
