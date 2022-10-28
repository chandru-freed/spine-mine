<template>
  <div class="CFCreditorInfo">
    <component
      v-if="!!creditorInfo.creditorList"
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
import FCreditor from "@/components/generic/file/creditor/FCreditor.vue";
import CFCreditorInfoFCreditorMDP from "./CFCreditorInfoFCreditorMDP";
@Component({
  components: {
    FForm,
    FCreditor
  },
})
export default class CFCreditorInfo extends ModelVue  {

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorInfo: Data.ClientFile.FiCreditor;

  //METADATA
  get creditorInfoMetaData() {
    return new CFCreditorInfoFCreditorMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }
  //METADATA

  //FORM

  creditorInfoLocal: any = new Data.ClientFile.FiCreditor();

  get creditorInfo() { 
    if (!!this.fiCreditorInfo ) {
      this.creditorInfoLocal = this.fiCreditorInfo;
    }
    return this.creditorInfoLocal;
  }

  set creditorInfo(value: any) {
    this.creditorInfoLocal = value;
  }

  //FORM

  mounted() {
    this.getFiCreditorInfo();
  }

  //ACTION
  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
     this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }

}

</script>

<style>
</style>
