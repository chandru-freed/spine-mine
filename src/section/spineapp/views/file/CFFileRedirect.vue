<template>
  <div class="CFFileRedirect">
    <h3>Loading</h3>
  </div>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import Helper from "../../util/Helper";

@Component
export default class CFFileRedirect extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  clientFileNumber = this.$route.params.clientFileNumber;

  mounted() {
    this.getCFBasicInfo();
  }

  getCFBasicInfo() {
    Action.ClientFile.GetClientFileBasicInfo.execute1(
      this.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.$router.replace({
            name: "Root.CFile.CFInfo.CFPersonalInfo",
            params: { clientFileId: this.clientFileBasicInfo.clientFileId },
          });
        }, 1000)
        
      }
    );
  }

  

}

</script>

<style>
</style>
