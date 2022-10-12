<template>
  <v-container fluid>
    <!-- <router-view/> -->
    <div clas="row pa-0 ma-0">
      <div class="col-12">
        <router-view name="fileSummary"></router-view>
      </div>
      <div class="col-12">
        <v-card tile height="1200px" class="" flat color="transparent">
          <router-view name="fileDetails" ></router-view>
          <router-view ></router-view>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import ClientFileSummary from "@/section/spineapp/components/file/ClientFileSummary.vue";

import { GetClientFileBasicInfo } from "src-gen/action/clientfile-action";

@Component({
  components: {
    "client-file-summary": ClientFileSummary,
  },
})
export default class ClientFileLayout extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  clientFileNumber = this.$route.params.clientFileNumber;
  mounted() {
    this.getClientFileBasicInfo();
  }

  getClientFileBasicInfo() {
    Action.ClientFile.GetClientFileBasicInfo.execute1(
      this.clientFileNumber,
      (output) => {
        this.findClientFileSummary();
      }
    );
  }

  findClientFileSummary() {
    Action.ClientFile.FindClientFileSummary.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }
}
</script>
