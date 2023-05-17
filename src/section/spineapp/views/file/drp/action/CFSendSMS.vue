<template>
  <!-- TASK TAB -->
  <div class="CFSendSMS">
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Send SMS</h4>
      <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-center col-12 ma-auto">
      <v-card
        class="pa-0 ma-0 mt-5 col-12"
        color="white"
        outlined
        min-height="300px"
      >
        <v-card-text>
          <v-autocomplete
            v-model="selectedRequestType"
            :items="requestTypeFlowMapList"
            flat
            hide-no-data
            hide-details
            label="Select SMS Template"
            outlined
            dense
            return-object
            item-text="value"
            item-value="key"
          ></v-autocomplete>
        </v-card-text>
        <v-card-text>
          <component
            v-if="!!selectedRequestType.contentMetaData"
            :ref="selectedRequestType.contentMetaData.myRefName"
            :is="selectedRequestType.contentMetaData.componentName"
            v-model="smsPayload"
            v-bind="selectedRequestType.contentMetaData.props"
          ></component>
        </v-card-text>
      </v-card>
    </div>
  </div>
  <!--  TASK TAB -->
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

import FForm from "@/components/generic/form/FForm.vue";
import Helper from "../../../../util/Helper";
import EMandateRegistrationSMSFFormMDP from "@/section/spineapp/components/task/sendSMS/EMandateRegistrationSMSFFormMDP";

@Component({
  components: {
    FForm,
    EMandateRegistrationSMSFFormMDP,
  },
})
export default class CFSendSMS extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfoStore: Data.ClientFile.ClientFileBasicInfo;
  selectedRequestType: any = {};

  sendSMSInputLocal: Data.ClientFile.SendSMSInput =
    new Data.ClientFile.SendSMSInput();

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  smsPayloadLocal: any = {};

  get smsPayload() {
    // EMandateRegistrationSMSInput
    if (
      this.selectedRequestType.key ===
      Data.ClientFile.SMS_TEMPLATE_TYPE.EMANDATE_REGISTRATION.id
    ) {
      this.smsPayloadLocal = new Data.ClientFile.EMandateRegistrationSMSInput();
    }
    return this.smsPayloadLocal;
  }

  get sendSMSInput() {
    // EMandateRegistrationSMSInput
    if (
      this.selectedRequestType.key ===
      Data.ClientFile.SMS_TEMPLATE_TYPE.EMANDATE_REGISTRATION.id
    ) {
      this.sendSMSInputLocal = new Data.ClientFile.SendSMSInput(
        this.clientFileBasicInfoStore.clientFileId,
        Data.ClientFile.SMS_TEMPLATE_TYPE.EMANDATE_REGISTRATION,
        JSON.stringify(this.smsPayload)
      );
    }
    return this.sendSMSInputLocal;
  }

  set sendSMSInput(value: any) {
    this.sendSMSInputLocal = value;
  }

  get requestTypeFlowMapList() {
    return [
      {
        key: Data.ClientFile.SMS_TEMPLATE_TYPE.EMANDATE_REGISTRATION.id,
        value: Data.ClientFile.SMS_TEMPLATE_TYPE.EMANDATE_REGISTRATION.name,
        contentMetaData: new EMandateRegistrationSMSFFormMDP({
          taskRoot: this,
          parent: this,
        }).getMetaData(),
      },
    ];
  }

  sendSMS() {
    Action.ClientFile.SendSMS.execute(this.sendSMSInput, (output) => {
      setTimeout(() => {
        this.gotoClientFile();
      }, 400);
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
}
</script>

<style>
.v-btn {
  text-transform: unset !important;
}
</style>
