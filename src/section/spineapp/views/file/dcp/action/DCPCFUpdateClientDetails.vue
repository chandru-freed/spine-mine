<template>
  <div class="DCPCFUpdateClientDetails">
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Update Client Details</h4>
      <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>
    <component
      :ref="cfUpdateClientDetailsMetaData.myRefName"
      :is="cfUpdateClientDetailsMetaData.componentName"
      :value="selectModel(updateClientDetailsInput, undefined)"
      @input="
        (newValue) => updateModel(updateClientDetailsInput, newValue, undefined)
      "
      v-bind="cfUpdateClientDetailsMetaData.props"
    ></component>
  </div>
  <!--  TASK TAB -->
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

import FForm from "@/components/generic/form/FForm.vue";
import Helper from "../../../../util/Helper";
import ModelVue from "@/components/generic/ModelVue";
import FSnackbar from "@/fsnackbar";
import DCPCFUpdateClientDetailsFFormMDP from "./DCPCFUpdateClientDetailsFFormMDP";


@Component({
  components: {
    FForm,
  },
})
export default class DCPCFUpdateClientDetails extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfoStore: Data.ClientFile.ClientFileBasicInfo;

  updateClientDetailsInputLocal = new Data.Client.UpdateClientDetailsInput();
  clientFileId = this.$route.params.clientFileId;

  //METADATA
  get cfUpdateClientDetailsMetaData() {
    return new DCPCFUpdateClientDetailsFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  get updateClientDetailsInput() {
    // TODO: Need to discuss we have to show pre filled data?
    this.updateClientDetailsInputLocal.firstName =
      this.clientFileBasicInfoStore.clientBasicInfo.firstName;
    this.updateClientDetailsInputLocal.middleName =
      this.clientFileBasicInfoStore.clientBasicInfo.middleName;
    this.updateClientDetailsInputLocal.lastName =
      this.clientFileBasicInfoStore.clientBasicInfo.lastName;

      this.updateClientDetailsInputLocal.newEmailId =
      this.clientFileBasicInfoStore.clientBasicInfo.emailId;
      this.updateClientDetailsInputLocal.newMobile =
      this.clientFileBasicInfoStore.clientBasicInfo.mobile;
    return this.updateClientDetailsInputLocal;
  }

  set updateClientDetailsInput(newValue) {
    this.updateClientDetailsInputLocal = newValue;
  }
  updateClientDetailsEmptyCheck() {
    const emptyState =
      this.updateClientDetailsInputLocal.firstName ||
      this.updateClientDetailsInputLocal.middleName ||
      this.updateClientDetailsInputLocal.lastName ||
      this.updateClientDetailsInput.newEmailId ||
      this.updateClientDetailsInput.newMobile;
    return emptyState ? true : false;
  }

  updateClientDetails() {
    this.updateClientDetailsInput.clientId =
      this.clientFileBasicInfoStore.clientBasicInfo.clientId;
    if (this.updateClientDetailsEmptyCheck()) {
      Action.Client.UpdateClientDetails.execute(
        this.updateClientDetailsInput,
        (output) => {
          this.gotoClientFile();
          FSnackbar.success("Succesfully Updated");
        }
      );
    } else {
      this.gotoClientFile();
    }
  }
  gotoAction() {
    this.$router.push({
      name: "Root.CFile.CFAction.CFActionList",
      params: {
        clientFileId: this.clientFileId,
      },
    });
  }

  gotoClientFile() {
    Helper.Router.gotoClientFile({
      router: this.$router,
      clientFileId: this.clientFileId,
    });
  }
}
</script>

<style>
</style>
