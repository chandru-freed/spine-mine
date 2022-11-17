<template>
  <div>
    <div class="row">
      <div class="col-9">
        <v-file-input
          v-bind="$props"
          :value="selectedFile"
          @change="fileSelected"
          :id="id"
          :label="label"
          :disabled="disabled"
          :outlined="outlined"
          :dense="dense"
          :hide-details="fileName !== ''"
          :error-messages="errorMessages"
          prepend-inner-icon="mdi-paperclip"
          prepend-icon=""
        >
        </v-file-input>
        <div v-if="fileName" class="d-flex align-center my-2">
          <v-icon class="mr-2">mdi-file</v-icon>
          {{ fileName }}
          <v-spacer/>
          <a @click="detachDocument"><v-icon>mdi-close</v-icon></a>
        </div>
      </div>
      <div class="col-3">
        <v-btn :disabled="!selectedFile" @click="getPresignedURLAndUpload" color="primary">Upload </v-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import store, * as Store from "@/../src-gen/store";
import * as Action from "@/../src-gen/action";
import { VFileInput, VTextField } from "vuetify/lib/components";
import axios from "axios";

@Component({
  components: {
    VFileInput,
  },
})
export default class FCFAWSUploadFileField extends Vue {
  // MODEL VALUE - START
  @Prop()
  value: any;

  @Prop()
  id: string;

  @Prop()
  label: string;

  @Prop()
  disabled: File;

  @Prop()
  outlined: boolean;

  @Prop()
  dense: boolean;

  @Prop()
  errorMessages: any;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  selectedFile: any = null;
  uploadedDocument: Data.Spine.FileDocument = new Data.Spine.FileDocument();
  attachDocumentToCFInput: Data.ClientFile.AttachDocumentInput =
    new Data.ClientFile.AttachDocumentInput();
  presignedUrl: string = "";

  // MODEL VALUE - START
  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: any) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END


  mounted() {
  }
  
  
  fileSelected(newValue: any) {
    this.selectedFile = newValue;
    // this.getPresignedURLAndUpload();
  }

  
  
  
  //For upload

  getPresignedURLAndUpload() {
    const fileName = this.generateRandomUrl(this.selectedFile);
    Action.Spine.GetFiPresignedURLForUpload.execute2(
      this.clientFileBasicInfo.clientFileNumber,
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
        "Content-Type": this.selectedFile.fileDoc?.type,
      },
      onUploadProgress: (progress: any) => {
        console.log(progress);
      }
    };
    const axiosResponse = await axios.put(
      this.presignedUrl,
      this.selectedFile.fileDoc,
      options
    );
    this.handlePostUploadFile();
  }

  handlePostUploadFile() {
    this.uploadedDocument.documentType = this.selectedFile.docType;
    this.uploadedDocument.uploadedOn = new Date();
    const input = Data.ClientFile.AttachDocumentInput.fromJson(
      this.uploadedDocument
    );
    input.clientFileId = this.clientFileBasicInfo.clientFileId;
    Action.ClientFile.AttachDocument.execute(input, (output) => {
      this.uploadedDocument.fiDocumentId = output.fiDocumentId;
      this.modelValue = this.uploadedDocument;
      this.clearAllForms();
    });
  }

  detachDocument() {
     Action.ClientFile.DetachDocument.execute1(this.modelValue.fiDocumentId, (output) => {
      this.modelValue = new Data.ClientFile.FiDocument();
    });
  }
  

  clearAllForms() {
    this.selectedFile = undefined;
  }

  generateRandomUrl(file: File | null) {
    if (file) {
      const dateValue: string = new Date().valueOf().toString();
      return dateValue.slice(-4) + file.name;
    }
    return "";
  }

  get fileName() {
    return this.modelValue?.documentPath.split("/").pop()||'';
  }

}
</script>

<style>
.v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 42px !important;
}
</style>
