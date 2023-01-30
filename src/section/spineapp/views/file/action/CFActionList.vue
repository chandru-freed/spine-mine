<template>
  <div>
    <div v-if="useAsDropDown">
      <v-autocomplete
        outlined
        hide-details
        dense
        class="mx-0"
        :search-input="searchText"
        @update:search-input="(newVal) => (searchText = newVal)"
        :items="actionListForAutoComplete"
        item-text="actionName"
        label="Select Actions"
        :hide-no-data="true"
      >
        <template v-slot:item="data">
          <v-card-text @click="takeAction(data.item)" class="row" small
            >{{ data.item.actionName }} <v-spacer />
            <v-icon small> mdi-chevron-right</v-icon></v-card-text
          >
        </template>
      </v-autocomplete>
    </div>
    <div v-else>
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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import Helper from "@/section/spineapp/util/Helper";
import * as Snackbar from "node-snackbar";
import FSnackbar from "@/fsnackbar";

@Component
export default class CFActionList extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Prop({
    default: false,
  })
  useAsDropDown: boolean;

  clientFileId = this.$route.params.clientFileId;

  searchText: string = "";

  actionGroupList = [
    {
      groupName: "Flow",
      actionList: [
        // {
        //   actionName: "Create Flow",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.CFile.CFAction.CFCreateRequest",
        // },
        // {
        //   actionName: "Enrollment",
        //   icon: "mdi-chevron-right",
        //   command: this.createEnrollmentFlowV1,
        // },
        {
          actionName: "Collect First MSF",
          icon: "mdi-chevron-right",
          command: this.createCollectFirstMSF,
        },
        {
          actionName: "OnBoarding Call",
          icon: "mdi-chevron-right",
          command: this.createWelcomeCall,
        },
        {
          actionName: "CHPP",
          icon: "mdi-chevron-right",
          command: this.createCHPPFlow,
        },
        // {
        //   actionName: "Nsf MSF",
        //   icon: "mdi-chevron-right",
        //   command: this.createNsfMSFFlow,
        // },
        {
          actionName: "Monthly Followup Call",
          icon: "mdi-chevron-right",
          command: this.createMFC,
        },
        // {
        //   actionName: "Nsf SPA",
        //   icon: "mdi-chevron-right",
        //   command: this.createNsfSPA,
        // },
        {
          actionName: "Amendment",
          icon: "mdi-chevron-right",
          command: this.createAmendmentFlow,
        },
        {
          actionName: "EMandate",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFCreateRequest",
          query: { flowName: "EMandate" },
        },
        // {
        //   actionName: "Settlement Plan",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.CFile.CFAction.CFCreateRequest",
        //   query: { flowName: "Settlement Plan" },
        // },
        {
          actionName: "Refund Fee",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFCreateRequest",
          query: { flowName: "Refund Fee" },
        },

        {
          actionName: "Refund SPA",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFCreateRequest",
          query: { flowName: "Refund SPA" },
        },
      ],
    },
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
        // {
        //   actionName: "Record Payment",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.CFile.CFAction.CFRecordPayment",
        // },
        // {
        //   actionName: "Receive Payment",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.CFile.CFAction.CFReceivePayment",
        // },
        // {
        //   actionName: "Receive MSF",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.CFile.CFAction.CFReceiveMSFPayment",
        // },
        // {
        //   actionName: "Draft Payment",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.CFile.CFAction.CFDraftPayment",
        // },
      ],
    },

    {
      groupName: "Other Action",
      actionList: [
        {
          actionName: "Mark File As Activate",
          icon: "mdi-chevron-right",
          command: this.activate,
        },
        {
          actionName: "Mark File As Hold",
          icon: "mdi-chevron-right",
          command: this.hold,
        },
        {
          actionName: "Mark File As Resume",
          icon: "mdi-chevron-right",
          command: this.resume,
        },
        {
          actionName: "Mark File As Request Cancel",
          icon: "mdi-chevron-right",
          command: this.requestCancel,
        },
        // {
        //   actionName: "Mark File As Graduate",
        //   icon: "mdi-chevron-right",
        //   command: this.graduate,
        // },
        // {
        //   actionName: "Mark File As Cancel",
        //   icon: "mdi-chevron-right",
        //   command: this.cancel,
        // },
      ],
    },
    {
      groupName: "Personal Info",
      actionList: [
        {
          actionName: "Update Contact Info",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFUpdateContactInfo",
        },
        {
          actionName: " Update Client Details",
          icon: "mdi-chevron-right",
          routerName: "Root.CFile.CFAction.CFUpdateClientDetails",
        },
      ],
    },
    {
      groupName: "Payment",
      actionList: [
        // {
        //   actionName: "Record MSF Payment",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.CFile.CFAction.RecordMSFPayment",
        // },
        // {
        //   actionName: "Record SPA Payment",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.CFile.CFAction.RecordSPAPayment",
        // },
        // {
        //   actionName: "Record Settled Payment",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.CFile.CFAction.CFRecordPayment",
        // },
        // {
        //   actionName: "Record Emandate",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.CFile.CFAction.RecordEMandate",
        // },
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

  mounted() {}

  takeAction(actionItem: any) {
    this.searchText = "";
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
    Action.Spine.CreateEnrollment.execute2(
      this.clientFileBasicInfo.clientFileNumber,
      undefined,
      (output) => {
        setTimeout(() => {
          this.gotoCFActiveTaskList();
        }, 400);
      }
    );
  }

  createEnrollmentFlowV1() {
    Action.Spine.CreateEnrollment.execute2(
      this.clientFileBasicInfo.clientFileNumber,
      "V1Net",
      (output) => {
        setTimeout(() => {
          this.gotoCFActiveTaskList();
        }, 400);
      }
    );
  }

  createCollectFirstMSF() {
    Action.Spine.CreateCollectFirstMSF.execute2(
      this.clientFileBasicInfo.clientFileNumber,
      "V1Net",
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

  // createNsfMSFFlow() {
  //   Action.Spine.CreateNsfMSF.execute1(
  //     this.clientFileBasicInfo.clientFileNumber,
  //     (output) => {
  //       setTimeout(() => {
  //         this.gotoCFActiveTaskList();
  //       }, 400);
  //     }
  //   );
  // }

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
  // createNsfSPA() {
  //   Action.Spine.CreateNsfSPA.execute1(
  //     this.clientFileBasicInfo.clientFileNumber,
  //     (output) => {
  //       setTimeout(() => {
  //         this.$emit("flowCreated");
  //         this.gotoCFActiveTaskList();
  //       }, 400);
  //     }
  //   );
  // }

  createAmendmentFlow() {
    Action.Spine.CreateAmendment.execute1(
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
    if (this.$route.name === "Root.CFile.CFTask.CFActiveTasks") {
      this.getCFActiveTaskList();
    } else {
      Helper.Router.gotoCFActiveTaskList({
        router: this.$router,
        clientFileId: this.clientFileId,
      });
    }
  }

  gotoUpdateContactInfo() {}

  getCFActiveTaskList() {
    Action.TaskList.GetTaskListByCid.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {}
    );
  }

  // markClientFileAsOnBoarded() {
  //   Action.ClientFile.MarkClientFileAsOnBoarded.execute1(
  //     this.clientFileId,
  //     (output) => {
  //       Snackbar.show({
  //         text: "Succesfully update.",
  //         pos: "bottom-center",
  //       });
  //     }
  //   );
  // }

  activate() {
    Action.ClientFile.Activate.execute1(this.clientFileId, (ootput) => {
      setTimeout(() => {
        FSnackbar.success("Succesfully assigned");
        this.gotoCFActiveTaskList();
      }, 400);
    });
  }

  hold() {
    Action.ClientFile.Hold.execute1(this.clientFileId, (output) => {
      setTimeout(() => {
        FSnackbar.success("Succesfully assigned");
        this.gotoCFActiveTaskList();
      }, 400);
    });
  }

  resume() {
    Action.ClientFile.Resume.execute1(this.clientFileId, (output) => {
      setTimeout(() => {
        FSnackbar.success("Succesfully assigned");
        this.gotoCFActiveTaskList();
      }, 400);
    });
  }

  graduate() {
    Action.ClientFile.Graduate.execute1(this.clientFileId, (output) => {
      setTimeout(() => {
        FSnackbar.success("Succesfully assigned");
        this.gotoCFActiveTaskList();
      }, 400);
    });
  }

  cancel() {
    Action.ClientFile.Cancel.execute1(this.clientFileId, (output) => {
      setTimeout(() => {
        FSnackbar.success("Succesfully assigned");
        this.gotoCFActiveTaskList();
      }, 400);
    });
  }

  requestCancel() {
    Action.ClientFile.RequestCancel.execute1(this.clientFileId, (output) => {
      setTimeout(() => {
        FSnackbar.success("Succesfully assigned");
        this.gotoCFActiveTaskList();
      }, 400);
    });
  }

  recordMSFPayment() {}

  get filteredActionGroupList() {
    const filteredValList = this.actionGroupList
      .map((actionGroup) => {
        let ag = { ...actionGroup };
        ag.actionList = (ag.actionList as any).filter((action: any) =>
          action.actionName
            .toLowerCase()
            .includes(this.searchText.toLowerCase())
        );
        return ag;
      })
      .filter((item) => item.actionList.length > 0);
    return filteredValList;
  }

  get actionListForAutoComplete() {
    let actionsList: any = [];
    this.actionGroupList.map((item) => {
      actionsList.push(...item.actionList);
    });
    const filteredValList =
      this.searchText?.length > 1
        ? actionsList.filter((action: any) =>
            action.actionName
              .toLowerCase()
              .includes(this.searchText.toLowerCase())
          )
        : [];
    return filteredValList;
  }
}
</script>

<style></style>
