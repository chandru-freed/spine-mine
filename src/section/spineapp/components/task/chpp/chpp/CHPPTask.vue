<template>
  <div>
    <!-- <h4>CHPP</h4>
    Root Data : {{ taskFormData }} -->

    <component
      :ref="stepperMetaData.myRefName"
      :is="stepperMetaData.componentName"
      :value="selectModel(taskFormData, undefined)"
      @input="(newValue) => updateModel(taskFormData, newValue, undefined)"
      v-bind="stepperMetaData.props"
    ></component>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import FStepper from "@/components/generic/FStepper.vue";

import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
import CHPPFStepperMDP from "./CHPPFStepperMDP";

@Component({
  components: {
    FStepper,
    FBtn,
  },
})
export default class CHPPTask extends ModelVue implements GenericTaskIntf {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

  // DATA
  get taskDetailsOutput() {
    return !!this.taskDetails && !!this.taskDetails.taskOutput
      ? JSON.parse(this.taskDetails.taskOutput)
      : {};
  }

  get taskDetailsInput() {
    return !!this.taskDetails && !!this.taskDetails.taskInput
      ? JSON.parse(this.taskDetails.taskInput)
      : {};
  }

  //FORM

  taskFormDataLocal: any = {
    taskInput: {},
    taskOutput: {},
  };

  get taskFormData() {
    return {
      taskInput: this.taskDetailsInput,
      taskOutput: this.taskFormOutput,
    };
  }

  set taskFormData(value: any) {
    this.taskFormDataLocal = value;
  }
  //FORM

  //Task Output
  taskFormOutputLocal: any = new Data.Spine.CHPPTaskOutput();

  get taskFormOutput() {
    if(this.taskDetailsOutput.creditorInfo) {
    this.taskFormOutputLocal.creditorInfo.creditorName = this.taskDetailsOutput.creditorInfo.creditorName;
    this.taskFormOutputLocal.creditorInfo.creditorBalance = this.taskDetailsOutput.creditorInfo.creditorBalance;
    this.taskFormOutputLocal.creditorInfo.creditorPhoneNumber = this.taskDetailsOutput.creditorInfo.creditorPhoneNumber;
    this.taskFormOutputLocal.creditorInfo.creditorBank = this.taskDetailsOutput.creditorInfo.creditorBank;
    this.taskFormOutputLocal.creditorInfo.description = this.taskDetailsOutput.creditorInfo.description;
    
    }
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  //DATA


   //METADATA
  get stepperMetaData() {
    return new CHPPFStepperMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.taskDetails.taskState);
  }

  //ACTION
  saveAndMarkCompleteTask() {
    Task.Action.saveAndMarkCompleteTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }

  saveTask() {
    Task.Action.saveTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }

  gotoFile() {
    Helper.Router.gotoFile({
      router: this.$router,
      fileId: this.$route.params.fileId,
    });
  }
}
</script>
<style></style>