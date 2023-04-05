<template>
  <v-card class="pa-0 ma-0" flat height="calc(100vh - 48px)">
    <component
      v-if="!!showRegisterMyCFForm"
      :ref="registerMyCFFFormMetaData.myRefName"
      :is="registerMyCFFFormMetaData.componentName"
      :value="selectModel(registerClientFormData, undefined)"
      v-bind="registerMyCFFFormMetaData.props"
    ></component>
    <component
      v-if="!!myCFFileFDataTableMetaData"
      :ref="myCFFileFDataTableMetaData.myRefName"
      :is="myCFFileFDataTableMetaData.componentName"
      :value="selectModel(clientFileList, undefined)"
      v-bind="myCFFileFDataTableMetaData.props"
    ></component>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import Helper from "../../util/Helper";
import MyCFFileFDataTableMDP from "./MyCFFileFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import ModelVue from "@/components/generic/ModelVue";
import RegisterMyCFFFormMDP from "./RegisterMyCFFFormMDP";
import FForm from "@/components/generic/form/FForm.vue";
@Component({
  components: {
    FDataTable,
    FForm,
  },
})
export default class MyCFFiles extends ModelVue {
  @Store.Getter.ClientFile.MyClientFileStore.myClientFileList
  myClientFileList: Data.ClientFile.MyClientFile[];

  @Store.Getter.ClientFile.MyClientFileStore.myEMandateActiveCFList
  myEMandateActiveCFList: Data.ClientFile.MyClientFile[];

  @Store.Getter.ClientFile.MyClientFileStore.myEMandatePendingCFList
  myEMandatePendingCFList: Data.ClientFile.MyClientFile[];

  @Store.Getter.ClientFile.MyClientFileStore.myMSFPaidCFList
  myMSFPaidCFList: Data.ClientFile.MyClientFile[];

  @Store.Getter.ClientFile.MyClientFileStore.myMSFPendingCFList
  myMSFPendingCFList: Data.ClientFile.MyClientFile[];

  
  showRegisterMyCFForm: boolean = false;
  registerClientFormData: Data.Client.RegisterAndAddClientFileForm =
    new Data.Client.RegisterAndAddClientFileForm();

  clientFileStatus = this.$route.query.clientFileStatus;
  filterQuery: any =  this.$route.query.filter;


  mounted() {
    this.getMyClientFileList();
  }

  getMyClientFileList() {
    Action.ClientFile.GetMyClientFileList.execute((output) => {
      // this.myClientFileList = output.filter((value: any) =>
      //   this.clientFileStatus === "ACTIVE"
      //     ? value.clientFileStatus.id == "ACTIVE"
      //     : value
      // );
    });
  }

  gotoFile(clientFileNumber: string) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: clientFileNumber,
    });
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }

  // registerClient() {
  //   Action.Client.RegisterAndAddClientFileToMyQ.execute(
  //     this.registerClientFormData,
  //     (output: any) => {
  //       setTimeout(() => {
  //         this.showRegisterMyCFForm = false;
  //       }, 500);
  //       this.gotoFile(output.clientFileNumber);
  //     }
  //   );
  // }

  registerClient() {
    Action.Client.RegisterAndEnroll.execute(
      this.registerClientFormData,
      (output: any) => {
        setTimeout(() => {
          this.showRegisterMyCFForm = false;
          this.gotoFile(output.clientFileNumber);
        }, 500);
      }
    );
  }

  get myCFFileFDataTableMetaData() {
    return new MyCFFileFDataTableMDP({ parent: this }).getMetaData();
  }

  get registerMyCFFFormMetaData() {
    return new RegisterMyCFFFormMDP({ root: this }).getMetaData();
  }

  get clientFileList() {
    console.log(this.filterQuery);
    switch(this.filterQuery) {
      case 'emandate_active':  return this.myEMandateActiveCFList
      case 'emandate_pending':  return this.myEMandateActiveCFList
      case 'msf_paid':  return this.myMSFPaidCFList
      case 'msf_pending':  return this.myMSFPendingCFList
      default:  return this.myClientFileList
    }
  }
}
</script>

<style></style>
