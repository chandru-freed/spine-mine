<template>
<div>
  <my-ticket-details-tab v-model="tab"></my-ticket-details-tab>
  <v-card flat>
  <v-card-text>
    
    <component
      v-if="showAttachForm"
      :ref="attachTicketDocumentFFormMDP.myRefName"
      :is="attachTicketDocumentFFormMDP.componentName"
      :value="selectModel(attachUploadedDocumentInput, undefined)"
      v-bind="attachTicketDocumentFFormMDP.props"
    ></component>

    <component
      :ref="documentListFTableMetaData.myRefName"
      :is="documentListFTableMetaData.componentName"
      :value="uploadedDocumentList"
      v-bind="documentListFTableMetaData.props"
    ></component>
  </v-card-text>
  </v-card>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import MyTicketDetailsTab from "../../../components/tab/MyTicketDetailsTab.vue";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import AttachTicketDocumentFFormMDP from "./AttachTicketDocumentFFormMDP";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable, { ActionType } from "@/components/generic/table/FDataTable.vue";
import MTDocumentListFTableMDP from "./MTDocumentListFTableMDP";
@Component({
  components: {
    MyTicketDetailsTab,
    FForm,
    FDataTable,
  },
})
export default class MyTicketDocumentList extends ModelVue {
  public tab: number = 1;
  @Store.Getter.Ticket.TicketSummary.ticketTaskDetails
  ticketTaskDetails: Data.Ticket.MyTicketDetails;

  ticketId: string = this.$route.params.myTicketId;
  attachUploadedDocumentInput: Data.Spine.AttachUploadedDocumentInput =
    new Data.Spine.AttachUploadedDocumentInput();
  showAttachForm: boolean = false;

  uploadedDocumentList: Data.Spine.DocumentDetails[] = [];

  mounted() {
    this.getDocumentList();
  }

  getDocumentList() {
    setTimeout(() => {
    Action.Spine.GetDocumentList.execute1(this.ticketId, output => {
      this.uploadedDocumentList = output;
    });  
    }, 500);
    
  }

  handleAddClick() {
    this.showAttachForm = true;
  }
  attachDocument() {
    this.attachUploadedDocumentInput.documentRefType =
      Data.Spine.DOCUMENT_REF_TYPE.TICKET;
    this.attachUploadedDocumentInput.documentRefId = this.ticketId;
    Action.Spine.AttachUploadedDocument.execute(
      this.attachUploadedDocumentInput,
      (output) => {
        this.getDocumentList();
        this.closeAndClearAllForms();
      }
    );
  }

  get attachTicketDocumentFFormMDP() {
    return new AttachTicketDocumentFFormMDP({
      root: this,
      parent: this,
    }).getMetaData();
  }

  closeAndClearAllForms() {
    this.attachUploadedDocumentInput =
      new Data.Spine.AttachUploadedDocumentInput();
    this.showAttachForm = false;
  }

  openUploadedFile(docPath: string) {
    Action.Spine.GetUploadedUrl.execute1(docPath,output => {
      window.open(output.uploadedUrl);
    })
  }

  get documentListFTableMetaData() {
    return new MTDocumentListFTableMDP({root: this}).getMetaData();
  }
}
</script>

<style>
</style>
