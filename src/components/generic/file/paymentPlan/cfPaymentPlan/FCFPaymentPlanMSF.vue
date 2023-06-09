<template>
  <div>
    <component
      :is="paymentCalculatorFormMetaData.componentName"
      :ref="paymentCalculatorFormMetaData.myRefName"
      :value="
        selectModel(modelValue, paymentCalculatorFormMetaData.dataSelectorKey)
      "
      @input="
        (newValue) =>
          updateModel(
            modelValue,
            newValue,
            paymentCalculatorFormMetaData.dataSelectorKey
          )
      "
      v-bind="paymentCalculatorFormMetaData.props"
    ></component>

    <!-- <TMOStimulator v-if="modelValue" :value="modelValue" /> -->

    <div class="d-flex justify-space-around"></div>

    <v-alert
      dense
      type="warning"
      outlined
      class="col-5 ma-auto mb-5"
      v-if="
        paymentPlan.ppCalculator.totalMonthlyObligation >
        this.modelValue.budgetInfo.proposedDSPayment
      "
    >
      Monthly Obligation ({{
        paymentPlan.ppCalculator.totalMonthlyObligation.toFixed(2)
      }}) greater than Affordability ({{
        this.modelValue.budgetInfo.proposedDSPayment.toFixed(2)
      }}).
    </v-alert>

    <v-card flat outlined class="row ma-2">
      <v-toolbar>
        <CFPaymentPlanFTab />
        <div class="d-flex col align-center justify-end">
          <span class="mx-3">
            <span class="mx-2">Ps Plan Status: </span>
            <v-chip small>{{ modelValue.paymentPlan.psPlanStatus }}</v-chip>
          </span>
        </div>
      </v-toolbar>

      <v-card flat class="col">
        <component
          :is="fFeeFDataTableMetaData.componentName"
          :ref="fFeeFDataTableMetaData.myRefName"
          :value="subscriptionFeeScheduleList"
          v-bind="fFeeFDataTableMetaData.props"
        ></component>
        <v-divider></v-divider>
        <component
          :is="fcfPaymentTableMetaData.componentName"
          :ref="fcfPaymentTableMetaData.myRefName"
          :value="fiPaymentMSFList"
          v-bind="fcfPaymentTableMetaData.props"
          class="mt-5"
        ></component>
      </v-card>
    </v-card>

    <div
      v-if="!disabled"
      class="d-flex flex-row align-start flex-wrap justify-space-around pa-2 my-5"
    >
      <div
        :class="actionMetaData.boundaryClass"
        v-for="(actionMetaData, indx) in actionMetaDataListFiltered"
        :key="indx"
      >
        <component
          :is="actionMetaData.componentName"
          v-bind="actionMetaData.props"
        ></component>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as Snackbar from "node-snackbar";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FBtn from "@/components/generic/FBtn.vue";
import * as Action from "@/../src-gen/action";
import * as Data from "@/../src-gen/data";
import * as Store from "@/../src-gen/store";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import TMOStimulator from "@/components/generic/tmoStimulator/TMOStimulator.vue";
import FCFPPScheduleFDataTableMDP from "./FCFPPScheduleFDataTableMDP";
import FCFPSkipedPresentedFDataTableMDP from "./FCFPSkipedPresentedFDataTableMDP";
import FCFFeeFDataTableMDP from "./FCFFeeFDataTableMDP";
import AddCFPsEntryFFormMDP from "./AddCFPsEntryFFormMDP";
import FCFPaymentFDataTableMDP from "./FCFPaymentFDataTableMDP";
import Helper from "@/section/spineapp/util/Helper";
import CFPaymentPlanFTab from "@/section/spineapp/components/tab/CFPaymentPlanFTab.vue";
import FSnackbar from "@/fsnackbar";

@Component({
  components: {
    FForm,
    FBtn,
    FDataTable,
    TMOStimulator,
    CFPaymentPlanFTab,
  },
})
export default class FCFPaymentPlanMSF extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentList
  fiPaymentList: Data.ClientFile.FiPayment;

  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: Data.ClientFile.FileSummary;

  tab = 0;

  showAddPsEntryForm: boolean = false;
  addPsEntryInput: Data.ClientFile.AddPSEntryInput =
    new Data.ClientFile.AddPSEntryInput();
  fPaymentScheduleFDataTableRefName: string = "fPaymentScheduleFDataTableMDP";
  taskId = this.$route.params.taskId;

  getFiPaymentListLocal: any = [];

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  get clientFileId() {
    return this.$route.params.clientFileId;
  }
  get paymentPlan(): Data.ClientFile.FiPaymentPlanInfo {
    return this.modelValue.paymentPlan;
  }

  get psEntrySchelduledList() {
    return this.paymentPlan.paymentScheduleList;
    // return this.paymentPlan.paymentScheduleList.filter(
    //   (psEntry: any) => psEntry.status === "SCHEDULED" || psEntry.status === "SKIPPED"
    // );
  }

  get psEntryPresentedList() {
    return this.paymentPlan.paymentScheduleList.filter(
      (psEntry: any) => psEntry.status !== "SCHEDULED"
    );
  }

  get subscriptionFeeScheduleList() {
    return this.paymentPlan.subscriptionFeeScheduleList;
  }

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }

  openPaymentDetails(item: any) {
    if (item.paymentId) {
      this.$router.push({
        name: "Root.CFile.CFPayment.CFPaymentDetails.CFPaymentDetails",
        params: {
          clientFileNumber: this.$route.params.clientFileNumber,
          paymentId: item.paymentId,
        },
      });
    }
  }

  resetFormsTableAndData() {
    this.showAddPsEntryForm = false;
    this.addPsEntryInput = new Data.ClientFile.AddPSEntryInput();
    (
      this.$refs[this.fPaymentScheduleFDataTableRefName] as any
    ).clearSelectedItems();
    this.getFiPaymentList();
  }


  // get fPSkipedPresentedTableMetaData() {
  //   return new FCFPSkipedPresentedFDataTableMDP({ parent: this }).getMetaData();
  // }

  get fcfPaymentTableMetaData() {
    return new FCFPaymentFDataTableMDP({ parent: this }).getMetaData();
  }
  getFiPaymentListHandler = (output: any) => {
    setTimeout(() => {
      this.getFiPaymentList();
    }, 1000);
  };

  mounted() {
    this.getFiPaymentList();
    Action.Spine.PresentPSEntry.interested(this.getFiPaymentListHandler);
  }

  public destroyed() {
    Action.Spine.PresentPSEntry.notInterested(this.getFiPaymentListHandler);
  }

  //ACTION
  getFiPaymentList() {
    Action.ClientFile.GetFiPaymentList.execute1(this.clientFileId, (output) => {
      this.getFiPaymentListLocal = output;
    });
  }

  createCollectMSFThroughCashfree(selectedMSFRow: any) {
    const draftMSFThroughCashfreeInput: Data.Spine.DraftMSFThroughCashfreeInput =
    new Data.Spine.DraftMSFThroughCashfreeInput();
    draftMSFThroughCashfreeInput.msfScheduleEntryId =
      selectedMSFRow.msfEntryId;
    draftMSFThroughCashfreeInput.clientFileId =
      this.clientFileId;

    Action.Spine.DraftAndPresentMSFThroughCashfree.execute(draftMSFThroughCashfreeInput, output => {
      this.openPaymentDetails({paymentId: output.paymentId});
    });  


    // Action.Spine.CreateCollectMSFThroughCashfree.execute(
    //   this.createCollectMSFThroughCashfreeInput,
    //   (output) => {
    //     setTimeout(() => {
    //       this.gotoCFActiveTaskList();
    //     }, 400);
    //   }
    // );
  }

  createNsfMsfTask(selectedMSFRow: Data.ClientFile.FiFeeEntry) {
    if(selectedMSFRow.status === "NSF") {
    const createNsfMSFInput = new Data.Spine.CreateNsfMSFInput();
    createNsfMSFInput.clientFileNumber = this.clientFileBasicInfo.clientFileNumber;
    createNsfMSFInput.msfEntryId = selectedMSFRow.msfEntryId;
    createNsfMSFInput.paymentId = selectedMSFRow.paymentId || "";
    Action.Spine.CreateNsfMSF.execute(createNsfMSFInput, output => {
      console.log(output);
    });
    } else {
      FSnackbar.error("The payment status should be NSF inorder to reschedule")
    }
  }

  gotoCFActiveTaskList() {
    Helper.Router.gotoCFActiveTaskList({
      router: this.$router,
      clientFileId: this.clientFileId,
    });
  }

  get fiPaymentSPAList() {
    return this.getFiPaymentListLocal.filter(
      (psEntry: any) =>
        psEntry.spaAmount + psEntry.feeAmount > psEntry.msfAmount
    );
  }
  get fiPaymentMSFList() {
    return this.getFiPaymentListLocal.filter(
      (psEntry: any) => psEntry.msfAmount > 0
    );
  }

  get fFeeFDataTableMetaData() {
    return new FCFFeeFDataTableMDP({ parent: this }).getMetaData();
  }

  get addPsEntryFFormMetaData() {
    return new AddCFPsEntryFFormMDP({
      parent: this,
    }).getMetaData();
  }

  @Prop()
  paymentCalculatorFormMetaData: any;

  @Prop({ default: false })
  disabled: boolean;

  @Prop({ default: false })
  dataSelectorKey: boolean;

  @Prop()
  actionMetaDataList: any[];

  @Prop({ default: false })
  hideMSFTab: boolean;

  @Prop({ default: false })
  disabledActionBtn: boolean;
}
</script>
