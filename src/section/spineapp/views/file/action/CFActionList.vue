<template>
    <div class="row ma-4">
      <div class="col-md-4" v-for="(actionGroup,i) in actionGroupList" :key="i">
        <v-card outlined color="grey lighten-3">
          <v-card-subtitle class="px-2 py-1 overline ">{{actionGroup.groupName}}</v-card-subtitle>
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
                  <v-list-item-title >{{actionItem.actionName}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon small v-if="actionItem.icon" v-text="actionItem.icon"></v-icon>
                </v-list-item-action>
              </v-list-item>
              
          </v-list>
        </v-card>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from '@/../src-gen/store';
 import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
 import * as Action from '@/../src-gen/action';
import Helper from "@/section/spineapp/util/Helper";

@Component
export default class CFActionList extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  clientFileId = this.$route.params.clientFileId

  actionGroupList = [
    {
      groupName: "Communication",
        actionList : [
          {
            actionName: "Send Email",
            icon: "mdi-email-outline",
            routerName: "Root.CFile.CFAction.CFSendEmail",
          },
          {
            actionName: "Send SMS",
            icon: "mdi-message-outline",
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
      groupName: "Assign",
      actionList : [
        {
          actionName: "Assign RM (Relationship Manager)",
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
          actionName: "Record Payment",
          routerName: "Root.CFile.CFAction.CFRecordPayment",
        },
        {
          actionName: "Receive Payment",
          routerName: "Root.CFile.CFAction.CFReceivePayment",
        },
        {
          actionName: "Receive MSF",
          routerName: "Root.CFile.CFAction.CFReceiveMSFPayment",
        }
      ]
    },
    {
      groupName: "Flow",
      actionList : [
        {
          actionName: "Create Flow",
          routerName: "Root.CFile.CFAction.CFCreateRequest",
        },
        {
          actionName: "Enrollment",
          command: this.createEnrollmentFlow,
        },
        {
          actionName: "Welcome Call",
          command: this.createWelcomeCall,
        },
        {
          actionName: "CHPP",
          command: this.createCHPPFlow,
        },
        {
          actionName: "Nsf MSF",
          command: this.createNsfMSFFlow,
        },
        {
          actionName: "Monthly Followup Call",
          command: this.createMFC,
        },
        {
          actionName: "Nsf SPA",
          command: this.createNsfSPA,
        },
        {
          actionName: "EMandate",
          routerName: "Root.CFile.CFAction.CFCreateRequest",
          query: {flowName: "EMandate"}
        }
      ]
    },
  ];

  get getActionList() {
    let flattenedList: any[] = this.actionGroupList.map(actionGroup => {
      return actionGroup.actionList.map(action => {
        return {...action, groupName: actionGroup.groupName}
      })
    })
    return [].concat(...flattenedList)
  }

  takeAction(actionItem: any) {
    if(actionItem.routerName) {
      this.goto(actionItem.routerName, actionItem.query)
    }

     if(actionItem.command) {
      actionItem.command()
    }
  }

  goto(routerName: string, query: any) {
    this.$router.push({ name: routerName , query: query});
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
        }, 400);
      }
    );
  }

  gotoCFActiveTaskList() {
    Helper.Router.gotoCFActiveTaskList({router: this.$router,clientFileId: this.clientFileId})
  }
}
</script>

<style></style>
