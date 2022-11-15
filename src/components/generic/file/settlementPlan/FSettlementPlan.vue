<template>
  <v-col class="CFSettlementPlanInfo">
    <!-- {{stPlanDetails.stFeeEntryList}} -->
    <template>
      <v-card outlined class="ma-2">
        <component
          :ref="settlementPlanInfoMetaData.myRefName"
          :is="settlementPlanInfoMetaData.componentName"
          :value="selectModel(stPlanDetails.stPlanInfo, undefined)"
          v-bind="settlementPlanInfoMetaData.props"
        ></component>
      </v-card>
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
            :on-click="closeDialogs"
            outlined
            color="red"
            class="mx-2"
          />
          <FBtn
            label="Delete"
            :on-click="removeSTEntry"
            outlined
            color="red"
            class="mx-2"
          />
        </div>
      </v-alert>
    </template>
    <template>
      <v-card flat outlined class="row ma-2">
        <template>
          <v-toolbar flat dense>
            <v-tabs
              dense
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
                :items="stPlanDetails.stSpaEntryList"
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
                <template v-slot:[`item.status`]="{ item }">
                  <v-chip small outlined>
                    {{ item.status }}
                  </v-chip>
                </template>
                <template v-slot:[`item.totalAmount`]="{ item }">
                  {{ item.totalAmount | toINR }}
                </template>
                <template v-slot:[`item.spaAmount`]="{ item }">
                  {{ item.spaAmount | toINR }}
                </template>
                <template v-slot:[`item.draftDate`]="{ item }">
                  <span class="grey--text">
                    {{ item.draftDate | date }}
                  </span>
                </template>

                <template v-slot:[`item.actions`]="{ item, index }">
                  <v-btn :disabled="!stEntryScheduled(item)" small outlined primary class="mr-2" @click="presentSTEntry(item)">Present</v-btn>
                  <v-icon
                    :disabled="!stEntryScheduled(item)"
                    small
                    @click="showDeletePopup(item, index)"
                  >
                    mdi-delete
                  </v-icon>

                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-data-table
                :headers="feeHeaders"
                :items="stPlanDetails.stFeeEntryList"
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
                <template v-slot:[`item.status`]="{ item }">
                  <v-chip small outlined>
                    {{ item.status }}
                  </v-chip>
                </template>

                <template v-slot:[`item.totalAmount`]="{ item }">
                  {{ item.totalAmount | toINR }}
                </template>
                <template v-slot:[`item.feeAmount`]="{ item }">
                  {{ item.feeAmount | toINR }}
                </template>
                <template v-slot:[`item.draftDate`]="{ item }">
                  <span class="grey--text">
                    {{ item.draftDate | date }}
                  </span>
                </template>
                <template v-slot:[`item.actions`]="{ item, index }">
                  <v-icon
                    :disabled="!stEntryScheduled(item)"
                    small
                    @click="showDeletePopup(item, index)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
  </v-col>
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
import FBtn from "@/components/generic/FBtn.vue";

@Component({
  components: {
    FForm,
    FBtn,
  },
})
export default class FSettlementPlan extends ModelVue {
  @Store.Getter.ClientFile.SettlementDetails.stPlanDetails
  stPlanDetails: Data.ClientFile.STPlanDetails;
  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorInfo: Data.ClientFile.FiCreditorInfo;

  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  @Store.Getter.ClientFile.ClientFileSummary.fiEMandateList
  fiEMandateList: Data.ClientFile.FiEMandateList;

  addSTEntryInput = new Data.ClientFile.AddSTEntryInput();
  selectedSTEntry: Data.ClientFile.FiCreditor;
  // stPlanId = this.$route.params.stPlanId;
  clientFileId = this.$route.params.clientFileId;

  tab = 0;
  addSPAEntry = false;
  deleteSPAEntry = false;

   get taskDetailsInput() {
    
    return !!this.taskDetails && !!this.taskDetails.taskInput
      ? JSON.parse(this.taskDetails.taskInput)
      : {};
  }


  get stPlanId() {
    return this.taskDetailsInput.stPlanInfo?.fiSettlementPlanId;
  }

  spaHeaders = [
    {
      text: "Payment Provider",
      align: "start",
      sortable: false,
      value: "paymentProvider.name",
    },
    { text: "status", value: "status" },
    { text: "DraftDate", value: "draftDate" },
    { text: "SPA Amount", value: "spaAmount", align: "right" },
    // { text: "Total Amount", value: "totalAmount", align: "right" },
    { text: "Actions", value: "actions", align: "right" },
  ];
  feeHeaders = [
    {
      text: "Payment Provider",
      align: "start",
      sortable: false,
      value: "paymentProvider.name",
    },
    { text: "status", value: "status" },
    { text: "Draft Date", value: "draftDate" },
    { text: "Fee Amount", value: "feeAmount", align: "right" },
    // { text: "Total Amount", value: "totalAmount", align: "right" },
    { text: "Actions", value: "actions", align: "right" },
  ];
  //METADATA
  get settlementPlanInfoMetaData() {
    return new CFSettlementPlanInfoFFormMDP({ root: this }).getMetaData();
  }

  get addSTEntryInfoMetaData() {
    return new AddSTEntryFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  stEntryScheduled(item: any) {
    return item.status === "SCHEDULED"
  }

  mounted() {
    this.getFiCreditorInfo();
    this.getEMandateList();
  }

  getEMandateList() {
    Action.ClientFile.GetEMandateList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }


  resetForms() {
    this.addSTEntryInput = new Data.ClientFile.AddSTEntryInput();
  }

  showAddForm() {
    this.resetForms();
    this.closeDialogs();
    this.addSPAEntry = true;
    this.deleteSPAEntry = false;
  }

  closeDialogs() {
    this.resetForms();
    this.addSPAEntry = false;
    this.deleteSPAEntry = false;
  }

  showDeletePopup(item: any) {
    console.log("stEntryId", item.stEntryId);
    this.selectedSTEntry = item;
    this.deleteSPAEntry = true;
    this.addSPAEntry = false;
  }

  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
  addSPAEntryForm() {
    this.addSTEntryInput.stPlanId = this.stPlanId;
    Action.ClientFile.AddSTEntry.execute(this.addSTEntryInput, (output) => {
      Snackbar.show({
        text: "Succesfully Add ST Entry",
        pos: "bottom-center",
      });
      this.addSPAEntry = false;
    });
  }

  removeSTEntry() {
    const stEntryId = this.selectedSTEntry.stEntryId;
    Action.ClientFile.RemoveSTEntry.execute1(stEntryId, (output) => {
      Snackbar.show({
        text: "Succesfully Delete ST Entry",
        pos: "bottom-center",
      });
      this.deleteSPAEntry = false;
    });
  }

  presentSTEntry(item: any) {
    Action.ClientFile.PresentSTEntry.execute1(item.stEntryId, (output) => {
      Snackbar.show({
        text: "Succesfully Delete ST Entry",
        pos: "bottom-center",
      });
      this.deleteSPAEntry = false;
    });
  }
}
</script>

<style></style>
