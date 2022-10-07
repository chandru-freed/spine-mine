<template>
  <div>
    <v-col class="col-12">
      <v-card flat outlined>
        <v-data-table
          :headers="headers"
          :items="fiPaymentTransactionList"
          sort-by="draftDate"
          class="elevation-0"
        >
          <template v-slot:[`item.txnDate`]="{ item }">
            <span class="grey--text">
              {{ item.txnDate | fromNow }}
            </span>
          </template>
        </v-data-table>
      </v-card>
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

@Component({
  components: {
    FForm,
    FBtn,
  },
})
export default class PaymentTransaction extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentTransactionList
  fiPaymentTransactionList: Data.ClientFile.FiPaymentTransaction;
  headers = [
    { text: "Account Identifier", value: "accountIdentifier" },
    { text: "Intent", value: "intent" },
    { text: "Amount", value: "amount" },
    { text: "Payment Ref Number", value: "paymentRefNumber" },
    { text: "Remote Txn Ref Number", value: "remoteTxnRefNumber" },
    { text: "Txn Date", value: "txnDate" },
  ];

  mounted() {
    this.getFiPaymentTransactionList();
  }

  //ACTION
  getFiPaymentTransactionList() {
    Action.ClientFile.GetFiPaymentTransactionList.execute1(
      this.clientFileBasicInfo.clientFileId,
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
