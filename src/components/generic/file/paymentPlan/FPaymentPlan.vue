<template>
  <div>
    <!-- {{modelValue.paymentPlan}} -->
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

    <div class="d-flex justify-space-around"></div>

    <v-card flat outlined class="row ma-2">
      <v-tabs v-model="tab" background-color="transparent" color="secondary">
        <v-tab> Payment Schedule </v-tab>
        <v-tab v-if="!hideMSFTab"> MSF Schedule </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="col-12">
        <v-tab-item>
          <v-card flat>
            <v-data-table
              :headers="headers"
              :items="paymentSchedule"
              sort-by="draftDate"
              class="elevation-0"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Payment Schedule</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>

              <template v-slot:[`item.draftDate`]="{ item }">
                {{ item.draftDate | date }}
              </template>

              <template v-slot:[`item.totalAmount`]="{ item }">
                {{ item.totalAmount | toINR }}
              </template>
              <template v-slot:[`item.settlementReserve`]="{ item }">
                {{ item.settlementReserve | toINR }}
              </template>
              <template v-slot:[`item.feeAmount`]="{ item }">
                {{ item.feeAmount | toINR }}
              </template>
              <template v-slot:item.action="{ item }">
                <f-btn
                  label="Present"
                  outlined
                  small
                  color="primary"
                  :onClick="() => presentPSEntry(item.psEntryId)"
                  :disabled="item.status != 'SCHEDULED'"
                ></f-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-data-table
              :headers="feeHeaders"
              :items="subscriptionFeeSchedule"
              sort-by="draftDate"
              class="elevation-0"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>MSF Schedule</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>
            </v-data-table>
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

import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FBtn from "@/components/generic/FBtn.vue";
import * as Action from "@/../src-gen/action";

@Component({
  components: {
    FForm,
    FBtn,
  },
})
export default class FPaymentPlan extends ModelVue {
  tab = 0;
  headers = [
    {
      text: "Draft Date",
      align: "start",
      sortable: false,
      value: "draftDate",
    },
    { text: "Total Amount", value: "totalAmount" },
    { text: "Settlement Amount", value: "settlementReserve" },
    { text: "Fee Amount", value: "feeAmount" },
    { text: "Status", value: "status" },
    { text: "Action ", value: "action" },
  ];

  feeHeaders = [
    {
      text: "Draft Date",
      align: "start",
      sortable: false,
      value: "draftDate",
    },
    { text: "Fee Code", value: "feeCode" },
    // { text: "Collection Order", value: "collectionOrder" },
    { text: "Amount", value: "amount" },
    { text: "Tax Amount", value: "taxAmount" },
    { text: "Total Amount", value: "totalAmount" },
  ];

  get paymentPlan() {
    return this.modelValue.paymentPlan;
  }

  get paymentSchedule() {
    return this.paymentPlan.paymentSchedule;
  }

  get subscriptionFeeSchedule() {
    return this.paymentPlan.subscriptionFeeSchedule;
  }

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }

  presentPSEntry(psEntryId: string) {
    Action.Spine.PresentPSEntry.execute1(psEntryId, (output) => {});
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
}
</script>