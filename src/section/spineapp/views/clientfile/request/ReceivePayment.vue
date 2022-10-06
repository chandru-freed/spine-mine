<template>
  <div class="receivePayment">
    <component
      :ref="receivePaymentMetaData.myRefName"
      :is="receivePaymentMetaData.componentName"
      :value="selectModel(recordPaymentPresentInput, undefined)"
      @input="
        (newValue) =>
          updateModel(recordPaymentPresentInput, newValue, undefined)
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
import ReceivePaymentFFormMDP from "./ReceivePaymentFFormMDP";

@Component({
  components: {
    FForm,
  },
})
export default class ReceivePayment extends ModelVue {
  clientFileNumber = this.$route.params.clientFileNumber;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  recordPaymentPresentInput = new Data.ClientFile.RecordPaymentPresentInput();

  //METADATA
  get receivePaymentMetaData() {
    return new ReceivePaymentFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

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
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: this.clientFileNumber,
    });
  }
}
</script>

<style></style>
