<template>
  <div>
    <v-navigation-drawer
      absolute
      permanent
      right
      :width="rightFocused ? '100%' : '49%'"
      v-if="!leftFocused"
    >
      <v-btn @click="gotoClientFile" text icon color="lighten-2" class="ma-2">
        <v-icon size="40">mdi-chevron-left</v-icon>
      </v-btn>
      <component
        :ref="assignRMMetaData.myRefName"
        :is="assignRMMetaData.componentName"
        :value="selectModel(assignRMInput, undefined)"
        @input="(newValue) => updateModel(assignRMInput, newValue, undefined)"
        v-bind="assignRMMetaData.props"
      ></component>
    </v-navigation-drawer>
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
import AssignRMFFormMDP from "./AssignRMFFormMDP";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import * as Snackbar from "node-snackbar";
import Helper from "../../util/Helper";

@Component({
  components: {
    "f-btn": FBtn,
    FForm,
  },
})
export default class AssignRM extends ModelVue {
  clientFileNumber = this.$route.params.clientFileNumber;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  assignRMInput = new Data.ClientFile.AssignRMInput();
  leftFocused = false;
  rightFocused = true;

  //METADATA
  get assignRMMetaData() {
    return new AssignRMFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  assignRM() {
    Action.ClientFile.AssignRM.execute2(
      this.assignRMInput.assignedRM,
      this.clientFileBasicInfo.clientFileId,
      (output) => {
        this.gotoClientFile();
        Snackbar.show({
          text: "Succesfully assigned",
          pos: "bottom-center",
        });
      }
    );
  }

  gotoClientFile() {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: this.clientFileNumber,
    });
  }
}
</script>

<style></style>
