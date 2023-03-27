<template>
  <div class="SpineDumpLink">
    <v-row no-gutters>
      <v-col md="4" offset-md="4">
        <v-card class="ma-10">
          <v-list class="py-0">
            <v-list-item >
              <v-btn text color="primary" @click="fileInfoDump()"
                ><v-icon size="60" small class="mr-2">mdi-file-account</v-icon>File Info
                Dump</v-btn
              >
            </v-list-item>
            <v-list-item>
              <v-btn text color="primary" @click="fileCreditorsDump()"
                >
                <v-icon size="60" small class="mr-2">mdi-clipboard-text-clock-outline</v-icon>
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
  mounted() {
    this.getSpineDumpLinks();
  }

  fileInfoDump() {
    window.location.assign(this.spineDumpLinks.fileInfoDump);
  }

  fileCreditorsDump() {
    window.location.assign(this.spineDumpLinks.fileCreditorsDump);
  }
  getSpineDumpLinks() {
    Action.Spine.GetSpineDumpLinks.execute((output) => {
      this.spineDumpLinks = output;
    });
  }
}
</script>

<style></style>
