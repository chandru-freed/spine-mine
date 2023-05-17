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
import CFADocumentInfoFDocumentMDP from "./CFADocumentInfoFDocumentMDP";

@Component({
  components: {
    FForm,
    FDocument,
  },
})
export default class CFAdminDocumentInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiDocumentList
  fiDocumentList: Data.ClientFile.FiDocument;

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  //METADATA
  get documentListMetaData() {
    return new CFADocumentInfoFDocumentMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }
  //METADATA

  public getFiDocumentListHandler = (output: any) => {
    setTimeout(() => {
      this.getFiDocumentList();
    }, 1000);
  };

  mounted() {
    this.getFiDocumentList();
    Action.Spine.AttachDocument.interested(this.getFiDocumentListHandler);
    Action.Spine.DetachDocument.interested(this.getFiDocumentListHandler);
  }

  destroyed() {
    Action.Spine.AttachDocument.notInterested(this.getFiDocumentListHandler);
    Action.Spine.DetachDocument.notInterested(this.getFiDocumentListHandler);
  }

  //ACTION
  getFiDocumentList() {
    Action.ClientFile.GetDocumentList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
}
</script>
