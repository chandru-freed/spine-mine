<template>
  <div class="DCPCFBudgetInfo">
    <div class="d-flex justify-center pa-2">
      <v-btn small color="primary" @click="validateAndSubmit()">Save</v-btn>
    </div>
    <component
      :ref="dcpBudgetInfoFormMetaData.myRefName"
      :is="dcpBudgetInfoFormMetaData.componentName"
      :value="
        selectModel(taskFormData, dcpBudgetInfoFormMetaData.dataSelectorKey)
      "
      @input="(newValue) => updateModel(taskFormData, newValue, undefined)"
      v-bind="dcpBudgetInfoFormMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Snackbar from "node-snackbar";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import FBudget from "@/components/generic/file/budget/FBudget.vue";
import ModelVue from "@/components/generic/ModelVue";
import DCPCFBudgetInfoFBudgetMDP from "./DCPCFBudgetInfoFBudgetMDP";

@Component({
  components: {
    FBudget,
  },
})
export default class DCPCFBudgetInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.budgetInfo
  budgetInfoStore: Data.ClientFile.BudgetInfo;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.personalInfo
  personalInfo: Data.ClientFile.ClPersonalInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorStore: Data.ClientFile.FiCreditorInfo;

  budgetInfoFormLocal = new Data.ClientFile.BudgetInfo();
  myRefName = "dcpCFBudgetInfoRef";

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
        creditorInfo: this.fiCreditorStore,
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

  get dcpBudgetInfoFormMetaData() {
    return new DCPCFBudgetInfoFBudgetMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }

  public mounted() {
    this.getApiCalling();
    this.getBudgetFormRef();
  }

  getBudgetFormRef() {
    let temp: any = this.$refs["budgetRef"];
    return temp.$refs["budgetFormRef"];
  }
  validateAndSubmit() {
    this.getBudgetFormRef().submitForm(() => {
      this.updateBudgetInfo();
    });
  }

  getApiCalling() {
    this.getBudgetInfo();
    this.findClPersonalInfo();
    this.getCreditorInfo();
  }

  getBudgetInfo() {
    Action.ClientFile.GetBudgetInfo.execute1(this.clientFileId, (output) => {});
  }

  getCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  findClPersonalInfo() {
    Action.ClientFile.FindClPersonalInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  updateBudgetInfo() {
    const input = Data.DCPClientFile.UpdateBudgetInfoInput.fromJson(
      this.taskFormData.taskOutput.budgetInfo
    );
    input.clientFileId = this.clientFileBasicInfo.clientFileId;

    Action.DCPClientFile.UpdateBudgetInfo.execute(input, (output: any) => {
      this.getApiCalling();
      Snackbar.show({
        text: "Succesfully Saved",
        pos: "bottom-center",
      });
    });
  }
}
</script>

<style></style>
