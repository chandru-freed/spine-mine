<template>
  <div class="CFTransactionInfo">
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
              {{ item.txnDate | date }}
            </span>
          </template>
          <template v-slot:[`item.amount`]="{ item }">
            {{ item.debit ? "- " : "+ " }}{{ item.amount | toINR }}
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
export default class CFTransactionInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentTransactionList
  fiPaymentTransactionList: Data.ClientFile.FiPaymentTransaction;

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

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
