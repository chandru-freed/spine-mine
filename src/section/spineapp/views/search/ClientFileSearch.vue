<template>
  <div>
    <v-card class="pa-0 ma-0" color="transparent">
      <component
        v-if="!!clientFileSearchFormMetaData"
        :ref="clientFileSearchFormMetaData.myRefName"
        :is="clientFileSearchFormMetaData.componentName"
        :value="selectModel(clientFileSearchForm, undefined)"
        @input="
          (newValue) => updateModel(clientFileSearchForm, newValue, undefined)
        "
        v-bind="clientFileSearchFormMetaData.props"
      ></component>
    </v-card>
    <!-- CLIENT FILE LIST -->
    <v-card class="pa-0 ma-0" color="transparent">
      <v-data-table
        :headers="clientGridHeaderList"
        :items="searchResultList"
        :search="search"
        class="elevation-0"
        item-key="clientId"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-col class="col-2"></v-col>
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
        <template v-slot:[`item.fullName`]="{ item }">
          <f-btn :label="item.fullName" text color="green" :onClick="()=>gotoClient(item.clientId)"></f-btn>
        </template>
        <template v-slot:[`item.clientFileNumber`]="{ item }">
          <f-btn
            :label="item.clientFileNumber"
            text
            color="secondary"
            :onClick="()=>gotoFile(item.clientFileNumber)"
            ></f-btn
          >
        </template>
      </v-data-table>
    </v-card>
    <!-- CLIENT FILE LIST  -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import moment from "moment";
import FForm from "@/components/generic/form/FForm.vue";

import ClientFileSearchFFormMDP from "./ClientFileSearchFFormMDP";
import ClientFileSearchIntf from "./ClientFileSearchIntf";
import ModelVue from "@/components/generic/ModelVue";
import Helper from "../../util/Helper";
import FBtn from "@/components/generic/FBtn.vue";

@Component({
  components: {
    FForm,
    "f-btn":FBtn
  },
})
export default class ClientFileSearch
  extends ModelVue
  implements ClientFileSearchIntf
{
  @Store.Getter.ClientFile.ClientFileSearchStore.searchCriteria
  searchCriteria: Data.ClientFile.SearchClientFileInput;

  @Store.Getter.ClientFile.ClientFileSearchStore.searchResultList
  searchResultList: Data.ClientFile.SearchClientFileOutput;

  search = "";
  clientGridHeaderList = [
    { text: "Client File Number", value: "clientFileNumber", align: "start" },
    { text: "Client Name", value: "fullName" },
    { text: "Mobile", value: "mobile" },
    { text: "E-mail", value: "emailId" },
    { text: "City", value: "city" },
    { text: "State", value: "state" },
  ];

  clientFileSearchFormLocal: any = new Data.ClientFile.SearchClientFileInput();

  get clientFileSearchForm() {
    this.clientFileSearchFormLocal = this.searchCriteria;
    return this.clientFileSearchFormLocal;
  }

  set clientFileSearchForm(value: any) {
    this.clientFileSearchFormLocal = value;
  }

  get clientFileSearchFormMetaData(): any {
    return new ClientFileSearchFFormMDP({ taskRoot: this }).getMetaData();
  }

  mounted() {
    this.searchClientFile();
  }

  searchClientFile() {
    Action.ClientFile.SearchClientFile.execute(
      this.clientFileSearchFormLocal,
      (output) => {
        console.log("Client search file uploaded successfully");
      }
    );
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
