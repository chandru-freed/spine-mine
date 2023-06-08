<template>
  <div class="row summaryTab">
    <!-- <v-toolbar flat> -->
    <!-- {{fileSummary?.msfSummary}} -->
    <div class="col">
      <v-sheet rounded outlined color="primary" class="mb-3">
        <v-card flat class="col py-0">
          <div class="d-flex align-center">
            <div
              class="font-weight-bold secondary--text d-flex align-center mx-3"
            >
              {{ clientFileBasicInfo.clientFileNumber }}
              <f-copy
                boundaryClass="mx-1"
                v-model="clientFileBasicInfo.clientFileNumber"
              ></f-copy>
            </div>

            <div class="font-weight-bold text-body-1 d-flex align-center mx-3">
              <a class="purple--text" @click="gotoClient()">
                {{ clientFileBasicInfo.clientBasicInfo.fullName }}
              </a>
              <f-copy
                boundaryClass="mx-1"
                v-model="clientFileBasicInfo.fullName"
              >
              </f-copy>
            </div>

            <div class="text-body-1 d-flex align-center mx-3">
              {{ clientFileBasicInfo?.clientBasicInfo?.mobile | phone }}
              <f-copy
                boundaryClass="mx-1"
                v-model="clientFileBasicInfo.clientBasicInfo.mobile"
              ></f-copy>
            </div>

            <v-spacer />
            <v-btn-toggle dense group>
              <v-btn
                @click="goto(quickNav.routerName)"
                small
                v-for="quickNav in quickNavList"
                :key="quickNav.name"
                class="pa-0 mx-0"
              >
              <f-tooltip :tooltipText="quickNav.name" :icon="quickNav.icon">{{ quickNav.icon }}</f-tooltip>
                <!-- <v-icon color="secondary" small >{{ quickNav.icon }}</v-icon> -->
              </v-btn>
            </v-btn-toggle>

            <v-spacer />

            <v-chip
              class="mx-2"
              v-if="clientFileBasicInfo.programCode"
              small
              label
              outlined
              >{{ clientFileBasicInfo.programCode }}</v-chip
            >

            <v-chip class="mx-2" small label>{{
              fileSummary.clientFileStatus.name
            }}</v-chip>
            <!-- <v-btn icon @click="expandHeader = !expandHeader">
              <v-icon size="20" color="secondary">
                mdi-arrow-down-drop-circle
              </v-icon>
            </v-btn> -->
          </div>
        </v-card>
      </v-sheet>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FBtn from "@/components/generic/FBtn.vue";
import AboutView from "@/views/AboutView.vue";
import FTextField from "@/components/generic/form/field/FTextField.vue";
import AmeyoService from "@/components/generic/ameyo/AmeyoService";
import FCellStatus from "@/components/generic/table/cell/FCellStatus.vue";
import Helper from "../../../util/Helper";
import FHoverCopy from "@/components/generic/FHoverCopy.vue";
import FCopy from "@/components/generic/FCopyBtn.vue";
import FTooltip from "@/components/generic/FTooltip.vue";
@Component({
  components: {
    "f-btn": FBtn,
    "f-text-field": FTextField,
    FTooltip,
    AboutView,
    FCellStatus,
    FHoverCopy,
    FCopy,
  },
})
export default class DCPCFSummary extends Vue {
  @Store.Getter.Login.LoginDetails.roleList
  roleList: string[];

  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: Data.ClientFile.FileSummary;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.showAmeyoSideBar
  showAmeyoSideBar: boolean;

  expandHeader: boolean = true;
  get quickNavList() {
    return [
      {
        name: "Credit Card",
        icon: "mdi-credit-card",
        routerName: "Root.DCPCFile.DCPCFInfo.DCPCFCreditorInfo",
      },
      {
        name: "Budget",
        icon: "mdi-wallet",
        routerName: "Root.DCPCFile.DCPCFInfo.DCPCFBudgetInfo",
      },
      {
        name: "Account",
        icon: "mdi-account",
        routerName: "Root.DCPCFile.DCPCFInfo.DCPCFPersonalInfo",
      },
      {
        name: "Document",
        icon: "mdi-file-document",
        routerName: "Root.DCPCFile.DCPCFInfo.DCPCFDocumentInfo",
      },
    ];
  }

  minHeight = 80;
  showHide: boolean = false;
  clientFileId = this.$route.params.clientFileId;
  @Store.Getter.ClientFile.ClientFileSummary.fiEMandateList
  fiEMandateList: Data.ClientFile.FiEMandateList[];

  msfScheduleStatusColorcode = Data.Color.PS_ENTRY_STATUS;

  private callByAmeyo(phoneNumber: string) {
    AmeyoService.dial(phoneNumber);
  }

  openNavShow(phoneNumber: string) {
    if (this.isAmeyoToolbarDialogRole()) {
      this.callByAmeyo(phoneNumber);
      if (this.showAmeyoSideBar === false) {
        Store.Mutation.ClientFile.ClientFileSummary.TOGGLE_AMEYO_SIDE_BAR(
          !this.showAmeyoSideBar
        );
      }
    }
  }

  gotoCreditor() {
    this.$router.push({ name: "Root.DCPCFile.DCPCFInfo.CFCreditorInfo" });
  }

  gotoProfile() {
    this.$router.push({ name: "Root.DCPCFile.DCPCFInfo.CFPersonalInfo" });
  }

  gotoPaymentPlan() {
    this.$router.push({ name: "Root.DCPCFile.DCPCFInfo.CFPaymentPlanInfo" });
  }

  gotoMSFPaymentPlan() {
    this.$router.push({ name: "Root.DCPCFile.DCPCFInfo.CFPaymentPlanMSFInfo" });
  }

  goto(routerName: string) {
    this.$router.push({ name: routerName });
  }

  gotoPayment() {
    this.$router.push({ name: "Root.CFile.CFPayment.CFPaymentList" });
  }



  gotoClient() {
    const clientId = this.clientFileBasicInfo.clientBasicInfo.clientId;
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }

  copyToClipBoard(text: string) {
    Helper.copyToClipBoard(text);
  }

  isCS() {
    return this.roleList?.includes("CS");
  }

  isCSManager() {
    return this.roleList?.includes("CSManager");
  }

  isAmeyoToolbarDialogRole() {
    return this.isCS() || this.isCSManager();
  }
}
</script>

<style scoped>
.v-expansion-panel::before {
  box-shadow: none !important;
}
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 4px;
}
.summaryTab :deep(.v-expansion-panel-content__wrap) {
  padding: 0px !important;
}
</style>
