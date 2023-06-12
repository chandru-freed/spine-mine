<template>
  <div class="CFPersonalInfo">
    <component
      :ref="cfriFFRegistrationDetailsMetaData.myRefName"
      :is="cfriFFRegistrationDetailsMetaData.componentName"
      :value="
        selectModel(clientFileBasicInfo, cfriFFRegistrationDetailsMetaData.dataSelectorKey)
      "
      v-bind="cfriFFRegistrationDetailsMetaData.props"
    ></component>
    
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
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import * as Action from "@/../src-gen/action";
import CFPersonalInfoFProfileFFormMDP from "./CFPersonalInfoFProfileFFormMDP";
import CFRIFFRegistrationDetailsMDP from './CFRIFFRegistrationDetailsMDP';
@Component({
  components: {
    FForm,
  },
})
export default class CFPersonalInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.personalInfo
  personalInfo: Data.ClientFile.ClPersonalInfo;

  get clientFileId (){
   return this.$route.params.clientFileId;
  }

  //METADATA
  get profileFormMetaData() {
    return new CFPersonalInfoFProfileFFormMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }

  get cfriFFRegistrationDetailsMetaData() {
    return new CFRIFFRegistrationDetailsMDP({
      parent: this,
      taskRoot: this
    }).getMetaData()
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
    this.findClPersonalInfo();
  }

  //ACTION
  // findClientInfo() {
  //   //TODO:  Needs to be discussed:
  //   setTimeout(() => {
  //     Action.ClientFile.FindPersonalInfo.execute1(
  //       this.clientFileBasicInfo.clientBasicInfo.clientId,
  //       (output) => {}
  //     );
  //   }, 1000);
  // }

  findClPersonalInfo() {
      Action.ClientFile.FindClPersonalInfo.execute1(
        this.clientFileId,
        (output) => {}
      );
  }
}
</script>

<style></style>
