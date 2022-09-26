<template>
  <div class="my-2">
    <v-card outlined>
      <div class="d-flex align-center">
        <v-card-title>BankInfo</v-card-title>
        <v-spacer />
        <v-btn text @click="goToProfileStep()">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>

       <div class="row pa-3">
        <div class="col-4">
          <div><strong>Account Number</strong></div>
          {{bankInfo.accountNumber}}
        </div>

        <div class="col-4">
          <div><strong>Total Debt Amount</strong></div>
          {{ bankName }}
        </div>
       </div>
    <!-- Implement WAD -->
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

@Component
export default class BankInfoSummary extends Vue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;
  bankName: string = "";

  get bankInfo() {
    return JSON.parse(this.taskDetails.taskOutput).bankInfo;
  }

  mounted() {
    this.getNupayBankMasterList()
  }

  
getNupayBankMasterList() {
    console.log(this.bankInfo.nupayBankMasterId)
    Action.ClientFile.GetNupayBankMasterList.execute((output) => {
      const bankSelected = output.nupayBankMasterList.filter(item => item.nupayBankId === this.bankInfo.nupayBankMasterId);
      console.log(bankSelected)
    });
  }

  goToProfileStep() {
    this.$router.push({ query: { step: "1" } });
  }
}
</script>