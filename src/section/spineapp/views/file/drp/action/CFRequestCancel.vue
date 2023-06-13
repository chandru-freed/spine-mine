<template>
  <div class="CFUpdateContactInfo">
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Request Cancel</h4>
      <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>

      <component
      v-if="!!cfRequestCancelFFormMetaData"
      :ref="cfRequestCancelFFormMetaData.myRefName"
      :is="cfRequestCancelFFormMetaData.componentName"
      :value="selectModel(cancelInput, undefined)"
      @input="(newValue) => updateModel(cancelInput, newValue, undefined)"
      v-bind="cfRequestCancelFFormMetaData.props"
    ></component>
  </div>
  <!--  TASK TAB -->
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

import FForm from "@/components/generic/form/FForm.vue";
import Helper from "../../../../util/Helper";
import CFUpdateContactInfoFFormMDP from "./CFUpdateContactInfoFFormMDP";
import ModelVue from "@/components/generic/ModelVue";
import FSnackbar from "@/fsnackbar";
import CFRequestCancelFFormMDP, { reasonCodeList } from './CFRequestCancelFFormMDP'

@Component({
  components: {
    FForm,
  },
})
export default class CFRequestCancel extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfoStore: Data.ClientFile.ClientFileBasicInfo;

  cancelInput: Data.ClientFile.CancelInput = new Data.ClientFile.CancelInput();
  clientFileId = this.$route.params.clientFileId;

  get cfRequestCancelFFormMetaData() {
          return new CFRequestCancelFFormMDP({parent: this}).getMetaData()
}

  gotoAction() {
    this.$router.push({
      name: "Root.CFile.CFAction.CFActionList",
      params: {
        clientFileId: this.clientFileId,
      },
    });
  }

  gotoClientFile() {
    Helper.Router.gotoClientFile({
      router: this.$router,
      clientFileId: this.clientFileId,
    });
  }

  requestCancel() {
    FSnackbar.confirm({
      onConfirm: () => {
    this.cancelInput.clientFileId = this.clientFileId;
    
    
    Action.ClientFile.RequestCancel.execute(this.cancelInput, (output) => {
      setTimeout(() => {
        const reason = reasonCodeList.find(reasonCode => reasonCode.id === this.cancelInput.reason);
        const noteMsg = `Cancelation Reason: ${reason?.name}: ${this.cancelInput.reasonDetails}`;
        this.addNote(noteMsg);
        FSnackbar.success("Succesfully Requested");
        this.gotoCFActiveTaskList();
      }, 400);
    });
      }});
  }

  addNote(message:string) {
    const addNoteInput:Data.FiNote.AddNoteInput = new Data.FiNote.AddNoteInput();
    addNoteInput.clientFileId  = this.clientFileId;
    addNoteInput.noteMessage = message;
    addNoteInput.noteTagList = [new Data.FiNote.NoteTag("highlight","true")];
    Action.FiNote.AddNote.execute(addNoteInput, output => {

    })
  }

    gotoCFActiveTaskList() {
      Helper.Router.gotoCFActiveTaskList({
        router: this.$router,
        clientFileId: this.clientFileId,
      });
  }
}
</script>

<style>
</style>
