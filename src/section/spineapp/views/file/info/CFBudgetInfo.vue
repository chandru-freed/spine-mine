<template>
  <div class="CFBudgetInfo">
    <component
      :ref="budgetInfoFormMetaData.myRefName"
      :is="budgetInfoFormMetaData.componentName"
      :value="selectModel(budgetInfoForm, budgetInfoFormMetaData.dataSelectorKey)"
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
import FBudget from "@/components/generic/file/budget/FBudget.vue";
import ModelVue from "@/components/generic/ModelVue";
import CFBudgetInfoFBudgetMDP from "./CFBudgetInfoFBudgetMDP";
@Component({
  components: {
    FBudget,
  },
})
export default class CFBudgetInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.budgetInfo
  budgetInfoStore: Data.ClientFile.BudgetInfo;

  budgetInfoFormLocal = new Data.ClientFile.BudgetInfo()

  get budgetInfoForm() {
    if (!!this.budgetInfoStore) {
      this.budgetInfoFormLocal = this.budgetInfoStore;
    }
    return this.budgetInfoFormLocal;
  }

  set budgetInfoForm(value: any) {
    this.budgetInfoFormLocal = value;
  }

  get budgetInfoFormMetaData() {
    return new CFBudgetInfoFBudgetMDP({
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

<style></style>
