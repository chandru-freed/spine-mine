<template>
  <div>
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Assign Sales Rep</h4>
      <v-btn @click="gotoClientFile" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-center col-6 ma-auto">
      <component
        :ref="assignSalesRepMetaData.myRefName"
        :is="assignSalesRepMetaData.componentName"
        :value="selectModel(assignSalesRepInput, undefined)"
        @input="
          (newValue) => updateModel(assignSalesRepInput, newValue, undefined)
        "
        v-bind="assignSalesRepMetaData.props"
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
import AssignSalesRepFFormMDP from "../request/AssignSalesRepFFormMDP";
import Helper from "../../../util/Helper";

@Component({
  components: {
    "f-btn": FBtn,
    FForm,
  },
})
export default class AssignSalesRep extends ModelVue {
  clientFileNumber = this.$route.params.clientFileNumber;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  assignSalesRepInput = new Data.ClientFile.AssignSalesRepInput();
  leftFocused = false;
  rightFocused = true;

  //METADATA
  get assignSalesRepMetaData() {
    return new AssignSalesRepFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  assignSalesRep() {
    Action.ClientFile.AssignSalesRep.execute2(
      this.assignSalesRepInput.assignedSalesRep,
      this.clientFileBasicInfo.clientFileId,
      (output) => {
        this.gotoClientFile();
        this.getClientFileBasicInfo();
        Snackbar.show({
          text: "Succesfully assigned",
          pos: "bottom-center",
        });
      }
    );
  }

  getClientFileBasicInfo() {
    Action.ClientFile.GetClientFileBasicInfo.execute1(
      this.clientFileNumber,
      (output) => {}
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
