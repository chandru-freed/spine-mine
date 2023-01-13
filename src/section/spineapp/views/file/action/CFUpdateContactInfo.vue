<template>
  <div class="CFUpdateContactInfo">
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Update Contact Info</h4>
      <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>

    <component
      :ref="cfUpdateContactInfoMetaData.myRefName"
      :is="cfUpdateContactInfoMetaData.componentName"
      :value="selectModel(updateContactInfoInput, undefined)"
      @input="
        (newValue) => updateModel(updateContactInfoInput, newValue, undefined)
      "
      v-bind="cfUpdateContactInfoMetaData.props"
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
import Helper from "../../../util/Helper";
import CFUpdateContactInfoFFormMDP from "./CFUpdateContactInfoFFormMDP";
import ModelVue from "@/components/generic/ModelVue";
import FSnackbar from "@/fsnackbar";

@Component({
  components: {
    FForm,
  },
})
export default class CFUpdateContactInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfoStore: Data.ClientFile.ClientFileBasicInfo;

  updateContactInfoInputLocal = new Data.Client.UpdateContactInfoInput();
  clientFileId = this.$route.params.clientFileId;

  //METADATA
  get cfUpdateContactInfoMetaData() {
    return new CFUpdateContactInfoFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  get updateContactInfoInput() {
    // TODO: Need to discuss we have to show pre filled data?
    // this.updateContactInfoInputLocal.newEmailId = this.clientFileBasicInfoStore.clientBasicInfo.emailId;
    // this.updateContactInfoInputLocal.newMobile = this.clientFileBasicInfoStore.clientBasicInfo.mobile;
    return this.updateContactInfoInputLocal;
  }

  set updateContactInfoInput(newValue) {
    this.updateContactInfoInputLocal = newValue;
  }
  updateContactInfoEmptyCheck() {
    return this.updateContactInfoInput.newEmailId ||
      this.updateContactInfoInput.newMobile
      ? true
      : false;
  }

  updateContactInfo() {
    this.updateContactInfoInput.clientId =
      this.clientFileBasicInfoStore.clientBasicInfo.clientId;
    if (this.updateContactInfoEmptyCheck()) {
      Action.Client.UpdateContactInfo.execute(
        this.updateContactInfoInput,
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
