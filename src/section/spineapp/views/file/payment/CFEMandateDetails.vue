<template>
  <div class="CFEMandateDetails">
    <v-card outlined>
      <v-card-title>EMandate Details</v-card-title>
      <component
        :ref="eMandateDetailsFFormMetaData.myRefName"
        :is="eMandateDetailsFFormMetaData.componentName"
        :value="selectModel(eMandateDetals, undefined)"
        v-bind="eMandateDetailsFFormMetaData.props"
      ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import CFEMandateDetailsFFormMDP from "./CFEMandateDetailsFFormMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import FSnackbar from "@/fsnackbar";
@Component({
  components: {
    FDataTable,
    FForm,
  },
})
export default class CFPaymentTransactionList extends ModelVue {
  eMandateDetals: Data.ClientFile.FiEMandateSummary =
    new Data.ClientFile.FiEMandateSummary();

  eMandateId: string = this.$route.params.eMandateId;
  //Meta data
  get eMandateDetailsFFormMetaData() {
    return new CFEMandateDetailsFFormMDP({ parent: this }).getMetaData();
  }
  // Meta data
  mounted() {
    this.getEMandateDetails();
  }

  getEMandateDetails() {
    Action.ClientFile.GetEMandateDetails.execute1(
      this.eMandateId,
      (output: any) => {
        this.eMandateDetals = output;
      }
    );
  }

  isActive() {
    return (
      this.eMandateDetals.status.id ===
      Data.ClientFile.EMANDATE_STATUS.ACTIVE.id
    );
  }

  closeEMandateDetails() {
    this.$router.go(-1);
  }

  checkAndUpdateEMandate() {
    Action.ClientFile.CheckAndUpdateEMandate.execute1(
      this.eMandateId,
      (output) => {
        this.getEMandateDetails();
        FSnackbar.success("Successfully checked the emandate status");
      }
    );
  }
}
</script>

<style>
</style>
