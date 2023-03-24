<template>
  <div class="DailySalesReport">
    <div class="row mx-3 my-1">
      <!-- <div class="col-4">
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
                    class="d-flex primary--text text-right text-h6 font-weight-semibold"
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
      </div> -->

      <!-- <div class="col-3">
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
                    class="d-flex primary--text text-right text-h6 font-weight-semibold"
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
      </div> -->

      <!-- <div class="col-3">
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
                    class="d-flex primary--text text-right text-h6 font-weight-semibold"
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
      </div> -->
    </div>
    <component
      v-if="!!dailySalesReportFDataTableMetaData"
      :ref="dailySalesReportFDataTableMetaData.myRefName"
      :is="dailySalesReportFDataTableMetaData.componentName"
      :value="selectModel(salesRepDailySaleList, undefined)"
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

        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ targetForTheDay }}
              <span v-if="targetForTheDay - totalDashboard.totalSales>=0" class="text-caption grey--text"
                >({{ targetForTheDay - totalDashboard.totalSales }} sales behind)</span
              >
              <span v-else class="text-caption green--text"
                >({{ (targetForTheDay - totalDashboard.totalSales) * -1 }} sales ahead)</span
              >
            </div>
            <div class="text-caption">Target for the day</div>
          </v-card>
        </v-sheet>

        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ totalDashboard.totalSales }}
            </div>
            <div class="text-caption">Total Sales</div>
          </v-card>
        </v-sheet>

        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ totalDashboard.totalSPACollected | toINR }}
            </div>
            <div class="text-caption">Total Amount</div>
          </v-card>
        </v-sheet>

        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ totalDashboard.totalMSF | toINR }}
            </div>
            <div class="text-caption">Total MSF</div>
          </v-card>
        </v-sheet>

        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              <v-progress-circular
                :rotate="270"
                :size="25"
                :width="3"
                :value="
                  (totalDashboard.totalMSFCount / totalDashboard.totalSales) *
                  100
                "
                color="primary"
              >
                <div class="caption">
                  {{ totalDashboard.totalMSFCount }}
                </div>
              </v-progress-circular>
            </div>
            <div class="text-caption">Total MSF Done</div>
          </v-card>
        </v-sheet>
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
  salesRepDailySaleList: Data.Spine.SalesRepDailySale[] = [];
  apiCallInterval: any;
  targetForTheDay: number = 24;

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
    this.apiCallInterval = setInterval(() => {
      this.getCFSalesListForDate();
    }, 9000);
  }

  destroyed() {
    clearInterval(this.apiCallInterval);
  }
  getCFSalesListForDate() {
    const { selectedDate }: any = this.$route.query;
    if (selectedDate) {
      this.getDayWiseSalesReportInput.saleDate = selectedDate;
    }
    Action.Spine.GetCFSalesListForDate.execute(
      this.getDayWiseSalesReportInput,
      (output) => {
        // if (output.length > this.salesRepDailySaleList.length) {
        //   const audio = new Audio(
        //     "https://www.pacdv.com/sounds/applause-sound/app-5.mp3"
        //   );
        //   audio.play();
        // }
        this.salesRepDailySaleList = output;
        this.deriveSalesRepDailySalesListData();
      }
    );
  }

  handleDatechange(newValue: any) {
    this.getDayWiseSalesReportInput.saleDate = newValue;
    this.showDatePicker = false;
    this.$router.push({ query: { selectedDate: newValue } });
    this.getCFSalesListForDate();
  }

  deriveSalesRepDailySalesListData() {
    this.salesRepDailySaleList.map((salesRepDailySale) => {
      salesRepDailySale.totalSales = salesRepDailySale.cfSales.length;
      salesRepDailySale.msfDoneList = salesRepDailySale.cfSales.reduce(
        (acc: any[], currVal) => {
          acc.push(currVal.isFirstMSFPaid);
          return acc;
        },
        []
      );

      salesRepDailySale.enachDoneList = salesRepDailySale.cfSales.reduce(
        (acc: any[], currVal) => {
          acc.push(currVal.isEMandateDone);
          return acc;
        },
        []
      );

      salesRepDailySale.ccDoneList = salesRepDailySale.cfSales.reduce(
        (acc: any[], currVal) => {
          acc.push(currVal.isCCDone);
          return acc;
        },
        []
      );

      return salesRepDailySale;
    });
  }

  get totalDashboard() {
    return {
      totalSales: this.salesRepDailySaleList.reduce((acc: number, currVal) => {
        acc = acc + (currVal?.totalSales || 0);
        return acc;
      }, 0),
      totalMSF: this.salesRepDailySaleList.reduce((acc: number, currVal) => {
        acc = acc + currVal.totalMSF;
        return acc;
      }, 0),
      totalSPACollected: this.salesRepDailySaleList.reduce(
        (acc: number, currVal) => {
          acc = acc + currVal.totalDebt;
          return acc;
        },
        0
      ),
      totalSPACount: this.salesRepDailySaleList.reduce(
        (acc: number, currVal) => {
          acc =
            acc + currVal.enachDoneList.filter((item) => item === true).length;
          return acc;
        },
        0
      ),
      totalMSFCount: this.salesRepDailySaleList.reduce(
        (acc: number, currVal) => {
          acc =
            acc + currVal.msfDoneList.filter((item) => item === true).length;
          return acc;
        },
        0
      ),
      totalMSFCollected: this.salesRepDailySaleList.reduce(
        (acc: number, currVal) => {
          acc = acc + currVal.totalMSF;
          return acc;
        },
        0
      ),
      // totalSPACount: this.reportSalesClientFileList.filter((reportSales) => {
      //   return reportSales.isEMandateDone === true;
      // }).length,
      // totalMSFCount: this.reportSalesClientFileList.filter((reportSales) => {
      //   return reportSales.isFirstMSFPaid === true;
      // }).length,
      // totalMSFCollected: this.reportSalesClientFileList.reduce(
      //   (acc: number, currVal) => {
      //     if (currVal.isFirstMSFPaid) {
      //       acc = acc + currVal.msfAmount;
      //     }
      //     return acc;
      //   },
      //   0
      // ),
    };
  }
}
</script>

<style>
</style>
