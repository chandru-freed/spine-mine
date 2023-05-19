<template>
  <div class="NupayPayment">
    
    <component
      v-if="!!nupayFilterFFormMetaData"
      :ref="nupayFilterFFormMetaData.myRefName"
      :is="nupayFilterFFormMetaData.componentName"
      :value="selectModel(nupayPaymentFilter, undefined)"
      @input="
        (newValue) => updateModel(nupayPaymentFilter, newValue, undefined)
      "
      v-bind="nupayFilterFFormMetaData.props"
    ></component>
    <v-card flat>
      <component
        v-if="!!fNupayPaymentMetaData"
        :ref="fNupayPaymentMetaData.myRefName"
        :is="fNupayPaymentMetaData.componentName"
        :value="nupayPaymentConsolidation"
        v-bind="fNupayPaymentMetaData.props"
      ></component>
      
      <v-toolbar-title dense class="mx-5 mt-1">CF Migrated Summary</v-toolbar-title>
      <v-row class="my-2">
        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ cfPaymentConsolidation.totalCollectionAmount }}
            </div>
            <div class="text-caption">Total Collection Amount</div>
          </v-card>
        </v-sheet>
        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ cfPaymentConsolidation.totalKFSAmount }}
            </div>
            <div class="text-caption">Total KFS Amount</div>
          </v-card>
        </v-sheet>
        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ cfPaymentConsolidation.totalFeeAmount }}
            </div>
            <div class="text-caption">Total Fee Amount</div>
          </v-card>
        </v-sheet>
        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ cfPaymentConsolidation.totalMSFAmount }}
            </div>
            <div class="text-caption">Total MSF Amount</div>
          </v-card>
        </v-sheet>
        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ cfPaymentConsolidation.totalIncomingTrustAmount }}
            </div>
            <div class="text-caption">Total Incoming To Trust</div>
          </v-card>
        </v-sheet>
        <v-sheet outlined rounded class="ml-4">
          <v-card large label outlined class="px-4">
            <div class="text-h6">
              {{ cfPaymentConsolidation.totalTrustAmount }}
            </div>
            <div class="text-caption">Total Trust Amount</div>
          </v-card>
        </v-sheet>
        <v-btn outlined small color="primary" class="ma-3" @click="migrateNupayPayment()">Migrate nupay payment</v-btn>
      </v-row>
      <component
        :ref="nupayCFMigrationFStaticTabMetaData.myRefName"
        :is="nupayCFMigrationFStaticTabMetaData.componentName"
        :value="
          selectModel(
            cfPaymentConsolidation,
            nupayCFMigrationFStaticTabMetaData.dataSelectorKey
          )
        "
        v-bind="nupayCFMigrationFStaticTabMetaData.props"
      />
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FStaticTab from "@/components/generic/FStaticTab.vue";
import NupayPaymentFStaticTabMDP from "./NupayPaymentFStaticTabMDP";
import ModelVue from "@/components/generic/ModelVue";
import NupayFilterFFormMDP from "./NupayFilterFFormMDP";
import NupaySummaryFDataTableMDP from "./NupaySummaryFDataTableMDP";
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import NupayMigratedCFFDataTableMDP from "./NupayMigratedCFFDataTableMDP";
import NupayCFMigrationFStaticTabMDP from "./NupayCFMigrationFStaticTabMDP";
import FNupayPayment from "@/components/generic/file/payment/nupayPayment/FNupayPayment.vue";
import FNupayPaymentMDP from "@/components/generic/file/payment/nupayPayment/FNupayPaymentMDP";
@Component({
  components: {
    FStaticTab,
    FForm,
    FDataTable,
    FNupayPayment
  },
})
export default class NupayPayment extends ModelVue {
  nupayPaymentFilter: Data.Spine.NupayPaymentFilter =
    new Data.Spine.NupayPaymentFilter();

  nupayPaymentConsolidation: Data.Spine.NupayPaymentConsolidation =
    new Data.Spine.NupayPaymentConsolidation();
  cfPaymentConsolidation: Data.Spine.CFPaymentConsolidation =
    new Data.Spine.CFPaymentConsolidation();
  public mounted() {
    this.getNupayPaymentConsolidation();
    this.getCFTPaymentSummary();
  }

  getNupayPaymentConsolidation() {
    // this.cfPaymentConsolidation.
    const clientFileNumber: any = this.$route.query.clientFileNumber;
    if (!!clientFileNumber) {
      this.nupayPaymentFilter.clientFileNumber = clientFileNumber;
      Action.Spine.GetNupayPaymentConsolidation.execute(
        this.nupayPaymentFilter,
        (output) => {
          this.nupayPaymentConsolidation = output;
        }
      );
    }
  }

  getCFTPaymentSummary() {
    Action.Spine.GetCFTPaymentSummary.execute(
      this.nupayPaymentFilter,
      (output) => {
        this.cfPaymentConsolidation = output;
      }
    );
  }

  handleSearchClick() {
    this.$router.push({
      query: {
        clientFileNumber: this.nupayPaymentFilter.clientFileNumber,
      },
    });
  }

  get nupayPaymentFStaticTabMetaData() {
    return new NupayPaymentFStaticTabMDP({ parent: this }).getMetaData();
  }

  get nupayFilterFFormMetaData() {
    return new NupayFilterFFormMDP({ parent: this }).getMetaData();
  }

  get nupaySummaryFDataTableMetaData() {
    return new NupaySummaryFDataTableMDP({ parent: this }).getMetaData();
  }

  get nupayCFMigrationFStaticTabMetaData() {
    return new NupayCFMigrationFStaticTabMDP({ parent: this }).getMetaData();
  }
  get fNupayPaymentMetaData() {
    return new FNupayPaymentMDP({ parent: this }).getMetaData();
  }
 

  migrateNupayPayment() {
    const clientFileNumberList = [this.nupayPaymentFilter.clientFileNumber];
    Action.Spine.MigrateNupayPayment.execute1(clientFileNumberList, output => {

    });
  }
  

  // get nupayMigratedCfFDataTableMetaData() {
  //         return new NupayMigratedCFFDataTableMDP({parent: this}).getMetaData()
  //     }
}
</script>

<style>
</style>
