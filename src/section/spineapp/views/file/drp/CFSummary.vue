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

            <div
              class="font-weight-bold text-body-1 d-flex align-center mx-3"
            >
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
              >
                <v-icon color="secondary" small>{{ quickNav.icon }}</v-icon>
              </v-btn>
            </v-btn-toggle>

            <v-spacer />

            <v-chip
              @click="gotoEmandateList"
              small
              v-if="fileSummary.eMandateActive"
              class="mx-2"
              color="green"
              outlined
              label
              >EMandate Active</v-chip
            >

            <v-chip
              @click="gotoEmandateList"
              small
              v-else
              class="mx-2"
              color="secondary lighten-3"
              label
              >EMandate Pending</v-chip
            >

            <v-chip
              class="mx-2"
              v-if="fileSummary.ppCode"
              small
              color="secondary"
              outlined
              label
              >{{ fileSummary.ppCode }}</v-chip
            >

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
            <v-btn icon @click="expandHeader = !expandHeader">
              <v-icon size="20" color="secondary">
                mdi-arrow-down-drop-circle
              </v-icon>
            </v-btn>
          </div>
          <v-divider />
          <div class="d-flex align-center">
            <v-card flat class="col-4 mr-1 d-flex align-center px-2 py-0">
              <div class="d-flex flex-fill py-1">
                <v-list-item-title
                  class="primary--text text-body-1 font-weight-bold"
                  >MSF
                </v-list-item-title>

                <div class="d-flex primary--text text-body-1 font-weight-bold">
                  {{ fileSummary?.msfDraftAmount | toINR }}
                </div>
              </div>
              <v-divider color="primary" vertical width="10px" class="mx-3" />
            </v-card>
            <v-card flat class="col-4 mr-1 d-flex align-center px-2 py-0">
              <div class="d-flex flex-fill py-1">
                <v-list-item-title
                  class="primary--text text-body-1 font-weight-bold"
                  >SPA
                </v-list-item-title>

                <div class="d-flex primary--text text-body-1 font-weight-bold">
                  {{ fileSummary?.spaSummary?.spaAmount | toINR }}
                </div>
              </div>
              <v-divider color="primary" vertical width="10px" class="mx-3" />
            </v-card>
            <v-card flat class="col-4 mr-1 d-flex align-center px-2 py-0">
              <div class="d-flex flex-fill py-1">
                <v-list-item-title
                  class="primary--text text-body-1 font-weight-bold"
                  >Creditors ({{ fileSummary?.creditorsCount }})
                </v-list-item-title>

                <div class="d-flex primary--text text-body-1 font-weight-bold">
                  Settled({{ fileSummary?.settledCreditorsCount }})
                </div>
              </div>
            </v-card>
          </div>

          <v-expand-transition>
            <div v-if="expandHeader" class="d-flex align-center">
              <v-card flat class="col-4 mr-1 d-flex align-center px-2 pa-0">
                <div class="flex-fill" v-if="fileSummary.msfSummary">
                  <div class="d-flex flex-fill">
                    <div class="primary--text text-body-2 flex-fill">
                      {{
                        fileSummary?.msfSummary?.upcomingMSFScheduledEntry
                          .draftDate | monthday
                      }}
                    </div>
                    <div class="caption">
                      {{
                        fileSummary.msfSummary?.upcomingMSFScheduledEntry.status
                          .name
                      }}
                    </div>

                    <div
                      class="flex-fill text-body-2 secondary--text text-right"
                    >
                      {{
                        fileSummary.msfSummary?.upcomingMSFScheduledEntry
                          .totalAmount | toINR
                      }}
                    </div>
                  </div>

                  <div class="d-flex flex-fill text-body-2">
                    <template
                      v-if="
                        !!fileSummary.msfSummary.pastMSFScheduledEntryList[0]
                      "
                    >
                      <div class="font-weight-bold">
                        {{
                          fileSummary.msfSummary.pastMSFScheduledEntryList[0]
                            .statusUpdatedOn | monthday
                        }}
                      </div>
                      <div class="caption">
                        {{
                          fileSummary?.msfSummary?.pastMSFScheduledEntryList[0]
                            .status.id
                        }}
                      </div>
                      <div class="font-weight-bold secondary--text text-right">
                        {{
                          fileSummary.msfSummary.pastMSFScheduledEntryList[0]
                            .totalAmount | toINR
                        }}
                      </div>
                    </template>
                    <template
                      v-if="
                        !fileSummary.msfSummary.pastMSFScheduledEntryList.length
                      "
                    >
                      <div>Not Paid</div>
                    </template>
                  </div>
                </div>
                <v-divider color="primary" vertical width="10px" class="mx-3" />
              </v-card>

              <v-card flat class="col-4 mr-1 d-flex align-center px-2 pa-0">
                <div v-if="fileSummary.spaSummary" class="flex-fill">
                  <div class="d-flex flex-fill">
                    <div class="primary--text text-body-2 flex-fill">
                      {{
                        fileSummary.spaSummary.upcomingSPAScheduledEntry
                          .draftDate | monthday
                      }}
                    </div>
                    <div class="caption">
                      {{
                        fileSummary.spaSummary.upcomingSPAScheduledEntry.status
                          .name
                      }}
                    </div>

                    <div
                      class="flex-fill text-body-2 secondary--text text-right"
                    >
                      {{
                        fileSummary.spaSummary.upcomingSPAScheduledEntry
                          .totalAmount | toINR
                      }}
                    </div>
                  </div>

                  <div class="d-flex flex-fill text-body-2">
                    <template
                      v-if="fileSummary.spaSummary.pastSPAScheduledEntryList[0]"
                    >
                      <div class="font-weight-bold">
                        {{
                          fileSummary.spaSummary.pastSPAScheduledEntryList[0]
                            .statusUpdatedOn | monthday
                        }}
                      </div>
                      <div class="caption">
                        {{
                          fileSummary.spaSummary.pastSPAScheduledEntryList[0]
                            .status.id
                        }}
                      </div>
                      <div class="font-weight-bold primary--text text-right">
                        {{
                          fileSummary.spaSummary.pastSPAScheduledEntryList[0]
                            .totalAmount | toINR
                        }}
                      </div>
                    </template>
                    <template
                      v-if="
                        !fileSummary.spaSummary.pastSPAScheduledEntryList.length
                      "
                    >
                      <div>Not Paid</div>
                    </template>
                  </div>
                </div>
                <v-divider color="primary" vertical width="10px" class="mx-3" />
              </v-card>

              <v-card flat class="col-4 mr-1 d-flex align-center px-2 pa-0">
                <div class="flex-fill">
                  <div class="d-flex flex-fill">
                    <div class="primary--text text-body-2 flex-fill">
                      SPA Saving
                    </div>
                    <div
                      class="flex-fill text-body-2 secondary--text text-right"
                    >
                      {{ fileSummary.totalSaving | toINR }}
                    </div>
                  </div>

                  <div class="d-flex flex-fill">
                    <div class="primary--text text-body-2 flex-fill">
                      Total Outstanding
                    </div>
                    <div
                      class="flex-fill text-body-2 secondary--text text-right"
                    >
                      {{ fileSummary.totalOutstanding | toINR }}
                    </div>
                  </div>
                </div>
              </v-card>
            </div>
          </v-expand-transition>
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
@Component({
  components: {
    "f-btn": FBtn,
    "f-text-field": FTextField,
    AboutView,
    FCellStatus,
    FHoverCopy,
    FCopy,
  },
})
export default class CFSummary extends Vue {
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
        name: "Account",
        icon: "mdi-account",
        routerName: "Root.CFile.CFInfo.CFPersonalInfo",
      },
      {
        name: "Budget",
        icon: "mdi-wallet",
        routerName: "Root.CFile.CFInfo.CFBudgetInfo",
      },
      {
        name: "Credit Card",
        icon: "mdi-credit-card",
        routerName: "Root.CFile.CFInfo.CFCreditorInfo",
      },
      {
        name: "Document",
        icon: "mdi-file-document",
        routerName: "Root.CFile.CFInfo.CFDocumentInfo",
      },
      {
        name: "payment plan",
        icon: "mdi-calendar-blank",
        routerName: "Root.CFile.CFInfo.CFPaymentPlanInfo",
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
    this.$router.push({ name: "Root.CFile.CFInfo.CFCreditorInfo" });
  }

  gotoProfile() {
    this.$router.push({ name: "Root.CFile.CFInfo.CFPersonalInfo" });
  }

  gotoPaymentPlan() {
    this.$router.push({ name: "Root.CFile.CFInfo.CFPaymentPlanInfo" });
  }

  gotoMSFPaymentPlan() {
    this.$router.push({ name: "Root.CFile.CFInfo.CFPaymentPlanMSFInfo" });
  }

  goto(routerName: string) {
    this.$router.push({ name: routerName });
  }

  gotoPayment() {
    this.$router.push({ name: "Root.CFile.CFPayment.CFPaymentList" });
  }

  gotoEmandateList() {
    this.$router.push({ name: "Root.CFile.CFPayment.CFEMandateList" });
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



