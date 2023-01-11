
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
export default class FAWSUploadFileField extends Vue {
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

  @Prop()
  documentRefId: string;

  @Prop()
  documentRefType: Data.Spine.DOCUMENT_REF_TYPE;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  getPresignedURLForUploadInput: Data.Spine.GetPresignedURLForUploadInput = new Data.Spine.GetPresignedURLForUploadInput();
  selectedFile: any = null;
  docPath: string = "";

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
    this.getPresignedURLForUploadInput.fileName = fileName;
    this.getPresignedURLForUploadInput.documentRefType = this.documentRefType;
    this.getPresignedURLForUploadInput.documentRefId = this.documentRefId;
    Action.Spine.GetPresignedURLForUpload.execute(
      this.getPresignedURLForUploadInput,
      (output) => {
        this.presignedUrl = output.url;
        this.docPath = output.docUploadedPath;
        this.uploadFile();
      }
    );
  }

  async uploadFile() {
    const options: any = {
      headers: {
        "Content-Type": this.selectedFile?.type,
      },
      onUploadProgress: (progress: any) => {
        console.log(progress);
      }
    };
    const axiosResponse = await axios.put(
      this.presignedUrl,
      this.selectedFile,
      options
    );
    this.handlePostUploadFile();
  }

  handlePostUploadFile() {
    this.modelValue = this.docPath;
    this.clearAllForms();
  }

  detachDocument() {
    this.modelValue = "";
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
    return this.modelValue?.split("/").pop()||'';
  }

}
</script>

<style>
.v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 42px !important;
}
</style>
