<template>
  <div>
    
    

    <v-card flat outlined>
      
        <div class="row px-2 pt-2 pb-4 align-center justify-between">
          <div class="col-4  pb-0">
            <v-list-item>
              <v-list-item-avatar tile size="80" color="primary">
                <v-icon size="40" color="secondary">mdi-account-circle</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="text-overline">{{
                  clientDetails.emailId
                }}</v-list-item-title>
                <v-list-item-title class="text-h5">{{
                  clientDetails.firstName
                }} {{
                  clientDetails.lastName
                }}</v-list-item-title>

                <v-list-item-subtitle
                  class="text-h6"
                  v-text="clientDetails.mobile"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
      
      <v-card-actions>
        <v-btn class="mx-3" color="secondary" outlined x-large @click="gotoFile(clientFile.clientFileId)" v-for="clientFile in clientDetails.clientFileList" :key="clientFile.clientFileId">
          <v-icon class="pr-4">mdi-file-account</v-icon>
          {{clientFile.clientFileNumber}}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="mx-3" color="primary" outlined large @click="addClientFile()">
          <v-icon class="pr-4">mdi-file-document-plus-outline</v-icon>
          Add Client File
        </v-btn>
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
    const input = new Data.ClientFile.AddClientFileForm(this.clientId,  "KFS-100-9004")
    Action.ClientFile.AddClientFile.execute(input, output => {
      setTimeout(this.getClientDetails, 1000)
    }, err => {}, RemoteApiPoint.SpineApi)
  }

  gotoFile(clientFileId: string) {
    Helper.Router.gotoFile({router: this.$router, fileId: clientFileId})
  }
}
</script>