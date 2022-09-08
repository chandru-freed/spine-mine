<template>
  <div class="FileCreditorList">
    <!-- {{creditorInfoForm}} -->

    <component
      v-if="creditorInfoForm"
      :ref="creditorInfoFormMetaData.myRefName"
      :is="creditorInfoFormMetaData.componentName"
      :value="selectModel(creditorInfoForm, creditorInfoFormMetaData.dataSelectorKey)"
      @input="
        (newValue) =>
          updateModel(
            creditorInfoForm,
            newValue,
            creditorInfoFormMetaData.dataSelectorKey
          )
      "
      v-bind="creditorInfoFormMetaData.props"
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
import * as RemoteApiPoint from "@/remote-api-point";
import ClientCreditorFCreditorMDP from "@/section/spineapp/components/file/creditor/ClientCreditorFCreditorMDP";
import FCreditor from "@/components/generic/file/creditor/FCreditor.vue";
@Component({
  components: {
    FForm,
    FCreditor
  },
})
export default class FileCreditorList extends ModelVue  {

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorList
  fiCreditorList: Data.ClientFile.FiCreditor[];

  fileId = this.$route.params.fileId;
  //METADATA
  get creditorInfoFormMetaData() {
    return new ClientCreditorFCreditorMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }
  //METADATA

  //FORM

  creditorInfoFormLocal: any = new Data.ClientFile.FiCreditor();

  get creditorInfoForm() { 
    if (!!this.fiCreditorList ) {
      this.creditorInfoFormLocal = this.fiCreditorList;
    }
    return this.creditorInfoFormLocal;
  }

  set creditorInfoForm(value: any) {
    this.creditorInfoFormLocal = value;
  }

  //FORM

  mounted() {
    this.getFiCreditorInfo();
  }

  //ACTION
  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      "63197423df05e8d173b38f62",//this.clientFileBasicInfo.clientFileId,
      (output) => {},
      (error) => {},
      RemoteApiPoint.SpineApi
    );
  }

}

</script>

<style>
</style>
