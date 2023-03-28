<template>
  <v-col>
    <v-card v-if="showAddSettlementPlanForm" outlined class="ma-3">
      <component
        :ref="addSettlementPlanMetaData.myRefName"
        :is="addSettlementPlanMetaData.componentName"
        :value="selectModel(addSettlementFormData, undefined)"
        @input="
          (newValue) => updateModel(addSettlementFormData, newValue, undefined)
        "
        v-bind="addSettlementPlanMetaData.props"
      ></component>
    </v-card>

    <!-- <v-data-table
      :headers="fiSettlementPlanListGridHeaderList"
      :items="fiSettlementPlanList"
      class="elevation-0"
      item-key="settlementId"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-card-title class="pa-0">Settlement Plan List</v-card-title>
          <v-spacer />
          <v-btn
            @click="showAddSettlementPlanForm = true"
            elevation-0
            outlined
            color="primary"
            >Create Settlement Plan
            <v-spacer />
             <v-icon small class="ml-2">mdi-plus-circle-outline</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.totalOutstanding`]="{ item }">
        {{ item.totalOutstanding | toINR }}
      </template>

      <template v-slot:[`item.settlementAmount`]="{ item }">
        {{ item.settlementAmount | toINR }}
      </template>

      <template v-slot:[`item.settlementPercentage`]="{ item }">
        {{ item.settlementPercentage}} %
      </template>

   

      <template v-slot:[`item.fiCreditor.creditorName`]="{ item }">
        <v-btn
          text
          color="green"
          @click="gotoPaymentPlan(item.fiSettlementPlanId)"
          >{{ item.fiCreditor.creditorName }}
        </v-btn>
      </template>
    </v-data-table> -->
    <component
      :ref="CFStPlanListFDataTableMetaData.myRefName"
      :is="CFStPlanListFDataTableMetaData.componentName"
      :value="selectModel(fiSettlementPlanList, undefined)"
      v-bind="CFStPlanListFDataTableMetaData.props"
    ></component>
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import AddSettlementPlanFFormMDP from "./AddSettlementPlanFFormMDP";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import CFStPlanListFDataTableMDP from "./CFStPlanListFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
@Component({
  components: {
    FForm,
    FDataTable,
  },
})
export default class CFSettlementPlanList extends ModelVue {
  @Store.Getter.ClientFile.SettlementDetails.fiSettlementPlanList
  fiSettlementPlanList: Data.ClientFile.FiSettlementPlan[];

  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorInfo: Data.ClientFile.FiCreditorInfo;

  addSettlementPlanInput: Data.ClientFile.PlanPaymentSettlementInput =
    new Data.ClientFile.PlanPaymentSettlementInput();

  sifDocument: Data.ClientFile.FiDocument = new Data.ClientFile.FiDocument();

  @Watch("addSettlementPlanInput.fiCreditorId") fiCreditorIdChanged(
    newVal: string,
    oldVal: string
  ) {
    const selectedCreditor: any = this.fiCreditorInfo.creditorList.find(
      (item, index) => {
        return item.fiCreditorId === newVal;
      }
    );
    this.addSettlementPlanInput.outstandingAmount =
      selectedCreditor.creditorBalance;
  }

  showAddSettlementPlanForm: boolean = false;

  fiSettlementPlanListGridHeaderList = [
    { text: "Creditor Name", value: "fiCreditor.creditorName", align: "start" },
    { text: "Settlement Amount", value: "settlementAmount", align: "right" },
    { text: "Total Outstanding", value: "totalOutstanding", align: "right" },
    {
      text: "Settlement Percentage",
      value: "settlementPercentage",
      align: "right",
    },
    { text: "Status", value: "status" },
  ];

  clientFileId = this.$route.params.clientFileId;

  get addSettlementPlanMetaData() {
    return new AddSettlementPlanFFormMDP({ root: this }).getMetaData();
  }

  get addSettlementFormData() {
    return {
      addSettlementPlanInput: this.addSettlementPlanInput,
      sifDocument: this.sifDocument,
    };
  }

  public mounted() {
    this.getFiCreditorInfo();
    this.getSettlementPlanList();
  }

  getSettlementPlanList() {
    Action.ClientFile.GetFiCreditorSettlementPlanList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  addSettlement() {
    console.log(this.addSettlementPlanInput, "this.addSettlementPlanInput");
    this.addSettlementFormData.addSettlementPlanInput.sifDocumentId =
      this.addSettlementFormData.sifDocument?.fiDocumentId || "";
    Action.ClientFile.PlanPaymentSettlement.execute(
      this.addSettlementFormData.addSettlementPlanInput,
      (output) => {
        setTimeout(() => {
          this.getSettlementPlanList();
        }, 1000);
        this.closeAndResetForms();
      }
    );
  }

  closeAndResetForms() {
    this.showAddSettlementPlanForm = false;
    this.addSettlementFormData.addSettlementPlanInput =
      new Data.ClientFile.PlanPaymentSettlementInput();
    this.addSettlementFormData.sifDocument = new Data.ClientFile.FiDocument();
  }

  gotoPaymentPlan(stPlanId: string) {
    this.$router.push({
      name: "Root.CFile.CFSettlementPlan.CFSettlementPlanInfo.CFSettlementPlanInfo",
      params: { stPlanId },
    });
  }

  get CFStPlanListFDataTableMetaData() {
    return new CFStPlanListFDataTableMDP({
      root: this,
    }).getMetaData();
  }
}
</script>

<style></style>
