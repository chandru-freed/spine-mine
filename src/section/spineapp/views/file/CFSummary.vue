<template>
  <div class="row">
    <div class="col-4">
      <v-card outlined color="primary" >
        <v-list class="py-0" >
          <v-list-item  dense>
              <v-list-item-icon class="mr-2">
                <v-icon color="secondary">
                  mdi-file-account
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                
                <v-list-item-title class="font-weight-bold secondary--text text-body-1">{{clientFileBasicInfo.clientFileNumber}} </v-list-item-title>

              </v-list-item-content>

              <v-list-item-action>
                <!-- <v-list-item-action-text >{{fileSummary.stage}} </v-list-item-action-text> -->
                <v-chip x-small class="mx-2">{{ fileSummary.stage}}</v-chip>
              </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item two-line >
              <v-list-item-icon class="mr-2" >
                <v-icon color="primary">
                  mdi-account
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="primary--text text-body-1 ">{{clientFileBasicInfo.clientBasicInfo.fullName}}</v-list-item-title>
                <!-- <v-list-item-action-text >active</v-list-item-action-text> -->
                <v-list-item-subtitle class="text-body-1">{{clientFileBasicInfo.clientBasicInfo.mobile | phone}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-chip x-small class="mx-2" color="green lighten-3">active</v-chip>
                <!-- <v-list-item-action-text >active</v-list-item-action-text> -->
                <!-- <v-list-item-subtitle class="text-body-1">{{clientFileBasicInfo.clientBasicInfo.mobile | phone}}</v-list-item-subtitle> -->
                <span class="caption mr-2">{{ clientFileBasicInfo.clientBasicInfo.emailId }} </span>

              </v-list-item-action>
          </v-list-item>
          </v-list>
      </v-card>
    </div>
    <div class="col" v-if="fileSummary">
     <div class="row" >
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
                <v-list-item-subtitle  class="caption"  >Due on {{fileSummary.msfDueDate | date}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </div>
      <div class="col">
        <v-sheet color="secondary" outlined rounded >
          <v-card flat min-height="75px">
            <v-list-item class="pa-1" dense>
              <v-list-item-content class="pa-0 px-1">
                <div class="text-caption mb-0 secondary--text">Monthly Obligation</div>
                <v-list-item-title
                  class="text-h6 mb-1 font-weight-semibold secondary--text"
                >
                  {{ fileSummary.totalMonthlyObligation | toINR }}
                  <span class="text-caption pl-1 pt-2">/ mth</span>
                </v-list-item-title>
                <v-list-item-subtitle class="caption" >Due on {{fileSummary.spaDueDate | date}}</v-list-item-subtitle>
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
                <div class="text-caption mb-0 primary--text">Total Savings</div>
                <v-list-item-title
                  class="text-h6 mb-1 font-weight-semibold primary--text"
                >
                  {{ fileSummary.totalSaving | toINR }}
                  <span class="text-caption pl-1 pt-2"></span>
                </v-list-item-title>
                <v-list-item-subtitle v-if="fileSummary.lastPaidDate">Last paid
                  {{
                    fileSummary.lastPaidDate | date
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </div>


      <div class="col">
        <v-sheet color="primary" outlined rounded >
          <v-card flat min-height="75px">
            <v-list-item class="pa-1" dense>
              <v-list-item-content class="pa-0 px-1">
                <div class="text-caption mb-0 primary--text">Total Outstanding</div>
                <v-list-item-title
                  class="text-h6 mb-1 font-weight-semibold primary--text"
                >
                  {{ fileSummary.totalOutstanding | toINR }}
                  <span class="text-caption pl-1 pt-2"></span>
                </v-list-item-title>
                 <v-list-item-subtitle ><v-btn block x-small outlined
                    >settled {{ fileSummary.settledCreditorsCount }} / {{ fileSummary.creditorsCount }}
                    Creditors</v-btn
                  ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </div>
     </div>
    </div>
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
import FTextField from "@/components/generic/form/field/FTextField.vue"
@Component({
  components: {
    "f-btn": FBtn,
    "f-text-field": FTextField,
    AboutView,
  },
})
export default class CFSummary extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: Data.ClientFile.FileSummary;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;


  minHeight = 80;
}
</script>

<style></style>
