<template>
  <div class="CFCreditorInfo">
    <component
      v-if="!!creditorInfo?.fiCreditorList"
      :ref="creditorInfoMetaData.myRefName"
      :is="creditorInfoMetaData.componentName"
      :value="selectModel(creditorInfo, creditorInfoMetaData.dataSelectorKey)"
      @input="
        (newValue) =>
          updateModel(
            creditorInfo,
            newValue,
            creditorInfoMetaData.dataSelectorKey
          )
      "
      v-bind="creditorInfoMetaData.props"
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

import CFACreditorInfoFCreditorMDP from "./CFACreditorInfoFCreditorMDP";
import FAdminCreditor from "./creditor/FAdminCreditor.vue";
@Component({
  components: {
    FForm,
    FAdminCreditor,
  },
})
export default class CFAdminCreditorInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorInfo: Data.ClientFile.FiCreditor;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  clientFileId = this.$route.params.clientFileId;
  //METADATA
  get creditorInfoMetaData() {
    return new CFACreditorInfoFCreditorMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }
  //METADATA

  //FORM

  creditorInfoLocal: any = new Data.ClientFile.FiCreditor();

  get creditorInfo() {
    if (!!this.fiCreditorInfo) {
      this.creditorInfoLocal = this.fiCreditorInfo;
    }
    return this.creditorInfoLocal;
  }

  set creditorInfo(value: any) {
    this.creditorInfoLocal = value;
  }

  //FORM

  public getClientFileBasicInfoHandler = (output: any) => {
    setTimeout(() => {
      this.getClientFileBasicInfo();
      this.getClientCreditorList();
    }, 1000);
  };

  getClientCreditorInfoAndInfoHandler = () => {
    setTimeout(() => {
      this.getClientCreditorInfoAndInfo();
    }, 1000);
  };

  getClientCreditorInfoAndInfo() {
    this.getClientFileBasicInfo();
    Action.ClientFile.GetCreditorInfo.execute1(this.clientFileId, (output) => {
      // this.schedulePaymentPlan();
    });
  }

  mounted() {
    this.getFiCreditorInfo();
    Action.ClientFile.UpdateCreditInfo.interested(
      this.getClientFileBasicInfoHandler
    );
    Action.ClientFile.AddFiCreditor.interested(
      this.getClientCreditorInfoAndInfoHandler
    );
    Action.ClientFile.UpdateIncludeClCreditor.interested(
      this.getClientCreditorInfoAndInfoHandler
    );
    Action.ClientFile.UpdateFiCreditor.interested(
      this.getClientCreditorInfoAndInfoHandler
    );
    Action.ClientFile.ExcludeFiCreditorFromProgram.interested(
      this.getClientCreditorInfoAndInfoHandler
    )

  }

  destroyed() {
    Action.ClientFile.UpdateCreditInfo.notInterested(
      this.getClientFileBasicInfoHandler
    );

    Action.ClientFile.AddFiCreditor.notInterested(
      this.getClientCreditorInfoAndInfoHandler
    );
    Action.ClientFile.UpdateFiCreditor.notInterested(
      this.getClientCreditorInfoAndInfoHandler
    );
    Action.ClientFile.UpdateIncludeClCreditor.notInterested(
      this.getClientCreditorInfoAndInfoHandler
    );
    Action.ClientFile.ExcludeFiCreditorFromProgram.notInterested(
      this.getClientCreditorInfoAndInfoHandler
    )
  }

  //ACTION
  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  getClientFileBasicInfo() {
    Action.ClientFile.GetClientFileBasicInfo.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {}
    );
  }

  getClientFileSummary() {
    Action.ClientFile.GetClientFileSummary.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  getClientCreditorList() {
    Action.ClientFile.GetClCreditorList.execute1(
      this.clientFileBasicInfo.clientBasicInfo.clientId,
      (output) => {}
    );
  }
}
</script>

<style></style>
