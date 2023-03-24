<template>
  <div class="CFBankInfo">
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
import CFABankInfoFBankFFormMDP from './CFABankInfoFBankFFormMDP';

@Component({
  components: {
    FForm,
  },
})
export default class CFAdminBankInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiBankInfo
  bankInfo: Data.ClientFile.FiBankInfo;

  nupayBankMasterList: Data.ClientFile.NupayBankMaster[] = [];


  clientFileId = this.$route.params.clientFileId;

  //METADATA
  get bankInfoFormMetaData() {
    return new CFABankInfoFBankFFormMDP({
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

  getNupayBankMasterList() {
    Action.ClientFile.GetNupayBankMasterList.execute((output) => {
      this.nupayBankMasterList = output.nupayBankMasterList;
    });
  }

  //FORM

  mounted() {
    this.getNupayBankMasterList();
    this.getFiBankInfo();
    
  }

  setConfirmAccountNumber() {
    if (this.bankInfo) {
      this.bankInfoForm.confirmAccountNumber =
        this.bankInfo.accountNumber;
    }
  }

  //ACTION
  getFiBankInfo() {
    Action.ClientFile.GetFiBankInfo.execute1(
      this.clientFileId,
      (output) => {
        this.setConfirmAccountNumber();
      }
    );
  }

    populateBankDetails(details: any) {
    this.bankInfoForm.bankAddress.addressLine1 =
      details.ADDRESS;
    this.bankInfoForm.bankAddress.city = details.CITY;
    this.bankInfoForm.bankAddress.state = details.STATE;
    this.bankInfoForm.bankAddress.country = "India";
  }


}

</script>

<style>
</style>
