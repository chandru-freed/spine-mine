<template>
  <div class="col-12">
    <!-- {{taskDetails}} -->
    <v-card
      class="my-3"
      outlined
      v-for="(summaryMetaData, index) of summaryMetaDataList"
      :key="'summary' + index"
    >
      <div class="d-flex align-center mr-4">
        <v-card-title
          ><v-icon class="mr-3" color="success">mdi-check-circle</v-icon
          >{{ summaryMetaData.name }}</v-card-title
        >
        <v-spacer />
        <f-btn
          :disabled="taskDisabled"
          outlined
          color="primary"
          :onClick="() => goToStep(summaryMetaData.stepIndex)"
          label="Edit"
        />
      </div>
      <component
        :is="summaryMetaData.content.componentName"
        :value="selectModel(summaryData)"
        :ref="summaryMetaData.content.myRefName"
        v-bind="summaryMetaData.content.props"
      ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
import FForm from "@/components/generic/form/FForm.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import ProfileSummary from "./ProfileSummary.vue";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FBtn from "@/components/generic/FBtn.vue";
import Task from "@/section/spineapp/util/Task";
import ModelVue from "@/components/generic/ModelVue";
@Component({
  components: {
    FForm,
    "f-btn": FBtn,
  },
})
export default class StepSummary extends ModelVue {
  @Prop()
  summaryMetaDataList: any[];
  
  @Prop()
  parent: any;
  

  get creditorInfo() {
    return {
      creditosCount:
        this.modelValue.taskOutput.creditorInfo?.creditorList.length,
      totalDebt: this.modelValue.taskOutput.creditorInfo?.totalDebt || "NA",
    };
  }

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.modelValue.taskState);
  }

  get bankInfo() {
    return this.modelValue.taskOutput.bankInfo;
  }

  get budgetInfo() {
    const budgetInfo = this.modelValue.taskOutput.budgetInfo;
    budgetInfo.stdiPercentage = Math.round(budgetInfo.stdiPercentage);
    return budgetInfo;
  }

  get bankSummary() {
    return {
      accountNumber: this.bankInfo?.accountNumber,
      bankName: this.bankName,
    };
  }

  bankName: string = "";

  get documentSummary() {
    return {
      documentsCount: this.modelValue.taskOutput.fileDocumentList.length,
      documentTypeList: this.modelValue.taskOutput.fileDocumentList
        .map((item: any) => {
          return item.documentType;
        })
        .toString(),
    };
  }

  get summaryData() {
    return {
      taskInput: this.modelValue.taskInput,
      taskOutput: this.modelValue.taskOutput,
      creditorInfo: this.creditorInfo,
      budgetInfo: this.budgetInfo,
      documentSummary: this.documentSummary,
    };
  }

  goToStep(step: Number) {
    this.parent.getMyRef().gotoSpecifiedStep(step);
  }
}
</script>
