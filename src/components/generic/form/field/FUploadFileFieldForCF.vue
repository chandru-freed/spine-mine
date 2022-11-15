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
        >
        </v-file-input>
        {{ modelValue.documentPath }}
      </div>
      <div class="col-3">
        <v-btn :disabled="!selectedFile" @click="getPresignedURLAndUpload" color="primary">Upload</v-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import store, * as Store from "@/../src-gen/store";
import * as Action from "@/../src-gen/action";
import { VFileInput } from "vuetify/lib/components";
import axios from "axios";

@Component({
  components: {
    // VFileInput,
  },
})
export default class FUploadFileFieldForCF extends Vue {
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


  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  selectedFile: any = null;
  uploadedDocument: Data.Spine.FileDocument = new Data.Spine.FileDocument();
  attachDocumentToCFInput: Data.ClientFile.AttachDocumentInput =
    new Data.ClientFile.AttachDocumentInput();
  presignedUrl: string = "";
  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: any) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END

  
  
  fileSelected(newValue: any) {
    this.selectedFile = newValue;
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
      this.closeAndClearAllForms();
    });
  }

  closeAndClearAllForms() {
    this.selectedFile = undefined;
  }

  generateRandomUrl(file: File | null) {
    if (file) {
      const dateValue = new Date().valueOf();
      return dateValue + file.name;
    }
    return "";
  }
}
</script>

<style>
.v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 42px !important;
}
</style>
