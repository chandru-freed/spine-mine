<template>
  <div class="ActivePartnerList">
    <task-tab></task-tab>
    <v-card class="pa-0 ma-0" color="transparent">
    <component
      v-if="!!activePartnerListDateSearchFormMetaData"
      :ref="activePartnerListDateSearchFormMetaData.myRefName"
      :is="activePartnerListDateSearchFormMetaData.componentName"
      :value="selectModel(getActivePartnerListInput, undefined)"
      @input="
        (newValue) =>
          updateModel(getActivePartnerListInput, newValue, undefined)
      "
      v-bind="activePartnerListDateSearchFormMetaData.props"
    ></component>
    <component
      v-if="!!showCertificateForm"
      :ref="uploadCertificateFFormMDPMetaData.myRefName"
      :is="uploadCertificateFFormMDPMetaData.componentName"
      :value="selectModel(uploadCertificateForm, undefined)"
      @input="
        (newValue) => updateModel(uploadCertificateForm, newValue, undefined)
      "
      v-bind="uploadCertificateFFormMDPMetaData.props"
    >
    </component>

    <component
      v-if="!!showIdentifiationForm"
      :ref="uploadIdentifiationFFormMDPMetaData.myRefName"
      :is="uploadIdentifiationFFormMDPMetaData.componentName"
      :value="selectModel(uploadIdentifiationForm, undefined)"
      @input="
        (newValue) => updateModel(uploadIdentifiationForm, newValue, undefined)
      "
      v-bind="uploadIdentifiationFFormMDPMetaData.props"
    >
    </component>
    <component
      v-if="!!activePartnerListFDataTableMetaData"
      :ref="activePartnerListFDataTableMetaData.myRefName"
      :is="activePartnerListFDataTableMetaData.componentName"
      :value="selectModel(activePartnerList, undefined)"
      v-bind="activePartnerListFDataTableMetaData.props"
    ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import ActivePartnerListFDataTableMDP from "./ActivePartnerListFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import DashboardTab from "@/section/spineapp/components/tab/DashboardTab.vue";
import UploadCertificateFFormMDP from "./UploadCertificateFFormMDP";
import axios from "axios";
import FSnackbar from "@/fsnackbar";
import UploadIdentifiationFFormMDP from "./UploadIdentifiationFFormMDP";
import ActivePartnerListDateSearchFFormMDP from "./ActivePartnerListDateSearchFFormMDP";

@Component({
  components: {
    FForm,
    FDataTable,
    "task-tab": DashboardTab,
  },
})
export default class ActivePartnerList extends ModelVue {
  showCertificateForm: boolean = false;
  showIdentifiationForm: boolean = false;
  activePartnerList: Data.Spine.Partner[] = [];

  getActivePartnerListInput: Data.Spine.GetActivePartnerListInput =
    new Data.Spine.GetActivePartnerListInput();
  uploadCertificateInput: Data.Spine.UploadCertificateInput =
    new Data.Spine.UploadCertificateInput();

  uploadIdentifiationInput: Data.Spine.UploadCertificateInput =
    new Data.Spine.UploadCertificateInput();

  uploadCertificateForm = new Data.ClientFile.UploadDocumentForm();
  uploadIdentifiationForm = new Data.ClientFile.UploadDocumentForm();

  getPresignedURLForUploadPPInput: Data.Spine.GetPresignedURLForUploadPPInput =
    new Data.Spine.GetPresignedURLForUploadPPInput();

  getPresignedURLForUploadPPIdentifiationInput: Data.Spine.GetPresignedURLForUploadPPInput =
    new Data.Spine.GetPresignedURLForUploadPPInput();

  presignedUrl: string;

  public mounted() {
    this.getActivePartnerList();
  }

  getActivePartnerList() {
    Action.Spine.GetActivePartnerList.execute(
      this.getActivePartnerListInput,
      (output) => {
        this.activePartnerList = output;
      }
    );
  }

  // =================== Upload Certificate start ==================
  clearCertificateForm() {
    this.showCertificateForm = false;
  }

  resetUploadForm() {
    this.uploadCertificateForm = new Data.ClientFile.UploadDocumentForm();
    this.uploadIdentifiationForm = new Data.ClientFile.UploadDocumentForm();
  }

  resetFDataTable() {
    (
      this.$refs[this.activePartnerListFDataTableMetaData.myRefName] as any
    ).clearSelectedItems();
  }

  handleCertificateFormClick(item: any) {
    this.getPresignedURLForUploadPPIdentifiationInput.partnerId =
      item.partnerId;
    this.uploadCertificateInput.partnerId = item.partnerId;
    this.showCertificateForm = true;
  }

  getPresignedURLAndUpload() {
    const fileName = this.generateRandomUrl(this.uploadCertificateForm.fileDoc);
    this.getPresignedURLForUploadPPIdentifiationInput.fileName = fileName;
    Action.Spine.GetPresignedURLForUploadPP.execute(
      this.getPresignedURLForUploadPPIdentifiationInput,
      (output) => {
        this.presignedUrl = output.url;
        this.uploadCertificateInput.documentPath = output.docUploadedPath;

        this.uploadFile();
      }
    );
  }

  async uploadFile() {
    const options: any = {
      headers: {
        "Content-Type": this.uploadCertificateForm.fileDoc?.type,
      },
    };
    const axiosResponse = await axios.put(
      this.presignedUrl,
      this.uploadCertificateForm.fileDoc,
      options
    );
    this.uploadCertificate();
  }

  uploadCertificate() {
    Action.Spine.UploadCertificate.execute(
      this.uploadCertificateInput,
      (ouput) => {
        FSnackbar.success("Succesfully added");
        this.showCertificateForm = false;
        this.resetFDataTable();
        this.resetUploadForm();
        this.getActivePartnerList();
      }
    );
  }

  // =================== Upload Certificate END ==================

  // =================== Upload  Identifiation START ==================

  clearIdentifiationForm() {
    this.showIdentifiationForm = false;
  }

  handleIdentifiationFormClick(item: any) {
    this.getPresignedURLForUploadPPInput.partnerId = item.partnerId;
    this.uploadIdentifiationInput.partnerId = item.partnerId;
    this.showIdentifiationForm = true;
  }

  getPresignedURLAndUploadIdentifiation() {
    const fileName = this.generateRandomUrl(
      this.uploadIdentifiationForm.fileDoc
    );
    this.getPresignedURLForUploadPPInput.fileName = fileName;
    Action.Spine.GetPresignedURLForUploadPP.execute(
      this.getPresignedURLForUploadPPInput,
      (output) => {
        this.presignedUrl = output.url;
        this.uploadIdentifiationInput.documentPath = output.docUploadedPath;

        this.uploadFileIdentifiation();
      }
    );
  }

  async uploadFileIdentifiation() {
    const options: any = {
      headers: {
        "Content-Type": this.uploadIdentifiationForm.fileDoc?.type,
      },
    };
    const axiosResponse = await axios.put(
      this.presignedUrl,
      this.uploadIdentifiationForm.fileDoc,
      options
    );
    this.uploadIdentifiation();
  }

  uploadIdentifiation() {
    Action.Spine.UploadIdentifiation.execute(
      this.uploadIdentifiationInput,
      (ouput) => {
        FSnackbar.success("Succesfully added");
        this.showIdentifiationForm = false;
        this.resetFDataTable();
        this.resetUploadForm();
        this.getActivePartnerList();
      }
    );
  }

  // =================== Upload Identifiation END ==================

  generateRandomUrl(file: File | null) {
    if (file) {
      const dateValue = new Date().valueOf();
      return dateValue + file.name;
    }
    return "";
  }

  gotoPartnerDetails(partnerId: string) {
    this.$router.push({
      name: "Root.Dashboard.PartnerDetails",
      params: { partnerId: partnerId },
    });
  }
  // Meta data

  get activePartnerListFDataTableMetaData() {
    return new ActivePartnerListFDataTableMDP({ parent: this }).getMetaData();
  }
  get uploadCertificateFFormMDPMetaData() {
    return new UploadCertificateFFormMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }

  get uploadIdentifiationFFormMDPMetaData() {
    return new UploadIdentifiationFFormMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }

  get activePartnerListDateSearchFormMetaData(): any {
    return new ActivePartnerListDateSearchFFormMDP({
      taskRoot: this,
    }).getMetaData();
  }
}
</script>

<style></style>
