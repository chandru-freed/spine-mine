<template>
  <div>
    <component
      v-if="personalInfoForm"
      :ref="profileFormMetaData.myRefName"
      :is="profileFormMetaData.componentName"
      :value="selectModel(personalInfoForm, profileFormMetaData.dataSelectorKey)"
      @input="
        (newValue) =>
          updateModel(
            personalInfoForm,
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

  @Store.Getter.ClientFile.ClientFileSummary.personalInfo
  personalInfo: Data.ClientFile.ClPersonalInfo;

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

  personalInfoFormLocal: any = new Data.ClientFile.ClPersonalInfo();

  get personalInfoForm() {
    
    if (!!this.personalInfo ) {
      this.personalInfoFormLocal = this.personalInfo;
      if (!this.personalInfo.residentialAddress) {
        this.personalInfoFormLocal.residentialAddress =
          new Data.ClientFile.ClientAddress();
      }
    }
    return this.personalInfoFormLocal;
  }

  set personalInfoForm(value: any) {
    this.personalInfoFormLocal = value;
  }

  //FORM

  mounted() {
    this.findClientInfo();
  }

  //ACTION
  findClientInfo() {
    Action.ClientFile.FindPersonalInfo.execute1(
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
