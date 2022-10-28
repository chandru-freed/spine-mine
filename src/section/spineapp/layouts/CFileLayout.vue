
<template>
 <v-container fluid>
  <router-view name="leftNav"/>
  <div class="ml-15">
  <div class="row no-gutters">
    <div class="col-12">
      <router-view name="summary"/>
    </div>
    
  </div>
  <div class="row mt-0">
    <div class="col grow pt-1">
        <router-view ></router-view>
    </div>
    <div class="col-3 pt-9">
      
      <router-view name="quickNav"/>
      <!-- <v-card outlined height="1000px"></v-card> -->
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

  clientFileId = this.$route.params.clientFileId;

  mounted() {
    this.getCFBasicInfo();
    this.findClientFileSummary();
  }

  getCFBasicInfo() {
    Action.ClientFile.GetCFBasicInfo.execute1(
      this.clientFileId,
      (output) => {
       
      }
    );
  }

  findClientFileSummary() {
    Action.ClientFile.GetClientFileSummary.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
}
</script>

