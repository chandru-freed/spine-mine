<template>
  <ValidationObserver :ref="myRef" v-slot="{}">
    <v-form>
      <div v-for="(fieldMetaData, indx) in fieldMetaDataList" :key="indx">
        <ValidationProvider
          :vid="fieldMetaData.props.id"
          :name="fieldMetaData.props.label"
          :rules="fieldMetaData.rules"
          v-slot="{ errors }"
        >
          <component
            :is="fieldMetaData.componentName"
            v-bind="fieldMetaData.props"
            v-model="modelValue[fieldMetaData.dataSelector]"
            :error-messages="errors"
          ></component>
        </ValidationProvider>
      </div>
    </v-form>
  </ValidationObserver>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import FTextField from "./FTextField.vue";
import ModelVue from "./ModelVue";

import { ValidationObserver,  ValidationProvider } from "vee-validate";

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    FTextField,
  },
})
export default class FForm extends ModelVue {
  @Prop()
  myRef: string;

  @Prop()
  fieldMetaDataList: any[];
}
</script>
