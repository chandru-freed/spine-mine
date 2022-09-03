<template>
  
  <div>
    
    <div class="row px-2 pt-2 pb-4 align-center justify-between">
      <div class="col-4  pb-0">
        <v-list-item>
          <v-list-item-avatar tile size="80" color="primary">
            <v-icon size="40" color="secondary">mdi-file</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-overline">{{
              clientFileBasicInfo.clientFileNumber
            }}</v-list-item-title>
            <v-list-item-title class="text-h5">
              {{ clientFileBasicInfo.clientBasicInfo.firstName }} {{ clientFileBasicInfo.clientBasicInfo.middleName }} {{ clientFileBasicInfo.clientBasicInfo.lastName }}
            </v-list-item-title>

            <v-list-item-subtitle
              class="text-h6"
              v-text="clientFileBasicInfo.clientBasicInfo.mobile"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div class="col-7  pb-0">
        <v-alert dense outlined type="error">
          I'm a dense alert with the <strong>outlined</strong> prop and a
          <strong>type</strong> of error
        </v-alert>
      </div>
      <div class="col-1 text-right pt-0">
        <v-btn icon v-if="!showLessSummary" @click="showLessSummary = !showLessSummary"><v-icon>mdi-chevron-up</v-icon></v-btn>
        <v-btn icon v-if="showLessSummary" @click="showLessSummary = !showLessSummary"><v-icon>mdi-chevron-down</v-icon></v-btn>
      </div>
    </div>
    <div class="row px-4 pb-2 pt-0 align-center justify-between" v-if="!showLessSummary">
      <div class="col-3">
        <v-sheet color="secondary" outlined rounded>
          <v-card flat>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-0 secondary--text">MSF</div>
                <v-list-item-title
                  class="text-h5 mb-1 text-h5 font-weight-semibold secondary--text"
                >
                  ₹ {{ fileDetails.msf.monthlyPlan }}
                  <span class="text-caption pl-1 pt-2">/ MONTH</span>
                </v-list-item-title>
                <v-list-item-subtitle
                  >Due on 3rd July (5 days to go)</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </div>
      <div class="col-3">
        <v-sheet color="secondary" outlined rounded>
          <v-card flat>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-0 secondary--text">SPA</div>
                <v-list-item-title
                  class="text-h5 mb-1 text-h5 font-weight-semibold secondary--text"
                >
                  ₹ {{ fileDetails.spa.monthlyPlan }}
                  <span class="text-caption pl-1 pt-2">/ MONTH</span>
                </v-list-item-title>
                <v-list-item-subtitle
                  >Due on 12rd July (12 days to go)</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </div>
      <div class="col-3">
        <v-sheet color="primary" outlined rounded>
          <v-card flat color="primary">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-0 white--text">Total Savings</div>
                <v-list-item-title
                  class="text-h5 mb-1 text-h5 font-weight-semibold secondary--text"
                >
                  ₹ {{ fileDetails.spaBalance }}
                </v-list-item-title>
                <v-list-item-subtitle class="white--text"
                  >Last paid 12th June (15 days ago)</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </div>
      <div class="col-3">
        <v-sheet color="primary" outlined rounded>
          <v-card flat color="primary">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-0 white--text">
                  Total Outstanding
                </div>
                <v-list-item-title
                  class="text-h5 mb-1 text-h5 font-weight-semibold secondary--text"
                >
                  ₹ {{ fileDetails.totalOutstandingAmount }}
                  <span class="text-subtitle-1 pl-1 pt-2">/ 24 months</span>
                </v-list-item-title>
                <v-list-item-subtitle
                  ><v-btn block x-small outlined dark
                    >{{ fileDetails.noOfCreditorsSettled }} Settled out of
                    {{ fileDetails.noOfCreditors }} Total Creditors</v-btn
                  ></v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </div>
    </div>
  </div>
  <!-- </v-card> -->

  <!-- <v-container fluid> -->
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from '@/../src-gen/store';
import * as Data from '@/../src-gen/data';
import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';

@Component
export default class ClientFileSummary extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Prop()
  public fileDetails: any;

  public showLessSummary = true;

  // public fileDetails = {
  //   clientName: "John Doe",
  //   fileId: "KFS-123-123-1234",
  //   phoneNumber: "987-654-3210",
  //   program: "DSP",
  //   plan: "699",
  //   totalOutstandingAmount: "2,40,000",
  //   tenure: "24 months",
  //   noOfCreditors: "3",
  // };

  public mounted() {}

  public created() {}
}
</script>

<style></style>
