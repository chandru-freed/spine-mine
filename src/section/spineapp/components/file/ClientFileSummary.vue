<template>
  <div>
    <div class="row px-2 pt-2 pb-4 align-center justify-between">
      <div class="col-4 pb-0">
        <v-list-item>
          <v-list-item-avatar tile size="80" color="primary">
            <v-icon size="40" color="secondary">mdi-file</v-icon>
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
      </div>
      <div class="col-7">
        <v-chip
          outlined
          label
          color="secondary"
          class="mr-5"
          v-if="clientFileBasicInfo.assignedRM"
          >{{ "RM : " + clientFileBasicInfo.assignedRM }}</v-chip
        >
        <v-chip
          outlined
          label
          color="secondary"
          v-if="clientFileBasicInfo.assignedSalesRep"
          >{{ "Sales Rep : " + clientFileBasicInfo.assignedSalesRep }}</v-chip
        >
      </div>
      <!-- <div class="col-5 pb-0">
        <v-alert dense outlined type="error">
          I'm a dense alert with the <strong>outlined</strong> prop and a
          <strong>type</strong> of error
        </v-alert>
      </div> -->
      <div class="text-right pt-0">
        <v-menu
          offset-y
          left
          nudge-bottom="14"
          min-width="230"
          content-class="user-profile-menu-content"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-avatar size="40px" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-avatar>
          </template>
          <v-list>
            <!-- Assign RM -->
            <v-list-item @click="handleAssignRMClick()">
              <v-list-item-content>
                <v-list-item-title>Assign RM</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!-- Assign Sales Rep -->
            <v-list-item @click="handleAssignSalesRepClick()">
              <v-list-item-content>
                <v-list-item-title>Assign Sales Rep</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- Create File Request  -->
            <v-list-item @click="handleCreateRequestClick()">
              <v-list-item-content>
                <v-list-item-title>Create Request</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="handleRecordPaymentClick()">
              <v-list-item-content>
                <v-list-item-title>Record Payment</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="handleReceivePaymentClick()">
              <v-list-item-content>
                <v-list-item-title>Receive Payment</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="handleReceiveMSFPaymentClick()">
              <v-list-item-content>
                <v-list-item-title>Receive MSF Payment by Cashfree</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="text-right pt-0">
        <v-btn
          icon
          v-if="!showLessSummary"
          @click="showLessSummary = !showLessSummary"
          ><v-icon>mdi-chevron-up</v-icon></v-btn
        >
        <v-btn
          icon
          v-if="showLessSummary"
          @click="showLessSummary = !showLessSummary"
          ><v-icon>mdi-chevron-down</v-icon></v-btn
        >
      </div>
    </div>
    <div
      class="row px-4 pb-2 pt-0 align-center justify-between"
      v-if="fileSummary && !showLessSummary"
    >
      <div class="col-3">
        <v-sheet color="secondary" outlined rounded>
          <v-card flat>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-0 secondary--text">MSF</div>
                <v-list-item-title
                  class="text-h5 mb-1 text-h5 font-weight-semibold secondary--text"
                >
                  ₹ {{ fileSummary.msfAmount }}
                  <span class="text-caption pl-1 pt-2">/ MONTH</span>
                </v-list-item-title>
                <v-list-item-subtitle
                  >Due on
                  {{
                    fileSummary.msfDueDate | date-duration
                  }}</v-list-item-subtitle
                >
                <!-- >Due on 3rd July (5 days to go)</v-list-item-subtitle> -->
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
                  ₹ {{ fileSummary.spaAmount }}
                  <span class="text-caption pl-1 pt-2">/ MONTH</span>
                </v-list-item-title>
                <v-list-item-subtitle
                  >Due on
                  {{
                    fileSummary.spaDueDate | date - duration
                  }}</v-list-item-subtitle
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
                  ₹ {{ fileSummary.totalSaving }}
                </v-list-item-title>
                <v-list-item-subtitle class="white--text"
                  >Last paid
                  {{
                    fileSummary.lastPaidDate | date-duration
                  }}</v-list-item-subtitle
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
                  ₹ {{ fileSummary.totalOutstanding }}
                  <span class="text-subtitle-1 pl-1 pt-2"
                    >/ {{ fileSummary.remainingTenure }} months</span
                  >
                </v-list-item-title>
                <v-list-item-subtitle
                  ><v-btn block x-small outlined dark
                    >{{ fileSummary.numberOfCredirotrsSettled }} Settled out of
                    {{ fileSummary.numberOfCreditorsTotal }} Total
                    Creditors</v-btn
                  ></v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </div>
    </div>
    <div class="pa-5 justify-center" v-if="!fileSummary && !showLessSummary">
      <v-alert dense outlined color="info">
        <small class="d-flex justify-center">Not yet available</small>
      </v-alert>
    </div>
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

@Component({
  components: {
    "f-btn": FBtn,
  },
})
export default class ClientFileSummary extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: any;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  public showLessSummary = true;

  public mounted() {
    console.log(this.fileSummary);
  }

  public created() {}

  handleAssignRMClick() {
    this.$router.push({ name: "Root.ClientFile.Request.AssignRM" });
  }

  handleAssignSalesRepClick() {
    this.$router.push({ name: "Root.ClientFile.Request.AssignSalesRep" });
  }
  handleCreateRequestClick() {
    this.$router.push({ name: "Root.ClientFile.Request.FileCreateRequest" });
  }

  handleRecordPaymentClick() {
    this.$router.push({ name: "Root.ClientFile.Request.RecordPayment" });
  }

  handleReceivePaymentClick() {
    this.$router.push({ name: "Root.ClientFile.Request.ReceivePayment" });
  }

  handleReceiveMSFPaymentClick() {
    this.$router.push({ name: "Root.ClientFile.Request.ReceiveMSFPayment" });
  }
}
</script>

<style></style>
