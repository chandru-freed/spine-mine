<template>
  <div class="CFSendEmail">
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Send Email</h4>
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
            label="Select Email Template"
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
            v-model="emailPayload"
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
import GenericEmailPayloadFFormMDP from "@/section/spineapp/components/task/sendEmailNotification/GenericEmailPayloadFFormMDP";
import FirstMSFCollectionEmailPayloadFFormMDP from "@/section/spineapp/components/task/sendEmailNotification/FirstMSFCollectionEmailPayloadFFormMDP";

@Component({
  components: {
    FForm,
    GenericEmailPayloadFFormMDP,
    FirstMSFCollectionEmailPayloadFFormMDP,
  },
})
export default class CFSendEmail extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfoStore: Data.ClientFile.ClientFileBasicInfo;
  selectedRequestType: any = {};

  sendEmailInputLocal: Data.ClientFile.SendEmailInput =
    new Data.ClientFile.SendEmailInput();

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  emailPayloadLocal: any = {};

  get emailPayload() {
    // GENERIC
    if (
      this.selectedRequestType.key ===
      Data.ClientFile.EMAIL_TEMPLATE_TYPE.GENERIC.id
    ) {
      this.emailPayloadLocal = new Data.ClientFile.GenericEmailPayloadInput();
    }
    // FIRST_MSF_COLLECTION
    if (
      this.selectedRequestType.key ===
      Data.ClientFile.EMAIL_TEMPLATE_TYPE.FIRST_MSF_COLLECTION.id
    ) {
      this.emailPayloadLocal =
        new Data.ClientFile.FirstMSFCollectionEmailPayloadInput();
    }
    return this.emailPayloadLocal;
  }

  get sendEmailInput() {
    // GENERIC
    if (
      this.selectedRequestType.key ===
      Data.ClientFile.EMAIL_TEMPLATE_TYPE.GENERIC.id
    ) {
      this.sendEmailInputLocal = new Data.ClientFile.SendEmailInput(
        this.clientFileBasicInfoStore.clientFileId,
        Data.ClientFile.EMAIL_TEMPLATE_TYPE.GENERIC,
        JSON.stringify(this.emailPayload)
      );
    }
    // FIRST_MSF_COLLECTION
    if (
      this.selectedRequestType.key ===
      Data.ClientFile.EMAIL_TEMPLATE_TYPE.FIRST_MSF_COLLECTION.id
    ) {
      this.sendEmailInputLocal = new Data.ClientFile.SendEmailInput(
        this.clientFileBasicInfoStore.clientFileId,
        Data.ClientFile.EMAIL_TEMPLATE_TYPE.FIRST_MSF_COLLECTION,
        JSON.stringify(this.emailPayload)
      );
    }
    return this.sendEmailInputLocal;
  }

  set sendEmailInput(value: any) {
    this.sendEmailInputLocal = value;
  }

  get requestTypeFlowMapList() {
    return [
      {
        key: Data.ClientFile.EMAIL_TEMPLATE_TYPE.GENERIC.id,
        value: Data.ClientFile.EMAIL_TEMPLATE_TYPE.GENERIC.name,
        contentMetaData: new GenericEmailPayloadFFormMDP({
          taskRoot: this,
          parent: this,
        }).getMetaData(),
      },
      {
        key: Data.ClientFile.EMAIL_TEMPLATE_TYPE.FIRST_MSF_COLLECTION.id,
        value: Data.ClientFile.EMAIL_TEMPLATE_TYPE.FIRST_MSF_COLLECTION.name,
        contentMetaData: new FirstMSFCollectionEmailPayloadFFormMDP({
          taskRoot: this,
          parent: this,
        }).getMetaData(),
      },
    ];
  }

  SendEmail() {
    Action.ClientFile.SendEmail.execute(this.sendEmailInput, (output) => {
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
