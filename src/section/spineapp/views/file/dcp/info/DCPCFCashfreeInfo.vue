<template>
  <div class="DCPCFCashfreeInfo">
    <component
      :ref="dcpCashfreeInfoMetaData.myRefName"
      :is="dcpCashfreeInfoMetaData.componentName"
      v-bind="dcpCashfreeInfoMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import * as Action from "@/../src-gen/action";
import DCPCFCashfreeInfoFCashfreeListMDP from "./DCPCFCashfreeInfoFCashfreeListMDP";
import FDCPCashfreeList from "@/components/generic/file_dcp/cashfreeList/FDCPCashfreeList.vue";

@Component({
  components: {
    FForm,
    FDCPCashfreeList
  },
})
export default class DCPCFCashfreeInfo extends ModelVue {
  //METADATA
  get dcpCashfreeInfoMetaData() {
    return new DCPCFCashfreeInfoFCashfreeListMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }
  //METADATA
}
</script>

<style></style>
