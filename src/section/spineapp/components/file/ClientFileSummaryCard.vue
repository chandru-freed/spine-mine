<template>
  <div>
    <!-- {{ fileSummary }} -->
    <div class="row pa-3 pb-0">
      <v-toolbar
        class="elevation-0 mx-0"
        rounded
        outlined
      >
        <!-- <v-toolbar-title>  -->
          <!-- <v-btn icon>
            <v-icon size="30" color="secondary">mdi-file</v-icon>
          </v-btn>
          <div class="text-uppercase subtitle-1 font-weight-light mx-2">
            {{ clientFileBasicInfo.clientFileNumber}}
          </div> -->
          <v-btn large text class="px-1 mr-2">
            <v-icon size="30" color="secondary" class="mr-1">mdi-file-account</v-icon>
            {{ clientFileBasicInfo.clientFileNumber}}
            <v-chip x-small class="mx-2">{{ fileSummary.stage}}</v-chip>
          </v-btn>
          
          <v-divider vertical class="mr-4"></v-divider>

          <span class="body-1 mr-2">{{ clientFileBasicInfo.clientBasicInfo.fullName }} </span>
          <!-- <v-btn color="grey" outlined class="subtitle-1 pa-2">{{ clientFileBasicInfo.clientBasicInfo.mobile }} </v-btn> -->
          <v-chip color="green lighten-3 mr-2" label>{{ clientFileBasicInfo.clientBasicInfo.mobile | phone }} </v-chip>
          <span class="caption mr-2">{{ clientFileBasicInfo.clientBasicInfo.emailId }} </span>
          <v-spacer></v-spacer>
          <v-chip
            outlined
            small
            color="secondary"
            v-if="clientFileBasicInfo.assignedRM"
            class="mr-2"
            >{{ "RM : " + clientFileBasicInfo.assignedRM }}</v-chip
          >
          <v-chip
            outlined
            small
            color="secondary"
            v-if="clientFileBasicInfo.assignedSalesRep"
            class="mr-2"
            >{{ "Sales Rep : " + clientFileBasicInfo.assignedSalesRep }}</v-chip
          >
          
        <!-- </v-toolbar-title> -->
      </v-toolbar>
    </div>
    <div class="row" v-if="fileSummary">
      <!-- <div class="col pb-0">
        <v-list-item>
          <v-list-item-avatar icon>
            <v-icon size="30" color="secondary">mdi-file</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-overline">{{
              clientFileBasicInfo.clientFileNumber
            }}</v-list-item-title>
            <v-list-item-title class="text-h5">
              {{ clientFileBasicInfo.clientBasicInfo.firstName }}
              {{ clientFileBasicInfo.clientBasicInfo.middleName }}
              {{ clientFileBasicInfo.clientBasicInfo.lastName }}
            </v-list-item-title>

            <v-list-item-subtitle
              class="text-h6"
              v-text="clientFileBasicInfo.clientBasicInfo.mobile"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div> -->
      <div class="col">
        <v-sheet color="secondary" outlined rounded>
          <v-card flat :min-height="minHeight">
            <v-list-item two-line class="pa-1">
              <v-list-item-content class="pa-0 px-1">
                <div class="text-caption mb-0 secondary--text">MSF</div>
                <v-list-item-title
                  class="text-h6 mb-1 font-weight-semibold secondary--text"
                >
                  {{ fileSummary.msfAmount | toINR }}
                  <span class="text-caption pl-1 pt-2">/ MONTH</span>
                </v-list-item-title>
                <v-list-item-subtitle
                v-if="fileSummary.msfDueDate"
                  >Due on
                  {{
                    fileSummary.msfDueDate | date
                  }}</v-list-item-subtitle
                >
                <!-- >Due on 3rd July (5 days to go)</v-list-item-subtitle> -->
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </div>
      <div class="col">
        <v-sheet color="secondary" outlined rounded>
          <v-card flat :min-height="minHeight">
            <v-list-item two-line class="pa-1">
              <v-list-item-content class="pa-0 px-1">
                <div class="text-caption mb-0 secondary--text">SPA</div>
                <v-list-item-title
                  class="text-h6 mb-1 font-weight-semibold secondary--text"
                >
                  {{ fileSummary.spaAmount  | toINR }}
                  <span class="text-caption pl-1 pt-2">/ MONTH</span>
                </v-list-item-title>
                <v-list-item-subtitle
                v-if="fileSummary.spaDueDate"
                  >Due on
                  {{
                    fileSummary.spaDueDate | date
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </div>
      <div class="col">
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
      </div>
      <div class="col">
        <v-sheet color="primary" outlined rounded>
          <v-card flat color="primary" :min-height="minHeight">
            <v-list-item two-line class="pa-1">
              <v-list-item-content class="pa-0 px-1">
                <div class="text-caption mb-0 white--text">
                  Total Outstanding
                </div>
                <v-list-item-title
                  class="text-h6 mb-1 font-weight-semibold secondary--text"
                >
                  {{ fileSummary.totalOutstanding | toINR }}
                  <span class="text-subtitle-1 pl-1 pt-2" v-if="fileSummary.remainingTenure "
                    >/ {{ fileSummary.remainingTenure }} months</span
                  >
                </v-list-item-title>
                <v-list-item-subtitle
                  ><v-btn block x-small outlined dark
                    >settled {{ fileSummary.settledCreditorsCount }} / {{ fileSummary.creditorsCount }}
                    Creditors</v-btn
                  ></v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </div>
    </div>
    <!-- <div class="pa-5 justify-center" v-if="!fileSummary && !showLessSummary">
      <v-alert dense outlined color="info">
        <small class="d-flex justify-center">Not yet available</small>
      </v-alert>
    </div> -->
  </div>
  <!-- </v-card> -->

  <!-- <v-container fluid> -->
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
export default class ClientFileSummaryCard extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: Data.ClientFile.FileSummary;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;


  minHeight = 80;
}
</script>

<style></style>
