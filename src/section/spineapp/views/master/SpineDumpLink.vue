<template>
  <div class="SpineDumpLink">
    <v-row no-gutters>
      <v-col md="4">
        <v-card class="ma-10" flat>
          <v-card-title>Spine Dump</v-card-title>
          <v-list class="py-0">
            <v-list-item>
              <v-btn
                text
                color="primary"
                @click="downloadDump(spineDumpLinks.fileInfoDump)"
                ><v-icon size="60" small class="mr-2">mdi-cloud-download</v-icon
                >File Info Dump</v-btn
              >
            </v-list-item>
            <v-list-item>
              <v-btn
                text
                color="primary"
                @click="downloadDump(spineDumpLinks.fileCreditorsDump)"
              >
                <v-icon size="60" small class="mr-2">mdi-cloud-download</v-icon>
                File Creditors Dump</v-btn
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card class="ma-10" flat>
          <v-card-title>Spine Dump (Date Range)</v-card-title>
          <v-list class="py-0">
            <v-list-item>
              <v-btn
                text
                color="primary"
                @click="downloadDump(spineDumpDateLinks.fileInfoDump)"
                ><v-icon size="60" small class="mr-2">mdi-cloud-download</v-icon
                >File Info Dump</v-btn
              >
            </v-list-item>
            <v-list-item>
              <v-btn
                text
                color="primary"
                @click="downloadDump(spineDumpDateLinks.fileCreditorsDump)"
              >
                <v-icon size="60" small class="mr-2">mdi-cloud-download</v-icon>
                File Creditors Dump</v-btn
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import ModelVue from "@/components/generic/ModelVue";
import AddCreditorToMasterFFormMDP from "./AddCreditorToMasterFFormMDP";
import FSnackbar from "@/fsnackbar";

@Component({
  components: { FForm },
})
export default class SpineDumpLink extends ModelVue {
  spineDumpLinks: any;
  spineDumpDateLinks: any;
  mounted() {
    this.getSpineDumpLinks();
    this.getSpineDumpLinksForDate();
  }

  downloadDump(url: any) {
    window.location.assign(url);
  }

  // fileInfoDump() {
  //   window.location.assign(this.spineDumpLinks.fileInfoDump);
  // }

  // fileCreditorsDump() {
  //   window.location.assign(this.spineDumpLinks.fileCreditorsDump);
  // }
  getSpineDumpLinks() {
    Action.Spine.GetSpineDumpLinks.execute((output) => {
      this.spineDumpLinks = output;
    });
  }

  getSpineDumpLinksForDate() {
    Action.Spine.GetSpineDumpLinksForDate.execute((output) => {
      this.spineDumpDateLinks = output;
    });
  }
}
</script>

<style></style>
