
<template>
 <v-container fluid>
  <router-view name="leftNav"/>
  <div class="ml-15">
  <div class="row ">
    <div class="col-12">
      <v-card  height="100px">
        <v-card-text>
          <router-view name="summary"/>
        </v-card-text>
      </v-card>
    </div>
    
  </div>
  <div class="row">
    <div class="col grow">
        <router-view ></router-view>
    </div>
    <div class="col-3">
      <v-card outlined height="1000px"></v-card>
    </div>
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

@Component
export default class CFileLayout extends Vue {
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
    Action.ClientFile.GetClientFileSummary.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }
}
</script>

