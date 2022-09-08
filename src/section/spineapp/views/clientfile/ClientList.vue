<template>
  <div class="TaskAssignedToMe">
    <v-card-text>
      {{clientSearchFormData}}
      <component
        v-if="!!clientSearchFormMetaData"
        :ref="clientSearchFormMetaData.myRefName"
        :is="clientSearchFormMetaData.componentName"
        v-model="clientSearchFormData"
        v-bind="clientSearchFormMetaData.props"
      ></component>
    </v-card-text>
    <!-- TASK TAB -->
    <v-card class="pa-0 ma-0" color="transparent">
      <v-data-table
        :headers="clientGridHeaderList"
        :items="clientList"
        sort-by="calories"
        class="elevation-0"
        :search="search"
        v-model="selected"
        :single-select="false"
        show-select
        item-key="cid"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-col class="col-2">
              <v-select
                :disabled="selected.length === 0"
                :items="['Delete', 'Edit', 'Send']"
                label="Bulk Actions"
                single-line
                hide-details
                outlined
                rounded
                dense
              ></v-select>
            </v-col>
            <v-col class="col-7"> </v-col>
            <!-- <v-col>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search Item"
                single-line
                hide-details
                outlined
                rounded
                dense
                class="shrink"
              ></v-text-field>
            </v-col> -->
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
    <!--  TASK TAB -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import moment from "moment";
import ClientSearchFFormMDP from "./ClientSearchFFormMDP";
import CreateClientIntf from "../client/ClientDetailsIntf";
import FForm from "@/components/generic/form/FForm.vue";
import * as RemoteApiPoint from "@/remote-api-point";

@Component({
  components: {
    FForm,
  },
})
export default class ClientList extends Vue implements CreateClientIntf {
  tab = 0;

  selected = [];
  search = "";

  clientGridHeaderList = [
    { text: "Client Id", value: "cid", align: "start" },
    { text: "Name", value: "clientName", align: "start" },
    { text: "E-mail", value: "clientEmail", align: "start" },
    { text: "Mobile", value: "clientMobile" },
    { text: "", value: "action", sortable: false },
  ];

  clientList = [
    {
      cid: "123",
      clientName: "Test1",
      clientEmail: "test1@test.com",
      clientMobile: "99999999",
    },
    {
      cid: "124",
      clientName: "Test2",
      clientEmail: "test2@test.com",
      clientMobile: "99999990",
    },
  ];

  mounted() {}

  // clientSearchFormData: any = new Data.Client.SearchClient()
clientSearchFormData: any = {}
  get clientSearchFormMetaData(): any {
    return new ClientSearchFFormMDP({ root: this }).getMetaData();
  }

  addClientFile: () => void;


  // searchClient() {
  //   Action.Client.SearchClient.execute(
  //     this.searchDataList,
  //     (output) => {
  //       console.log("document uploaded successfully");
  //     },
  //     (err) => {
  //       console.error(err);
  //     },
  //     RemoteApiPoint.SpineApi
  //   );
  // }

  gotoFile(item: any) {
    this.$router.push({
      name: "Root.ClientFile.ClientFileDetails",
      params: { fileId: item.cid },
    });
  }

  gotoTask(item: any) {
    this.$router.push({
      name: "Root.ClientFile.FileTask.FileTaskDetails",
      params: { fileId: item.cid, taskId: item.taskId },
    });
  }
}
</script>
