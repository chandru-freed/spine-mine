<template>
  <div class="UpcomingPayments">
    <v-card  flat class="pa-0 ma-0" color="transparent">
      <component
        v-if="!!upcomingPaymentsDateSearchFormMetaData"
        :ref="upcomingPaymentsDateSearchFormMetaData.myRefName"
        :is="upcomingPaymentsDateSearchFormMetaData.componentName"
        :value="selectModel(misFiPSEntryListInput, undefined)"
        @input="
          (newValue) => updateModel(misFiPSEntryListInput, newValue, undefined)
        "
        v-bind="upcomingPaymentsDateSearchFormMetaData.props"
      ></component>
    </v-card>
    <v-card flat>
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

  public getSceheduledPaymentListHandler = (output: any) => {
    setTimeout(() => {
      this.getSceheduledPaymentList();
    }, 1000);
  };

  mounted() {
    this.getSceheduledPaymentList();
    Action.TaskList.Suspend.interested(this.getSceheduledPaymentListHandler);
  }

  destroyed() {
    Action.TaskList.Suspend.notInterested(this.getSceheduledPaymentListHandler);
  }

  getSceheduledPaymentList() {
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
      myRefName: "upcomingPaymentsFDataTableRef",
    }).getMetaData();
  }
}
</script>

<style></style>
