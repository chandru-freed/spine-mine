<template>
  <div class="DailySalesReport">
    <div class="row ma-3">
      <div class="col-4">
        <v-sheet outlined color="primary" rounded>
          <v-card outlined elevation="0" min-height="123">
            <v-list class="py-0">
              <v-list-item dense>
                <v-list-item-content>
                  <v-list-item-title class="primary--text text-subtitle-1"
                    >Total Sales
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action class="py-0 my-0">
                  <div
                    class="
                      d-flex
                      primary--text
                      text-right text-h6
                      font-weight-semibold
                    "
                  >
                    {{ totalDashboard.totalSales }}
                  </div>
                </v-list-item-action>
              </v-list-item>
              <v-divider />
              <v-list-item dense>
                <v-list-item-subtitle
                  class="caption d-flex justify-space-between align-center"
                >
                  <div>Total Amount</div>
                  <div class="font-weight-bold text-subtitle-1">
                    {{ totalDashboard.totalSPACollected | toINR }}
                  </div>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item dense>
                <v-list-item-subtitle
                  class="caption d-flex justify-space-between align-center"
                >
                  <div>Total MSF</div>
                  <div class="font-weight-bold text-subtitle-1">
                    {{ totalDashboard.totalMSF | toINR }}
                  </div>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item dense>
                <v-list-item-subtitle
                  class="caption d-flex justify-space-between align-center"
                >
                  <div>Target for the day</div>
                  <div class="text-subtitle-1">
                    <span class="font-weight-bold">24</span>
                    <span class="grey--text"
                      >({{ 24 - totalDashboard.totalSales }} sales behind)</span
                    >
                  </div>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-sheet>
      </div>

      <div class="col-3">
        <v-sheet outlined color="primary" rounded>
          <v-card outlined elevation="0" min-height="123">
            <v-list class="py-0">
              <v-list-item dense>
                <v-list-item-content>
                  <v-list-item-title class="primary--text text-subtitle-1"
                    >Total SPA Collected
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action class="py-0 my-0">
                  <div
                    class="
                      d-flex
                      primary--text
                      text-right text-h6
                      font-weight-semibold
                    "
                  >
                    <v-progress-circular
                      :rotate="270"
                      :size="25"
                      :width="3"
                      :value="
                        (totalDashboard.totalSPACount /
                          totalDashboard.totalSales) *
                        100
                      "
                      color="primary"
                    >
                      <div class="caption">
                        {{ totalDashboard.totalSPACount }}
                      </div>
                    </v-progress-circular>
                  </div>
                </v-list-item-action>
              </v-list-item>
              <v-divider />
              <v-list-item dense>
                <v-list-item-subtitle
                  class="caption d-flex justify-space-between align-center"
                >
                  <div>Total SPA Collected</div>
                  <div class="font-weight-bold text-subtitle-1">
                    {{ totalDashboard.totalSPACollected | toINR }}
                  </div>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-sheet>
      </div>

      <div class="col-3">
        <v-sheet outlined color="primary" rounded>
          <v-card outlined elevation="0" min-height="123">
            <v-list class="py-0">
              <v-list-item dense>
                <v-list-item-content>
                  <v-list-item-title class="primary--text text-subtitle-1"
                    >Total MSF Collected
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action class="py-0 my-0">
                  <div
                    class="
                      d-flex
                      primary--text
                      text-right text-h6
                      font-weight-semibold
                    "
                  >
                    <v-progress-circular
                      :rotate="270"
                      :size="25"
                      :width="3"
                      :value="
                        (totalDashboard.totalMSFCount /
                          totalDashboard.totalSales) *
                        100
                      "
                      color="primary"
                    >
                      <div class="caption">
                        {{ totalDashboard.totalMSFCount }}
                      </div>
                    </v-progress-circular>

                    <!-- {{ totalDashboard.totalMSFCount }} -->
                  </div>
                </v-list-item-action>
              </v-list-item>
              <v-divider />
              <v-list-item dense>
                <v-list-item-subtitle
                  class="caption d-flex justify-space-between align-center"
                >
                  <div>Total MSF Collected</div>
                  <div class="font-weight-bold text-subtitle-1">
                    {{ totalDashboard.totalMSFCollected | toINR }}
                  </div>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-sheet>
      </div>
    </div>
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
  apiCallInterval: any;

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
    // this.apiCallInterval = setInterval(() => {
    //   this.getCFSalesListForDate();
    // }, 9000);
  }

  destroyed() {
    clearInterval(this.apiCallInterval);
  }
  getCFSalesListForDate() {
    const {selectedDate}: any = this.$route.query;
    if(selectedDate) {
    this.getDayWiseSalesReportInput.saleDate = selectedDate;
    }
    Action.Spine.GetCFSalesListForDate.execute(
      this.getDayWiseSalesReportInput,
      (output) => {
        // if (output.length > this.reportSalesClientFileList.length) {
        //   const audio = new Audio(
        //     "https://www.pacdv.com/sounds/applause-sound/app-5.mp3"
        //   );
        //   audio.play();
        // }
        this.reportSalesClientFileList = output;
        this.getCFSalesBasedOnSalesRep(output);
      }
    );
  }

  handleDatechange(newValue: any) {
    // this.getDayWiseSalesReportInput.saleDate = newValue;
    this.showDatePicker = false;
    this.$router.push({query: {selectedDate: newValue}})
    // this.getCFSalesListForDate();
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
    cfSalesForSalesRep.enachDoneList = cfSalesForSalesRep.salesList.reduce(
      (acc: any[], currVal) => {
        acc.push(currVal.isEMandateDone);
        return acc;
      },
      []
    );

    cfSalesForSalesRep.msfDoneList = cfSalesForSalesRep.salesList.reduce(
      (acc: any[], currVal) => {
        acc.push(currVal.isFirstMSFPaid);
        return acc;
      },
      []
    );

    cfSalesForSalesRep.ccDoneList = cfSalesForSalesRep.salesList.reduce(
      (acc: any[], currVal) => {
        acc.push(currVal.isCCDone);
        return acc;
      },
      []
    );
    return cfSalesForSalesRep;
  }

  get totalDashboard() {
    return {
      totalSales: this.reportSalesClientFileList.length,
      totalMSF: this.reportSalesClientFileList.reduce(
        (acc: number, currVal) => {
          acc = acc + currVal.msfAmount;
          return acc;
        },
        0
      ),
      totalSPACollected: this.reportSalesClientFileList.reduce(
        (acc: number, currVal) => {
          acc = acc + currVal.spaAmount;
          return acc;
        },
        0
      ),
      totalSPACount: this.reportSalesClientFileList.filter((reportSales) => {
        return reportSales.isEMandateDone === true;
      }).length,
      totalMSFCount: this.reportSalesClientFileList.filter((reportSales) => {
        return reportSales.isFirstMSFPaid === true;
      }).length,
      totalMSFCollected: this.reportSalesClientFileList.reduce(
        (acc: number, currVal) => {
          if (currVal.isFirstMSFPaid) {
            acc = acc + currVal.msfAmount;
          }
          return acc;
        },
        0
      ),
    };
  }
}
</script>

<style>
</style>
