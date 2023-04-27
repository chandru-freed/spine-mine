<template>
  <div class="DailyClientFileSalesReport">
      <component
      v-if="!!dailyCfSalesReportFDataTableMetaData"
      :ref="dailyCfSalesReportFDataTableMetaData.myRefName"
      :is="dailyCfSalesReportFDataTableMetaData.componentName"
      :value="clientFileSaleList"
      v-bind="dailyCfSalesReportFDataTableMetaData.props"
    >
         <template v-slot:top-action>
        <f-date-select-field
          dense
          dateDisplayFormat="Do MMM YY (ddd)"
          hide-details
          :value="selectModel(getDailySaleReportInput.saleDate, undefined)"
          @input="(newValue) => handleDatechange(newValue)"
          outlined
          label="Select Date"
        />
         </template>
    
    </component>
  </div>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import store, * as Store from '@/../src-gen/store';
import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';
import DailyCFSalesReportFDataTableMDP from './DailyCFSalesReportFDataTableMDP'
import FDataTable from '@/components/generic/table/FDataTable.vue';
import FDateSelectField from '@/components/generic/form/field/FDateSelectField.vue';
import ModelVue from '@/components/generic/ModelVue';

@Component({
  components: {
    FDataTable,
    FDateSelectField
  }
})
export default class OPRDailyClientFileSalesReport extends ModelVue {
  getDailySaleReportInput: Data.Spine.GetCFDailySaleReportInput = new Data.Spine.GetCFDailySaleReportInput();
  clientFileSaleList: Data.Spine.FiClientFileSale[] = [];
  public mounted() {
    this.getClientFileDailySaleReport();
  }

  get dailyCfSalesReportFDataTableMetaData() {
          return new DailyCFSalesReportFDataTableMDP({parent: this}).getMetaData()
  }

  getClientFileDailySaleReport() {
     const { selectedDate }: any = this.$route.query;
    if (selectedDate) {
      console.log(selectedDate)
      // this.getDayWiseSalesReportInput.saleDate = selectedDate;
      this.getDailySaleReportInput.saleDate = selectedDate;
    }

    Action.Spine.GetClientFileDailySaleReport.execute(this.getDailySaleReportInput, output => {
      this.clientFileSaleList = output;
    })
  }


  handleDatechange(newValue: any) {
    // this.getDayWiseSalesReportInput.saleDate = newValue;
    this.getDailySaleReportInput.saleDate = newValue;
    this.$router.push({ query: { selectedDate: newValue } });
    // this.getCFSalesListForDate();
  }



}

</script>

<style>
</style>
