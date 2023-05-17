<template>
  <div class="CFSendWhatsapp">
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Send Whatsapp</h4>
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
            label="Select Whatsapp Template"
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
            v-model="whatsappPayload"
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
import EMandateRegistrationWhatsappFFormMDP from "@/section/spineapp/components/task/sendWhatsapp/EMandateRegistrationWhatsappFFormMDP";

@Component({
  components: {
    FForm,
    EMandateRegistrationWhatsappFFormMDP,
  },
})
export default class CFSendWhatsapp extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfoStore: Data.ClientFile.ClientFileBasicInfo;
  selectedRequestType: any = {};
  // whatsapp
  sendWhatsappInputLocal: Data.ClientFile.SendWhatsappInput =
    new Data.ClientFile.SendWhatsappInput();

  whatsappPayloadLocal: any = {};

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  get whatsappPayload() {
    // EMandateRegistrationWhatsappInput
    if (
      this.selectedRequestType.key ===
      Data.ClientFile.WHATSAPP_TEMPLATE_TYPE.EMANDATE_REGISTRATION.id
    ) {
      this.whatsappPayloadLocal =
        new Data.ClientFile.EMandateRegistrationWhatsappInput();
    }
    return this.whatsappPayloadLocal;
  }

  get sendWhatsappInput() {
    if (
      this.selectedRequestType.key ===
      Data.ClientFile.WHATSAPP_TEMPLATE_TYPE.EMANDATE_REGISTRATION.id
    ) {
      this.sendWhatsappInputLocal = new Data.ClientFile.SendWhatsappInput(
        this.clientFileBasicInfoStore.clientFileId,
        Data.ClientFile.WHATSAPP_TEMPLATE_TYPE.EMANDATE_REGISTRATION,
        JSON.stringify(this.whatsappPayload)
      );
    }
    return this.sendWhatsappInputLocal;
  }

  set sendWhatsappInput(value: any) {
    this.sendWhatsappInputLocal = value;
  }

  get requestTypeFlowMapList() {
    return [
      {
        key: Data.ClientFile.WHATSAPP_TEMPLATE_TYPE.EMANDATE_REGISTRATION.id,
        value:
          Data.ClientFile.WHATSAPP_TEMPLATE_TYPE.EMANDATE_REGISTRATION.name,
        contentMetaData: new EMandateRegistrationWhatsappFFormMDP({
          taskRoot: this,
          parent: this,
        }).getMetaData(),
      },
    ];
  }

  sendWhatsapp() {
    Action.ClientFile.SendWhatsapp.execute(this.sendWhatsappInput, (output) => {
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
