<template>
  <div class="d-flex flex-row align-start flex-wrap justify-start py-2">
    <v-card outlined class="col-12">
    <v-subheader class=" col-12">{{label}}</v-subheader>
    <div
      v-for="(fieldMetaData, indx) in fieldMetaDataList"
      :key="indx"
      :class="fieldMetaData.boundaryClass"
    >
        <component
          :is="fieldMetaData.componentName"
          v-bind="fieldMetaData.props"
          v-model="modelValue[fieldMetaData.dataSelectorKey]"
          :disabled="disabled"
        ></component>
    </div>
    <div
      class="col-12 px-2"
    >
        <f-number-field outlined dense :value="totalAmount" :label="`TOTAL`" disabled></f-number-field>
    </div>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import FTextField from "./FTextField.vue";
import FNumberField from "./FNumberField.vue"
import FTextarea from "./FTextarea.vue"
import FSelectField from "./FSelectField.vue";
import FBtn from "@/components/generic/FBtn.vue";
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
  },
})
export default class FBudgetMiniForm extends ModelVue {



  get totalAmount() {
    return Object.values(this.modelValue).reduce((accumulator: number, objValue: any) => {
      return accumulator + objValue;
    }, 0);
  }

  @Prop()
  label: string

  @Prop()
  fieldMetaDataList: any[];

  @Prop({ default: false }) // Todo: disabled remve from html and put it in MDP
  disabled: boolean;




}
</script>
