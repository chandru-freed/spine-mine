<template>
  <div class="my-2">
    <v-card outlined>
      <div class="d-flex align-center">
        <v-card-title>Payment Plan</v-card-title>
        <v-spacer />
        <v-btn text @click="goToProfileStep()">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>

       <div class="row pa-3">
        <div class="col-4">
          <div><strong>Total Repayment Amount</strong></div>
          <!-- {{ creditorInfo.creditorList.length }} -->
        </div>

        <div class="col-4">
          <div><strong>Tenure</strong></div>
          {{ paymentPlan.ppCalculator.tenor }}
        </div>

        <div class="col-4">
          <div><strong>MSF</strong></div>
          <!-- {{ creditorInfo.totalDebtAmount }} -->
        </div>

        <div class="col-4">
          <div><strong>SPA</strong></div>
          <!-- {{ creditorInfo.totalDebtAmount }} -->
        </div>

        <div class="col-4">
          <div><strong>SPA Draft Date</strong></div>
          {{ paymentPlan.ppCalculator.firstDraftDate | date }}
        </div>

        <div class="col-4">
          <div><strong>MSF Draft Date</strong></div>
          {{ paymentPlan.ppCalculator.feeFirstDraftDate | date }}
        </div>
       </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";

@Component
export default class PaymentPlanSummary extends Vue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  get paymentPlan() {
    return JSON.parse(this.taskDetails.taskOutput).paymentPlan;
  }

 

  mounted() {
    
  }

  goToProfileStep() {
    this.$router.push({ query: { step: "3" } });
  }
}
</script>