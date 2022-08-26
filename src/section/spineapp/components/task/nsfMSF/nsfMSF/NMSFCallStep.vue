<template>
  <div>
    {{modelValue}}
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
      :value="selectModel(taskFormData, undefined)"
      @input="(newValue) => updateModel(taskFormData, newValue, undefined)"
      v-bind="selectedOption.optionContent.props"
    ></component>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";
import FStepper from "@/components/generic/FStepper.vue";
import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import moment from "moment";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FSelectField from "@/components/generic/form/field/FSelectField.vue";
import FForm from "@/components/generic/form/FForm.vue";
import FSelectFooField from "@/components/generic/form/field/FSelectFooField.vue";
@Component({
  components: {
    FStepper,
    FBtn,
    FSelectField,
    FForm,
    FSelectFooField,
  },
})
export default class NMSFCallStep extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;
  taskFormData: any = {};
  taskId = this.$route.params.taskId;
  selectedOption: any = {};
  @Prop() optionContentMapFSelectMetaData: any;

  selectedOptionChanged(newValue: any) {
    this.selectedOption = newValue;
    console.log(newValue.optionName)
    switch(newValue.optionName) {
      case 'Receive Payment': {
        this.updateModel(this.modelValue, true,"taskOutput.manualPayment")
        this.updateModel(this.modelValue, true,"taskOutput.answered")
        break;
      }

      case 'System Deffered': {
        this.updateModel(this.modelValue, false,"taskOutput.manualPayment")
        this.updateModel(this.modelValue, false,"taskOutput.answered")
        break;
      }
    }
  }
}
</script>

        <style></style>