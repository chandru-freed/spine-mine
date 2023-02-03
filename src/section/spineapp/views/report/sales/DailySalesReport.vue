<template>
  <div class="DailySalesReport">
    <component
      v-if="!!dailySalesReportFDataTableMetaData"
      :ref="dailySalesReportFDataTableMetaData.myRefName"
      :is="dailySalesReportFDataTableMetaData.componentName"
      :value="selectModel(cfSalesForSalesRepList, undefined)"
      v-bind="dailySalesReportFDataTableMetaData.props"
      class="py-5"
    >
      <template v-slot:top-action>
        <f-date-select-field
          dense
          dateDisplayFormat="Do MMM YY (ddd)"
          hide-details
          :value="selectModel(getDayWiseSalesReportInput.saleDate, undefined)"
          @input="(newValue) => handleDatechange(newValue)"
          outlined
          label="Select Date"
        />
      </template>
    </component>
  </div>
</template>

<script lang="ts">
import DashboardTab from "@/section/spineapp/components/tab/DashboardTab.vue";
import TaskTab from "@/section/spineapp/components/tab/TaskTab.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import DailySalesReportFDataTableMDP from "./DailySalesReportFDataTableMDP";
import DailySalesFilterFFormMDP from "./DailySalesFilterFFormMDP";
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import ModelVue from "@/components/generic/ModelVue";
import FDateSelectField from "@/components/generic/form/field/FDateSelectField.vue";

@Component({
  components: {
    DashboardTab,
    FForm,
    FDataTable,
    FDateSelectField,
  },
})
export default class DailySalesReport extends ModelVue {
  getDayWiseSalesReportInput: Data.Spine.GetCFSalesListForDateInput =
    new Data.Spine.GetCFSalesListForDateInput();
  reportSalesClientFileList: Data.Spine.CFSales[] = [];
  cfSalesForSalesRepList: Data.Spine.CFSalesForSalesRep[] = [];

  // Meta data
  get dailySalesReportFDataTableMetaData() {
    return new DailySalesReportFDataTableMDP({
      parent: this,
    }).getMetaData();
  }

  get dailySalesFilterFFormMetaData() {
    return new DailySalesFilterFFormMDP({ taskRoot: this }).getMetaData();
  }
  // Meta data

  showDatePicker: boolean = false;

  public mounted() {
    this.getCFSalesListForDate();
  }
  getCFSalesListForDate() {
    Action.Spine.GetCFSalesListForDate.execute(
      this.getDayWiseSalesReportInput,
      (output) => {
        this.reportSalesClientFileList = output;
        this.getCFSalesBasedOnSalesRep(output);
      }
    );
  }

  handleDatechange(newValue: any) {
    this.getDayWiseSalesReportInput.saleDate = newValue;
    this.showDatePicker = false;
    this.getCFSalesListForDate();
  }

  getCFSalesBasedOnSalesRep(cfSalesList: Data.Spine.CFSales[]) {
    this.cfSalesForSalesRepList = cfSalesList.reduce(
      (acc: Data.Spine.CFSalesForSalesRep[], cfSales: Data.Spine.CFSales) => {
        let matchedCFSalesForSalesRep = acc.find(
          (cfSalesForSalesRep) =>
            cfSalesForSalesRep.salesRep === cfSales.salesRep
        );
        const cfSalesForSalesRep = this.makeCfSalesForSalesRepObject(
          matchedCFSalesForSalesRep,
          cfSales
        );
        if (!matchedCFSalesForSalesRep) {
          acc.push(cfSalesForSalesRep);
        }
        return acc;
      },
      []
    );
  }

  makeCfSalesForSalesRepObject(
    cfSalesForSalesRep: Data.Spine.CFSalesForSalesRep = new Data.Spine.CFSalesForSalesRep(),
    cfSales: Data.Spine.CFSales
  ) {
    cfSalesForSalesRep.salesRep = cfSales.salesRep;
    cfSalesForSalesRep.salesList = cfSalesForSalesRep.salesList.concat(cfSales);
    cfSalesForSalesRep.totalSales = cfSalesForSalesRep.salesList.length;
    cfSalesForSalesRep.totalDebt += cfSales.spaAmount;
    cfSalesForSalesRep.totalMSF += cfSales.msfAmount;
    cfSalesForSalesRep.totalMSFDone += cfSales.isFirstMSFPaid ? 1 : 0;
    cfSalesForSalesRep.totalSPADone += cfSales.isEMandateDone ? 1 : 0;
    return cfSalesForSalesRep;
  }
}
</script>

<style>
</style>
