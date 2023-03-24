<template>
  <div class="AgentList">
    <component
      :ref="agentListFDataTableMetaData.myRefName"
      :is="agentListFDataTableMetaData.componentName"
      :value="selectModel(creditorsCollectionClientList, agentListFDataTableMetaData.dataSelectorKey)"
      v-bind="agentListFDataTableMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import AgentListFDataTableMDP from './AgentListFDataTableMDP';
import FDataTable from "@/components/generic/table/FDataTable.vue";
import ModelVue from "@/components/generic/ModelVue";

@Component({
  components:{
    FDataTable
  }
})
export default class AgentList extends ModelVue {
  creditorsCollectionClientList: Data.Spine.CreditorsCollectionClient[] = [];
  public mounted() {}

  // Metadata
  get agentListFDataTableMetaData() {
    return new AgentListFDataTableMDP({parent: this}).getMetaData();
  }
  // Metadata

  openCreateAgentPage() {
    this.$router.push({name: "Root.CreditorModule.Agency.CreateAgent"})
  }
}
</script>

<style>
</style>
