<template>
  <div class="CFSettlementPlanInfo">
    <template>
      <component
        :ref="settlementPlanInfoMetaData.myRefName"
        :is="settlementPlanInfoMetaData.componentName"
        :value="selectModel(recordSettledPaymentInput, undefined)"
        v-bind="settlementPlanInfoMetaData.props"
      ></component>
    </template>
    <v-card flat outlined class="row ma-2">
      <v-tabs v-model="tab" background-color="transparent" color="secondary">
        <v-tab> SPA Schedule </v-tab>
        <v-tab> Fee Schedule </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="col-12">
        <v-tab-item>
          <v-card flat>
            <v-data-table
              :headers="spaHeaders"
              :items="spaEntrySchelduledList"
              sort-by="draftDate"
              class="elevation-0"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>SPA Schedule</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-data-table
              :headers="feeHeaders"
              :items="feeEntrySchelduledList"
              sort-by="draftDate"
              class="elevation-0"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Fee Schedule</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script lang="ts">
import FForm from "@/components/generic/form/FForm.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import CFSettlementPlanInfoFFormMDP from "./CFSettlementPlanInfoFFormMDP";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import ModelVue from "@/components/generic/ModelVue";

@Component({
  components: {
    FForm,
  },
})
export default class CFSettlementPlanInfo extends ModelVue {
  recordSettledPaymentInput = new Data.ClientFile.RecordSettledPaymentInput();
  tab = 0;
  spaHeaders = [
    {
      text: "Draft Date",
      align: "start",
      sortable: false,
      value: "draftDate",
    },
    { text: "Fee Code", value: "feeCode" },
    { text: "Amount", value: "amount" },
    { text: "Tax Amount", value: "taxAmount" },
    { text: "Total Amount", value: "totalAmount" },
  ];
  feeHeaders = [
    {
      text: "Draft Date",
      align: "start",
      sortable: false,
      value: "draftDate",
    },
    { text: "Fee Code", value: "feeCode" },
    // { text: "Collection Order", value: "collectionOrder" },
    { text: "Amount", value: "amount" },
    { text: "Tax Amount", value: "taxAmount" },
    { text: "Total Amount", value: "totalAmount" },
  ];
  spaEntrySchelduledList = [];
  feeEntrySchelduledList = [];
  //METADATA
  get settlementPlanInfoMetaData() {
    return new CFSettlementPlanInfoFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA
}
</script>

<style></style>
