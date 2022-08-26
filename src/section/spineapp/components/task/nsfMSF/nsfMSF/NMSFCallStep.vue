<template>
  <div>
    {{ modelValue }}
    <component
      :ref="optionContentMapFSelectMetaData.myRefName"
      :is="optionContentMapFSelectMetaData.componentName"
      v-bind="optionContentMapFSelectMetaData.props"
      :value="selectedOption"
      @input="selectedOptionChanged"
      class="pa-2"
    ></component>
    <component
      v-if="selectedOption.optionContent"
      :ref="selectedOption.optionContent.myRefName"
      :is="selectedOption.optionContent.componentName"
      :value="selectModel(modelValue, undefined)"
      @input="(newValue) => updateModel(modelValue, newValue, undefined)"
      v-bind="selectedOption.optionContent.props"
    ></component>

    <div
      class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
      v-if="selectedOption.optionContent"
    >
      <component
        v-for="(actionMetaData, index) of actionMetaDataList"
        :key="'action' + index"
        :is="actionMetaData.componentName"
        :ref="actionMetaData.myRefName"
        v-bind="actionMetaData.props"
      ></component>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import FSelectFooField from "@/components/generic/form/field/FSelectFooField.vue";
@Component({
  components: {
    FBtn,
    FForm,
    FSelectFooField,
  },
})
export default class NMSFCallStep extends ModelVue {
  selectedOption: any = {};
  @Prop() optionContentMapFSelectMetaData: any;
  @Prop() actionMetaDataList: any;

  selectedOptionChanged(newValue: any) {
    this.selectedOption = newValue;
    console.log(newValue.optionName);
    switch (newValue.optionName) {
      case "Receive Payment": {
        this.updateModel(this.modelValue, true, "taskOutput.manualPayment");
        this.updateModel(this.modelValue, true, "taskOutput.answered");
        break;
      }

      case "System Deffered": {
        this.updateModel(this.modelValue, false, "taskOutput.manualPayment");
        this.updateModel(this.modelValue, false, "taskOutput.answered");
        break;
      }
    }
  }
}
</script>

        <style></style>