<template>
  <div>
    <v-card flat outlined>
      <div class="row px-2 pt-2 pb-4 align-center justify-between">
        <div class="col-4 pb-0">
          <v-list-item>
            <v-list-item-avatar tile size="80">
              <v-icon size="40" color="deep-purple">mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-overline">{{
                clientBasicInfo.emailId
              }}</v-list-item-title>
              <v-list-item-title class="text-h5 deep-purple--text overline"
                >{{ clientBasicInfo.firstName }}
                {{ clientBasicInfo.lastName }}</v-list-item-title
              >

              <v-list-item-subtitle class="text-h6">{{
                clientBasicInfo.mobile | phone
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          class="mx-3"
          color="secondary"
          outlined
          large
          @click="gotoFile(clientFileBasicInfo.clientFileNumber)"
          v-for="clientFileBasicInfo in clientFileBasicInfoList"
          :key="clientFileBasicInfo.clientFileId"
        >
          <v-icon size="30" class="pr-4">mdi-file-account</v-icon>
          {{ clientFileBasicInfo.clientFileNumber }}
          <v-chip x-small class="mx-2">{{
            clientFileBasicInfo.clientFileStatus.name
          }}</v-chip>
        </v-btn>
        <v-spacer></v-spacer>
        <!-- <v-btn
          class="mx-3"
          color="primary"
          outlined
          large
          @click="addClientFile()"
        >
          <v-icon class="pr-4">mdi-file-document-plus-outline</v-icon>
          Add File to Client
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

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

  clientBasicInfo: Data.Client.ClientBasicInfo =
    new Data.Client.ClientBasicInfo();
  clientFileBasicInfoList: Data.Client.ClientFileBasicInfo[] = [];

  get clientBasicInfoFormMetaData(): any {
    return new ClientDetailsFFormMDP({ root: this }).getMetaData();
  }

  mounted() {
    this.getClientBasicInfo();
    this.getClientFileBasicInfoList();
  }

  getClientBasicInfo() {
    Action.Client.GetClientBasicInfo.execute1(this.clientId, (output) => {
      this.clientBasicInfo = output;
    });
  }

  getClientFileBasicInfoList() {
    Action.Client.GetClientFileBasicInfoList.execute1(
      this.clientId,
      (output) => {
        this.clientFileBasicInfoList = output;
      }
    );
  }

  addClientFile() {
    Action.ClientFile.AddClientFileToMyQ.execute1(this.clientId, (output) => {
      setTimeout(() => {
        this.gotoFile(output.clientFileNumber);
      }, 1000);
    });
  }

  getClientFileBasicInfo(clientFileId: string) {
    Action.ClientFile.GetClientFileBasicInfo.execute1(
      clientFileId,
      (output) => {
        this.gotoFile(output.clientFileNumber);
      }
    );
  }

  gotoFile(clientFileNumber: string) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: clientFileNumber,
    });
  }
}
</script>