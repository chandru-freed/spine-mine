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
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>EMandate List</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <f-add-btn
                outlined
                label="Create EMandate"
                @click="gotoCreateEMandate()"
              />
            </v-toolbar>
          </template>
          <template v-slot:[`item.amount`]="{ item }">
            {{ item.amount | toINR }}
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              small
              outlined
              color="primary"
              @click="markDefault(item.eMandateId)"
            >
              Mark Default
            </v-btn>
          </template>
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
import FAddBtn from "@/components/generic/FAddBtn.vue";

@Component({
  components: {
    FAddBtn,
  },
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
    { text: "Status", value: "eMandateStatus.id" },
    { text: "Account Number", value: "accountNumber" },
    { text: "IFSC Code", value: "ifscCode" },
    { text: "Account Type", value: "accountType.name" },
    { text: "Amount", value: "amount" },
    { text: "Action", value: "actions" },
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
  gotoCreateEMandate() {
    this.$router.push({
      name: "Root.CFile.CFAction.CFCreateRequest",
      query: { flowName: "EMandate" },
    });
  }

  markDefault(eMandateId: string) {
    Action.ClientFile.MarkEMandateAsDefault.execute1(eMandateId, (output) => {
      Snackbar.show({
        text: "Succesfully marked as default",
        pos: "bottom-center",
      });
      this.getEMandateList();
    });
  }
}
</script>
