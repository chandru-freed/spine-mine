<template>
  <div class="CFReceivePayment">
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Receive Payment</h4>
      <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>

    <component
      :ref="receivePaymentMetaData.myRefName"
      :is="receivePaymentMetaData.componentName"
      :value="selectModel(recordPaymentPresentInputForm, undefined)"
      @input="
        (newValue) =>
          updateModel(recordPaymentPresentInputForm, newValue, undefined)
      "
      v-bind="receivePaymentMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import Helper from "@/section/spineapp/util/Helper";
import CFReceivePaymentFFormMDP from "./CFReceivePaymentFFormMDP";

@Component({
  components: {
    FForm,
  },
})
export default class ReceivePayment extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  recordPaymentPresentInput = new Data.ClientFile.RecordPaymentPresentInput();

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  //METADATA
  get receivePaymentMetaData() {
    return new CFReceivePaymentFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  get recordPaymentPresentInputForm() {
    this.recordPaymentPresentInput.totalAmount =
      this.recordPaymentPresentInput.spaAmount +
      this.recordPaymentPresentInput.feeAmount +
      this.recordPaymentPresentInput.msfAmount;
    return this.recordPaymentPresentInput;
  }

  set recordPaymentPresentInputForm(
    value: Data.ClientFile.RecordPaymentPresentInput
  ) {
    this.recordPaymentPresentInput = value;
  }

  recordPaymentPresent() {
    this.recordPaymentPresentInput.clientFileId =
      this.clientFileBasicInfo.clientFileId;
    Action.ClientFile.RecordPaymentPresent.execute(
      this.recordPaymentPresentInput,
      (output) => {
        this.gotoClientFile();
        Snackbar.show({
          text: "Succesfully assigned",
          pos: "bottom-center",
        });
      }
    );
  }

  gotoClientFile() {
    Helper.Router.gotoClientFile({
      router: this.$router,
      clientFileId: this.clientFileId,
    });
  }

  gotoAction(paymentId: string) {
    this.$router.push({
      name: "Root.CFile.CFAction.CFActionList",
      params: {
        clientFileId: this.clientFileId,
      },
    });
  }
}
</script>

<style></style>
