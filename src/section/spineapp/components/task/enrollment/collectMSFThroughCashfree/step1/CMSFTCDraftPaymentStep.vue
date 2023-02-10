
<template>
  <div>
<component 
  v-if="modelValue.taskOutput.paymentId"
  :ref="fPaymentDetailsMetaData.myRefName"
  :is="fPaymentDetailsMetaData.componentName"
  :value="selectModel(modelValue, undefined)"
  @input="(newValue) => updateModel(modelValue, newValue, undefined)"
  v-bind="fPaymentDetailsMetaData.props"
></component>
    <component 
    v-else
  :ref="receiveCashfreePaymentFFormMetaData.myRefName"
  :is="receiveCashfreePaymentFFormMetaData.componentName"
  :value="selectModel(receiveCashfreePaymentInput, undefined)"
  @input="(newValue) => updateModel(receiveCashfreePaymentInput, newValue, undefined)"
  v-bind="receiveCashfreePaymentFFormMetaData.props"
></component>



  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch,Prop } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import ReceiveCashfreePaymentFFormMDP from './ReceiveCashfreePaymentFFormMDP';
import Task from "@/section/spineapp/util/Task";
import FPaymentDetails from "@/components/generic/file/paymentDetails/FPaymentDetails.vue";
import FPaymentDetailsMDP from "@/components/generic/file/paymentDetails/FPaymentDetailsMDP";

@Component({
  components: {
    FForm,
    FPaymentDetails
  },
})
export default class CMSFTCDraftPaymentStep extends ModelVue {

  @Prop()
  taskRoot: any;


  @Prop()
  dataSelectorKey: any;
  
  
  
  clientFileId = this.$route.params.clientFileId;

  receiveCashfreePaymentInput: Data.Spine.DraftMSFThroughCashfreeInput = new Data.Spine.DraftMSFThroughCashfreeInput();
  mounted() {
    this.receiveCashfreePaymentInput.msfAmount = this.modelValue.taskInput?.paymentPlan?.ppCalculator?.msfDraftAmount;
  }

  get receiveCashfreePaymentFFormMetaData() {
    return new ReceiveCashfreePaymentFFormMDP({taskRoot: this.taskRoot, parent: this}).getMetaData();
  }

  get fPaymentDetailsMetaData() {
    return new FPaymentDetailsMDP({paymentId: this.modelValue[this.dataSelectorKey].paymentId}).getMetaData();
  }

  receiveCashfreePayment() {
    this.receiveCashfreePaymentInput.clientFileId = this.clientFileId;
    // console.log(this.modelValue?.taskInput,"this.modelValue?.taskInput")
    if(this.modelValue?.taskInput?.msfScheduledEntryId) {
    this.receiveCashfreePaymentInput.msfScheduleEntryId = this.modelValue?.taskInput?.msfScheduledEntryId;
    }
    Action.Spine.DraftAndPresentMSFThroughCashfree.execute(this.receiveCashfreePaymentInput, output => {
      this.modelValue[this.dataSelectorKey].paymentId = output.paymentId;
      this.taskRoot.saveTask();
    });
  }

  
}
</script>

