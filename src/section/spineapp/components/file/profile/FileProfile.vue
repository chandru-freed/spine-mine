<template>
  <div>
    <component
      :ref="profileFormMetaData.myRefName"
      :is="profileFormMetaData.componentName"
      :value="
        selectModel(personalInfoForm, profileFormMetaData.dataSelectorKey)
      "
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
    this.personalInfoFormLocal.residentialAddress =
      new Data.ClientFile.ClientAddress();
    if (!!this.personalInfo) {
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
    //TODO:  Needs to be discussed:
    setTimeout(() => {
      Action.ClientFile.FindPersonalInfo.execute1(
        this.clientFileBasicInfo.clientBasicInfo.clientId,
        (output) => {}
      );
    }, 1000);
  }
}
</script>

<style></style>
