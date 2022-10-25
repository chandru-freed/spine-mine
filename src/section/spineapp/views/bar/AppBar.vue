<template>
  <v-app-bar  flat dense  class="grey lighten-2"  >
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
      <div class=" mt-6 py-2">
        <FClientFileAutoCompleteField  dense  v-model="selectedClientFileNumber" placeholder="Type to Search File"  queryUrl="spineapi/clientfile/search-client-file?clientFileNumberContains=" itemText="clientFileNumber" itemValue="clientFileNumber" :on-select="gotoFile"></FClientFileAutoCompleteField>
      </div>
      <v-btn icon @click="$router.push({name: 'Root.Search.ClientSearch'})"><v-icon>mdi-magnify</v-icon></v-btn>
    </template>
    <!-- <v-spacer></v-spacer> -->
    <!-- <v-btn icon @click="$router.push({name: 'Root.Request.CreateRequest'})"><v-icon>mdi-plus-box</v-icon></v-btn> -->
    <v-btn icon @click="$router.push({name: 'Root.CreateClient'})"><v-icon>mdi-account-plus</v-icon></v-btn>
    <v-btn icon @click="$router.push({name: 'Root.MyTicket.AddTicket'})"><v-icon>mdi-ticket-confirmation</v-icon></v-btn>
    <app-bar-notification-menu />
    <app-bar-user-menu />
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import AppBarUserMenu from '@/components/AppBarUserMenu';
import AppBarNotificationMenu from '@/components/AppBarNotificationMenu';
import FClientFileAutoCompleteField from "@/components/generic/form/field/FClientFileAutoCompleteField"
import Helper from '../../util/Helper';
import store, * as Store from "@/../src-gen/store";

@Component({
  components: {
    AppBarUserMenu,
    AppBarNotificationMenu,
    FClientFileAutoCompleteField
  }
})
export default class AppBar extends Vue {
  @Store.Getter.Login.LoginDetails.roleList
  roleList: string[]; 


  selectedClientFileNumber: string = ""
  gotoFile(selectedVal: any) {
    console.log("selectedClientFileNumber - ", this.selectedClientFileNumber)
    Helper.Router.gotoFile({ router: this.$router,  clientFileNumber: this.selectedClientFileNumber})
    
    this.selectedClientFileNumber = ""

  }

  get showSearch() {
    return !(this.roleList.includes("SalesRep"))
  }
}
</script>

<style scoped></style>
