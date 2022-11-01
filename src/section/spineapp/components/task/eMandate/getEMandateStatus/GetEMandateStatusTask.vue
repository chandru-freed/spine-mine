<template>
  <div>
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

import FTaskStepper from "@/components/generic/FTaskStepper.vue";
import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import moment from "moment";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import Helper from "@/section/spineapp/util/Helper";
import Task from "@/section/spineapp/util/Task";
import GEMSTFStepperMDP from "./GEMSTFStepperMDP";

@Component({
  components: {
    FTaskStepper,
    FBtn,
  },
})
export default class GetEMandateStatusTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;
  //METADATA
  get stepperMetaData() {
    return new GEMSTFStepperMDP({ taskRoot: this }).getMetaData();
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
  taskFormOutputLocal: any = new Data.Spine.GetEMandateStatusTaskOutput();

  get taskFormOutput() {
    if (this.taskDetailsOutput.eMandateStatus) {
      this.taskFormOutputLocal.eMandateStatus =
        this.taskDetailsOutput.eMandateStatus;
    }
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.taskDetails.taskState);
  }

  //DATA

  //ACTION
  mounted() {
    Action.TaskList.Rescue.interested((output) => {
      setTimeout(() => {
        this.getExecutiveTaskDetails();
      }, 1000);
    });
  }

  public destroyed() {
    Action.TaskList.Rescue.notInterested((output) => {
      setTimeout(() => {
        this.getExecutiveTaskDetails();
      }, 1000);
    });
  }

  getExecutiveTaskDetails() {
    Action.TaskList.GetExecutiveTaskDetails.execute1(
      this.$route.params.taskId,
      (output) => {
        // console.log(output);
      }
    );
  }

  gotoFile() {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: this.$route.params.clientFileNumber,
    });
  }
}
</script>
