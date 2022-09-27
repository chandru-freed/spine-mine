<template>
  <div class="col-12">
    <component
        :is="clientInfoSummaryMetaData.componentName"
        :ref="clientInfoSummaryMetaData.myRefName"
        v-bind="clientInfoSummaryMetaData.props"
      ></component>
    <!-- <ProfileSummary />
    <CreditorSummary />
    <BudgetSummary />
    <PaymentPlanSummary />
    <BankInfoSummary /> -->
    <!--ACTION START-->
    <div
      class="
        d-flex
        flex-row
        align-start
        flex-wrap
        justify-space-around
        pa-2
        my-5
      "
      v-if="!disabled"
    >
      <component
        v-for="(actionMetaData, index) of actionMetaDataListFiltered"
        :key="'action' + index"
        :is="actionMetaData.componentName"
        :ref="actionMetaData.myRefName"
        v-bind="actionMetaData.props"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import FBtn from "../../FBtn.vue";
import ModelVue from "../../ModelVue";
import StepSummary from "./summary/StepSummary.vue";
@Component({
  components: {
    FBtn,
    StepSummary
  },
})
export default class FMarkComplete extends ModelVue {
  @Prop({
    default: () => [],
  })
  actionMetaDataList: any[];

  @Prop() 
  clientInfoSummaryMetaData: any;

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }
}
</script>