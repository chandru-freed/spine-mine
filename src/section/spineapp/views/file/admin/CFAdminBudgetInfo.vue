<template>
  <div class="CFBudgetInfo">
    <component
      :ref="budgetInfoFormMetaData.myRefName"
      :is="budgetInfoFormMetaData.componentName"
      v-if="taskFormData.taskOutput.personalInfo"
      :value="selectModel(taskFormData, budgetInfoFormMetaData.dataSelectorKey)"
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
import CFABudgetInfoFBudgetMDP from "./CFABudgetInfoFBudgetMDP";
@Component({
  components: {
    FBudget,
  },
})
export default class CFAdminBudgetInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.budgetInfo
  budgetInfoStore: Data.ClientFile.BudgetInfo;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.personalInfo
  personalInfo: Data.ClientFile.ClPersonalInfo;

  budgetInfoFormLocal = new Data.ClientFile.BudgetInfo();

  get clientFileId() {
    return this.$route.params.clientFileId;
  }
  taskFormDataLocal: any = { taskInput: {}, taskOutput: {} };

  get taskFormData() {
    return {
      taskInput: {
        clRegistrationDetails: this.clientFileBasicInfo.clientBasicInfo,
      },
      taskOutput: {
        personalInfo: this.personalInfo,
        budgetInfo: this.budgetInfoForm,
      },
    };
  }
  set taskFormData(value: any) {
    this.taskFormDataLocal = value;
  }

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
    return new CFABudgetInfoFBudgetMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }
getBudgetInfoHandler = () => {
  setTimeout(() => {
    this.getBudgetInfo();
  }, 1000);
}
  public mounted() {
    this.getBudgetInfo();
    this.findClPersonalInfo();
    Action.Spine.UpdateBudgetInfo.interested(this.getBudgetInfoHandler);
  }

  destroyed() {
    Action.Spine.UpdateBudgetInfo.notInterested(this.getBudgetInfoHandler);
  }

  getBudgetInfo() {
    Action.ClientFile.GetBudgetInfo.execute1(this.clientFileId, (output) => {});
  }

  findClPersonalInfo() {
    Action.ClientFile.FindClPersonalInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
}
</script>

<style></style>
