<template>
  <div class="AgentList">
    <component
      :ref="filterAccountListFFormMDP.myRefName"
      :is="filterAccountListFFormMDP.componentName"
      :value="
        selectModel(
          getAccountListForCreditorInput,
          filterAccountListFFormMDP.dataSelectorKey
        )
      "
      @input="
        (newValue) =>
          updateModel(
            getAccountListForCreditorInput,
            newValue,
            filterAccountListFFormMDP.dataSelectorKey
          )
      "
      v-bind="filterAccountListFFormMDP.props"
    ></component>
    <component
      :ref="accountListFDataTableMetaData.myRefName"
      :is="accountListFDataTableMetaData.componentName"
      :value="
        selectModel(
          creditorAccountDetailsList,
          accountListFDataTableMetaData.dataSelectorKey
        )
      "
      v-bind="accountListFDataTableMetaData.props"
      :loading="accountListLoading"
    ></component>
    <!-- <f-pagination
      v-if="paginationLength > 0"
      :paginationLength="paginationLength"
      :count="getAccountListForCreditorInput.count"
      :value="getAccountListForCreditorInput.offset"
      @input="handlePaginationChange"
    ></f-pagination> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import AccountListFDataTableMDP from "./AccountListFDataTableMDP";
import FilterAccountListFFormMDP from "./FilterAccountListFFormMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import FPagination from "@/components/generic/FPagination.vue";
import Helper from "@/section/spineapp/util/Helper";
import ErrorResponse from "@/error-response";

@Component({
  components: {
    FDataTable,
    FForm,
    FPagination,
  },
})
export default class AccountListForCreditor extends ModelVue {
  creditorAccountDetailsList: Data.Spine.CreditorAccountDetails[] = [];
  getAccountListForCreditorInput: Data.Spine.GetAccountListForCreditorInput =
    new Data.Spine.GetAccountListForCreditorInput();
  creditorStats: Data.Spine.CreditorsStatistics =
    new Data.Spine.CreditorsStatistics();
  totalRow: number = 0;
  accountListLoading: boolean = false;

  public mounted() {
    // this.getAccountListForCreditorInput.count = 10;
    this.getAccountListForCreditorInput.creditorName = !!this.$route.query.creditorName?
    (this.$route.query.creditorName as any):
    "ICICI BANK LTD";
    this.getAccountListForCreditor();
  }

  // Metadata
  get accountListFDataTableMetaData() {
    return new AccountListFDataTableMDP({ parent: this }).getMetaData();
  }

  get filterAccountListFFormMDP() {
    return new FilterAccountListFFormMDP({ parent: this }).getMetaData();
  }
  // Metadata

  openCreateAgentPage() {
    this.$router.push({ name: "Root.CreditorModule.Agency.CreateAgent" });
  }

  getAccountListForCreditor() {
    this.accountListLoading = true;
    Action.Spine.GetAccountListForCreditor.execute(
      this.getAccountListForCreditorInput,
      (output) => {
        this.creditorAccountDetailsList = output.creditorAccountDetailsList;
        this.creditorStats = output.creditorsStatistics;
        this.accountListLoading = false;
        // this.totalRow = output.totalRow;
      },
      error => {
        ErrorResponse.handle(error);
        this.accountListLoading = false;
      }
    );
  }

  // get paginationLength() {
  //   return Math.ceil(this.totalRow / this.getAccountListForCreditorInput.count);
  // }
  // handlePaginationChange(newVal: any) {
    // this.getAccountListForCreditorInput.offset = newVal;
    // this.getAccountListForCreditor();
  // }

  gotoFile(item: any) {
    console.log(item)
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: item.clientFileNumber,
    });
  }
}
</script>

<style>
</style>
