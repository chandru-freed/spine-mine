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
      <v-tabs v-model="tab" background-color="transparent" color="secondary">
        <v-tab> Payment Schedule </v-tab>
        <v-tab v-if="!hideMSFTab"> MSF Schedule </v-tab>
      </v-tabs>

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
              :value="fiPaymentList"
              v-bind="fcfPaymentTableMetaData.props"
            ></component>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <component
              :is="fFeeFDataTableMetaData.componentName"
              :ref="fFeeFDataTableMetaData.myRefName"
              :value="subscriptionFeeScheduleList"
              v-bind="fFeeFDataTableMetaData.props"
            ></component>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <div
      v-if="!disabled"
      class="
        d-flex
        flex-row
        align-start
        flex-wrap
        justify-space-around
        pa-2
        my-5
      "
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

@Component({
  components: {
    FForm,
    FBtn,
    FDataTable,
    TMOStimulator,
  },
})
export default class FCFPaymentPlan extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentList
  fiPaymentList: Data.ClientFile.FiPayment;
  tab = 0;

  showAddPsEntryForm: boolean = false;
  addPsEntryInput: Data.ClientFile.AddPSEntryInput =
    new Data.ClientFile.AddPSEntryInput();
  fPaymentScheduleFDataTableRefName: string = "fPaymentScheduleFDataTableMDP";
  taskId = this.$route.params.taskId;

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
    console.log(item);
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
  }

  get fPaymentScheduleFDataTableMetaData() {
    return new FCFPPScheduleFDataTableMDP({
      parent: this,
      refName: this.fPaymentScheduleFDataTableRefName,
    }).getMetaData();
  }

  // get fPSkipedPresentedTableMetaData() {
  //   return new FCFPSkipedPresentedFDataTableMDP({ parent: this }).getMetaData();
  // }

  get fcfPaymentTableMetaData() {
    return new FCFPaymentFDataTableMDP({ parent: this }).getMetaData();
  }

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
