<template>
  <!-- <div class="d-flex flex-row align-start flex-wrap justify-start py-2 align-stretch"> -->
    <div class="py-2">
    <v-card
      outlined
      class="col-12 d-flex flex-column align-stretch"
      :min-height="minHeight"
    >
      <v-subheader class="pa-2 mb-2">{{ label }}</v-subheader>
      <div
        v-for="(fieldMetaData, indx) in fieldMetaDataList"
        :key="indx"
        :class="fieldMetaData.boundaryClass"
      >
        <ValidationProvider
          :vid="fieldMetaData.props.id"
          :name="fieldMetaData.props.label"
          :rules="fieldMetaData.rules"
          v-slot="{ errors }"
        >
          <component
            :is="fieldMetaData.componentName"
            v-bind="fieldMetaData.props"
            :value="selectModel(modelValue, fieldMetaData.dataSelectorKey)"
            @input="
              (newValue) =>
                updateModel(modelValue, newValue, fieldMetaData.dataSelectorKey)
            "
            :error-messages="errors"
            :disabled="disabled"
          ></component>
        </ValidationProvider>
      </div>
      <div class="col-12 px-2" style="margin-top: auto;">
        <FCurrencyField
          outlined
          dense
          :value="totalAmount"
          :label="`TOTAL`"
          disabled
        ></FCurrencyField>
      </div>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import FTextField from "./FTextField.vue";
import FSelectField from "./FSelectField.vue";
import FNumberField from "./FNumberField.vue";
import FBtn from "../../FBtn.vue";
import FTextarea from "./FTextarea.vue";
import FDateField from "./FDateField.vue";
import FFileField from "./FFileField.vue";
import FSwitch from "./FSwitch.vue";
import FPasswordField from "./FPasswordField.vue";
import FCurrencyField from "./FCurrencyField.vue";
import ModelVue from "@/components/generic/ModelVue";

import { ValidationObserver, ValidationProvider } from "vee-validate";

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    FTextField,
    FNumberField,
    FTextarea,
    FSelectField,
    FBtn,
    FDateField,
    FBudgetMiniForm,
    FFileField,
    FSwitch,
    FPasswordField,
    FCurrencyField,
  },
})
export default class FBudgetMiniForm extends ModelVue {
  get totalAmount() {
    return Object.values(this.modelValue).reduce(
      (accumulator: number, objValue: any) => {
        const val = isNaN(objValue)?0: objValue;
        return accumulator + val;
      },
      0
    );
  }

  @Prop()
  label: string;

  @Prop()
  fieldMetaDataList: any[];

  @Prop({ default: false }) // Todo: disabled remve from html and put it in MDP
  disabled: boolean;

  @Prop()
  minHeight: string;
}
</script>
