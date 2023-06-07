<template>
  <div class="ActivePartnerList">
    <task-tab></task-tab>
    <!-- <v-card class="pa-0 ma-0" color="transparent">
    </v-card> -->
      <component
        v-if="!!requestedPartnerListDateSearchFormMetaData"
        :ref="requestedPartnerListDateSearchFormMetaData.myRefName"
        :is="requestedPartnerListDateSearchFormMetaData.componentName"
        :value="selectModel(getNonActivePartnerListInput, undefined)"
        @input="
          (newValue) =>
            updateModel(getNonActivePartnerListInput, newValue, undefined)
        "
        v-bind="requestedPartnerListDateSearchFormMetaData.props"
      ></component>
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
import RequestedPartnerListDateSearchFFormMDP from "./RequestedPartnerListDateSearchFFormMDP";

@Component({
  components: {
    FForm,
    FDataTable,
    "task-tab": DashboardTab,
  },
})
export default class RequestedPartnerList extends ModelVue {
  requestedPartnerList: Data.Spine.Partner[] = [];
  getNonActivePartnerListInput: Data.Spine.GetNonActivePartnerListInput =
    new Data.Spine.GetNonActivePartnerListInput();

  public mounted() {
    this.getNonActivePartnerList();
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
      this.getNonActivePartnerList();
    }, 1000);
  };

  getNonActivePartnerList() {
    Action.Spine.GetNonActivePartnerList.execute(
      this.getNonActivePartnerListInput,
      (output) => {
        this.requestedPartnerList = output;
      }
    );
  }

  // Meta data

  get requestedPLFDataTableMetaData() {
    return new RequestedPartnerListFDataTableMDP({
      parent: this,
    }).getMetaData();
  }

  get requestedPartnerListDateSearchFormMetaData(): any {
    return new RequestedPartnerListDateSearchFFormMDP({
      taskRoot: this,
    }).getMetaData();
  }
}
</script>

<style></style>
