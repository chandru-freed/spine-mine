<template>
  <div class="d-flex flex-row align-start flex-wrap justify-start py-2">
    <v-subheader class="col-12">{{ label }}</v-subheader>
    <div
      v-for="(fieldMetaData, indx) in fieldMetaDataList"
      :key="indx"
      :class="fieldMetaData.boundaryClass"
    >
      <ValidationProvider
        :vid="fieldMetaData.props.id"
        :name="fieldMetaData.props.label"
        :rules="checkForChange() ? fieldMetaData.rules : ''"
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
import FBudgetMiniForm from "./FBudgetMiniForm.vue";
import FFileField from "./FFileField.vue";
import FSwitch from "./FSwitch.vue";
import FPasswordField from "./FPasswordField.vue";
import FCurrencyField from "./FCurrencyField.vue";
import ModelVue from "@/components/generic/ModelVue";

import FAutoCompleteField from "./FAutoCompleteField.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FNumberTextField from "./FNumberTextField.vue";
import FNupayBankSelectField from "./FNupayBankSelectField.vue";
import FDateSelectField from "./FDateSelectField.vue";
import FRemoteComboBoxField from "./FRemoteComboBoxField.vue";
import FAgeField from "./FAgeField.vue";
import FRemoteAutoCompleteField from "./FRemoteAutoCompleteField.vue";
import FCityAutoCompleteField from "./FCityAutoCompleteField.vue";
import FStateSelectField from "./FStateSelectField.vue";

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
    FAutoCompleteField,
    FNumberTextField,
    FNupayBankSelectField,
    FDateSelectField,
    FRemoteComboBoxField,
    FAgeField,
    FRemoteAutoCompleteField,
    FCityAutoCompleteField,
    FStateSelectField
  },
})
export default class FMiniForm extends ModelVue {
  @Prop()
  label: string;

  @Prop()
  fieldMetaDataList: any[];

  @Prop({ default: false }) // Todo: disabled remve from html and put it in MDP
  disabled: boolean;

  @Prop()
  mandatory: boolean;

  checkForChange() {
    return this.mandatory || this.fieldMetaDataList.some((item) => {
      console.log("Hey i am getting called")
      const val = this.selectModel(this.modelValue, item.dataSelectorKey);
      return val !== undefined && val !== "";
    });
  }
}
</script>
