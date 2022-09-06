<template>
    <div class="TaskAssignedToMe">
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
            <v-col class="col-7"></v-col>
            <v-col>
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
            </v-col>
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

@Component({

})
export default class ClientList extends Vue {
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
    {cid:"123",clientName:"Test1",clientEmail:"test1@test.com",clientMobile:"99999999"},
    {cid:"124",clientName:"Test2",clientEmail:"test2@test.com",clientMobile:"99999990"},
  ]

  mounted() {

  }
  
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