<template>
  <v-card flat class="CFQRCodeList">
    <component
      v-if="showGenerateForm"
      :ref="cfqrCodeGenerateFFormMetaData.myRefName"
      :is="cfqrCodeGenerateFFormMetaData.componentName"
      :value="selectModel(generateQrCodeInput, undefined)"
      @input="
        (newValue) => updateModel(generateQrCodeInput, newValue, undefined)
      "
      v-bind="cfqrCodeGenerateFFormMetaData.props"
    ></component>

    <component
      v-if="!!cfqrCodeListFDataTableMetaData"
      :ref="cfqrCodeListFDataTableMetaData.myRefName"
      :is="cfqrCodeListFDataTableMetaData.componentName"
      :value="qrCodeList"
      v-bind="cfqrCodeListFDataTableMetaData.props"
    ></component>

    <v-dialog width="500" v-model="showQrCodeImg">
      <v-card>
        <v-img :src="qrCodeUrl" />
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import CFQRCodeGenerateFFormMDP from "./CFQRCodeGenerateFFormMDP";
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import ModelVue from "@/components/generic/ModelVue";
import CFQRCodeListFDataTableMDP from "./CFQRCodeListFDataTableMDP";

@Component({
  components: {
    FForm,
    FDataTable,
  },
})
export default class CFQRCodeList extends ModelVue {
  generateQrCodeInput: Data.ClientFile.GenerateQrCodeForSpaPaymentInput =
    new Data.ClientFile.GenerateQrCodeForSpaPaymentInput();

  qrCodeList: Data.ClientFile.QrCodeStatus[] = [];
  qrCodeUrl: string = "";
  showGenerateForm: boolean = false;
  showQrCodeImg: boolean = false;
  clientFileId = this.$route.params.clientFileId;
  public mounted() {
    this.getQrCodeList();
    Action.ClientFile.GenerateQrCodeForSpaPayment.interested(
      this.getQrCodeListHandler
    );
  }

  destroyed() {
    Action.ClientFile.GenerateQrCodeForSpaPayment.notInterested(
      this.getQrCodeListHandler
    );
  }

  get cfqrCodeGenerateFFormMetaData() {
    return new CFQRCodeGenerateFFormMDP({ parent: this }).getMetaData();
  }

  get cfqrCodeListFDataTableMetaData() {
    return new CFQRCodeListFDataTableMDP({ parent: this }).getMetaData();
  }

  getQrCodeListHandler = () => {
    setTimeout(() => {
      this.getQrCodeList();
    }, 1000);
  };
  getQrCodeList() {
    this.generateQrCodeInput.clientFileId = this.clientFileId;
    Action.ClientFile.GetQrCodeStatusListForClient.execute1(
      this.clientFileId,
      (output) => {
        this.qrCodeList = output.qrCodeStatusList;
      }
    );
  }

  generateQrCode() {
    this.generateQrCodeInput.clientFileId = this.clientFileId;
    Action.ClientFile.GenerateQrCodeForSpaPayment.execute(
      this.generateQrCodeInput,
      (output) => {
        this.openQrCode(output.qrCodeUrl);
      }
    );
  }

  resetForm() {
    this.showGenerateForm = false;
    // this.generateQrCodeInput =
    //   new Data.ClientFile.GenerateQrCodeForSpaPaymentInput();
  }

  openQrCode(qrCodeUrl: string) {
    this.qrCodeUrl = qrCodeUrl;
    this.showQrCodeImg = true;
  }
}
</script>

<style>
</style>
