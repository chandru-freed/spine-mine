<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    absolute
  >
    
    <v-toolbar
      flat  
      @click="mini = !mini"
    >
      <v-icon color="secondary">
        mdi-file-account
      </v-icon>

      <v-btn small text class="font-weight-bold secondary--text text-body-1">{{clientFileBasicInfo.clientFileNumber}} </v-btn>

      <v-spacer></v-spacer>

    </v-toolbar>

    <v-list>
     <template  v-for="item in items">
      <v-list-group
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
        @click="goto(item.routerName)"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          @click="goto(child.routerName)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
     </template>
     
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
@Component({})
export default class CFLeftNav extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: Data.ClientFile.FileSummary;


  items= [
        {
          action: 'mdi-file-account',
          routerName: "Root.CFile.CFInfo.CFPersonalInfo",
          items: [
            { title: 'Personal', routerName: 'Root.CFile.CFInfo.CFPersonalInfo' },
            { title: 'Creditor', routerName: 'Root.CFile.CFInfo.CFCreditorInfo' },
            { title: 'Budget', routerName: 'Root.CFile.CFInfo.CFBudgetInfo' },
            { title: 'Payment Plan', routerName: 'Root.CFile.CFInfo.CFPaymentPlanInfo' },
            { title: 'Bank', routerName: 'Root.CFile.CFInfo.CFBankInfo' },
            { title: 'Document', routerName: 'Root.CFile.CFInfo.CFDocumentInfo' },
            { title: 'Payment', routerName: 'Root.CFile.CFInfo.CFPaymentInfo' },
            { title: 'Transaction', routerName: 'Root.CFile.CFInfo.CFTransactionInfo' }
          ],
          title: 'File',
        },
        {
          action: 'mdi-checkbox-marked-circle-outline',
          routerName: "Root.CFile.CFTask.CFActiveTasks",
          items: [
            { title: 'Active', routerName: "Root.CFile.CFTask.CFActiveTasks"},
            { title: 'Completed', routerName: "Root.CFile.CFTask.CFCompletedTasks" },
          ],
          title: 'Task',
        },
        {
          action: 'mdi-ticket-confirmation',
          routerName: "Root.CFile.CFTicket.CFActiveTickets",
          items: [
            { title: 'Active', routerName: "Root.CFile.CFTicket.CFActiveTickets" },
            { title: 'Completed', routerName: "Root.CFile.CFTicket.CFCompletedTickets" },
            { title: 'Add', routerName: "Root.CFile.CFTicket.CFAddTickets" },
          ],
          title: 'Ticket',
        },
        {
          action: 'mdi-comment-text',
          routerName: "Root.CFile.CFNotes",
          items: [
            { title: 'List' },
            { title: 'Add' },
          ],
          title: 'Notes',
        },
        {
          action: 'mdi-star',
          routerName: "Root.CFile.CFHighlights",
          items: [{ title: 'List Item' }],
          title: 'Highlights',
        },
        {
          action: 'mdi-gesture-double-tap',
          routerName: "Root.CFile.CFAction.CFActionList",
          items: [{ title: 'List Item' }],
          title: 'Actions',
        }
      ]


  public drawer = true;
  public mini = true;



  goto(routerName: string) {
    console.log("I am in goto", routerName);
    this.$router.push({ name: routerName })
  }
}
</script>
<style scoped>
.v-application .primary--text {
  color: #f56f07 !important;
  caret-color: #f56f07 !important;
}
</style>
