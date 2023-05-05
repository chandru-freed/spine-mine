<template>
  <div class="ClientCreditor">
      <component
      v-if="!!fClientCreditorListFDataTableMetaData"
      :ref="fClientCreditorListFDataTableMetaData.myRefName"
      :is="fClientCreditorListFDataTableMetaData.componentName"
      :value="clCreditorList"
      v-bind="fClientCreditorListFDataTableMetaData.props"
    ></component>
  </div>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import FDataTable from '../../table/FDataTable.vue';
import store, * as Store from '@/../src-gen/store';
import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';
import FClientCreditorListFDataTableMDP from './FClientCreditorListFDataTableMDP'

@Component({
    components: {
        FDataTable
    }
})
export default class FClientCreditorList extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.clCreditorList
  clCreditorList: Data.ClientFile.ClCreditor[];

  public mounted() {
    this.getClientCreditorList();
    Action.ClientFile.AddIncludeFiCreditor.interested(this.getClientCreditorListHandler)
  }

  destroyed() {
    Action.ClientFile.AddIncludeFiCreditor.notInterested(this.getClientCreditorListHandler)
  }

  getClientCreditorListHandler = () => {
    setTimeout(() => {
      this.getClientCreditorList();
    }, 500);
  }
  getClientCreditorList() {
    Action.ClientFile.GetClCreditorList.execute1(this.clientFileBasicInfo.clientBasicInfo.clientId, output => {
      
    })
  }

  get fClientCreditorListFDataTableMetaData() {
          return new FClientCreditorListFDataTableMDP({parent: this}).getMetaData()
  }

}

</script>

<style>
</style>
