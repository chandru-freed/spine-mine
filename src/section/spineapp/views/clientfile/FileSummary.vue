<template>
  <v-card class="mx-auto mb-2" outlined>
    <client-file-summary :file-details="fileDetails"></client-file-summary>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from '@/../src-gen/store';
import * as Data from '@/../src-gen/data';
import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';
import ClientFileSummary from "@/section/spineapp/components/file/ClientFileSummary.vue";
import { SpineApi } from "@/remote-api-point";

@Component({
  components: {
    "client-file-summary": ClientFileSummary,
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
  mounted() {
  }
}
</script>

<style></style>
