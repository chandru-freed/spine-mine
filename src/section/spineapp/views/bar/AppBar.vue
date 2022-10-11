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
    <div class="mt-6 py-2">
      <FRemoteAutoCompleteField dense label="Search File" v-model="selectedClientFileNumber" placeholder="Type to search" outlined rounded queryUrl="spineapi/clientfile/search-client-file?clientFileNumberContains=" itemText="clientFileNumber" itemValue="clientFileNumber" :on-select="gotoFile"></FRemoteAutoCompleteField>
    </div>
    <!-- <v-btn icon @click="$router.push({name: 'Root.Request.CreateRequest'})"><v-icon>mdi-plus-box</v-icon></v-btn> -->
    <v-btn icon @click="$router.push({name: 'Root.CreateClient'})"><v-icon>mdi-account-plus</v-icon></v-btn>
    <v-btn icon @click="$router.push({name: 'Root.TaskList.AddTicket'})"><v-icon>mdi-ticket-confirmation</v-icon></v-btn>
    <app-bar-notification-menu />
    <app-bar-user-menu />
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import AppBarUserMenu from '@/components/AppBarUserMenu';
import AppBarNotificationMenu from '@/components/AppBarNotificationMenu';
import FRemoteAutoCompleteField from "@/components/generic/form/field/FRemoteAutoCompleteField"
import Helper from '../../util/Helper';

@Component({
  components: {
    AppBarUserMenu,
    AppBarNotificationMenu,
    FRemoteAutoCompleteField
  }
})
export default class AppBar extends Vue {
  selectedClientFileNumber: string = ""
  gotoFile(selectedVal: any) {
    console.log("selectedClientFileNumber - ", this.selectedClientFileNumber)
    Helper.Router.gotoFile({ router: this.$router,  clientFileNumber: this.selectedClientFileNumber})
    
    this.selectedClientFileNumber = ""

  }
}
</script>

<style scoped></style>
