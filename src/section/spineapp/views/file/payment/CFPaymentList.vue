<template>
  <div class="CFPaymentList">
    <v-col class="col-12">
      <v-card flat outlined>
        <v-data-table
          :headers="headers"
          :items="fiPaymentList"
          sort-by="draftDate"
          class="elevation-0"
        >
          <template v-slot:[`item.presentedDate`]="{ item }">
            <span class="grey--text">
              {{ item.presentedDate | date }}
            </span>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-chip small outlined>{{ item.status.name }}</v-chip>
          </template>

          <template v-slot:item.accountHolderName="{ item }">
            <f-btn
              :label="item.accountHolderName"
              text
              color="secondary"
              :onClick="() => goto(item)"
            ></f-btn>
          </template>
          
          <template v-slot:item.totalAmount="{ item }">
           {{item.totalAmount | toINR}}
          </template>
          <template v-slot:item.receivedBy="{ item }">
            <v-chip small class="" v-if="item.receivedBy" label>
              <v-icon small left> mdi-account-circle-outline </v-icon>
              {{ item.receivedBy }}
            </v-chip>
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
import smileRouter from "src-gen/smile-router";

@Component({
  components: {
    FForm,
    FBtn,
  },
})
export default class CFPaymentList extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentList
  fiPaymentList: Data.ClientFile.FiPayment;

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  headers = [
    { text: "Account Holder Name", value: "accountHolderName" },
    { text: "Payment Type", value: "paymentType.name" },
    { text: "Amount", value: "totalAmount", align: "right" },
    { text: "Payment Provider", value: "paymentProvider.name" },
    { text: "Status", value: "status" },
    { text: "Presented Date", value: "presentedDate" },
    { text: "Received By", value: "receivedBy" },
  ];

  mounted() {
    this.getFiPaymentList();
  }

  //ACTION
  getFiPaymentList() {
    Action.ClientFile.GetFiPaymentList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  goto(item: any) {
    console.log(item.paymentId);
    this.$router.push({
      name: "Root.CFile.CFPayment.CFPaymentDetails.CFPaymentDetails",
      params: {
        paymentId: item.paymentId,
      },
    });
  }
}
</script>
