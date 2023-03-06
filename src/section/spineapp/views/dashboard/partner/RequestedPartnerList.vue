<template>
  <div class="ActivePartnerList">
    <task-tab></task-tab>
    <component
      v-if="!!requestedPLFDataTableMetaData"
      :ref="requestedPLFDataTableMetaData.myRefName"
      :is="requestedPLFDataTableMetaData.componentName"
      :value="selectModel(requestedPartnerList, undefined)"
      v-bind="requestedPLFDataTableMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import RequestedPartnerListFDataTableMDP from "./RequestedPartnerListFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import DashboardTab from "@/section/spineapp/components/tab/DashboardTab.vue";

@Component({
  components: {
    FForm,
    FDataTable,
    "task-tab": DashboardTab,
  },
})
export default class RequestedPartnerList extends ModelVue {
  requestedPartnerList: Data.Spine.Partner[] = [];

  public mounted() {
    this.getRequestedPartnerList();
    Action.Spine.ActivatePartner.interested(
      this.getRequestedPartnerListHandler
    );
    Action.Spine.RejectPartner.interested(this.getRequestedPartnerListHandler);
  }

  destroyed() {
    Action.Spine.ActivatePartner.notInterested(
      this.getRequestedPartnerListHandler
    );
    Action.Spine.RejectPartner.notInterested(
      this.getRequestedPartnerListHandler
    );
  }

  getRequestedPartnerListHandler = () => {
    setTimeout(() => {
      this.getRequestedPartnerList();
    }, 1000);
  };

  getRequestedPartnerList() {
    Action.Spine.GetOnboardingRequestedPartnerList.execute((output) => {
      this.requestedPartnerList = output;
    });
  }

  // Meta data

  get requestedPLFDataTableMetaData() {
    return new RequestedPartnerListFDataTableMDP({
      parent: this,
    }).getMetaData();
  }
}
</script>

<style>
</style>
