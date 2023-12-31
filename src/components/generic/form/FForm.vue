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
              :ref="fieldMetaData.myRefName"
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
  <!-- Hidden field implementation -->
      <template v-if="showHiddenFields">
         <div
          v-for="(fieldMetaData, indx) in hiddenFieldMetaDataList"
          :key="'hidden'+indx"
          :class="fieldMetaData.boundaryClass"
        >
            <component
              :is="fieldMetaData.componentName"
              :ref="fieldMetaData.myRefName"
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
            ></component>
        </div>
      </template>

      <v-btn v-if="hiddenFieldMetaDataList.length>0" text color="primary" class="text-center" @click="showHiddenFields = !showHiddenFields">{{showHiddenFields?'Show less':'Show more'}} </v-btn>

      <!-- Hidden field implementation -->
        
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
import FClientLanguageSelectField from "./field/FClientLanguageSelectField.vue";
import FAgeField from "./field/FAgeField.vue";

import FAddressMiniForm from "./field/FAddressMiniForm.vue";
import FGenLeadSquareIdField from "./field/FGenLeadSquareIdField.vue";
import FCityAutoCompleteField from "./field/FCityAutoCompleteField.vue";
import FStateSelectField from "./field/FStateSelectField.vue";
import FAWSCRUploadFileField from "./field/FAWSCRUploadFileField.vue";
import FClCreditorSelectField from "./field/FClCreditorSelectField.vue";
import FRemoteSelectField from "./field/FRemoteSelectField.vue";
import FCheckboxGroup from "./field/FCheckboxGroup.vue";
import FPaymentActionStatusBtn from "../FPaymentActionStatusBtn.vue";

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
    FRangeSlider,
    FClientLanguageSelectField,
    FAgeField,
    FAddressMiniForm,
    FGenLeadSquareIdField,
    FCityAutoCompleteField,
    FStateSelectField,
    FAWSCRUploadFileField,
    FClCreditorSelectField,
    FRemoteSelectField,
    FCheckboxGroup,
    FPaymentActionStatusBtn
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

  showHiddenFields: boolean = false;

  submitForm(action: () => void) {
    const observerRef: any = this.$refs[this.myRefName];
    observerRef.validate().then((success: boolean) => {
      if (success) {
        action();
        return;
      } else {
      }
    });
  }

  async reset() {
    const observerRef: any = this.$refs[this.myRefName];
    await observerRef.reset();
  }

  get fieldMetaDataListFiltered() {
    return this.fieldMetaDataList.filter(
      (fieldMetaData) =>
        (fieldMetaData.condition === undefined ||
        fieldMetaData.condition === true)&&!fieldMetaData.hidden
    );
  }

  get hiddenFieldMetaDataList() {
    return this.fieldMetaDataList.filter(
      (fieldMetaData) =>
        (fieldMetaData.condition === undefined ||
        fieldMetaData.condition === true)&&fieldMetaData.hidden===true
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
