<template>
  <!-- <div>
    <div class="ma-2" :key="action.actionName" v-for="action in actionList">
      <v-btn outlined @click="goto(action.routerName)">{{
        action.actionName
      }}</v-btn>
    </div>
  </div> -->
    <div class="row ma-4">
      <div class="col-md-4" v-for="(actionGroup,i) in actionGroupList" :key="i">
        <v-card outlined>
          <v-card-subtitle class="px-2 pt-1 pb-0">{{actionGroup.groupName}}</v-card-subtitle>
          <v-list dense class="py-1">
              <v-list-item
                v-for="(actionItem, j) in actionGroup.actionList"
                :key="j"
                @click="goto(actionItem.routerName)"
              >
                <!-- <v-list-item-icon >
                  <v-icon v-if="actionItem.icon" v-text="actionItem.icon"></v-icon>
                </v-list-item-icon> -->

                <v-list-item-content class="pa-0">
                  <v-list-item-title >{{actionItem.actionName}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon v-if="actionItem.icon" v-text="actionItem.icon"></v-icon>
                </v-list-item-action>
              </v-list-item>
          </v-list>
        </v-card>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';

@Component
export default class CFActionList extends Vue {
  actionGroupList = [
    {
      groupName: "Communication",
      actionList : [
        {
          actionName: "Send Email",
          icon: "mdi-email",
          routerName: "Root.CFile.CFAction.CFSendEmail",
        },
        {
          actionName: "Send SMS",
          icon: "mdi-message",
          routerName: "Root.CFile.CFAction.CFSendSMS",
        },
        {
          actionName: "Send Whatsapp",
          icon: "mdi-whatsapp",
          routerName: "Root.CFile.CFAction.CFSendWhatsapp",
        },
      ]
    },
    {
      groupName: "Flow",
      actionList : [
        {
          actionName: "Create Flow",
          routerName: "Root.CFile.CFAction.CFCreateRequest",
        }
      ]
    },
    {
      groupName: "Assign",
      actionList : [
        {
          actionName: "Assign RM",
          routerName: "Root.CFile.CFAction.CFAssignRM",
        },
        {
          actionName: "Assign Sales Rep",
          routerName: "Root.CFile.CFAction.CFAssignSalesRep",
        }
      ]
    },
    {
      groupName: "Payment",
      actionList : [
        {
          actionName: "Record",
          routerName: "Root.CFile.CFAction.CFRecordPayment",
        },
        {
          actionName: "Receive",
          routerName: "Root.CFile.CFAction.CFReceivePayment",
        },
        {
          actionName: "Receive MSF",
          routerName: "Root.CFile.CFAction.CFReceiveMSFPayment",
        }
      ]
    },
  ];

  goto(routerName: string) {
    this.$router.push({ name: routerName });
  }
}
</script>

<style></style>
