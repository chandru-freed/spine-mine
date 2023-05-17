<template>
  <div class="CFTransactionList">
            <component
          :is="cfTransactionListFDataTableMetaData.componentName"
          :ref="cfTransactionListFDataTableMetaData.myRefName"
          :value="fiPaymentTransactionList"
          v-bind="cfTransactionListFDataTableMetaData.props"
        ></component>
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
import CFTransactionListFDataTableMDP from "./CFTransactionListFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
@Component({
  components: {
    FForm,
    FBtn,
    FDataTable,
  },
})
export default class CFTransactionList extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentTransactionList
  fiPaymentTransactionList: Data.ClientFile.FiPaymentTransaction;

  get clientFileId() {
    return this.$route.params.clientFileId;
  }
  mounted() {
    this.getFiPaymentTransactionList();
  }

  //metadata
  get cfTransactionListFDataTableMetaData() {
    return new CFTransactionListFDataTableMDP({ parent: this }).getMetaData();
  }
  //metadata

  //ACTION
  getFiPaymentTransactionList() {
    Action.ClientFile.GetFiPaymentTransactionList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  gotoFile(item: any) {
    this.$router.push({
      name: "Root.ClientFile.Workarea",
      params: { clientFileNumber: item.cid },
    });
  }
}
</script>
