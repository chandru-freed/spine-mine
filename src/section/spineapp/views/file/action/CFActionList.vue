<template>
  <div>
    <v-text-field
      outlined
      class="ma-5"
      rounded
      label="Search"
      dense
      v-model="searchText"
      prepend-inner-icon="mdi-magnify"
    />
    <div class="row mx-4">
      <div
        class="col-md-4"
        v-for="(actionGroup, i) in filteredActionGroupList"
        :key="i"
      >
        <v-card outlined color="grey lighten-3">
          <v-card-subtitle class="px-2 py-1 overline">{{
            actionGroup.groupName
          }}</v-card-subtitle>
          <v-list dense class="py-0">
            <v-list-item
              v-for="(actionItem, j) in actionGroup.actionList"
              :key="j"
              @click="takeAction(actionItem)"
            >
              <!-- <v-list-item-icon >
                  <v-icon v-if="actionItem.icon" v-text="actionItem.icon"></v-icon>
                </v-list-item-icon> -->

              <v-list-item-content class="pa-0">
                <v-list-item-title>{{
                  actionItem.actionName
                }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon
                  small
                  v-if="actionItem.icon"
                  v-text="actionItem.icon"
                ></v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import Helper from "@/section/spineapp/util/Helper";

@Component
export default class CFActionList extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  clientFileId = this.$route.params.clientFileId;

  searchText: string = "";

  actionGroupList = [
    {
      groupName: "Communication",
      actionList: [
        {
          actionName: "Send Email",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFSendEmail",
        },
        {
          actionName: "Send SMS",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFSendSMS",
        },
        {
          actionName: "Send Whatsapp",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFSendWhatsapp",
        },
      ],
    },
    {
      groupName: "Assign",
      actionList: [
        {
          actionName: "Assign RM (Relationship Manager)",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFAssignRM",
        },
        {
          actionName: "Assign Sales Rep",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFAssignSalesRep",
        },
      ],
    },
    {
      groupName: "Payment",
      actionList: [
        {
          actionName: "Record Payment",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFRecordPayment",
        },
        {
          actionName: "Receive Payment",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFReceivePayment",
        },
        {
          actionName: "Receive MSF",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFReceiveMSFPayment",
        },
        {
          actionName: "Draft Payment",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFDraftPayment",
        },
      ],
    },
    {
      groupName: "Flow",
      actionList: [
        {
          actionName: "Create Flow",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFCreateRequest",
        },
        {
          actionName: "Enrollment",
          icon: "mdi-chevron-right",
          command: this.createEnrollmentFlow,
        },
        {
          actionName: "Welcome Call",
          icon: "mdi-chevron-right",
          command: this.createWelcomeCall,
        },
        {
          actionName: "CHPP",
          icon: "mdi-chevron-right",
          command: this.createCHPPFlow,
        },
        {
          actionName: "Nsf MSF",
          icon: "mdi-chevron-right",
          command: this.createNsfMSFFlow,
        },
        {
          actionName: "Monthly Followup Call",
          icon: "mdi-chevron-right",
          command: this.createMFC,
        },
        {
          actionName: "Nsf SPA",
          icon: "mdi-chevron-right",
          command: this.createNsfSPA,
        },
        {
          actionName: "EMandate",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFCreateRequest",
          query: { flowName: "EMandate" },
        },
        {
          actionName: "Settlement Plan",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFCreateRequest",
          query: { flowName: "Settlement Plan" },
        },
      ],
    },
  ];

  get getActionList() {
    let flattenedList: any[] = this.actionGroupList.map((actionGroup) => {
      return actionGroup.actionList.map((action) => {
        return { ...action, groupName: actionGroup.groupName };
      });
    });
    return [].concat(...flattenedList);
  }

  takeAction(actionItem: any) {
    if (actionItem.routerName) {
      this.goto(actionItem.routerName, actionItem.query);
    }

    if (actionItem.command) {
      actionItem.command();
    }
  }

  goto(routerName: string, query: any) {
    this.$router.push({ name: routerName, query: query });
  }

  createEnrollmentFlow() {
    Action.Spine.CreateEnrollment.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoCFActiveTaskList();
        }, 400);
      }
    );
  }

  createCHPPFlow() {
    Action.Spine.CreateCHPP.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoCFActiveTaskList();
        }, 400);
      }
    );
  }

  createNsfMSFFlow() {
    Action.Spine.CreateNsfMSF.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoCFActiveTaskList();
        }, 400);
      }
    );
  }

  createWelcomeCall() {
    Action.Spine.CreateWelcomeCall.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoCFActiveTaskList();
        }, 400);
      }
    );
  }

  createMFC() {
    Action.Spine.CreateMFC.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoCFActiveTaskList();
        }, 400);
      }
    );
  }
  createNsfSPA() {
    Action.Spine.CreateNsfSPA.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.$emit("flowCreated");
          this.gotoCFActiveTaskList();
        }, 400);
      }
    );
  }

  gotoCFActiveTaskList() {
    Helper.Router.gotoCFActiveTaskList({
      router: this.$router,
      clientFileId: this.clientFileId,
    });
  }

  get filteredActionGroupList() {
    const filteredValList = this.actionGroupList.map((actionGroup) => {
      let ag = { ...actionGroup };
      ag.actionList = ag.actionList.filter((action: any) =>
        action.actionName.toLowerCase().includes(this.searchText.toLowerCase())
      );
      return ag;
    }).filter(item => item.actionList.length>0);
    return filteredValList;
  }
}
</script>

<style></style>
