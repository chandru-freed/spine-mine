<template>
  <div class="row">
    <!-- Client File Number and Client -->
    <div class="col-4">
      <v-card outlined color="primary">
        <v-list class="py-0">
          <v-list-item dense>
            <v-list-item-icon class="mr-2">
              <v-icon color="secondary"> mdi-file-account </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold secondary--text text-body-1"
              >
                <f-hover-copy v-model="clientFileBasicInfo.clientFileNumber">
                  {{ clientFileBasicInfo.clientFileNumber }}
                </f-hover-copy>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <!-- <v-list-item-action-text >{{fileSummary.clientFileStatus}} </v-list-item-action-text> -->
              <div class="d-flex">
                <!-- <v-chip x-small class="mx-2" v-if="!clientFileBasicInfo.isFirstMSFPaid" color="warning" outlined>FMSF Not Paid</v-chip>
              <v-chip x-small class="mx-2" v-if="clientFileBasicInfo.isFirstMSFPaid" color="green" outlined>FMSF Paid</v-chip> -->
                    <v-chip v-if="fileSummary.ppCode" x-small color="secondary" outlined >{{fileSummary.ppCode}}</v-chip>
                    <v-chip v-if="clientFileBasicInfo.programCode" x-small class="mx-2" outlined>{{
                      clientFileBasicInfo.programCode
                    }}</v-chip>
                    <v-chip x-small class="mx-2">{{
                      fileSummary.clientFileStatus.name
                    }}</v-chip>
                  </div>
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
                <a @click="gotoProfile">
                  <v-list-item-title
                    class="deep-purple--text text-body-1 overline"
                    >{{
                      clientFileBasicInfo.clientBasicInfo.fullName
                    }}</v-list-item-title
                  >
                </a>
              </f-hover-copy>
              <!-- <v-list-item-action-text >active</v-list-item-action-text> -->
            </v-list-item-content>

            <!-- <v-list-item-icon v-if="hover" > -->
            <!-- </v-list-item-icon> -->

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
    <!-- Client File Number and Client -->
    <!-- MSF -->
    <!-- <div class="col" v-if="fileSummary">
      <v-sheet color="secondary" outlined rounded v-if="fileSummary.msfSummary">
        <v-card flat min-height="75px">
          <v-list-item class="pa-1" dense>
            <v-list-item-content class="pa-0 px-1">
              <div class="text-caption mb-0 secondary--text">MSF</div>
              <v-list-item-title
                class="text-h6 mb-1 font-weight-semibold secondary--text"
              >
                {{ fileSummary.msfSummary.msfAmount | toINR }}
                <span class="text-caption pl-1 pt-2">/ mth</span>
              </v-list-item-title>
              <v-list-item-subtitle
                class="caption d-flex justify-space-between "
                >
                <div class=" font-weight-bold">{{ fileSummary.msfSummary.upcomingMSFScheduledEntry.draftDate | monthday}} </div>
                <div class="font-weight-bold secondary--text text-right">{{ fileSummary.msfSummary.upcomingMSFScheduledEntry.totalAmount | toINR}}</div>
                <div >{{ fileSummary.msfSummary.upcomingMSFScheduledEntry.status.id}}</div>    
              </v-list-item-subtitle> 
              <v-list-item-subtitle
                
                class="caption d-flex justify-space-between "
                >
                <template v-if="fileSummary.msfSummary.pastMSFScheduledEntryList[0]">
                <div class=" font-weight-bold" >{{ fileSummary.msfSummary.pastMSFScheduledEntryList[0].draftDate | monthday}} </div>
                <div class="font-weight-bold secondary--text text-right">{{ fileSummary.msfSummary.pastMSFScheduledEntryList[0].totalAmount | toINR}}</div>
                <div >{{ fileSummary.msfSummary.pastMSFScheduledEntryList[0].status.id}}</div>  
                </template>  
              </v-list-item-subtitle> 
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-sheet>
    </div> -->
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
                <!-- <template v-if="fileSummary.msfSummary.pastMSFScheduledEntryList[0]">
                <div class=" font-weight-bold" >{{ fileSummary.msfSummary.pastMSFScheduledEntryList[0].draftDate | monthday}} </div>
                <div class="font-weight-bold secondary--text text-right">{{ fileSummary.msfSummary.pastMSFScheduledEntryList[0].totalAmount | toINR}}</div>
                <div >{{ fileSummary.msfSummary.pastMSFScheduledEntryList[0].status.id}}</div>  
                </template>   -->
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
                {{ fileSummary.msfSummary.msfAmount | toINR }}
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
              <!-- <div >{{ fileSummary.msfSummary.upcomingMSFScheduledEntry.status.id}}</div>     -->
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
                <!-- <div >{{ fileSummary.msfSummary.pastMSFScheduledEntryList[0].status.id}}</div>   -->
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
    <!-- MSF -->
    <!-- SPA -->
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
              <!-- <div >{{ fileSummary.spaSummary.upcomingSPAScheduledEntry.status.id}}</div>     -->
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
                <!-- <div >{{ fileSummary.spaSummary.pastSPAScheduledEntryList[0].status.id}}</div>   -->
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
    <!-- SPA -->
    <!-- CREDITOR -->
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
            <!-- <v-list-item-action class="py-0 my-0">
              <div class="d-flex primary--text  text-subtitle-1">
              <v-chip x-small>Emandate Active </v-chip>
              </div>
            </v-list-item-action> -->
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
    </div>
    <!-- <div class="col" v-if="fileSummary">
      <v-sheet color="primary" outlined rounded>
        <v-card flat min-height="125" @click="gotoCreditor">
          <v-list class="py-0">
            <v-list-item-content class="py-1 px-2" dense>
              <div class="d-flex justify-space-between">
                <div class="text-md  mb-0 primary--text">
                  Settled
                  {{ fileSummary.settledCreditorsCount }} /
                  {{ fileSummary.creditorsCount }} Creditors 
                </div>
              </div>
            </v-list-item-content>
            <v-divider></v-divider>
            <v-list-item class="py-0 px-2">
              <v-list-item-content class="pa-0">
                <div class="d-flex justify-space-between align-center">
                  <div class="text-caption mb-0 primary--text">
                    Total Savings
                  </div>
                  <div
                    class="text-h6 mb-1 font-weight-semibold primary--text"
                  >
                    {{ fileSummary.totalSaving | toINR }}
                    <span class="text-caption pl-1 pt-2"></span>
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
              <v-list-item class="py-0 px-2">
              <v-list-item-content class="pa-0">
                <div class="d-flex justify-space-between align-center">
                  <div class="text-caption mb-0 primary--text">
                    Total Outstanding
                  </div>
                  <div
                    class="text-h6 mb-1 font-weight-semibold primary--text"
                  >
                    {{ fileSummary.totalOutstanding | toINR }}
                    <span class="text-caption pl-1 pt-2"></span>
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-sheet>
    </div> -->
    <!-- CREDITOR -->
    <!-- <div class="col" v-if="fileSummary">
      <div class="row">
        <div class="col">
          <v-sheet color="secondary" outlined rounded>
            <v-card flat min-height="75px">
              <v-list-item class="pa-1" dense>
                <v-list-item-content class="pa-0 px-1">
                  <div class="text-caption mb-0 secondary--text">MSF</div>
                  <v-list-item-title
                    class="text-h6 mb-1 font-weight-semibold secondary--text"
                  >
                    {{ fileSummary.msfAmount | toINR }}
                    <span class="text-caption pl-1 pt-2">/ mth</span>
                  </v-list-item-title>
                  <v-list-item-subtitle
                    v-if="fileSummary.msfDueDate"
                    class="caption"
                    >Due on
                    {{ fileSummary.msfDueDate | date }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-sheet>
        </div>
        <div class="col">
          <v-sheet color="secondary" outlined rounded>
            <v-card flat min-height="75px">
              <v-list-item class="pa-1" dense>
                <v-list-item-content class="pa-0 px-1">
                  <div class="text-caption mb-0 secondary--text">
                    Monthly Obligation
                  </div>
                  <v-list-item-title
                    class="text-h6 mb-1 font-weight-semibold secondary--text"
                  >
                    {{ fileSummary.totalMonthlyObligation | toINR }}
                    <span class="text-caption pl-1 pt-2">/ mth</span>
                  </v-list-item-title>
                  <v-list-item-subtitle
                    class="caption"
                    v-if="fileSummary.spaDueDate"
                    >Due on
                    {{ fileSummary.spaDueDate | date }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-sheet>
        </div>

        <div class="col">
          <v-sheet color="primary" outlined rounded>
            <v-card flat min-height="75px">
              <v-list-item class="pa-1" dense>
                <v-list-item-content class="pa-0 px-1">
                  <div class="text-caption mb-0 primary--text">
                    Total Savings
                  </div>
                  <v-list-item-title
                    class="text-h6 mb-1 font-weight-semibold primary--text"
                  >
                    {{ fileSummary.totalSaving | toINR }}
                    <span class="text-caption pl-1 pt-2"></span>
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="fileSummary.lastPaidDate"
                    >Last paid
                    {{ fileSummary.lastPaidDate | date }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-sheet>
        </div>

        <div class="col">
          <v-sheet color="primary" outlined rounded>
            <v-card flat min-height="75px">
              <v-list-item class="pa-1" dense>
                <v-list-item-content class="pa-0 px-1">
                  <div class="text-caption mb-0 primary--text">
                    Total Outstanding
                  </div>
                  <v-list-item-title
                    class="text-h6 mb-1 font-weight-semibold primary--text"
                  >
                    {{ fileSummary.totalOutstanding | toINR }}
                    <span class="text-caption pl-1 pt-2"></span>
                  </v-list-item-title>
                  <v-list-item-subtitle
                    ><v-btn block x-small outlined
                      >settled {{ fileSummary.settledCreditorsCount }} /
                      {{ fileSummary.creditorsCount }} Creditors</v-btn
                    ></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-sheet>
        </div>
      </div>
    </div> -->
  </div>

  <!-- <div class="col">
        <v-sheet color="primary" outlined rounded>
          <v-card flat color="primary" :min-height="minHeight">
            <v-list-item two-line class="pa-1">
              <v-list-item-content class="pa-0 px-1">
                <div class="text-caption mb-0 white--text">Total Savings</div>
                <v-list-item-title
                  class="text-h6 mb-1 font-weight-semibold secondary--text"
                >
                  {{ fileSummary.totalSaving | toINR }}
                </v-list-item-title>
                <v-list-item-subtitle class="white--text"
                v-if="fileSummary.lastPaidDate"
                  >Last paid
                  {{
                    fileSummary.lastPaidDate | date
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </div> -->
  <!-- <div class="col">
        <v-sheet color="primary" outlined rounded>
          <v-card flat >
            <v-list-item two-line class="pa-1">
              <v-list-item-content class="pa-0 px-1">
                <div class="text-caption mb-0 primary--text">
                  Total Outstanding
                </div>
                <v-list-item-title
                  class="text-h6 mb-1 font-weight-semibold primary--text"
                >
                  {{ fileSummary.totalOutstanding | toINR }}
                  <span class="text-subtitle-1 pl-1 pt-2" v-if="fileSummary.remainingTenure "
                    >/ {{ fileSummary.remainingTenure }} mths</span
                  >
                </v-list-item-title>
                <v-list-item-subtitle ><v-btn block x-small outlined
                    >settled {{ fileSummary.settledCreditorsCount }} / {{ fileSummary.creditorsCount }}
                    Creditors</v-btn
                  ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </div> -->
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
import Helper from "../../util/Helper";
import FHoverCopy from "@/components/generic/FHoverCopy.vue";
@Component({
  components: {
    "f-btn": FBtn,
    "f-text-field": FTextField,
    AboutView,
    FCellStatus,
    FHoverCopy,
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

  gotoPayment() {
    this.$router.push({ name: "Root.CFile.CFPayment.CFPaymentList" });
  }

  gotoEmandateList() {
    this.$router.push({ name: "Root.CFile.CFPayment.CFEMandateList" });
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

<style></style>
