<template>
  <div class="FileBank">
    <component
      v-if="bankInfoForm.bankAddress"
      :ref="bankInfoFormMetaData.myRefName"
      :is="bankInfoFormMetaData.componentName"
      :value="selectModel(bankInfoForm, bankInfoFormMetaData.dataSelectorKey)"
      @input="
        (newValue) =>
          updateModel(
            bankInfoForm,
            newValue,
            bankInfoFormMetaData.dataSelectorKey
          )
      "
      v-bind="bankInfoFormMetaData.props"
    ></component>
  </div>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import store, * as Store from '@/../src-gen/store';
import * as Data from '@/../src-gen/data';
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";
import ClientBankInfoFBankFFormMDP from "@/section/spineapp/components/file/bank/ClientBankInfoFBankFFormMDP"

@Component({
  components: {
    FForm,
  },
})
export default class FileBank extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiBankInfo
  bankInfo: Data.ClientFile.FiBankInfo;

  fileId = this.$route.params.fileId;
  //METADATA
  get bankInfoFormMetaData() {
    return new ClientBankInfoFBankFFormMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }
  //METADATA

  //FORM

  bankInfoFormLocal: any = new Data.ClientFile.FiBankInfo();

  get bankInfoForm() {
    
    if (!!this.bankInfo ) {
      this.bankInfoFormLocal = this.bankInfo;
      if (!this.bankInfo.bankAddress) {
        this.bankInfoFormLocal.bankAddress =
          new Data.ClientFile.FiBankAddress();
      }
    }
    return this.bankInfoFormLocal;
  }

  set bankInfoForm(value: any) {
    this.bankInfoFormLocal = value;
  }

  //FORM

  mounted() {
    this.getFiBankInfo();
  }

  //ACTION
  getFiBankInfo() {
    Action.ClientFile.GetFiBankInfo.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {},
      (error) => {},
      RemoteApiPoint.SpineApi
    );
  }

}

</script>

<style>
</style>
