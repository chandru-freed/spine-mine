<template>
  <div>
    <v-card flat outlined>
      <v-card-text>
        <component
          v-if="!!clientDetailsFormMetaData"
          :ref="clientDetailsFormMetaData.myRefName"
          :is="clientDetailsFormMetaData.componentName"
          v-model="clientDetails"
          v-bind="clientDetailsFormMetaData.props"
        ></component>
      </v-card-text>
    </v-card>
    <v-card flat outlined class="mt-3">
      <v-card-text>
        <v-btn color="secondary" outlined x-large @click="gotoFile(clientFileId)" v-for="clientFileId in clientDetails.clientFileIdList" :key="clientFileId">
          <v-icon class="pr-4">mdi-file-account</v-icon>
          {{clientFileId}}
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";
import FForm from "@/components/generic/form/FForm.vue";
import ClientDetailsFFormMDP from "./ClientDetailsFFormMDP";
import Flow from "@/section/spineapp/util/Flow";
import ClientDetailsIntf from "./ClientDetailsIntf";
import Helper from "../../util/Helper";

@Component({
  components: {
    FForm,
  },
})
export default class ClientDetails extends Vue implements ClientDetailsIntf {
  selectedRequestType: any = {};

  clientId = this.$route.params.clientId;

  clientDetails: any = new Data.Client.ClientDetails();

  get clientDetailsFormMetaData(): any {
    return new ClientDetailsFFormMDP({ root: this }).getMetaData();
  }

  mounted() {
    this.getClientDetails();
  }

  getClientDetails() {
    Action.Client.GetClientDetails.execute1(
      this.clientId,
      (output) => {
        this.clientDetails = output;
      },
      (err) => {},
      RemoteApiPoint.SpineApi
    );
  }

  addClientFile() {
    Action.Client.AddFileForClient.execute2(this.clientId, "F-XYZ", output => {}, err => {}, RemoteApiPoint.SpineApi)
  }

  gotoFile(clientFileId: string) {
    Helper.Router.gotoFile({router: this.$router, fileId: clientFileId})
  }
}
</script>