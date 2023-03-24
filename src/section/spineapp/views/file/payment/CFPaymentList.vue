<template>
  <div class="CFPaymentList">
    <v-col class="col-12">
           <component
          :is="cfPaymentListFDataTableMetaData.componentName"
          :ref="cfPaymentListFDataTableMetaData.myRefName"
          :value="fiPaymentList"
          v-bind="cfPaymentListFDataTableMetaData.props"
        ></component>
    </v-col>
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
import CFPaymentListFDataTableMDP from './CFPaymentListFDataTableMDP';
import FDataTable from "@/components/generic/table/FDataTable.vue";

@Component({
  components: {
    FForm,
    FBtn,
    FDataTable
  },
})
export default class CFPaymentList extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentList
  fiPaymentList: Data.ClientFile.FiPayment;

  get clientFileId() {
    return this.$route.params.clientFileId;
  }



  mounted() {
    this.getFiPaymentList();
  }

  //Meta Data

    get cfPaymentListFDataTableMetaData() {
      return new CFPaymentListFDataTableMDP({parent: this}).getMetaData();
    }

  //Meta Data

  //ACTION
  getFiPaymentList() {
    Action.ClientFile.GetFiPaymentList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  openPaymentDetails(item: any) {
    this.$router.push({
      name: "Root.CFile.CFPayment.CFPaymentDetails.CFPaymentDetails",
      params: {
        paymentId: item.paymentId,
      },
    });
  }
}
</script>
