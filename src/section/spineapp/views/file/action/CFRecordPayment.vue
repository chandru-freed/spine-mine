<template>
  <div class="CFRecordPayment">
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Record Payment</h4>
      <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>
    <component
      :ref="recordPaymentMetaData.myRefName"
      :is="recordPaymentMetaData.componentName"
      :value="selectModel(recordSettledPaymentInputForm, undefined)"
      @input="
        (newValue) =>
          updateModel(recordSettledPaymentInputForm, newValue, undefined)
      "
      v-bind="recordPaymentMetaData.props"
    ></component>
    <!-- {{ recordSettledPaymentInput }}
    {{ totalAmount }} -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FForm from "@/components/generic/form/FForm.vue";
import Helper from "@/section/spineapp/util/Helper";
import ModelVue from "@/components/generic/ModelVue";
import CFRecordPaymentFFormMDP from "./CFRecordPaymentFFormMDP";

@Component({
  components: {
    FForm,
  },
})
export default class CFRecordPayment extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  recordSettledPaymentInput = new Data.ClientFile.RecordSettledPaymentInput();

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  //METADATA
  get recordPaymentMetaData() {
    return new CFRecordPaymentFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  get recordSettledPaymentInputForm() {
    this.recordSettledPaymentInput.totalAmount =
      this.recordSettledPaymentInput.spaAmount +
      this.recordSettledPaymentInput.feeAmount +
      this.recordSettledPaymentInput.msfAmount;
    return this.recordSettledPaymentInput;
  }

  set recordSettledPaymentInputForm(
    value: Data.ClientFile.RecordSettledPaymentInput
  ) {
    this.recordSettledPaymentInput = value;
  }

  recordSettledPayment() {
    this.recordSettledPaymentInput.clientFileId =
      this.clientFileBasicInfo.clientFileId;
    Action.ClientFile.RecordSettledPayment.execute(
      this.recordSettledPaymentInput,
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
