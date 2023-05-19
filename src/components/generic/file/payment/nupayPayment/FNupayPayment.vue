<template>
  <div>
    <component
      v-if="showAddMissingCibForm"
      :ref="addMissingCibInNupayFFormMetaData.myRefName"
      :is="addMissingCibInNupayFFormMetaData.componentName"
      :value="selectModel(addMissingCibInNupayInput, undefined)"
      @input="
        (newValue) =>
          updateModel(addMissingCibInNupayInput, newValue, undefined)
      "
      v-bind="addMissingCibInNupayFFormMetaData.props"
    ></component>
    <v-toolbar-title class="mx-5 py-1" dense>Nupay Summary</v-toolbar-title>
    <v-row class="my-2">
      <v-sheet outlined rounded class="ml-4">
        <v-card large label outlined class="px-4">
          <div class="text-h6">
            {{ nupayPaymentConsolidation.totalCollectionAmount }}
          </div>
          <div class="text-caption">Total Collection Amount</div>
        </v-card>
      </v-sheet>
      <v-sheet outlined rounded class="ml-4">
        <v-card large label outlined class="px-4">
          <div class="text-h6">
            {{ nupayPaymentConsolidation.totalParterAmount }}
          </div>
          <div class="text-caption">Total Partner Amount</div>
        </v-card>
      </v-sheet>
      <v-sheet outlined rounded class="ml-4">
        <v-card large label outlined class="px-4">
          <div class="text-h6">
            {{ nupayPaymentConsolidation.totalTrustAmount }}
          </div>
          <div class="text-caption">Total Trust Amount</div>
        </v-card>
      </v-sheet>
      <v-btn
        @click="showAddMissingCibForm = true"
        class="mx-5"
        small
        color="primary"
        outlined
        >Add Missing Cib
      </v-btn>
    </v-row>
    <component
      v-if="!!nupaySummaryFDataTableMetaData"
      :ref="nupaySummaryFDataTableMetaData.myRefName"
      :is="nupaySummaryFDataTableMetaData.componentName"
      :value="nupayPaymentConsolidation.nupayCustomerIdSummaryList"
      v-bind="nupaySummaryFDataTableMetaData.props"
    ></component>
    <component
      :ref="fNupayPaymentFStaticTabMetaData.myRefName"
      :is="fNupayPaymentFStaticTabMetaData.componentName"
      :value="
        selectModel(
          nupayPaymentConsolidation,
          fNupayPaymentFStaticTabMetaData.dataSelectorKey
        )
      "
      v-bind="fNupayPaymentFStaticTabMetaData.props"
    />
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import FStaticTab from "@/components/generic/FStaticTab.vue";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FNupayPaymentFStaticTabMDP from "./FNupayPaymentFStaticTabMDP";
import FNupaySummaryFDataTableMDP from "./FNupaySummaryFDataTableMDP";
import * as Data from "@/../src-gen/data";
import AddMissingCibInNupayFFormMDP from "./AddMissingCibInNupayFFormMDP";

@Component({
  components: {
    FStaticTab,
    FForm,
    FDataTable,
  },
})
export default class FNupayPayment extends ModelVue {
  addMissingCibInNupayInput: Data.Spine.AddMissingCibInNupayInput =
    new Data.Spine.AddMissingCibInNupayInput();
  showAddMissingCibForm: boolean = false;
  get fNupayPaymentFStaticTabMetaData() {
    return new FNupayPaymentFStaticTabMDP({ parent: this }).getMetaData();
  }

  get nupayPaymentConsolidation(): Data.Spine.NupayPaymentConsolidation {
    return this.modelValue;
  }

  get nupaySummaryFDataTableMetaData() {
    return new FNupaySummaryFDataTableMDP({ parent: this }).getMetaData();
  }

  get addMissingCibInNupayFFormMetaData() {
    return new AddMissingCibInNupayFFormMDP({ parent: this }).getMetaData();
  }

  hideAndResetForms() {
    this.showAddMissingCibForm = false;
    this.addMissingCibInNupayInput = new Data.Spine.AddMissingCibInNupayInput();;
  }
}
</script>