<template>
  <div>
    <h4>NsfMSFTask</h4>
    <!-- Root Data : {{ taskFormData }} -->

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
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";
import FStepper from "@/components/generic/FStepper.vue";

import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import moment from "moment";
import ManualTaskIntf from "@/section/spineapp/util/ManualTaskIntf";
import NMSFFStepperMDP from "./NMSFFStepperMDP";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";

@Component({
  components: {
    FStepper,
    FBtn,
  },
})
export default class NsfMSFTask extends ModelVue implements ManualTaskIntf {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

  //METADATA
  get stepperMetaData() {
    return new NMSFFStepperMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA



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
  taskFormOutputLocal: any = new Data.Spine.NsfMSFTaskOutput();

  get taskFormOutput() {
    // if (
    //   this.taskDetailsOutput.eMandateLink &&
    //   this.taskDetailsOutput.eMandateId
    // ) {
    //   this.taskFormOutputLocal.eMandateLink =
    //     this.taskDetailsOutput.eMandateLink;
    //   this.taskFormOutputLocal.eMandateId = this.taskDetailsOutput.eMandateId;
    // }

    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  //DATA


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