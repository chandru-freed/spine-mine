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
        <v-tabs v-model="tab" background-color="transparent" color="secondary">
          <v-tab> Payment Schedule </v-tab>
          <v-tab v-if="!hideMSFTab"> MSF Schedule </v-tab>
        </v-tabs>
        <div class="d-flex col-3 justify-end">
          <span class="mx-2">Ps Plan Status: </span>
          <v-chip small>{{ modelValue.paymentPlan.psPlanStatus }}</v-chip>
        </div>
      </v-toolbar>

      <v-tabs-items v-model="tab" class="col-12">
        <v-tab-item>
          <v-card flat>
            <component
              v-if="showAddPsEntryForm"
              :is="addPsEntryFFormMetaData.componentName"
              :ref="addPsEntryFFormMetaData.myRefName"
              :value="
                selectModel(
                  addPsEntryInput,
                  addPsEntryFFormMetaData.dataSelectorKey
                )
              "
              @input="
                (newValue) =>
                  updateModel(
                    addPsEntryInput,
                    newValue,
                    addPsEntryFFormMetaData.dataSelectorKey
                  )
              "
              v-bind="addPsEntryFFormMetaData.props"
            ></component>


            <component
              v-if="showAddPsEntryWithoutRCForm"
              :is="addCFAPsEntryWithoutRCFFormMetaData.componentName"
              :ref="addCFAPsEntryWithoutRCFFormMetaData.myRefName"
              :value="
                selectModel(
                  addPsEntryInput,
                  addCFAPsEntryWithoutRCFFormMetaData.dataSelectorKey
                )
              "
              @input="
                (newValue) =>
                  updateModel(
                    addPsEntryInput,
                    newValue,
                    addCFAPsEntryWithoutRCFFormMetaData.dataSelectorKey
                  )
              "
              v-bind="addCFAPsEntryWithoutRCFFormMetaData.props"
            ></component>

            

            <component
              v-if="showChangeSPADraftDate"
              :is="changeSPADraftDateFFormMetaData.componentName"
              :ref="changeSPADraftDateFFormMetaData.myRefName"
              :value="
                selectModel(
                  changePSEntryDraftDateInput,
                  changeSPADraftDateFFormMetaData.dataSelectorKey
                )
              "
              @input="
                (newValue) =>
                  updateModel(
                    changePSEntryDraftDateInput,
                    newValue,
                    changeSPADraftDateFFormMetaData.dataSelectorKey
                  )
              "
              v-bind="changeSPADraftDateFFormMetaData.props"
            ></component>

             <component
              v-if="showSetSPADraftDate"
              :is="setSPADraftDateFFormMetaData.componentName"
              :ref="setSPADraftDateFFormMetaData.myRefName"
              :value="
                selectModel(
                  setSPADraftDateInput,
                  setSPADraftDateFFormMetaData.dataSelectorKey
                )
              "
              @input="
                (newValue) =>
                  updateModel(
                    setSPADraftDateInput,
                    newValue,
                    setSPADraftDateFFormMetaData.dataSelectorKey
                  )
              "
              v-bind="setSPADraftDateFFormMetaData.props"
            ></component>

            

            <component
              v-if="showModifyForm"
              :is="modifyPsEntryFFormMetaData.componentName"
              :ref="modifyPsEntryFFormMetaData.myRefName"
              :value="
                selectModel(
                  modifyAmountPSEListInput,
                  modifyPsEntryFFormMetaData.dataSelectorKey
                )
              "
              @input="
                (newValue) =>
                  updateModel(
                    addPsEntryInput,
                    newValue,
                    modifyPsEntryFFormMetaData.dataSelectorKey
                  )
              "
              v-bind="modifyPsEntryFFormMetaData.props"
            ></component>
            <component
              v-if="showUploadForm"
              :is="uploadExcelFFormMetaData.componentName"
              :ref="uploadExcelFFormMetaData.myRefName"
              :value="
                selectModel(
                  uploadPSPlanExcelInput,
                  uploadExcelFFormMetaData.dataSelectorKey
                )
              "
              @input="
                (newValue) =>
                  updateModel(
                    uploadPSPlanExcelInput,
                    newValue,
                    uploadExcelFFormMetaData.dataSelectorKey
                  )
              "
              v-bind="uploadExcelFFormMetaData.props"
            ></component>

            <component
              :is="fPaymentScheduleFDataTableMetaData.componentName"
              :ref="fPaymentScheduleFDataTableMetaData.myRefName"
              :value="psEntrySchelduledList"
              v-bind="fPaymentScheduleFDataTableMetaData.props"
            ></component>
          </v-card>
          <v-divider></v-divider>
          <v-card flat class="mt-5">
            <component
              :is="fcfPaymentTableMetaData.componentName"
              :ref="fcfPaymentTableMetaData.myRefName"
              :value="fiPaymentSPAList"
              v-bind="fcfPaymentTableMetaData.props"
            ></component>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <component
              v-if="showSetMsfDraftDate"
              :is="setMsfDraftDateFFormMetaData.componentName"
              :ref="setMsfDraftDateFFormMetaData.myRefName"
              :value="
                selectModel(
                  setMsfDraftDateInput,
                  setMsfDraftDateFFormMetaData.dataSelectorKey
                )
              "
              @input="
                (newValue) =>
                  updateModel(
                    setMsfDraftDateInput,
                    newValue,
                    setMsfDraftDateFFormMetaData.dataSelectorKey
                  )
              "
              v-bind="setMsfDraftDateFFormMetaData.props"
            ></component>
            
             <component
              v-if="showChangeMSFDraftDate"
              :is="changeMSFDraftDateFFormMetaData.componentName"
              :ref="changeMSFDraftDateFFormMetaData.myRefName"
              :value="
                selectModel(
                  changeMSFDraftDateInput,
                  changeMSFDraftDateFFormMetaData.dataSelectorKey
                )
              "
              @input="
                (newValue) =>
                  updateModel(
                    changeMSFDraftDateInput,
                    newValue,
                    changeMSFDraftDateFFormMetaData.dataSelectorKey
                  )
              "
              v-bind="changeMSFDraftDateFFormMetaData.props"
            ></component>
            <component
              :is="fFeeFDataTableMetaData.componentName"
              :ref="fFeeFDataTableMetaData.myRefName"
              :value="subscriptionFeeScheduleList"
              v-bind="fFeeFDataTableMetaData.props"
            ></component>
          </v-card>
          <v-divider></v-divider>
          <v-card flat class="mt-5">
            <component
              :is="fcfPaymentTableMetaData.componentName"
              :ref="fcfPaymentTableMetaData.myRefName"
              :value="fiPaymentMSFList"
              v-bind="fcfPaymentTableMetaData.props"
            ></component>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
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
import FCFAPPScheduleFDataTableMDP from "./FCFAPPScheduleFDataTableMDP";
import FCFAPSkipedPresentedFDataTableMDP from "./FCFAPSkipedPresentedFDataTableMDP";
import FCFAFeeFDataTableMDP from "./FCFAFeeFDataTableMDP";
import AddCFAPsEntryFFormMDP from "./AddCFAPsEntryFFormMDP";
import FCFAPaymentFDataTableMDP from "./FCFAPaymentFDataTableMDP";
import ModifyCFAPsEntryFFormMDP from "./ModifyCFAPsEntryFFormMDP";
import Helper from "@/section/spineapp/util/Helper";
import UploadExcelAdminFFormMDP from "./UploadExcelAdminFFormMDP";
import ChangeMSFDraftDateFFormMDP from "./ChangeMSFDraftDateFFormMDP";
import ChangeSPADraftDateFFormMDP from './ChangeSPADraftDateFFormMDP';
import SetSPADraftDateFFormMDP from './SetSPADraftDateFFormMDP';
import SetMsfDraftDateFFormMDP from './SetMsfDraftDateFFormMDP';
import AddCFAPsEntryWithoutRCFFormMDP from './AddCFAPsEntryWithoutRCFFormMDP';
@Component({
  components: {
    FForm,
    FBtn,
    FDataTable,
    TMOStimulator,
  },
})
export default class FCFAPaymentPlan extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentList
  fiPaymentList: Data.ClientFile.FiPayment;

  tab = 0;

  showAddPsEntryForm: boolean = false;
  showAddPsEntryWithoutRCForm: boolean = false;
  showModifyForm: boolean = false;
  addPsEntryInput: Data.ClientFile.AddPSEntryInput =
    new Data.ClientFile.AddPSEntryInput();
  modifyAmountPSEListInput: Data.ClientFile.ModifyAmountWithFixedTenureInput =
    new Data.ClientFile.ModifyAmountWithFixedTenureInput();
  fPaymentScheduleFDataTableRefName: string = "fPaymentScheduleFDataTableMDP";
  fFeeFDataTableRefName: string = "fFeeFDataTableRef";
  taskId = this.$route.params.taskId;
  showUploadForm: boolean = false;
  showChangeMSFDraftDate: boolean = false;
  showSetSPADraftDate: boolean = false;
  showChangeSPADraftDate: boolean = false;
  showSetMsfDraftDate: boolean = false;
  changeMSFDraftDateInput: Data.Spine.ChangeMSFEntryDraftDateInput =
    new Data.Spine.ChangeMSFEntryDraftDateInput();

  uploadPSPlanExcelInput: Data.Spine.UploadPSPlanExcelInput =
    new Data.Spine.UploadPSPlanExcelInput();
  changePSEntryDraftDateInput: Data.Spine.ChangePSEntryDraftDateInput = new Data.Spine.ChangePSEntryDraftDateInput();
  setMsfDraftDateInput: Data.Spine.SetMsfDraftDateInput = new Data.Spine.SetMsfDraftDateInput();
  setSPADraftDateInput: Data.Spine.SetSPADraftDateInput = new Data.Spine.SetSPADraftDateInput();
  getFiPaymentListLocal: any = [];

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  clientFileId = this.$route.params.clientFileId
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
    this.showAddPsEntryWithoutRCForm = false;
    this.showModifyForm = false;
    this.showUploadForm = false;
    this.showChangeMSFDraftDate = false;
    this.showSetSPADraftDate = false;
    this.showSetMsfDraftDate = false;
    this.showChangeSPADraftDate = false;
    this.changeMSFDraftDateInput = new Data.Spine.ChangeMSFEntryDraftDateInput();
    this.setSPADraftDateInput = new Data.Spine.SetSPADraftDateInput();
    this.setMsfDraftDateInput = new Data.Spine.SetMsfDraftDateInput();
    this.changePSEntryDraftDateInput = new Data.Spine.ChangePSEntryDraftDateInput();
    this.addPsEntryInput = new Data.ClientFile.AddPSEntryInput();
    this.uploadPSPlanExcelInput = new Data.Spine.UploadPSPlanExcelInput();
    this.modifyAmountPSEListInput =
      new Data.ClientFile.ModifyAmountWithFixedTenureInput();
    (
      this.$refs[this.fPaymentScheduleFDataTableRefName] as any
    ).clearSelectedItems();
    (
      this.$refs[this.fFeeFDataTableRefName] as any
    )?.clearSelectedItems();
    this.getFiPaymentList();
  }

  downloadActiveExcel() {
    const { psPlanId } = this.modelValue.paymentPlan;
    const url = `/spineapi/paymentscheduleplan/download-payment-plan-excel?psPlanId=${psPlanId}`;
    const fileName = `PaymentPlan_${this.clientFileBasicInfo.clientFileNumber}.xlsx`;
    Helper.downloadFile(url, fileName);
  }

  uploadExcel() {
    const { psPlanId } = this.modelValue.paymentPlan;
    this.uploadPSPlanExcelInput.newPSPlanId = psPlanId;
    Action.Spine.UploadPaymentSchedulePlanExcel.execute(
      this.uploadPSPlanExcelInput,
      (output) => {
        this.resetFormsTableAndData();
      }
    );
    // Action.Spine.UploadPaymentPlanExcel.execute1()
  }

  handleUploadClick() {
    this.showUploadForm = true;
  }

  get fPaymentScheduleFDataTableMetaData() {
    return new FCFAPPScheduleFDataTableMDP({
      parent: this,
      refName: this.fPaymentScheduleFDataTableRefName,
    }).getMetaData();
  }

  get changeMSFDraftDateFFormMetaData() {
    return new ChangeMSFDraftDateFFormMDP({ parent: this }).getMetaData();
  }

  get uploadExcelFFormMetaData() {
    return new UploadExcelAdminFFormMDP({ parent: this }).getMetaData();
  }
  // get fPSkipedPresentedTableMetaData() {
  //   return new FCFPSkipedPresentedFDataTableMDP({ parent: this }).getMetaData();
  // }

  get fcfPaymentTableMetaData() {
    return new FCFAPaymentFDataTableMDP({ parent: this }).getMetaData();
  }

  get changeSPADraftDateFFormMetaData() {
    return new ChangeSPADraftDateFFormMDP({ parent: this }).getMetaData();
  }

  get setSPADraftDateFFormMetaData() {
    return new SetSPADraftDateFFormMDP({ parent: this }).getMetaData();
  }
  get setMsfDraftDateFFormMetaData() {
    return new SetMsfDraftDateFFormMDP({ parent: this }).getMetaData();
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

  get fiPaymentSPAList() {
    return this.getFiPaymentListLocal.filter(
      (psEntry: any) =>
        psEntry.spaAmount + psEntry.feeAmount > psEntry.msfAmount
    );
  }
  get fiPaymentMSFList() {
    return this.getFiPaymentListLocal.filter(
      (psEntry: any) => psEntry.msfAmount > psEntry.spaAmount
    );
  }

  get fFeeFDataTableMetaData() {
    return new FCFAFeeFDataTableMDP({ parent: this }).getMetaData();
  }

  get addPsEntryFFormMetaData() {
    return new AddCFAPsEntryFFormMDP({
      parent: this,
    }).getMetaData();
  }

  get addCFAPsEntryWithoutRCFFormMetaData() {
    return new AddCFAPsEntryWithoutRCFFormMDP({
      parent: this
    }).getMetaData();
  }

  get modifyPsEntryFFormMetaData() {
    return new ModifyCFAPsEntryFFormMDP({ parent: this }).getMetaData();
  }

  isPaymentPlanDataAvailable() {
    return this.paymentPlan?.psPlanId !== "";
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
