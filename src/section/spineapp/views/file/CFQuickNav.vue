<template>
  <!-- <v-card flat color="transparent" height="800px" >
     <v-card outlined height="200px" >
     </v-card>
     <v-card outlined height="200px" >
     </v-card>
     <v-card outlined height="200px" >
     </v-card>
     <v-card outlined height="200px" >
     </v-card>
    
  </v-card> -->
  <div class="row">
    <div class="col-12 ">
      <v-card outlined height="200px" >
      </v-card>
    </div>
    <div class="col-12 ">
      <v-card outlined height="200px" >
      </v-card>
    </div>
    <div class="col-12 ">
      <v-card outlined height="200px" >
      </v-card>
    </div>
    
  </div>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";

@Component
export default class CFQuickNav extends Vue {

  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: Data.ClientFile.FileSummary;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

}

</script>

<style>
</style>
