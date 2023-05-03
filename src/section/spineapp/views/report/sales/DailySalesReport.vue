<template>
  <div class="DailySalesReport">
    <!-- <div class="firework"></div> -->
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
          :value="selectModel(getDailySaleReportInput.saleDate, undefined)"
          @input="(newValue) => handleDatechange(newValue)"
          outlined
          label="Select Date"
        />

        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ targetForTheDay }}
              <span v-if="targetForTheDay - reportData.totalSale>=0" class="text-caption grey--text"
                >({{ targetForTheDay - reportData.totalSale }} sales behind)</span
              >
              <span v-else class="text-caption green--text"
                >({{ (targetForTheDay - reportData.totalSale) * -1 }} sales ahead)</span
              >
            </div>
            <div class="text-caption">Target for the day</div>
          </v-card>
        </v-sheet>

        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ reportData.totalSale }}
            </div>
            <div class="text-caption">Total Sales</div>
          </v-card>
        </v-sheet>

        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ reportData.debtLoadTotal | toINR }}
            </div>
            <div class="text-caption">Total Amount</div>
          </v-card>
        </v-sheet>

        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ reportData.msfTotal | toINR }}
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
                  (reportData.firstMsfPaidCount / reportData.totalSale) *
                  100
                "
                color="primary"
              >
                <div class="caption">
                  {{ reportData.firstMsfPaidCount }}
                </div>
              </v-progress-circular>
            </div>
            <div class="text-caption">Total MSF Done</div>
          </v-card>
        </v-sheet>
      <v-spacer />
        <v-btn @click="gotoDailyCFListPage" small outlined color="primary">Daily Client File List</v-btn>
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
  // getDayWiseSalesReportInput: Data.Spine.GetCFSalesListForDateInput =
  //   new Data.Spine.GetCFSalesListForDateInput();

  getDailySaleReportInput: Data.Spine.GetSalesRepDailySaleReportInput = new Data.Spine.GetSalesRepDailySaleReportInput();
  // reportSalesClientFileList: Data.Spine.CFSales[] = [];
  // cfSalesForSalesRepList: Data.Spine.CFSalesForSalesRep[] = [];
  salesRepDailySaleList: Data.Spine.SalesRepCfList[] = [];
  reportData: Data.Spine.DailySaleReportData = new Data.Spine.DailySaleReportData();
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
      console.log(selectedDate)
      // this.getDayWiseSalesReportInput.saleDate = selectedDate;
      this.getDailySaleReportInput.saleDate = selectedDate;
    }

    Action.Spine.GetSalesRepDailySaleReport.execute(this.getDailySaleReportInput, output => {
          this.salesRepDailySaleList = output.saleReportData.salesRepCFList;
          this.reportData = output.saleReportData;
        this.deriveSalesRepDailySalesListData();
    })
    // Action.Spine.GetCFSalesListForDate.execute(
    //   this.getDayWiseSalesReportInput,
    //   (output) => {
    //     // if (output.length > this.salesRepDailySaleList.length) {
    //     //   const audio = new Audio(
    //     //     "https://www.pacdv.com/sounds/applause-sound/app-5.mp3"
    //     //   );
    //     //   audio.play();
    //     // }
    //     this.salesRepDailySaleList = output;
    //     this.deriveSalesRepDailySalesListData();
    //   }
    // );
  }

  handleDatechange(newValue: any) {
    // this.getDayWiseSalesReportInput.saleDate = newValue;
    this.getDailySaleReportInput.saleDate = newValue;
    this.showDatePicker = false;
    this.$router.push({ query: { selectedDate: newValue } });
    this.getCFSalesListForDate();
  }

  deriveSalesRepDailySalesListData() {
    this.reportData.msfTotal = this.salesRepDailySaleList.reduce((acc: number, salesRepDailySale) => {
      return acc + salesRepDailySale.fiClientFileSaleList.reduce((acc: number,currVal) => {
        const msf = currVal.isFirstMSFPaid?currVal.msfAmount:0;
        return acc + msf;
      },0 )
    },0)
    this.salesRepDailySaleList.map((salesRepDailySale) => {
    salesRepDailySale.totalDebt = salesRepDailySale.fiClientFileSaleList.reduce(
        (acc: number, currVal) => {
          
          return acc + currVal.outstanding;
        },
        0
      );
      salesRepDailySale.totalSales = salesRepDailySale.fiClientFileSaleList.length;
      salesRepDailySale.msfDoneList = salesRepDailySale.fiClientFileSaleList.reduce(
        (acc: any[], currVal) => {
          acc.push(currVal.isFirstMSFPaid);
          return acc;
        },
        []
      );

      salesRepDailySale.enachDoneList = salesRepDailySale.fiClientFileSaleList.reduce(
        (acc: any[], currVal) => {
          acc.push(currVal.isEMandateActive);
          return acc;
        },
        []
      );

      salesRepDailySale.ccDoneList = salesRepDailySale.fiClientFileSaleList.reduce(
        (acc: any[], currVal) => {
          acc.push(currVal.isCCDone);
          return acc;
        },
        []
      );

      return salesRepDailySale;
    });
  }


  gotoDailyCFListPage() {
    this.$router.push({name:"Root.Operation.OPRClientFile.OPRDailyClientFileSalesReport",
    query: { selectedDate: this.getDailySaleReportInput.saleDate } 
    })
  }

}
</script>

<style>
.firework {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.5vmin;
  aspect-ratio: 1;
  background: black;
      /* background intentionally blank */
    /* ; */
  background-size: 0.5vmin 0.5vmin;
  background-repeat: no-repeat;
  animation: firework 2s infinite;
  border-radius: 100%;

}

@keyframes firework {
  0% { 
    transform: translate(-20%, 60vh);
    width: 0.5vmin;
    opacity: 1;
  }
  50% { 
    width: 0.5vmin;
    opacity: 1;
  }
  100% { 
    width: 105vmin; 
    opacity: 0; 
    background: red;
  }
}

.firework,
.firework::before,
.firework::after {
  content: "";
}
.firework::before {
  transform: translate(-50%, -50%) rotate(25deg) !important; 
}
.firework::after {
  transform: translate(-50%, -50%) rotate(-37deg) !important;
}
</style>
