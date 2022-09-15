<template>
  <div class="FileBudget">
    <component
      v-if="budgetInfo"
      :ref="budgetInfoFormMetaData.myRefName"
      :is="budgetInfoFormMetaData.componentName"
      :value="selectModel(budgetInfo, budgetInfoFormMetaData.dataSelectorKey)"
      v-bind="budgetInfoFormMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";

import ClientBudgetInfoFBudgetMDP from "@/section/spineapp/components/file/budget/ClientBudgetInfoFBudgetMDP";
import FBudget from "@/components/generic/file/budget/FBudget.vue";
import ModelVue from "@/components/generic/ModelVue";
@Component({
  components: {
    FBudget,
  },
})
export default class FileBudget extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.budgetInfo
  budgetInfo: Data.ClientFile.BudgetInfo;

  get budgetInfoFormMetaData() {
    return new ClientBudgetInfoFBudgetMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }

  public mounted() {
    this.getBudgetInfo();
  }

  getBudgetInfo() {
    Action.ClientFile.GetBudgetInfo.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }
}
</script>

<style>
</style>
