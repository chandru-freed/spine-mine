<template>
  <div class="CFAssignSalesRep">
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Assign Sales Rep</h4>
      <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
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
import Helper from "../../../../util/Helper";
import CFAssignSalesRepFFormMDP from "./CFAssignSalesRepFFormMDP";
import FSnackbar from "@/fsnackbar";

@Component({
  components: {
    "f-btn": FBtn,
    FForm,
  },
})
export default class CFAssignSalesRep extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  assignSalesRepInput = new Data.ClientFile.AssignSalesRepInput();
  leftFocused = false;
  rightFocused = true;

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  //METADATA
  get assignSalesRepMetaData() {
    return new CFAssignSalesRepFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  assignSalesRep() {
    Action.ClientFile.AssignSalesRep.execute2(
      this.assignSalesRepInput.assignedSalesRep,
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
