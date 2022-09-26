<template>
  <div class="my-2">
    <v-card outlined>
      <div class="d-flex align-center">
        <v-card-title>Creditor</v-card-title>
        <v-spacer />
        <v-btn text @click="goToProfileStep()">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>

       <div class="row pa-3">
        <div class="col-4">
          <div><strong>Number of creditors</strong></div>
          {{ creditorInfo.creditorList.length }}
        </div>

        <div class="col-4">
          <div><strong>Total Debt Amount</strong></div>
          {{ creditorInfo.totalDebtAmount }}
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

@Component
export default class CreditorSummary extends Vue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  get creditorInfo() {
    return JSON.parse(this.taskDetails.taskOutput).creditorInfo;
  }

 

  mounted() {
    console.log(this.creditorInfo);
  }

  goToProfileStep() {
    this.$router.push({ query: { step: "1" } });
  }
}
</script>