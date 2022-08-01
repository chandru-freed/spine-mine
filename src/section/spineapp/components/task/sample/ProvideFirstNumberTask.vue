<template>
  <div class="ProvideFirstNumber">
    bigFormData :{{bigFormData}}
    <FNV
      :ref="fnFormMD.componentRef"
      :value="bigFormData"
      :form-m-d="fnFormMD"
    ></FNV>
    <v-btn @click="saveTask">Save Task</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";

import FNV from "./FNV.vue";
import {
  ButtonMetaData,
  FormMetaData,
  NumberFieldMetaData,
  TextFieldMetaData,
} from "@/../src-def/form/FormComponentDef";

@Component({
  components: {
    FNV,
  },
})
export default class ProvideFirstNumberTask extends Vue {

  taskId = this.$route.params.taskId;
  

  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  @Watch("taskDetails")
  updateTaskDetails(newValue: any, oldValue: any) {
    console.log("taskDetails watch")
    if (!!newValue && !!newValue.taskOutput) {
      this.bigFormDataLocal = JSON.parse(newValue.taskOutput);
    }
  }

  mounted() {
    console.log("I am in ProvideFirstNumber Mounted");
    console.log(this.$refs)
    this.bigFormDataLocal = JSON.parse(this.taskDetails.taskOutput);
  }

  bigFormDataLocal = {}

  get bigFormData() {
    return this.bigFormDataLocal
  }

  set bigFormData(newValue) {
    this.bigFormDataLocal = newValue
  }
  

  get fnFormMD(): any {
    const fnFormMD = new FormMetaData({
      id: "fnForm",
      componentRef: "fnFormRef",
    });
    fnFormMD
      .addField(
        new TextFieldMetaData({
          parentDataProvider: fnFormMD,
          dataSelectorKey: "name",
          mandatory: true,
          label: "Name",
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: fnFormMD,
          dataSelectorKey: "firstNumber",
          mandatory: true,
          label: "First Number",
        })
      )
      .addOtherChild(
        new ButtonMetaData({
          id: "saveBtn",
          label: "Save",
          outlined: true,
          onClick: this.saveTask,
        })
      );

    return fnFormMD.componentMetaData();
  }

  saveTask() {
    console.log("Save take is being called");
    const input = JSON.stringify(this.bigFormData)
    Action.TaskList.Save.execute2(
      this.taskId,
      input,
      (output: any) => {
        console.log(output);
      },
      (err: any) => {
        // console.error(err);
      },
      RemoteApiPoint.BenchApi
    );
  }
}
</script>

<style></style>
