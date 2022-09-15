<template>
  <div>
    <v-card class="pa-0 ma-0" color="transparent">
      <component
        v-if="!!clientSearchFormMetaData"
        :ref="clientSearchFormMetaData.myRefName"
        :is="clientSearchFormMetaData.componentName"
        :value="selectModel(clientSearchForm, undefined)"
        @input="
          (newValue) => updateModel(clientSearchForm, newValue, undefined)
        "
        v-bind="clientSearchFormMetaData.props"
      ></component>
    </v-card>
    <!-- CLIENT LIST -->
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
         <template v-slot:item.fullName="{ item }">
           <v-btn text color="green"  @click="gotoClient(item.clientId)">{{ item.fullName }}</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <!-- CLIENT LIST  -->
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
import FForm from "@/components/generic/form/FForm.vue";

import ClientSearchIntf from "./ClientSearchIntf";
import ModelVue from "@/components/generic/ModelVue";

@Component({
  components: {
    FForm,
  },
})
export default class ClientSearch extends ModelVue implements ClientSearchIntf {
  @Store.Getter.Client.ClientSearchStore.searchCriteria
  searchCriteria: Data.Client.SearchClientInput;

  @Store.Getter.Client.ClientSearchStore.searchResultList
  searchResultList: Data.Client.SearchClientOutput;

  clientGridHeaderList = [
    { text: "Client Name", value: "fullName" },
    { text: "E-mail", value: "emailId" },
    { text: "Mobile", value: "mobile" },
    { text: "City", value: "city" },
    { text: "State", value: "state" },
  ];

  search = "";

  clientSearchFormLocal: any = new Data.Client.SearchClientInput();

  get clientSearchForm() {
    this.clientSearchFormLocal = this.searchCriteria;
    return this.clientSearchFormLocal;
  }

  set clientSearchForm(value: any) {
    this.clientSearchFormLocal = value;
  }

  get clientSearchFormMetaData(): any {
    return new ClientSearchFFormMDP({ taskRoot: this }).getMetaData();
  }

  searchClient() {
    Action.Client.SearchClient.execute(
      this.clientSearchFormLocal,
      (output) => {
        console.log("Client search uploaded successfully");
      }
    );
  }

    gotoClient(clientId: string) {
      this.$router.push({name: "Root.Client.ClientDetails", params: {clientId: clientId}})
    }
}
</script>
