<template>
  <div class="CFSettlementPlanInfo">
    <template>
      <component
        v-if="settlementPlanForm"
        :ref="settlementPlanInfoMetaData.myRefName"
        :is="settlementPlanInfoMetaData.componentName"
        :value="selectModel(addSettlementPlanInput, undefined)"
        v-bind="settlementPlanInfoMetaData.props"
      ></component>
      <component
        v-if="addSPAEntry"
        :ref="addSTEntryInfoMetaData.myRefName"
        :is="addSTEntryInfoMetaData.componentName"
        :value="selectModel(addSTEntryInput, undefined)"
        v-bind="addSTEntryInfoMetaData.props"
      ></component>

      <v-alert dense outlined text color="error" v-if="deleteSPAEntry">
        <div
          class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
        >
          <div class="my-1">Are you sure want to delete?</div>
          <v-spacer />
          <FBtn
            label="Cancel"
            :on-click="closeAndClearAllForms"
            outlined
            color="red"
            class="mx-2"
          />
          <FBtn
            label="Delete"
            :on-click="deleteCreditorData"
            outlined
            color="red"
            class="mx-2"
          />
        </div>
      </v-alert>
    </template>
    <v-card flat outlined class="row ma-2">
      <template>
        <v-toolbar flat>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="secondary"
          >
            <v-tab> SPA Schedule </v-tab>
            <v-tab> Fee Schedule </v-tab>
          </v-tabs>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="disabled"
            icon
            color="primary"
            class="mb-2"
            @click="showAddForm"
          >
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

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
import AddSTEntryFFormMDP from "./AddSTEntryFFormMDP";
import * as Snackbar from "node-snackbar";

@Component({
  components: {
    FForm,
  },
})
export default class CFSettlementPlanInfo extends ModelVue {
  addSTEntryInput = new Data.ClientFile.AddSTEntryInput();
  addSettlementPlanInput: Data.ClientFile.PlanPaymentSettlementInput =
    new Data.ClientFile.PlanPaymentSettlementInput();

  stPlanId = this.$route.params.stPlanId;

  tab = 0;
  settlementPlanForm = true;
  addSPAEntry = false;
  deleteSPAEntry = false;

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

  get addSTEntryInfoMetaData() {
    return new AddSTEntryFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  showAddForm() {
    this.closeDialogs();
    this.addSPAEntry = true;
    this.deleteSPAEntry = false;
    this.settlementPlanForm = false;
  }

  closeDialogs() {
    this.addSPAEntry = false;
    this.deleteSPAEntry = false;
    this.settlementPlanForm = true;
  }

  showDeletePopup() {
    this.deleteSPAEntry = true;
    this.addSPAEntry = false;
    this.settlementPlanForm = false;
  }

  addSPAEntryForm() {
    this.addSTEntryInput.stPlanId = this.stPlanId;
    Action.ClientFile.AddSTEntry.execute(this.addSTEntryInput, (output) => {
      Snackbar.show({
        text: "Succesfully Add ST Entry",
        pos: "bottom-center",
      });
      this.addSPAEntry = false;
      this.settlementPlanForm = true;
    });
  }
}
</script>

<style></style>
