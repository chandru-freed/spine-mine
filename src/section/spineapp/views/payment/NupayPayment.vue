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
        v-if="!!nupayMigratedCfFDataTableMetaData"
        :ref="nupayMigratedCfFDataTableMetaData.myRefName"
        :is="nupayMigratedCfFDataTableMetaData.componentName"
        :value="[]"
        v-bind="nupayMigratedCfFDataTableMetaData.props"
      ></component>
      <v-toolbar-title class="mx-5 py-5">Nupay Summary</v-toolbar-title>
      <component
        v-if="!!nupaySummaryFDataTableMetaData"
        :ref="nupaySummaryFDataTableMetaData.myRefName"
        :is="nupaySummaryFDataTableMetaData.componentName"
        :value="[]"
        v-bind="nupaySummaryFDataTableMetaData.props"
      ></component>
      <component
        :ref="nupayPaymentFStaticTabMetaData.myRefName"
        :is="nupayPaymentFStaticTabMetaData.componentName"
        :value="
          selectModel(
            nupayPaymentConsolidation,
            nupayPaymentFStaticTabMetaData.dataSelectorKey
          )
        "
        v-bind="nupayPaymentFStaticTabMetaData.props"
      />

      <v-toolbar-title class="mx-5 mt-5">CF Migrated Summary</v-toolbar-title>
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
@Component({
  components: {
    FStaticTab,
    FForm,
    FDataTable,
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
      (output) => {}
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

  // get nupayMigratedCfFDataTableMetaData() {
  //         return new NupayMigratedCFFDataTableMDP({parent: this}).getMetaData()
  //     }
}
</script>

<style>
</style>
