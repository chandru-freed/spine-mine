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
              <v-btn
                block
                outlined
                small
                color="primary"
                @click="handleCreateRequestClick()"
                >Create Flow</v-btn
              >
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
                  <v-btn
                    block
                    outlined
                    small
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    >More Action <v-icon small>mdi-chevron-down</v-icon></v-btn
                  >
                </template>

                <v-list>
                  <template v-for="(mainItem, index) in main">
                    <v-subheader
                      v-if="mainItem.children"
                      :key="mainItem.name"
                      >{{ mainItem.name }}</v-subheader
                    >
                    <v-list-item
                      @click="gotoRouter(mainItem.routerName)"
                      dense
                      :key="mainItem.name"
                      link
                      v-if="!mainItem.children"
                    >
                      <v-list-item-title
                        v-text="mainItem.name"
                      ></v-list-item-title>

                      <v-list-item-icon>
                        <v-icon v-text="mainItem.icon"></v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                    <div :key="index">
                      <template v-for="(childItem, i) in mainItem.children">
                        <v-list-item
                          dense
                          :key="i"
                          link
                          @click="gotoRouter(childItem.routerName)"
                        >
                          <v-list-item-title
                            v-text="childItem.name"
                          ></v-list-item-title>

                          <v-list-item-icon>
                            <v-icon v-text="childItem.icon"></v-icon>
                          </v-list-item-icon>
                        </v-list-item>
                      </template>
                      <v-divider v-if="main.length - 1 > index"></v-divider>
                    </div>
                  </template>
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
    "client-file-summary-card": ClientFileSummaryCard,
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

  main = [
    {
      name: "Create Flow",
      routerName: "Root.ClientFile.Request.FileCreateRequest",
    },
    {
      name: "Notify",
      children: [
        { name: "Send Email", routerName: "Root.ClientFile.Request.SendEmail" },
        { name: "Send SMS", routerName: "Root.ClientFile.Request.SendSMS" },
        { name: "Send Whatsapp", routerName: "Root.ClientFile.Request.SendWhatsapp" },
      ],
    },
    {
      name: "Assign",
      children: [
        { name: "Assign RM", routerName: "Root.ClientFile.Request.AssignRM" },
        {
          name: "Assign Sales Rep",
          routerName: "Root.ClientFile.Request.AssignSalesRep",
        },
      ],
    },
    {
      name: "PAYMENT",
      children: [
        {
          name: "Record Payment",
          routerName: "Root.ClientFile.Request.RecordPayment",
        },
        {
          name: "Receive Payment",
          routerName: "Root.ClientFile.Request.RecordPayment",
        },
        {
          name: "Receive MSF Payment",
          routerName: "Root.ClientFile.Request.ReceiveMSFPayment",
        },
      ],
    },
  ];
  mounted() {}

  gotoRouter(routerName: string) {
    this.$router.push({ name: routerName });
  }

  handleCreateRequestClick(){
    this.$router.push({ name: "Root.ClientFile.Request.FileCreateRequest" });
  }
}
</script>

<style></style>
