<template>
  <div class="Document">
    <component
      v-if="!!documentList"
      :ref="documentListMetaData.myRefName"
      :is="documentListMetaData.componentName"
      :value="selectModel(documentList, documentListMetaData.dataSelectorKey)"
      @input="
        (newValue) =>
          updateModel(
            documentList,
            newValue,
            documentListMetaData.dataSelectorKey
          )
      "
      v-bind="documentListMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import FCreditor from "@/components/generic/file/creditor/FCreditor.vue";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import store, * as Store from "@/../src-gen/store";
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";
import FileDocumentFDocumentMDP from "./FileDocumentFDocumentMDP";
import FDocument from "@/components/generic/file/documentUpload/FDocument.vue";

@Component({
  components: {
    FForm,
    FDocument,
  },
})
export default class FileDocumentList extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiDocumentList
  fiDocumentList: Data.ClientFile.FiDocument;

  //METADATA
  get documentListMetaData() {
    return new FileDocumentFDocumentMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }
  //METADATA

  //FORM

  documentListLocal: any = new Data.ClientFile.FiCreditor();

  get documentList() {
    if (!!this.fiDocumentList) {
      this.documentListLocal = this.fiDocumentList;
    }
    return this.documentListLocal;
  }

  set documentList(value: any) {
    this.documentListLocal = value;
  }

  //FORM

  mounted() {
    this.getFiDocumentList();
  }

  //ACTION
  getFiDocumentList() {
    Action.ClientFile.GetDocumentList.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {},
      (error) => {},
      RemoteApiPoint.SpineApi
    );
  }
}
</script>
