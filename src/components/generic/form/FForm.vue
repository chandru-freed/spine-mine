<template>
  <ValidationObserver :ref="myRefName" v-slot="{}">
    <v-form
      :disabled="disabled"
      class="d-flex flex-row align-start flex-wrap justify-start py-2"
    >
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
            @input="(newValue) => updateModel(modelValue, newValue, fieldMetaData.dataSelectorKey)"
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
        v-for="(actionMetaData, indx) in actionMetaDataList"
        :key="indx"
      >
        <component
          :is="actionMetaData.componentName"
          v-bind="actionMetaData.props"
        ></component>
      </div>
    </div>
  </ValidationObserver>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import FTextField from "./field/FTextField.vue";
import FSelectField from "./field/FSelectField.vue";
import FNumberField from "./field/FNumberField.vue"
import FBtn from "../FBtn.vue";
import ModelVue from "../ModelVue";
import FMiniForm from "./field/FMiniForm.vue";
import FTextarea from "./field/FTextarea.vue"
import FDateField from "./field/FDateField.vue"
import FBudgetMiniForm from "./field/FBudgetMiniForm.vue"
import FFileField from "./field/FFileField.vue"
import FSwitch from "./field/FSwitch.vue"
import FPasswordField from "./field/FPasswordField.vue"
import FCurrencyField from "./field/FCurrencyField.vue"
import FPhoneField from "./field/FPhoneField.vue"



import { ValidationObserver, ValidationProvider } from "vee-validate";

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
    FPhoneField
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




  
}
</script>