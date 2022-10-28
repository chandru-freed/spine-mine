<template>
  <div class="CFDocumentInfo">
    <component
      v-if="!!fiDocumentList"
      :ref="documentListMetaData.myRefName"
      :is="documentListMetaData.componentName"
      :value="selectModel(fiDocumentList, undefined)"
      v-bind="documentListMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import store, * as Store from "@/../src-gen/store";
import * as Action from "@/../src-gen/action";

import FDocument from "@/components/generic/file/documentUpload/FDocument.vue";
import CFDocumentInfoFDocumentMDP from "./CFDocumentInfoFDocumentMDP";

@Component({
  components: {
    FForm,
    FDocument,
  },
})
export default class CFDocumentInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiDocumentList
  fiDocumentList: Data.ClientFile.FiDocument;

  //METADATA
  get documentListMetaData() {
    return new CFDocumentInfoFDocumentMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }
  //METADATA

  mounted() {
    this.getFiDocumentList();
  }

  //ACTION
  getFiDocumentList() {
    Action.ClientFile.GetDocumentList.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }
}
</script>
