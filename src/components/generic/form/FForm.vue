<template>
  <div :class="boundaryClass">
    <ValidationObserver :ref="myRefName" v-slot="{}">
      <v-form
        :disabled="disabled"
        :readonly="readonly"
        class="d-flex flex-row align-start flex-wrap justify-start py-2"
      >
        <div
          v-for="(fieldMetaData, indx) in fieldMetaDataListFiltered"
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
                  updateModel(
                    modelValue,
                    newValue,
                    fieldMetaData.dataSelectorKey
                  )
              "
              :error-messages="errors"
            ></component>
          </ValidationProvider>
        </div>
      </v-form>
      <div
        v-if="!disabled"
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
      >
        <div
          :class="actionMetaData.boundaryClass"
          v-for="(actionMetaData, indx) in actionMetaDataListFiltered"
          :key="indx"
        >
          <component
            :is="actionMetaData.componentName"
            v-bind="actionMetaData.props"
          ></component>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import FTextField from "./field/FTextField.vue";
import FSelectField from "./field/FSelectField.vue";
import FNumberField from "./field/FNumberField.vue";
import FBtn from "../FBtn.vue";
import ModelVue from "../ModelVue";
import FMiniForm from "./field/FMiniForm.vue";
import FTextarea from "./field/FTextarea.vue";
import FDateField from "./field/FDateField.vue";
import FBudgetMiniForm from "./field/FBudgetMiniForm.vue";
import FFileField from "./field/FFileField.vue";
import FSwitch from "./field/FSwitch.vue";
import FPasswordField from "./field/FPasswordField.vue";
import FCurrencyField from "./field/FCurrencyField.vue";
import FAutoCompleteField from "./field/FAutoCompleteField.vue";
import FDateSelectField from "./field/FDateSelectField.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FIFSCCodeField from "./field/FIFSCCodeField.vue";
import FTimeField from "./field/FTimeField.vue";
import FGompaUserRemoteAutoCompleteField from "./field/FGompaUserRemoteAutoComplete.vue";
import FRemoteComboBoxField from "./field/FRemoteComboBoxField.vue";
import FNumberTextField from "./field/FNumberTextField.vue";
import FRemoteAutoCompleteField from "./field/FRemoteAutoCompleteField.vue";
import FDateTimeSelectField from "./field/FDateTimeSelectField.vue";
import FNupayBankSelectField from "./field/FNupayBankSelectField.vue";
import FUploadFileField from "./field/FCFAWSUploadFileField.vue";
import FUploadFileFieldForClient from "./field/FCFAWSUploadFileField.vue";
import FCFAWSUploadFileField from "./field/FCFAWSUploadFileField.vue";
import FEMandateSelectField from "./field/FEMandateSelectField.vue";
import FAWSUploadFileField from "./field/FAWSUploadFileField.vue";
import FRangeSlider from "./field/FRangeSlider.vue";

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    FTextField,
    FTextarea,
    FDateField,
    FSelectField,
    FNumberField,
    FBtn,
    FMiniForm,
    FBudgetMiniForm,
    FFileField,
    FSwitch,
    FPasswordField,
    FCurrencyField,
    FAutoCompleteField,
    FDateSelectField,
    FIFSCCodeField,
    FTimeField,
    FGompaUserRemoteAutoCompleteField,
    FRemoteComboBoxField,
    FNumberTextField,
    FRemoteAutoCompleteField,
    FDateTimeSelectField,
    FNupayBankSelectField,
    FCFAWSUploadFileField,
    FEMandateSelectField,
    FAWSUploadFileField,
    FRangeSlider
  },
})
export default class FForm extends ModelVue {
  @Prop()
  myRefName: string;

  @Prop()
  fieldMetaDataList: any[];

  @Prop()
  actionMetaDataList: any[];

  @Prop({ default: false })
  disabled: boolean;

  @Prop({ default: false })
  readonly: boolean;

  @Prop({ default: "" })
  boundaryClass: string;

  submitForm(action: () => void) {
    const observerRef: any = this.$refs[this.myRefName];
    observerRef.validate().then((success: boolean) => {
      if (success) {
        console.log("Validation Successfull");
        action();
        return;
      } else {
        console.log("Validation UN Successfull");
      }
    });
  }

  get fieldMetaDataListFiltered() {
    return this.fieldMetaDataList.filter(
      (fieldMetaData) =>
        fieldMetaData.condition === undefined ||
        fieldMetaData.condition === true
    );
  }

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }

  isDirty(rules: string) {
    return(rules.includes('required'))
  }
}
</script>
