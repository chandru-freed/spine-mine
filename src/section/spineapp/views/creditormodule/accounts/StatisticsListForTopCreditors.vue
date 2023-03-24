<template>
  <div>
    
    <v-card-title class="mx-5"> Top Creditors Statistics</v-card-title>
    <f-loader v-if="loading"></f-loader>
    <div v-else flat class="Stats col d-flex flex-wrap">
      <div
        class="col-4"
        v-for="(creditorsStatistics, index) of creditorsStatisticsList"
        :key="`creditor${index}`"
      >
        <a @click="openAccountListPage(creditorsStatistics)">
          <v-sheet class="mx-3 mb-3" outlined color="secondary" rounded>
            <v-card
              class="d-flex pa-3 flex-column justify-space-between"
              height="170px"
              transparent
              rounded
              outlined
              flat
            >
              <div class="d-flex justify-space-between align-center">
                <div>
                  <div class="text-subtitle-2">
                    {{ creditorsStatistics.creditorName }}
                  </div>
                  <div class="text-h5">
                    {{ creditorsStatistics.totalDebtRegistered | toINR }}
                  </div>
                </div>
                <div>
                <img width="150px" height="40px" :src="creditorImgMap[creditorsStatistics.creditorName]"/>
                </div>
              </div>

              <div class="d-flex justify-space-between">
                <div>
                  <div class="text-h5">
                    {{ creditorsStatistics.totalNumberOfAccounts }}
                  </div>
                  <span class="text-subtitle-2">Total Accounts</span>
                </div>

                <div>
                  <div class="text-h5">
                    {{ creditorsStatistics.numberOfAccountsSettled }}
                  </div>
                  <span class="text-subtitle-2">Settled Accounts</span>
                </div>

                <!-- <div>
                  <div class="text-h5">
                    {{ creditorsStatistics.totalAvailablSpaBalanace | toINR }}
                  </div>
                  <span class="text-subtitle-2">SPA Balance</span>
                </div> -->
              </div>
            </v-card>
          </v-sheet>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import AccountListFDataTableMDP from "./AccountListFDataTableMDP";
import FilterAccountListFFormMDP from "./FilterAccountListFFormMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import FPagination from "@/components/generic/FPagination.vue";
import Helper from "@/section/spineapp/util/Helper";
import FLoader from "@/components/generic/FLoader.vue";
import ErrorResponse from "@/error-response";

@Component({
  components: {
    FDataTable,
    FForm,
    FPagination,
    FLoader
  },
})
export default class StatisticsListForTopCreditors extends ModelVue {
  creditorsStatisticsList: Data.Spine.CreditorsStatistics[] = [];
  creditorImgMap = {
"ICICI BANK LTD": "https://oasys-image.s3.ap-south-1.amazonaws.com/banklogo/icici_bank.png",
"HDFC BANK LTD": "https://oasys-image.s3.ap-south-1.amazonaws.com/banklogo/hdfc_bank.png",
"KOTAK BANK LTD":"https://oasys-image.s3.ap-south-1.amazonaws.com/banklogo/kotak_mahindra.png",
"BAJAJ FINSERVE":"https://oasys-image.s3.ap-south-1.amazonaws.com/banklogo/bajaj_finserv.png",
"SBI Cards and Payment Services Private Limited":"https://oasys-image.s3.ap-south-1.amazonaws.com/banklogo/sbi.png"
}

  loading: boolean = false;
  mounted() {
    this.getStatisticsListForTopCreditors();
  }

  getStatisticsListForTopCreditors() {
    this.loading = true;
    Action.Spine.GetStatisticsListForTopCreditors.execute((output) => {
      this.creditorsStatisticsList = output;
      this.loading = false;
    },
    error => {
      ErrorResponse.handle(error);
      this.loading = false;
    });
  }

  openAccountListPage(creditorsStatistics: any) {
    console.log(creditorsStatistics);
    this.$router.push({
      name: "Root.CreditorModule.AccountListForCreditor",
      query: { creditorName: creditorsStatistics.creditorName },
    });
  }
}

</script>

<style>
</style>
