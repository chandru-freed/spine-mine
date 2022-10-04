<template>
  <div>
    <v-col class="col-12">
      <v-card flat outlined>
        <v-data-table
          :headers="headers"
          :items="paymentList"
          sort-by="draftDate"
          class="elevation-0"
        >
          <template v-slot:item.clientFileNumber="{ item }">
            <f-btn
              :label="item.clientFileNumber"
              text
              color="secondary"
              :onClick="() => gotoFile(item)"
            ></f-btn>
          </template>
          <template v-slot:[`item.presentedDate`]="{ item }">
            {{ item.presentedDate | date }}
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
export default class Payment extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  paymentList: Data.ClientFile.FiPayment[] = [];
  headers = [
    { text: "File Number", value: "clientFileNumber" },
    { text: "Payment Provider", value: "paymentProvider.name" },
    { text: "Payment Mode", value: "paymentMode.name" },
    { text: "Presented Date", value: "presentedDate" },
  ];

  mounted() {
    this.getFiPaymentList();
  }

  //ACTION
  getFiPaymentList() {
    Action.ClientFile.GetFiPaymentList.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {
        this.paymentList = output;
      }
    );
  }

  gotoFile(item: any) {
    this.$router.push({
      name: "Root.ClientFile.ClientFileDetails",
      params: { clientFileNumber: item.cid },
    });
  }
}
</script>
