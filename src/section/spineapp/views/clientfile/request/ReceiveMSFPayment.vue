<template>
  <div class="receiveMSFPayment">
    <component
      :ref="receiveMSFPaymentMetaData.myRefName"
      :is="receiveMSFPaymentMetaData.componentName"
      :value="selectModel(receiveMSFPaymentInput, undefined)"
      @input="
        (newValue) =>
          updateModel(receiveMSFPaymentInput, newValue, undefined)
      "
      v-bind="receiveMSFPaymentMetaData.props"
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
import ReceiveMSFPaymentFFormMDP from "./ReceiveMSFPaymentFFormMDP";

@Component({
  components: {
    FForm,
  },
})
export default class ReceiveMSFPayment extends ModelVue {
  clientFileNumber = this.$route.params.clientFileNumber;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  receiveMSFPaymentInput = new Data.ClientFile.ReceiveMSFPaymentInput();

  //METADATA
  get receiveMSFPaymentMetaData() {
    return new ReceiveMSFPaymentFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  receiveMSFPayment() {
    this.receiveMSFPaymentInput.clientFileId =
      this.clientFileBasicInfo.clientFileId;
    Action.ClientFile.ReceiveMSFPayment.execute(
      this.receiveMSFPaymentInput,
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
