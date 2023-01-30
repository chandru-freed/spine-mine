<template>
  <div class="RecordMSFPayment">
    <v-card flat>
      <div class="d-flex justify-space-between align-center mx-5">
        <h4>Record EMandate</h4>
        <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </div>
      <component
        v-if="!!cfAddEmandateFFormMetaData"
        :ref="cfAddEmandateFFormMetaData.myRefName"
        :is="cfAddEmandateFFormMetaData.componentName"
        :value="selectModel(addEmandateInput, undefined)"
        @input="
          (newValue) => updateModel(addEmandateInput, newValue, undefined)
        "
        v-bind="cfAddEmandateFFormMetaData.props"
      ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import CFAddEmandateFFormMDP from "./CFAddEmandateFFormMDP";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";

@Component({
  components: {
    FForm,
  },
})
export default class RecordMSFPayment extends ModelVue {
  addEmandateInput: Data.ClientFile.AddEMandateInput =
    new Data.ClientFile.AddEMandateInput();
  get cfAddEmandateFFormMetaData() {
    return new CFAddEmandateFFormMDP({
      parent: this,
    }).getMetaData();
  }
  // META DATA

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  gotoAction(paymentId: string) {
    this.$router.push({
      name: "Root.CFile.CFAction.CFActionList",
      params: {
        clientFileId: this.clientFileId,
      },
    });
  }

  gotoCFEMandate() {
    this.$router.push({
      name: "Root.CFile.CFPayment.CFEMandateList",
      params: {
        clientFileId: this.clientFileId,
      },
    });
  }
  populateBankDetails(details: any) {
    if (this.addEmandateInput.bankAddress) {
      this.addEmandateInput.bankAddress.addressLine1 = details.ADDRESS;
      this.addEmandateInput.bankAddress.city = details.CITY;
      this.addEmandateInput.bankAddress.state = details.STATE;
      this.addEmandateInput.bankAddress.country = "India";
    }
  }
}
</script>

<style>
</style>
