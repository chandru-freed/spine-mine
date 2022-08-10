<template>
  <div class="d-flex flex-row align-start flex-wrap justify-start py-2">
    <v-subheader class=" col-12">{{label}}</v-subheader>
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
          v-model="modelValue[fieldMetaData.dataSelectorKey]"
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
import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";

import { ValidationObserver, ValidationProvider } from "vee-validate";

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    FTextField,
    FSelectField,
    FBtn,
  },
})
export default class FMiniForm extends ModelVue {

  @Prop()
  label: string

  @Prop()
  fieldMetaDataList: any[];

  @Prop({ default: false }) // Todo: disabled remve from html and put it in MDP
  disabled: boolean;

}
</script>
