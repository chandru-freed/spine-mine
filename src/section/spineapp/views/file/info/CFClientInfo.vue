<template>
  <div class="CFClientInfo">
    <div class="col-md-4">
      <v-card outlined color="grey lighten-3">
        <!-- <v-card-subtitle class="px-2 py-1 overline"
          >Client Info</v-card-subtitle
        > -->
        <v-list dense class="py-0">
          <v-list-item>
            <v-list-item-content class="pa-0">
              <v-list-item-title>Emandate</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-chip v-if="fiEMandateStatus" x-small outlined color="green"
                >ACTIVE</v-chip
              >
              <v-chip v-if="!fiEMandateStatus" x-small outlined color="warning"
                >PENDING</v-chip
              >
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="pa-0">
              <v-list-item-title>First MSF</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-chip
                v-if="fileSummary.isFirstMSFPaid"
                x-small
                outlined
                color="green"
                >PAID</v-chip
              >
              <v-chip
                v-if="!fileSummary.isFirstMSFPaid"
                x-small
                outlined
                color="warning"
                >NOT PAID</v-chip
              >
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import * as Action from "@/../src-gen/action";
import CFPersonalInfoFProfileFFormMDP from "./CFPersonalInfoFProfileFFormMDP";

@Component({
  components: {
    FForm,
  },
})
export default class CFClientInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: Data.ClientFile.FileSummary;

  @Store.Getter.ClientFile.ClientFileSummary.fiEMandateList
  fiEMandateList: Data.ClientFile.FiEMandateList;
<<<<<<< HEAD
  fiEMandateListStatus: any = [];
=======

>>>>>>> main
  clientFileId = this.$route.params.clientFileId;

  //FORM

  mounted() {
    this.getEMandateList();
  }

  getEMandateList() {
    Action.ClientFile.GetEMandateList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
<<<<<<< HEAD

  get fiEMandateStatus() {
    this.fiEMandateListStatus = this.fiEMandateList;
    let status: boolean = false;
    this.fiEMandateListStatus.map((value: any) => {
      if (value.eMandateStatus.name === "ACTIVE") {
        status = true;
      }
    });
    return status;
  }
=======
>>>>>>> main
}
</script>

<style></style>
