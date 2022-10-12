<template>
  <div class="row">
    <div class="col-10">
      <v-card class="mx-auto pa-2" outlined>
        <!-- <client-file-summary :file-details="fileDetails"></client-file-summary> -->
        <client-file-summary-card></client-file-summary-card>
      </v-card>
    </div>
    <div class="col-2">
      <v-card class="mx-auto py-1" outlined min-height="101">
        <v-card-actions>
          <v-row dense>
            <v-col class="col-12">
              <v-btn block outlined small color="primary"  @click="handleCreateRequestClick()">Create Flow</v-btn>
            </v-col>
            <!-- <v-col class="col-12">
              <v-btn block outlined small color="primary" @click="handleAssignRMClick()">Assign RM</v-btn>
            </v-col> -->
            <v-col class="col-12">
              <v-menu 
                offset-y
                left
                nudge-bottom="14"
                min-width="230"
                content-class="user-profile-menu-content"
              >
                <template v-slot:activator="{ on, attrs }">
                  <!-- <v-avatar size="40px" v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-avatar> -->
                  <v-btn block outlined small color="primary" v-bind="attrs" v-on="on"
                    >More Action <v-icon small>mdi-chevron-down</v-icon></v-btn
                  >
                </template>
                <v-list>
                  <v-list-item @click="handleAssignRMClick()">
                    <v-list-item-content>
                      <v-list-item-title>Assign RM</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="handleAssignSalesRepClick()">
                    <v-list-item-content>
                      <v-list-item-title>Assign Sales Rep</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
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
                      <v-list-item-title
                        >Receive MSF Payment by Cashfree</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import ClientFileSummary from "@/section/spineapp/components/file/ClientFileSummary.vue";
import { SpineApi } from "@/remote-api-point";
import ClientFileSummaryCard from "../../components/file/ClientFileSummaryCard.vue";

@Component({
  components: {
    "client-file-summary": ClientFileSummary,
    "client-file-summary-card": ClientFileSummaryCard
  },
})
export default class FileSummary extends Vue {
  clientFileNumber: string = this.$route.params.clientFileNumber;
  fileDetails = {
    clientName: "John Doe",
    clientFileNumber: "KFS-123-123-1234",
    phoneNumber: "987-654-3210",
    program: "DSP",
    plan: "699",
    totalOutstandingAmount: "2,40,000",
    spaBalance: "50,000",
    tenure: "24 months",
    noOfCreditors: "5",
    noOfCreditorsSettled: "2",
    msf: {
      monthlyPlan: "699",
    },
    spa: {
      monthlyPlan: "13,000",
    },
  };
  mounted() {}

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
