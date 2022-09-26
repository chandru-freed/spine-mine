<template>
  <v-card class="pa-0 ma-0" color="transparent">
      <v-data-table
        :headers="myClientFileListGridHeaderList"
        :items="myClientFileList"
        :search="search"
        class="elevation-0"
        item-key="clientId"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-card-title>My Client Files</v-card-title>
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
        <template v-slot:item.fullName="{ item }">
          <v-btn text color="green" @click="gotoClient(item.clientId)">{{
            item.fullName
          }}</v-btn>
        </template>
        
         <template v-slot:item.clientFileNumber="{ item }">
          <v-btn
            text
            color="secondary"
            @click="gotoFile(item.clientFileNumber)"
            >{{ item.clientFileNumber }}</v-btn
          >
        </template>
      </v-data-table>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from '@/../src-gen/store';
import * as Data from '@/../src-gen/data';
import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';
import Helper from "../../util/Helper";

@Component({
  components: {
  },
})
export default class MyClientFiles extends Vue {
  myClientFileListGridHeaderList = [
    { text: "Client File Number", value: "clientFileNumber", align: "start" },
    { text: "Client Name", value: "fullName" },
    { text: "Mobile", value: "mobile" },
    { text: "E-mail", value: "emailId" },
    { text: "City", value: "city" },
    { text: "State", value: "state" },
  ];
  myClientFileList: Data.ClientFile.MyClientFile[] = [];
  search: string = '';

  mounted() {
    this.getMyClientFileList();
  }

  getMyClientFileList() {
    Action.ClientFile.GetMyClientFileList.execute(output => {
      this.myClientFileList = output;
    })
  }
  
  gotoFile(clientFileNumber: string) {
      Helper.Router.gotoFile({
        router: this.$router,
        clientFileNumber: clientFileNumber,
      });
  }


  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }
}
</script>

<style></style>
