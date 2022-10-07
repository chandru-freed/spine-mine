<template>
  <div>
    <v-navigation-drawer
      absolute
      permanent
      right
      :width="rightFocused ? '100%' : '49%'"
      v-if="!leftFocused"
    >
      <!-- <div class="d-flex justify-end">
        <v-btn @click="gotoClientFile" text icon color="lighten-2" class="ma-2">
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </div> -->
      <!-- <div class="d-flex justify-center"> -->
        <router-view />
      <!-- </div> -->
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FBtn from "@/components/generic/FBtn.vue";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import * as Snackbar from "node-snackbar";
import Helper from "../util/Helper";
@Component
export default class RequestLayout extends Vue {
  clientFileNumber = this.$route.params.clientFileNumber;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;
  leftFocused = false;
  rightFocused = true;

  gotoClientFile() {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: this.clientFileNumber,
    });
  }
}
</script>
