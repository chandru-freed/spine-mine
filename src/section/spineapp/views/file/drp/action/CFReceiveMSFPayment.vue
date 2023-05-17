<template>
  <div class="CFReceiveMSFPayment">
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Receive MSF Payment</h4>
      <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-center col-6 ma-auto">
      <component
        :ref="receiveMSFPaymentMetaData.myRefName"
        :is="receiveMSFPaymentMetaData.componentName"
        :value="selectModel(receiveMSFPaymentInput, undefined)"
        @input="
          (newValue) => updateModel(receiveMSFPaymentInput, newValue, undefined)
        "
        v-bind="receiveMSFPaymentMetaData.props"
      ></component>
    </div>
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
import CFReceiveMSFPaymentFFormMDP from "./CFReceiveMSFPaymentFFormMDP";

@Component({
  components: {
    FForm,
  },
})
export default class CFReceiveMSFPayment extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  // receiveMSFPaymentInput = new Data.ClientFile.ReceiveMSFPaymentInput();

  get clientFileId() {
    return this.$route.params.clientFileId;
  }
  //METADATA
  get receiveMSFPaymentMetaData() {
    return new CFReceiveMSFPaymentFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  receiveMSFPayment() {
    // this.receiveMSFPaymentInput.clientFileId =
    //   this.clientFileBasicInfo.clientFileId;
    // Action.ClientFile.ReceiveMSFPayment.execute(
    //   this.receiveMSFPaymentInput,
    //   (output) => {
    //     this.gotoPaymentDetail(output.paymentId);
    //     Snackbar.show({
    //       text: "Succesfully assigned",
    //       pos: "bottom-center",
    //     });
    //   }
    // );
  }

  gotoPaymentDetail(paymentId: string) {
    this.$router.push({
      name: "Root.CFile.CFPayment.CFPaymentDetails",
      params: {
        clientFileId: this.clientFileId,
        paymentId: paymentId,
      },
    });
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
  
  goBack() {
    this.$router.go(-1);
  }
}
</script>

<style></style>
