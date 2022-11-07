<template>
  <div class="CFEMandateList">
    <v-col class="col-12">
      <!--GRID START-->
      <v-card flat outlined>
        <v-data-table
          :headers="headers"
          :items="fiEMandateList"
          sort-by="lastDateOfPayment"
          class="elevation-0"
        >
        </v-data-table>
      </v-card>
      <!--GRID END-->
    </v-col>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import store, * as Store from "@/../src-gen/store";
import FBtn from "@/components/generic/FBtn.vue";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

@Component({
  components: {},
})
export default class FEMandate extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiEMandateList
  fiEMandateList: Data.ClientFile.FiEMandateList;

  headers = [
    {
      text: "Account Holder Name",
      align: "start",
      sortable: false,
      value: "accountHolderName",
    },
    { text: "Account Number", value: "accountNumber" },
    { text: "IFSC Code", value: "ifscCode" },
    { text: "Account Type", value: "accountType" },
    { text: "City", value: "bankAddress.city" },
    { text: "Actions", value: "actions" },
  ];

  clientFileId = this.$route.params.clientFileId;

  mounted() {
    this.getEMandateList();
  }

  getEMandateList() {
    Action.ClientFile.GetEMandateList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
}
</script>
