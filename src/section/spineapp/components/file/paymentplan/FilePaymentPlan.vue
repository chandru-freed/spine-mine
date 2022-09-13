<template>
  <div class="FilePaymentPlan">File payment plan

    {{fiPaymentPlanInfo}}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";

@Component
export default class FilePaymentPlan extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentPlanInfo
  fiPaymentPlanInfo: Data.ClientFile.FiPaymentPlanInfo

  mounted() {
    this.getFiPaymentPlanInfo();
  }

  getFiPaymentPlanInfo() {
    Action.ClientFile.GetPaymentPlanInfo.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {},
      (error) => {},
      RemoteApiPoint.SpineApi
    );
  }
}
</script>

<style>
</style>
