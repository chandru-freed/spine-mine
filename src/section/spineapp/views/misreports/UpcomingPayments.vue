<template>
  <div class="UpcomingPayments">
    <!-- MIS REPORTS TAB -->
    <misreports-tab v-model="tab"></misreports-tab>
    <!-- MIS REPORTS TAB -->

    <v-card class="pa-0 ma-0" color="transparent">
      <component
        v-if="!!upcomingPaymentsDateSearchFormMetaData"
        :ref="upcomingPaymentsDateSearchFormMetaData.myRefName"
        :is="upcomingPaymentsDateSearchFormMetaData.componentName"
        :value="selectModel(misFiPSEntrySearchForm, undefined)"
        @input="
          (newValue) => updateModel(misFiPSEntrySearchForm, newValue, undefined)
        "
        v-bind="upcomingPaymentsDateSearchFormMetaData.props"
      ></component>
    </v-card>
    <v-card>
      <component
        v-if="!!upcomingPaymentsFDataTableMetaData"
        :ref="upcomingPaymentsFDataTableMetaData.myRefName"
        :is="upcomingPaymentsFDataTableMetaData.componentName"
        :value="selectModel(misFiPSEntryList, undefined)"
        v-bind="upcomingPaymentsFDataTableMetaData.props"
      ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import MISReportsTab from "@/section/spineapp/components/tab/MISReportsTab.vue";

import moment from "moment";
import FBtn from "@/components/generic/FBtn.vue";
import Helper from "../../util/Helper";
import UpcomingPaymentsFDataTableMDP from "./UpcomingPaymentsFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";
import UpcomingPaymentsDateSearchFFormMDP from "./UpcomingPaymentsDateSearchFFormMDP";

@Component({
  components: {
    "misreports-tab": MISReportsTab,
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class UpcomingPayments extends ModelVue {
  tab = 0;

  selected = [];
  search = "";

  misFiPSEntryListOutput: Data.ClientFile.MISFiPSEntryListOutput =
    new Data.ClientFile.MISFiPSEntryListOutput();
  misFiPSEntryList: Data.ClientFile.MISFiPSEntry[] = [];
  misFiPSEntryListInput: Data.ClientFile.MISFiPSEntryListInput =
    new Data.ClientFile.MISFiPSEntryListInput();

  misFiPSEntrySearchFormLocal: any =
    new Data.ClientFile.MISFiPSEntryListInput();
  searchCriteria: Data.ClientFile.MISFiPSEntryListInput;
  get misFiPSEntrySearchForm() {
    this.misFiPSEntrySearchFormLocal = this.searchCriteria;
    return this.misFiPSEntrySearchFormLocal;
  }

  mounted() {
    this.getSceheduledPaymentList();
  }

  destroyed() {
    Action.TaskList.Suspend.notInterested(this.getSceheduledPaymentList);
  }

  getSceheduledPaymentList() {
    this.misFiPSEntryListInput.fromDate =
      this.misFiPSEntrySearchFormLocal.fromDate;
    this.misFiPSEntryListInput.toDate = this.misFiPSEntrySearchFormLocal.toDate;
    this.misFiPSEntryListInput.offset = 0;
    this.misFiPSEntryListInput.count = 100;
    Action.ClientFile.GetSceheduledPaymentList.execute(
      this.misFiPSEntryListInput,
      (output) => {
        this.misFiPSEntryListOutput = output;
        this.misFiPSEntryList = output.misFiPSEntryList;
      }
    );
  }

  gotoFile(item: any) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: item.cid,
    });
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }

  get upcomingPaymentsDateSearchFormMetaData(): any {
    return new UpcomingPaymentsDateSearchFFormMDP({
      taskRoot: this,
    }).getMetaData();
  }
  get upcomingPaymentsFDataTableMetaData() {
    return new UpcomingPaymentsFDataTableMDP({
      parent: this,
      myRefName: this.upcomingPaymentsRefName,
    }).getMetaData();
  }
}
</script>

<style></style>
