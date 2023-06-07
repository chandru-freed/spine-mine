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
              class="font-weight-bold purple--text text-body-1 d-flex align-center mx-3"
            >
              {{ clientFileBasicInfo.clientBasicInfo.fullName }}
              <f-copy
                boundaryClass="mx-1"
                v-model="clientFileBasicInfo.fullName"
              >
              </f-copy>
            </div>

            <div class="text-body-1 d-flex align-center mx-3">
              {{ clientFileBasicInfo.clientBasicInfo.mobile | phone }}
              <f-copy
                boundaryClass="mx-1"
                v-model="clientFileBasicInfo.clientBasicInfo.mobile"
              ></f-copy>
            </div>

            <v-spacer />
            <v-btn-toggle dense group>
              <v-btn @click="goto(quickNav.routerName)" small v-for="quickNav in quickNavList" :key="quickNav.name">
                <v-icon color="secondary" small>{{quickNav.icon}}</v-icon>
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
                  {{ fileSummary.msfDraftAmount | toINR }}
                </div>
              </div>
              <v-divider
                v-if="i !== 3"
                color="primary"
                vertical
                width="10px"
                class="mx-3"
              />
            </v-card>
            <v-card flat class="col-4 mr-1 d-flex align-center px-2 py-0">
              <div class="d-flex flex-fill py-1">
                <v-list-item-title
                  class="primary--text text-body-1 font-weight-bold"
                  >SPA
                </v-list-item-title>

                <div class="d-flex primary--text text-body-1 font-weight-bold">
                  {{ fileSummary.spaSummary.spaAmount | toINR }}
                </div>
              </div>
              <v-divider
                v-if="i !== 3"
                color="primary"
                vertical
                width="10px"
                class="mx-3"
              />
            </v-card>
            <v-card flat class="col-4 mr-1 d-flex align-center px-2 py-0">
              <div class="d-flex flex-fill py-1">
                <v-list-item-title
                  class="primary--text text-body-1 font-weight-bold"
                  >Creditors ({{ fileSummary.creditorsCount }})
                </v-list-item-title>

                <div class="d-flex primary--text text-body-1 font-weight-bold">
                  Settled({{ fileSummary.settledCreditorsCount }})
                </div>
              </div>
            </v-card>
          </div>

          <v-expand-transition>
            <div v-if="expandHeader" class="d-flex align-center">
              <v-card flat class="col-4 mr-1 d-flex align-center px-2 pa-0">
                <div class="flex-fill">
                  <div class="d-flex flex-fill" >
                    <div class="primary--text text-body-2 flex-fill">
                      {{
                        fileSummary.msfSummary.upcomingMSFScheduledEntry
                          .draftDate | monthday
                      }}
                    </div>
                    <div class="caption">
                      {{
                        fileSummary.msfSummary.upcomingMSFScheduledEntry.status
                          .name
                      }}
                    </div>

                    <div
                      class="flex-fill text-body-2 secondary--text text-right"
                    >
                      {{
                        fileSummary.msfSummary.upcomingMSFScheduledEntry
                          .totalAmount | toINR
                      }}
                    </div>
                  </div>

                  <div class="d-flex flex-fill text-body-2" >
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
                        <div class="caption">{{fileSummary?.msfSummary
                              ?.pastMSFScheduledEntryList[0].status.id}}</div>
                        <div
                          class="font-weight-bold secondary--text text-right"
                        >
                          {{
                            fileSummary.msfSummary.pastMSFScheduledEntryList[0]
                              .totalAmount | toINR
                          }}
                        </div>
                      </template>
                      <template
                        v-if="
                          !fileSummary.msfSummary.pastMSFScheduledEntryList
                            .length
                        "
                      >
                        <div>Not Paid</div>
                      </template>
                  </div>

                  
                </div>
                <v-divider
                  v-if="i !== 3"
                  color="primary"
                  vertical
                  width="10px"
                  class="mx-3"
                />
              </v-card>

              <v-card flat class="col-4 mr-1 d-flex align-center px-2 pa-0">
                <div class="flex-fill">
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

                  
                  
                  
                  <div class="d-flex flex-fill text-body-2" >
                    <template
                        v-if="
                          fileSummary.spaSummary.pastSPAScheduledEntryList[0]
                        "
                      >
                        <div class="font-weight-bold">
                          {{
                            fileSummary.spaSummary.pastSPAScheduledEntryList[0]
                              .statusUpdatedOn | monthday
                          }}
                        </div>
                        <div class="caption">{{fileSummary.spaSummary.pastSPAScheduledEntryList[0]
                              .status.id}}</div>
                        <div class="font-weight-bold primary--text text-right">
                          {{
                            fileSummary.spaSummary.pastSPAScheduledEntryList[0]
                              .totalAmount | toINR
                          }}
                        </div>
                      </template>
                      <template
                        v-if="
                          !fileSummary.spaSummary.pastSPAScheduledEntryList
                            .length
                        "
                      >
                        <div>Not Paid</div>
                      </template>
                  </div>
                  <!--  <v-list-item-subtitle
                      class="caption d-flex justify-space-between align-center"
                    >
                      <template
                        v-if="
                          fileSummary.spaSummary.pastSPAScheduledEntryList[0]
                        "
                      >
                        <div class="font-weight-bold">
                          {{
                            fileSummary.spaSummary.pastSPAScheduledEntryList[0]
                              .statusUpdatedOn | monthday
                          }}
                        </div>
                        <f-cell-status
                          :outlined="true"
                          :value="
                            fileSummary.spaSummary.pastSPAScheduledEntryList[0]
                              .status.id
                          "
                          :colorCodeData="msfScheduleStatusColorcode"
                        />
                        <div class="font-weight-bold primary--text text-right">
                          {{
                            fileSummary.spaSummary.pastSPAScheduledEntryList[0]
                              .totalAmount | toINR
                          }}
                        </div>
                      </template>
                      <template
                        v-if="
                          !fileSummary.spaSummary.pastSPAScheduledEntryList
                            .length
                        "
                      >
                        <div>Not Paid</div>
                      </template>
                    </v-list-item-subtitle> -->
                </div>
                <v-divider
                  v-if="i !== 3"
                  color="primary"
                  vertical
                  width="10px"
                  class="mx-3"
                />
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
    <!-- </v-toolbar> -->
    <!-- Client File Number and Client -->
    <!-- <div class="col-4">
      <v-card outlined color="primary">
        <v-list class="py-0">
          <v-list-item dense>
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold secondary--text text-body-1 d-flex"
              >
              <v-icon class="mr-2" color="secondary"> mdi-file-account </v-icon>
                <f-hover-copy v-model="clientFileBasicInfo.clientFileNumber">
                  {{ clientFileBasicInfo.clientFileNumber }}
                </f-hover-copy>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action class="justify-center align-center">
              <v-card flat class="d-flex my-1" style="justify-content: space-between">
                    
                    
                    <v-chip class="mr-2" v-if="fileSummary.ppCode" x-small color="secondary" outlined >{{fileSummary.ppCode}}</v-chip>
                    
                    <v-chip class="ml-2" v-if="clientFileBasicInfo.programCode" x-small  outlined>{{
                      clientFileBasicInfo.programCode
                    }}</v-chip>
                    
                    </v-card>
                    <v-chip x-small >{{
                      fileSummary.clientFileStatus.name
                    }}</v-chip>
                  
                </v-list-item-action>
              </v-list-item>
            
            
          <v-divider></v-divider>
              
          <v-list-item dense>
            <v-list-item-icon class="mr-2">
              <v-icon color="deep-purple"> mdi-account </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <f-hover-copy
                v-model="clientFileBasicInfo.clientBasicInfo.fullName"
              >
                <a @click="gotoClient">
                  <v-list-item-title
                    class="deep-purple--text text-body-1 overline"
                    >{{
                      clientFileBasicInfo.clientBasicInfo.fullName
                    }}</v-list-item-title
                  >
                </a>
              </f-hover-copy>
            </v-list-item-content>

            <v-list-item-action>
              <v-chip
                @click="gotoEmandateList"
                small
                v-if="fileSummary.eMandateActive"
                class="mx-2"
                color="green lighten-3"
                >EMandate Active</v-chip
              >

              <v-chip
                @click="gotoEmandateList"
                small
                v-else
                class="mx-2"
                color="secondary lighten-3"
                >EMandate Pending</v-chip
              >
            </v-list-item-action>
          </v-list-item>
          <v-list-item dense>
            <v-list-item-icon class="mr-2">
              <v-btn
                icon
                color="secondary"
                outlined
                small
                dense
                @click="openNavShow(clientFileBasicInfo.clientBasicInfo.mobile)"
              >
                <v-icon small>mdi-phone</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle
                class="text-body-1"
                
              >
                <f-hover-copy
                  v-model="clientFileBasicInfo.clientBasicInfo.mobile"
                >
                  {{ clientFileBasicInfo.clientBasicInfo.mobile | phone }}
                </f-hover-copy>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <f-hover-copy
                v-model="clientFileBasicInfo.clientBasicInfo.emailId"
              >
                <span class="caption mr-2"
                  >{{ clientFileBasicInfo.clientBasicInfo.emailId }}
                </span>
              </f-hover-copy>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
    <div class="col" v-if="!fileSummary.msfSummary">
      <v-sheet outlined color="secondary" rounded>
        <v-card
          outlined
          elevation="0"
          @click="gotoMSFPaymentPlan"
          min-height="123"
        >
          <v-list class="py-0">
            <v-list-item dense>
              <v-list-item-content>
                <v-list-item-title class="secondary--text text-subtitle-1"
                  >MSF
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action class="py-0 my-0">
                <div
                  class="d-flex secondary--text text-h6 font-weight-semibold"
                >
                  -
                </div>
              </v-list-item-action>
            </v-list-item>
            <v-divider />
            <v-list-item dense>
              <v-list-item-subtitle
                class="caption d-flex justify-space-between align-center"
              >
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-sheet>
    </div>

    <div class="col" v-if="fileSummary.msfSummary">
      <v-card outlined color="secondary" @click="gotoMSFPaymentPlan">
        <v-list class="py-0">
          <v-list-item dense>
            <v-list-item-content>
              <v-list-item-title class="secondary--text text-subtitle-1"
                >MSF
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action class="py-0 my-0">
              <div class="d-flex secondary--text text-h6 font-weight-semibold">
                {{ fileSummary.msfDraftAmount | toINR }}
              </div>
            </v-list-item-action>
          </v-list-item>
          <v-divider />

          <v-list-item dense>
            <v-list-item-subtitle
              class="caption d-flex justify-space-between align-center"
            >
              <div class="font-weight-bold">
                {{
                  fileSummary.msfSummary.upcomingMSFScheduledEntry.draftDate |
                    monthday
                }}
              </div>
              <f-cell-status
                :outlined="true"
                :value="
                  fileSummary.msfSummary.upcomingMSFScheduledEntry.status.id
                "
                :colorCodeData="msfScheduleStatusColorcode"
              />
              <div class="font-weight-bold secondary--text text-right">
                {{
                  fileSummary.msfSummary.upcomingMSFScheduledEntry.totalAmount |
                    toINR
                }}
              </div>
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item dense>
            <v-list-item-subtitle
              class="caption d-flex justify-space-between align-center"
            >
              <template
                v-if="!!fileSummary.msfSummary.pastMSFScheduledEntryList[0]"
              >
                <div class="font-weight-bold">
                  {{
                    fileSummary.msfSummary.pastMSFScheduledEntryList[0]
                      .statusUpdatedOn | monthday
                  }}
                </div>
                <f-cell-status
                  :outlined="true"
                  :value="
                    fileSummary?.msfSummary?.pastMSFScheduledEntryList[0].status
                      .id
                  "
                  :colorCodeData="msfScheduleStatusColorcode"
                />
                <div class="font-weight-bold secondary--text text-right">
                  {{
                    fileSummary.msfSummary.pastMSFScheduledEntryList[0]
                      .totalAmount | toINR
                  }}
                </div>
              </template>
              <template
                v-if="!fileSummary.msfSummary.pastMSFScheduledEntryList.length"
              >
                <div>Not Paid</div>
              </template>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
    <div class="col" v-if="!fileSummary.spaSummary">
      <v-sheet outlined color="secondary" rounded>
        <v-card
          outlined
          elevation="0"
          @click="gotoPaymentPlan"
          min-height="123"
        >
          <v-list class="py-0">
            <v-list-item dense>
              <v-list-item-content>
                <v-list-item-title class="secondary--text text-subtitle-1"
                  >SPA
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action class="py-0 my-0">
                <div
                  class="d-flex secondary--text text-h6 font-weight-semibold"
                >
                  -
                </div>
              </v-list-item-action>
            </v-list-item>
            <v-divider />
          </v-list>
        </v-card>
      </v-sheet>
    </div>

    <div class="col" v-if="fileSummary.spaSummary">
      <v-card outlined color="secondary" @click="gotoPaymentPlan">
        <v-list class="py-0">
          <v-list-item dense>
            <v-list-item-content>
              <v-list-item-title class="secondary--text text-subtitle-1"
                >SPA
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action class="py-0 my-0">
              <div class="d-flex secondary--text text-h6 font-weight-semibold">
                {{ fileSummary.spaSummary.spaAmount | toINR }}
              </div>
            </v-list-item-action>
          </v-list-item>
          <v-divider />

          <v-list-item dense>
            <v-list-item-subtitle
              class="caption d-flex justify-space-between align-center"
            >
              <div class="font-weight-bold">
                {{
                  fileSummary.spaSummary.upcomingSPAScheduledEntry.draftDate |
                    monthday
                }}
              </div>
              <f-cell-status
                :outlined="true"
                :value="
                  fileSummary.spaSummary.upcomingSPAScheduledEntry.status.id
                "
                :colorCodeData="msfScheduleStatusColorcode"
              />
              <div class="font-weight-bold secondary--text text-right">
                {{
                  fileSummary.spaSummary.upcomingSPAScheduledEntry.totalAmount |
                    toINR
                }}
              </div>
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item dense>
            <v-list-item-subtitle
              class="caption d-flex justify-space-between align-center"
            >
              <template
                v-if="fileSummary.spaSummary.pastSPAScheduledEntryList[0]"
              >
                <div class="font-weight-bold">
                  {{
                    fileSummary.spaSummary.pastSPAScheduledEntryList[0]
                      .statusUpdatedOn | monthday
                  }}
                </div>
                <f-cell-status
                  :outlined="true"
                  :value="
                    fileSummary.spaSummary.pastSPAScheduledEntryList[0].status
                      .id
                  "
                  :colorCodeData="msfScheduleStatusColorcode"
                />
                <div class="font-weight-bold secondary--text text-right">
                  {{
                    fileSummary.spaSummary.pastSPAScheduledEntryList[0]
                      .totalAmount | toINR
                  }}
                </div>
              </template>
              <template
                v-if="!fileSummary.spaSummary.pastSPAScheduledEntryList.length"
              >
                <div>Not Paid</div>
              </template>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
    <div class="col">
      <v-card outlined color="primary" @click="gotoCreditor">
        <v-list class="py-0">
          <v-list-item dense>
            <v-list-item-content>
              <v-list-item-title class="primary--text text-subtitle-1"
                >Creditors ({{ fileSummary.creditorsCount }})
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action class="py-0 my-0">
              <div class="d-flex primary--text text-subtitle-1">
                Settled({{ fileSummary.settledCreditorsCount }})
              </div>
            </v-list-item-action>
          </v-list-item>
          <v-divider />

          <v-list-item dense>
            <v-list-item-subtitle
              class="caption d-flex justify-space-between align-center"
            >
              <div>SPA Saving</div>
              <div
                class="font-weight-bold primary--text text-subtitle-1 text-right"
              >
                {{ fileSummary.totalSaving | toINR }}
              </div>
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item dense>
            <v-list-item-subtitle
              class="caption d-flex justify-space-between align-center"
            >
              <div>Total Outstanding</div>
              <div
                class="font-weight-bold primary--text text-subtitle-1 text-right"
              >
                {{ fileSummary.totalOutstanding | toINR }}
              </div>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </div> -->
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
        routerName: "Root.CFile.CFInfo.CFPersonalInfo"
      },
{
        name: "Budget",
        icon: "mdi-wallet",
        routerName: "Root.CFile.CFInfo.CFBudgetInfo"
      },
      {
        name: "Credit Card",
        icon: "mdi-credit-card",
        routerName: "Root.CFile.CFInfo.CFCreditorInfo"
      },
      {
        name: "Document",
        icon: "mdi-file-document",
        routerName: "Root.CFile.CFInfo.CFDocumentInfo"
      },
      {
        name: "payment plan",
        icon: "mdi-calendar-blank",
        routerName: "Root.CFile.CFInfo.CFPaymentPlanInfo"
      },
    ]
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



