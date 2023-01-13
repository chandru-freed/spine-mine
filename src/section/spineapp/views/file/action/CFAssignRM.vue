<template>
  <div class="CFAssignRM">
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Assign RM</h4>
      <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-center col-6 ma-auto">
      <component
        :ref="assignRMMetaData.myRefName"
        :is="assignRMMetaData.componentName"
        :value="selectModel(assignRMInput, undefined)"
        @input="(newValue) => updateModel(assignRMInput, newValue, undefined)"
        v-bind="assignRMMetaData.props"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Watch,
  Model,
} from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FBtn from "@/components/generic/FBtn.vue";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import * as Snackbar from "node-snackbar";
import Helper from "../../../util/Helper";
import CFAssignRMFFormMDP from "./CFAssignRMFFormMDP";
import FSnackbar from "@/fsnackbar";

@Component({
  components: {
    "f-btn": FBtn,
    FForm,
  },
})
export default class CFAssignRM extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  assignRMInput = new Data.ClientFile.AssignRMInput();
  leftFocused = false;
  rightFocused = true;

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  //METADATA
  get assignRMMetaData() {
    return new CFAssignRMFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  assignRM() {
    Action.ClientFile.AssignRM.execute2(
      this.assignRMInput.assignedRM,
      this.clientFileBasicInfo.clientFileId,
      (output) => {
        this.gotoClientFile();
        FSnackbar.success("Succesfully assigned");
      }
    );
  }

  gotoClientFile() {
    Helper.Router.gotoClientFile({
      router: this.$router,
      clientFileId: this.clientFileId,
    });
  }

  gotoAction(paymentId: string) {
    this.$router.push({
      name: "Root.CFile.CFAction.CFActionList",
      params: {
        clientFileId: this.clientFileId,
      },
    });
  }

  goBack() {
    this.$router.go(-1);
  }
}
</script>

<style></style>
