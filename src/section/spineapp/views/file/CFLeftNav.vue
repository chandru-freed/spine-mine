<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    absolute
    expand-on-hover
  >
    <!-- <v-toolbar
      flat  
      @click="mini = !mini"
    >
      <v-icon color="secondary">
        mdi-file-account
      </v-icon>

      <v-btn small text class="font-weight-bold secondary--text text-body-1">{{clientFileBasicInfo.clientFileNumber}} </v-btn>

      <v-spacer></v-spacer>

    </v-toolbar> -->

    <v-list>
      <template v-for="item in items">
        <v-list-group
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
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

  items = [
    {
      title: "File",
      icon: "mdi-file-account",
      items: [
        { title: "Personal", routerName: "Root.CFile.CFInfo.CFPersonalInfo" },
        { title: "Creditor", routerName: "Root.CFile.CFInfo.CFCreditorInfo" },
        { title: "Budget", routerName: "Root.CFile.CFInfo.CFBudgetInfo" },
        {
          title: "Payment Plan",
          routerName: "Root.CFile.CFInfo.CFPaymentPlanInfo",
        },
        { title: "Bank", routerName: "Root.CFile.CFInfo.CFBankInfo" },
        { title: "Document", routerName: "Root.CFile.CFInfo.CFDocumentInfo" },
      ],
    },
    {
      title: "Accounting",
      icon: "mdi-credit-card-outline - payment icon",
      items: [
        { title: "Payment", routerName: "Root.CFile.CFPayment.CFPaymentList" },
        {
          title: "Transaction",
          routerName: "Root.CFile.CFPayment.CFTransactionList",
        },
        {
          title: "EMandate",
          routerName: "Root.CFile.CFPayment.CFEMandateList",
        },
      ],
    },
    {
      icon: "mdi-checkbox-marked-circle-outline",
      items: [
        { title: "Active", routerName: "Root.CFile.CFTask.CFActiveTasks" },
        {
          title: "Completed",
          routerName: "Root.CFile.CFTask.CFCompletedTasks",
        },
      ],
      title: "Task",
    },
    {
      title: "Ticket",
      icon: "mdi-ticket-confirmation",
      items: [
        { title: "Active", routerName: "Root.CFile.CFTicket.CFActiveTickets" },
        {
          title: "Completed",
          routerName: "Root.CFile.CFTicket.CFCompletedTickets",
        },
        { title: "Add", routerName: "Root.CFile.CFTicket.CFAddTickets" },
      ],
    },
    {
      title: "Note",
      icon: "mdi-comment-text",
      items: [
        {
          title: "Highlights",
          routerName: "Root.CFile.CFNote.CFNoteHighlightList",
        },
        { title: "All Notes", routerName: "Root.CFile.CFNote.CFNoteAllList" },
      ],
    },
    {
      title: "Actions",
      icon: "mdi-gesture-double-tap",
      items: [{ title: "List Item",routerName: "Root.CFile.CFAction.CFActionList", }],
    },
    {
      title: "Settlement",
      icon: "mdi-handshake-outline",
      items: [{ title: "Settlement Plan",routerName: "Root.CFile.CFSettlementPlan.CFSettlementPlanList", }],
    },
  ];

  public drawer = true;
  public mini = true;

  goto(routerName: string) {
    this.$router.push({ name: routerName });
  }
}
</script>
<style scoped>
.v-application .primary--text {
  color: #f56f07 !important;
  caret-color: #f56f07 !important;
}
</style>
