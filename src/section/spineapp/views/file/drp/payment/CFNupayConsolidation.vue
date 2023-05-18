<template>
  <div class="CFPaymentList">
    <v-card class="col-12">
      <component
        v-if="!!fNupayPaymentMetaData"
        :ref="fNupayPaymentMetaData.myRefName"
        :is="fNupayPaymentMetaData.componentName"
        :value="selectModel(nupayPaymentConsolidation, undefined)"
       
        v-bind="fNupayPaymentMetaData.props"
      ></component>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FBtn from "@/components/generic/FBtn.vue";
import * as Data from "@/../src-gen/data";
import store, * as Store from "@/../src-gen/store";
import * as Action from "@/../src-gen/action";
import CFPaymentListFDataTableMDP from "./CFPaymentListFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import PaymentDetailsFFormMDP from "./PaymentDetailsFFormMDP";
import FNupayPaymentMDP from "@/components/generic/file/payment/nupayPayment/FNupayPaymentMDP";
import FNupayPayment from "@/components/generic/file/payment/nupayPayment/FNupayPayment.vue";

@Component({
  components: {
    FNupayPayment
  },
})
export default class CFNupayConsolidation extends ModelVue {

    nupayPaymentConsolidation: Data.Spine.NupayPaymentConsolidation =
    new Data.Spine.NupayPaymentConsolidation();  
  clientFileId =this.$route.params.clientFileId;

  mounted() {
    this.getNupayPaymentConsolidation();
    
  }

  //Meta Data

  get fNupayPaymentMetaData() {
    return new FNupayPaymentMDP({ parent: this }).getMetaData();
  }

  //Meta Data



  //ACTION
  getNupayPaymentConsolidation() {
    Action.Spine.GetNupayPaymentConsolidation.execute1(this.clientFileId, (output) => {
        this.nupayPaymentConsolidation = output;
    });
  }

}
</script>
