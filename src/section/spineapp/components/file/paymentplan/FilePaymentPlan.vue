<template>
  <div class="FilePaymentPlan">
    File payment plan

    {{ paymentPlanInfoLocal }}

    <component
      v-if="!!paymentPlanInfo"
      :ref="paymentPlanInfoMetaData.myRefName"
      :is="paymentPlanInfoMetaData.componentName"
      :value="
        selectModel(fiPaymentPlanInfo, paymentPlanInfoMetaData.dataSelectorKey)
      "
      v-bind="paymentPlanInfoMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Watch,
  Model,
} from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";
import FilePaymentPlanFPaymentPlanMDP from "./FilePaymentPlanFPaymentPlanMDP";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import FPaymentPlan from "@/components/generic/file/paymentPlan/FPaymentPlan.vue";

@Component({
  components: {
    FForm,
    FPaymentPlan,
  },
})
export default class FilePaymentPlan extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentPlanInfo
  fiPaymentPlanInfo: Data.ClientFile.FiPaymentPlanInfo;

  //METADATA
  get paymentPlanInfoMetaData() {
    return new FilePaymentPlanFPaymentPlanMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }
  //METADATA

  //FORM

  paymentPlanInfoLocal: any = new Data.ClientFile.FiPaymentPlanInfo();

  get paymentPlanInfo() {
    if (!!this.fiPaymentPlanInfo) {
      this.paymentPlanInfoLocal = this.fiPaymentPlanInfo;
    }
    return this.paymentPlanInfoLocal;
  }

  set paymentPlanInfo(value: any) {
    this.paymentPlanInfoLocal = value;
  }

  //FORM

  mounted() {
    this.getFiPaymentPlanInfo();
  }

  getFiPaymentPlanInfo() {
    Action.ClientFile.GetPaymentPlanInfo.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {},
      (error) => {},
      RemoteApiPoint.SpineApi
    );
  }
}
</script>

<style></style>
