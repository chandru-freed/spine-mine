<template>
  <v-card class="pa-0 ma-0" flat height="calc(100vh - 48px)">
    <v-data-table
      :headers="fiCreditorSettlementListGridHeaderList"
      :items="fiCreditorSettlementList"
      class="elevation-0"
      item-key="settlementId"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-card-title>Creditor Settlement List</v-card-title>
          <v-spacer></v-spacer>
          <v-col cols="1">
            <v-select
              :items="savingPercentageList"
              v-model="savingPercentage"
              label="Saving %"
              hide-details
              outlined
              dense
              class="shrink"
              @input="handleSavingPercentageChange"
            ></v-select>
          </v-col>
          <v-col  cols="3">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search Item"
              single-line
              hide-details
              outlined
              rounded
              dense
              class="shrink"
            ></v-text-field>
          </v-col>
        </v-toolbar>
      </template>

      <template v-slot:[`item.clientFile.clientFileNumber`]="{ item }">
        <v-btn
          text
          color="secondary"
          @click="gotoFile(item.clientFile.clientFileNumber)"
          >{{ item.clientFile.clientFileNumber }}</v-btn
        >
      </template>

      <template v-slot:[`item.clientFile.clientBasicInfo.fullName`]="{ item }">
        <v-btn
          text
          color="green"
          @click="gotoClient(item.clientFile.clientBasicInfo.clientId)"
          >{{ item.clientFile.clientBasicInfo.fullName }}</v-btn
        >
      </template>

      <template v-slot:[`item.creditorBalance`]="{ item }">
        {{ item.creditorBalance | toINR }}
      </template>

      <template v-slot:[`item.clientFile.clientBasicInfo.mobile`]="{ item }">
        {{ item.clientFile.clientBasicInfo.mobile | phone }}
      </template>

      <template v-slot:[`item.savingPercentage`]="{ item }">
        <strong>{{ item.savingPercentage }}%</strong>
      </template>

      <template v-slot:[`item.spaSavingAmount`]="{ item }">
        {{ item.spaSavingAmount | toINR }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import Helper from "../../util/Helper";

@Component
export default class FiCreditorSettlementList extends Vue {
  @Store.Getter.ClientFile.SettlementDetails.fiCreditorSettlementList
  fiCreditorSettlementList: Data.ClientFile.FiCreditorApprochingSettlement[];
  search: string = "";
  savingPercentage: number = 30;

  fiCreditorSettlementListGridHeaderList = [
    { text: "Creditor Name", value: "creditorName", align: "start" },
    { text: "Client Name", value: "clientFile.clientBasicInfo.fullName" },
    { text: "Mobile", value: "clientFile.clientBasicInfo.mobile" },
    { text: "Client File Number", value: "clientFile.clientFileNumber" },
    { text: "Saving Percentage(%)", value: "savingPercentage" },
    { text: "Total Spa Saving", value: "spaSavingAmount" },
    { text: "Creditor Balance", value: "creditorBalance" },
  ];

  public mounted() {
    this.getFiCreditorList();
  }

  get savingPercentageList() {
    const diff = 5;
    return [...Array(100 / diff + 1).keys()].map((i) => i * diff);
  }
  getFiCreditorList() {
    Action.ClientFile.GetFiCreditorListForSettlement.execute1(
      this.savingPercentage,
      (output) => {}
    );
  }

  handleSavingPercentageChange(savingPercentage: number) {
    this.getFiCreditorList();
  }

  gotoFile(clientFileNumber: string) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: clientFileNumber,
    });
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }
}
</script>

<style>
</style>
