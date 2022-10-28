<template>
  <v-app-bar flat dense class="grey lighten-2">
    <v-avatar
      @click="$router.push({ name: 'Root.Home' })"
      size="30"
      class="ma-2"
    >
      <v-img src="@/assets/freed-small-logo.svg" size="30" />
    </v-avatar>
    <v-btn text @click="$router.push({ name: 'Root.MyClientFiles' })">
      <v-icon small class="pr-1">mdi-file-account</v-icon>
      My Files
    </v-btn>
    <v-btn
      text
      @click="$router.push({ name: 'Root.TaskList.TaskAssignedToMe' })"
    >
      <v-icon small class="pr-1">mdi-checkbox-marked-circle-outline</v-icon>
      My Tasks
    </v-btn>
    <v-btn
      text
      @click="$router.push({ name: 'Root.MyTicket.ActiveTicketList' })"
    >
      <v-icon small class="pr-1">mdi-ticket-confirmation</v-icon>
      My Tickets
    </v-btn>
    <!-- <v-btn outlined small class="ml-3"  @click="$router.push({name: 'Root.MyTicket.ActiveTicketList'})">
      <v-icon small class="pr-1">mdi-plus-circle</v-icon>
      Create
    </v-btn>   -->
    <v-menu bottom close-on-click offset-y min-width="130">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          small
          class="elevation-0 ml-3"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon small class="pr-1">mdi-plus-circle</v-icon>
          Create
        </v-btn>
      </template>

      <v-list dense>
        <v-list-item @click="goto('Root.CreateClient')">
          <v-list-item-title>
            <v-icon small class="me-2">mdi-account-plus</v-icon>
            Client
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="goto('Root.MyTicket.AddTicket')">
          <v-list-item-title>
            <v-icon small class="me-2">mdi-ticket-confirmation</v-icon>
            Ticket
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <!-- <div class="mt-6 py-2">
      <v-text-field
        flat
        placeholder="Quick Search"
        outlined
        rounded
        dense
        append-icon="mdi-magnify"
      ></v-text-field>
    </div> -->
    <template v-if="showSearch">
      <div class="mt-6 py-2">
        <FClientFileAutoCompleteField
          dense
          v-model="selectedClientFileNumber"
          placeholder="Type to Search File"
          queryUrl="spineapi/clientfile/search-client-file?clientFileNumberContains="
          itemText="clientFileNumber"
          itemValue="clientFileNumber"
          :on-select="gotoFile"
        ></FClientFileAutoCompleteField>
      </div>
      <v-btn icon @click="$router.push({ name: 'Root.Search.ClientSearch' })"
        ><v-icon>mdi-magnify</v-icon></v-btn
      >
    </template>
    <!-- <v-spacer></v-spacer> -->
    <!-- <v-btn icon @click="$router.push({name: 'Root.Request.CreateRequest'})"><v-icon>mdi-plus-box</v-icon></v-btn> -->
    <!-- <v-btn icon @click="$router.push({name: 'Root.CreateClient'})"><v-icon>mdi-account-plus</v-icon></v-btn> -->
    <!-- <v-btn icon @click="$router.push({name: 'Root.MyTicket.AddTicket'})"><v-icon>mdi-ticket-confirmation</v-icon></v-btn> -->
    <app-bar-notification-menu />
    <app-bar-user-menu />
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import AppBarUserMenu from "@/components/AppBarUserMenu";
import AppBarNotificationMenu from "@/components/AppBarNotificationMenu";
import FClientFileAutoCompleteField from "@/components/generic/form/field/FClientFileAutoCompleteField";
import Helper from "../../util/Helper";
import store, * as Store from "@/../src-gen/store";

@Component({
  components: {
    AppBarUserMenu,
    AppBarNotificationMenu,
    FClientFileAutoCompleteField,
  },
})
export default class AppBar extends Vue {
  @Store.Getter.Login.LoginDetails.roleList
  roleList: string[];

  selectedClientFileNumber: string = "";
  gotoFile(selectedVal: any) {
    console.log("selectedClientFileNumber - ", this.selectedClientFileNumber);
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: this.selectedClientFileNumber,
    });

    this.selectedClientFileNumber = "";
  }

  get showSearch() {
    return !this.roleList.includes("SalesRep");
  }

  goto(routerName: string) {
    this.$router.push({ name: routerName });
  }
}
</script>

<style scoped></style>
