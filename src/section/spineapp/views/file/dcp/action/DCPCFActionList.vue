<template>
  <div>
    <!-- {{isSalesRep()}} -->
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
            <v-card-subtitle class="px-2 py-1 overline"
              >{{ actionGroup.groupName }}
            </v-card-subtitle>
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
import FAlert from "@/components/generic/FAlert.vue";

@Component({
  components: {
    FAlert,
  },
})
export default class DCPCFActionList extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.Login.LoginDetails.roleList
  roleList: string[];

  confirmationFunction: () => void;

  @Prop({
    default: false,
  })
  useAsDropDown: boolean;

  clientFileId = this.$route.params.clientFileId;

  searchText: string = "";
  createCollectMSFThroughCashfreeInput: Data.Spine.CreateCollectMSFThroughCashfreeInput =
    new Data.Spine.CreateCollectMSFThroughCashfreeInput();
  get actionGroupList() {
    return [
      // {
      //   groupName: "Communication",
      //   actionList: [
      //     {
      //       actionName: "Send Email",
      //       icon: "mdi-chevron-right",
      //       routerName: "Root.CFile.CFAction.CFSendEmail",
      //     },
      //     {
      //       actionName: "Send SMS",
      //       icon: "mdi-chevron-right",
      //       routerName: "Root.CFile.CFAction.CFSendSMS",
      //     },
      //     {
      //       actionName: "Send Whatsapp",
      //       icon: "mdi-chevron-right",
      //       routerName: "Root.CFile.CFAction.CFSendWhatsapp",
      //     },
      //   ],
      // },

      {
        groupName: "Other Action",
        condition: this.isNotSalesRepOrLead(),
        actionList: [
          {
            actionName: "Switch Program To DRP",
            icon: "mdi-chevron-right",
            command: this.switchProgram,
            condition: this.isAdmin(),
            confirmation: true,
          },
        ],
      },
      {
        groupName: "Personal Info",
        condition: this.isNotSalesRepOrLead(),
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
    ];
  }

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


  getCFActiveTaskList() {
    Action.TaskList.GetTaskListByCid.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {}
    );
  }

  activate() {
    FSnackbar.confirm({
      message:"Are you sure want to activate this file?",
      onConfirm: () => {
        Action.ClientFile.Activate.execute1(this.clientFileId, (ootput) => {
          setTimeout(() => {
            FSnackbar.success("Succesfully assigned");
            this.gotoCFActiveTaskList();
          }, 400);
        });
      }
    })
    
  }

  switchProgram() {
    FSnackbar.confirm({
      message: "Are you sure want to switch the program to DRP?",
      onConfirm: () => {
        const switchInput: Data.ClientFile.SwitchProgramInput =
          new Data.ClientFile.SwitchProgramInput();
        switchInput.clientFileId = this.clientFileId;
        Action.ClientFile.SwitchToDRP.execute(switchInput, (output) => {
          setTimeout(() => {
            FSnackbar.success("Succesfully switched the program");
            this.openClientFile(output.newClientFileNumber);
          }, 400);
        });
      },
    });
  }


  openClientFile(fileNumber: string) {
    Helper.Router.gotoFile({router: this.$router,clientFileNumber:fileNumber});
  }


  get filteredActionGroupList() {
    const filteredValList = this.actionGroupList
      .filter((ag) => ag.condition == undefined || ag.condition == true)
      .map((actionGroup) => {
        let ag = { ...actionGroup };
        ag.actionList = (ag.actionList as any).filter(
          (action: any) =>
            action.actionName
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) &&
            (action.condition == undefined || action.condition == true)
        );
        return ag;
      })
      .filter((item) => item.actionList.length > 0);
    return filteredValList;
  }

  get actionListForAutoComplete() {
    let actionsList: any = [];
    this.actionGroupList
      .filter((ag) => ag.condition == undefined || ag.condition == true)
      .map((item) => {
        actionsList.push(...item.actionList);
      });
    const filteredValList =
      this.searchText?.length > 1
        ? actionsList.filter(
            (action: any) =>
              action.actionName
                .toLowerCase()
                .includes(this.searchText.toLowerCase()) &&
              (action.condition == undefined || action.condition == true)
          )
        : [];
    return filteredValList;
  }

  isSalesRep() {
    return this.roleList?.includes("SalesRep");
  }

  isSalesLead() {
    return this.roleList?.includes("SalesLead");
  }
  isAdmin() {
    return this.roleList?.includes("Admin");
  }

  isClientFileNotHold() {
    return this.clientFileBasicInfo.clientFileStatus.id !== "HOLD";
  }

  isNotSalesRepOrLead() {
    return !(this.isSalesRep() || this.isSalesLead());
  }
}
</script>

<style></style>
