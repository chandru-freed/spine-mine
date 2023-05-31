<template>
  <div class="col">
    <component
      :ref="dcpCFClientInfoFFormMDPMetaData.myRefName"
      :is="dcpCFClientInfoFFormMDPMetaData.componentName"
      :value="selectModel(dcpClientFileBasicInfoStore, undefined)"
      v-bind="dcpCFClientInfoFFormMDPMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import DCPCFClientInfoFFormMDP from "./DCPCFClientInfoFFormMDP";

@Component({
  components: {
    FDataTable,
    FForm,
  },
})
export default class DCPCFAgreementInfo extends ModelVue {
  @Store.Getter.DCPClientFile.DCPClientFileSummary.dcpClientFileBasicInfo
  dcpClientFileBasicInfoStore: Data.DCPClientFile.DCPClientFileBasicInfo;

  clientFileId = this.$route.params.clientFileId;

  public mounted() {
    this.getDCPClientFileBasicInfo();
  }

  getDCPClientFileBasicInfo() {
    Action.DCPClientFile.GetDCPClientFileBasicInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  get dcpCFClientInfoFFormMDPMetaData() {
    return new DCPCFClientInfoFFormMDP({ parent: this }).getMetaData();
  }
}
</script>

<style></style>
