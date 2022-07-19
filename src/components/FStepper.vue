<template>
  <v-stepper v-model="stepperSelect" flat>
    <v-stepper-header flat>
      <v-stepper-step
        :complete="stepperSelect > settperIndx"
        :step="settperIndx"
        v-for="(stepper, settperIndx) in stepperList"
        :key="settperIndx"
      >
        {{ stepper.name }}
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content
        class="pa-4"
        :step="settperIndx"
        v-for="(stepper, settperIndx) in stepperCompList"
        :key="settperIndx"
      >
        <v-card color="grey lighten-5" flat min-height="600">
          <v-card-text class="pb-0">
            <template
              v-for="(stepperComp, stepperCompIndx) in stepper.props
                .componentList"
            >
              <template v-if="!!stepperComp.modelId">
                <component
                  :ref="stepperComp.ref"
                  :key="stepperCompIndx"
                  :form-disabled="stepperComp.disabled"
                  dense
                  :is="stepperComp.componentName"
                  v-model="myForm[stepperComp.modelId]"
                  v-bind="stepperComp.props"
                />
              </template>
              <template v-if="!stepperComp.modelId">
                <component
                  :ref="stepperComp.ref"
                  :key="stepperCompIndx"
                  :form-disabled="stepperComp.disabled"
                  dense
                  :is="stepperComp.componentName"
                  v-model="myForm"
                  v-bind="stepperComp.props"
                />
              </template>
            </template>
          </v-card-text>
          <v-card-actions class="pt-0">
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
        <kbd>{{ myForm }}</kbd>
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
  value!: object;

  @Prop({
    default: () => {
      return [];
    },
  })
  stepperList!: Stepper[];

  stepperSelect = 0;

  get stepperCompList() {
    return this.stepperList.map((comp) => comp.componentData());
  }

  get myForm() {
    return this.value;
  }

  set myForm(value) {
    this.value = value;
  }

  @Watch("myForm")
  updateMyForm(value: any, oldValue: any) {
    //  if(!!this.modelId) {
    //    const newValue = {...this.value}
    //    newValue[this.modelId] = this.myForm
    //    this.$emit("input", newValue);
    //  } else {
    //    this.$emit("input", newValue);
    //  }
    this.$emit("input", value);
  }

  nextStepper() {
    this.stepperSelect = this.stepperSelect + 1;
  }

  previousStepper() {
    if (this.stepperSelect > 0) {
      this.stepperSelect = this.stepperSelect - 1;
    }
  }
}
</script>
