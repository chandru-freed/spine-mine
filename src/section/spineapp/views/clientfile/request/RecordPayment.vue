<template>
  <div class="RecordPayment">
    <component
      :ref="recordPaymentMetaData.myRefName"
      :is="recordPaymentMetaData.componentName"
      :value="selectModel(recordSettledPaymentInput, undefined)"
      @input="
        (newValue) =>
          updateModel(recordSettledPaymentInput, newValue, undefined)
      "
      v-bind="recordPaymentMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import RecordPaymentFFormMDP from "./RecordPaymentFFormMDP";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import Helper from "@/section/spineapp/util/Helper";

@Component({
  components: {
    FForm,
  },
})
export default class RecordPayment extends ModelVue {
  clientFileNumber = this.$route.params.clientFileNumber;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  recordSettledPaymentInput = new Data.ClientFile.RecordSettledPaymentInput();

  //METADATA
  get recordPaymentMetaData() {
    return new RecordPaymentFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

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
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: this.clientFileNumber,
    });
  }
}
</script>

<style></style>
