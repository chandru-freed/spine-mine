<template>
  <div ref="documentListRef">
    <component
      v-if="uploadDocumentDialog"
      :is="uploadDocumentFormMetaData.componentName"
      :ref="uploadDocumentFormMetaData.myRefName"
      v-model="uploadDocumentForm"
      v-bind="uploadDocumentFormMetaData.props"
    ></component>

    <v-alert text color="error" v-if="deleteDocumentDialog">
      <div class="text-center py-3">Are you sure want to delete?</div>
      <div
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
      >
        <FBtn
          label="Cancel"
          :on-click="closeAndClearAllForms"
          outlined
          color="red"
        />
        <FBtn label="Delete" :on-click="deleteDocument" outlined color="red" />
      </div>
    </v-alert>

    <v-col class="col-12">
      <!--GRID START-->
      <v-card flat outlined>
        <v-data-table
          :headers="headers"
          :items="modelValue"
          class="elevation-0"
        >
          <template v-slot:[`item.documentPath`]="{ item }">
            <a @click="openUnsignedFileURL(item.documentPath)">
              <v-icon small>mdi-file</v-icon>
              {{ getFileNameFromDocPath(item.documentPath) }}
            </a>
          </template>

          <template v-slot:[`item.uploadedOn`]="{ item }">
            {{ item.uploadedOn | date }}
          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Document(s)</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="disabled"
                icon
                color="primary"
                class="mb-2"
                @click="showAddForm"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item, index }">
            <v-icon
              :disabled="disabled"
              small
              @click="selectDeleteDocument(item, index)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <!--GRID END-->
      <!--ACTION START-->
      <div
        class="
          d-flex
          flex-row
          align-start
          flex-wrap
          justify-space-around
          pa-2
          my-5
        "
        v-if="!disabled"
      >
        <component
          v-for="(actionMetaData, index) of actionMetaDataListFiltered"
          :key="'action' + index"
          :is="actionMetaData.componentName"
          :ref="actionMetaData.myRefName"
          v-bind="actionMetaData.props"
        ></component>
      </div>
      <!--ACTION END-->
    </v-col>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FBtn from "@/components/generic/FBtn.vue";
import * as Snackbar from "node-snackbar";
import axios from "axios";

@Component({
  components: {
    FForm,
    FBtn,
  },
})
export default class FDocument extends ModelVue {
  uploadDocumentForm = new Data.ClientFile.UploadDocumentForm();
  uploadedDocument: Data.Spine.FileDocument = new Data.Spine.FileDocument();
  selectedCreditorIndex: number;
  headers = [
    { text: "DocumentType", value: "documentType" },
    { text: "Doc Path", value: "documentPath" },
    { text: "Description", value: "documentDescription" },
    { text: "Uploaded On", value: "uploadedOn" },
    { text: "Actions", value: "actions" },
  ];

  uploadDocumentDialog = false;
  deleteDocumentDialog = false;

  presignedUrl: string;

  @Prop()
  uploadDocumentFormMetaData: any;

  @Prop()
  actionMetaDataList: any[];

  @Prop()
  disabled: boolean;

  @Prop()
  taskRoot: any;

  get clientFileNumber(): string {
    return this.$route.params.clientFileNumber;
  }

  showAddForm() {
    this.closeDialogs();
    this.uploadDocumentDialog = true;
  }

  showDeletePopup() {
    this.closeAndClearAllForms();
    this.deleteDocumentDialog = true;
  }
  closeAndClearAllForms() {
    this.closeDialogs();
    this.resetForms();
  }
  closeDialogs() {
    this.uploadDocumentDialog = false;
    this.deleteDocumentDialog = false;
  }
  resetForms() {
    this.uploadDocumentForm = new Data.ClientFile.UploadDocumentForm();
    this.uploadedDocument = new Data.Spine.FileDocument();
  }

  mounted() {
    console.log(this.$refs);
  }

  deleteDocument() {
    const fiDocumentId =
      this.modelValue[this.selectedCreditorIndex].fiDocumentId;
    Action.Spine.DetachDocument.execute2(
      this.taskRoot.taskId,
      fiDocumentId,
      (output) => {
        this.closeDialogs();
        Snackbar.show({
          text: "Succesfully Removed",
          pos: "bottom-center",
        });
      }
    );
  }

  selectDeleteDocument(item: any, index: number) {
    this.selectedCreditorIndex = index;
    this.showDeletePopup();
  }

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }

  getFileNameFromDocPath(key: string) {
    return key.split("/").pop();
  }

  getPresignedURLAndUpload() {
    const fileName = this.generateRandomUrl(this.uploadDocumentForm.fileDoc);
    Action.Spine.GetFiPresignedURLForUpload.execute2(
      this.clientFileNumber,
      fileName,
      (output) => {
        this.presignedUrl = output.url;
        this.uploadedDocument.documentPath = output.docUploadedPath;
        this.uploadFile();
      }
    );
  }

  async uploadFile() {
    const options: any = {
      headers: {
        "Content-Type": this.uploadDocumentForm.fileDoc?.type,
      },
    };
    const axiosResponse = await axios.put(
      this.presignedUrl,
      this.uploadDocumentForm.fileDoc,
      options
    );
    this.attachAndSaveUploadedFile();
    console.log(axiosResponse);
  }

  attachAndSaveUploadedFile() {
    this.uploadedDocument.documentType = this.uploadDocumentForm.docType;
    this.uploadedDocument.uploadedOn = new Date();
    this.uploadedDocument.documentDescription =
      this.uploadDocumentForm.documentDescription;
    const input = Data.Spine.AttachDocumentInput.fromJson(
      this.uploadedDocument
    );
    input.clientFileId = this.taskRoot.clientFileBasicInfo.clientFileId;
    input.taskId = this.taskRoot.taskId;
    Action.Spine.AttachDocument.execute(input, (output) => {
      Snackbar.show({
        text: "Succesfully Added",
        pos: "bottom-center",
      });
      this.closeAndClearAllForms();
    });
  }

  generateRandomUrl(file: File | null) {
    if (file) {
      const dateValue = new Date().valueOf();
      return dateValue + file.name;
    }
    return "";
  }

  openUnsignedFileURL(key: string) {
    Action.Spine.GetFileUrl.execute1(key, (output) => {
      window.open(output.url);
    });
  }
}
</script>
