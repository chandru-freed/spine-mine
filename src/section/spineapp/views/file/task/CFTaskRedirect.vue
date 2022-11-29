<template>
  <div class="CFTaskRedirect">
    <h3>Loading</h3>
  </div>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";


@Component
export default class CFTaskRedirect extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  clientFileNumber = this.$route.params.clientFileNumber;
  taskId = this.$route.params.taskId;

  mounted() {
    this.getCFBasicInfo();
  }

  getCFBasicInfo() {
    Action.ClientFile.GetClientFileBasicInfo.execute1(
      this.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.$router.replace({
            name: "Root.CFile.CFTask.CFTaskDetails.CFTaskDetails",
            params: { clientFileId: this.clientFileBasicInfo.clientFileId,taskId: this.taskId },
          });
        }, 1000)
        
      }
    );
  }

  

}

</script>

<style>
</style>
