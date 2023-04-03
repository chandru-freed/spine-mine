<template>
  <div class="UpcomingPayments">
    <v-card  flat class="pa-0 ma-0" color="transparent">
      <component
        v-if="!!upcomingPaymentsDateSearchFormMetaData"
        :ref="upcomingPaymentsDateSearchFormMetaData.myRefName"
        :is="upcomingPaymentsDateSearchFormMetaData.componentName"
        :value="selectModel(paymentListInput, undefined)"
        @input="
          (newValue) => updateModel(paymentListInput, newValue, undefined)
        "
        v-bind="upcomingPaymentsDateSearchFormMetaData.props"
      ></component>
    </v-card>
    <v-card flat>
      <component
        v-if="!!upcomingPaymentsFDataTableMetaData"
        :ref="upcomingPaymentsFDataTableMetaData.myRefName"
        :is="upcomingPaymentsFDataTableMetaData.componentName"
        :value="selectModel(fiPaymentWithClientFileList, undefined)"
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
import SearchPaymentFDataTableMDP from "./SearchPaymentFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";
import SPDateSearchFFormMDP from "./SPDateSearchFFormMDP";

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

  
  fiPaymentWithClientFileList: Data.Spine.FiPaymentWithClientFile[] = [];
  paymentListInput: Data.Spine.GetPaymentListInput =
    new Data.Spine.GetPaymentListInput();

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
    const fromDate: any = this.$route.query.fromDate;
    const toDate: any = this.$route.query.toDate;
    const paymentStatus: any = this.$route.query.paymentStatus;
    this.paymentListInput.fromPresentedDateFilter = fromDate || new Date().toISOString();
    this.paymentListInput.toPresentedDateFilter = toDate || new Date().toISOString();
    this.paymentListInput.statusFilter = paymentStatus || undefined;
    Action.Spine.GetPaymentList.execute(
      this.paymentListInput,
      (output) => {
        this.fiPaymentWithClientFileList = output;
      }
    );
  }


  searchPaymentListScheduled() {
    setTimeout(() => {
      this.$router.push({query:{
      fromDate: this.paymentListInput.fromPresentedDateFilter,
      toDate: this.paymentListInput.toPresentedDateFilter,
      paymentStatus: this.paymentListInput.statusFilter || undefined
    }});
    }, 500);
    
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
    return new SPDateSearchFFormMDP({
      taskRoot: this,
    }).getMetaData();
  }
  get upcomingPaymentsFDataTableMetaData() {
    return new SearchPaymentFDataTableMDP({
      parent: this,
      myRefName: "searchPaymentsFDataTableRef",
    }).getMetaData();
  }
}
</script>

<style></style>
