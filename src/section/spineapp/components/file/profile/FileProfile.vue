<template>
  <div>
    <component
      v-if="profileFormData.clientId && profileFormData.clientInfo"
      :ref="profileFormMetaData.myRefName"
      :is="profileFormMetaData.componentName"
      :value="selectModel(profileFormData, profileFormMetaData.dataSelectorKey)"
      @input="
        (newValue) =>
          updateModel(
            profileFormData,
            newValue,
            profileFormMetaData.dataSelectorKey
          )
      "
      v-bind="profileFormMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import ClientProfileFProfileFFormMDP from "@/section/spineapp/components/file/profile/ClientProfileFProfileFFormMDP";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import Helper from "../../../util/Helper";
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";
@Component({
  components: {
    FForm,
  },
})
export default class FileProfile extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.clientInfoOutput
  clientInfoOutput: Data.ClientFile.ClientInfoOutput;

  fileId = this.$route.params.fileId;
  //METADATA
  get profileFormMetaData() {
    return new ClientProfileFProfileFFormMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }
  //METADATA

  //FORM

  profileFormDataLocal: any = new Data.ClientFile.ClientInfoOutput();

  get profileFormData() {
    if (!!this.clientInfoOutput && !!this.clientInfoOutput.clientId) {
      this.profileFormDataLocal.clientId = this.clientInfoOutput.clientId;
    }
    if (!!this.clientInfoOutput && !!this.clientInfoOutput.clientInfo) {
      this.profileFormDataLocal.clientInfo = this.clientInfoOutput.clientInfo;
      if (!this.clientInfoOutput.clientInfo.residentialAddress) {
        this.profileFormDataLocal.clientInfo.residentialAddress =
          new Data.ClientFile.ClientAddress();
      }
    }
    return this.profileFormDataLocal;
  }

  set profileFormData(value: any) {
    this.profileFormDataLocal = value;
  }

  //FORM

  mounted() {
    this.findClientInfo();
  }

  //ACTION
  findClientInfo() {
    Action.ClientFile.FindClientInfo.execute1(
      this.clientFileBasicInfo.clientBasicInfo.clientId,
      (output) => {},
      (error) => {},
      RemoteApiPoint.SpineApi
    );
  }

  
}
</script>

<style>
</style>
