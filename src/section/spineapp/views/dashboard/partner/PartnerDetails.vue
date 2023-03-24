<template>
  <div class="PartnerDetails">
    <!-- BREADCRUMBS -->
    <v-breadcrumbs :items="breadcrumbList" class="pa-0 pb-1 px-1">
      <template v-slot:item="{ item }">
        <v-btn small text class="pa-0" @click="goto(item.routerName)">{{
          item.title
        }}</v-btn>
      </template>
    </v-breadcrumbs>
    <!-- BREADCRUMBS -->
    <v-card outlined>
      <div class="row px-2 pt-2 pb-4 align-center justify-between">
        <div class="col-4 pb-0">
          <v-list-item>
            <v-list-item-avatar tile size="80">
              <v-icon size="40" color="deep-purple">mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-overline">{{
                activePartnerDetails.emailId
              }}</v-list-item-title>
              <v-list-item-title class="text-h5 deep-purple--text overline">{{
                activePartnerDetails.fullname
              }}</v-list-item-title>

              <v-list-item-subtitle class="text-h6">{{
                activePartnerDetails.mobile | phone
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>
    </v-card>
    <component
      v-if="!!partnerDetailsListFDataTableMetaData"
      :ref="partnerDetailsListFDataTableMetaData.myRefName"
      :is="partnerDetailsListFDataTableMetaData.componentName"
      :value="selectModel(partnerDetailsList, undefined)"
      v-bind="partnerDetailsListFDataTableMetaData.props"
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
import ActivePartnerListFDataTableMDP from "./ActivePartnerListFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import DashboardTab from "@/section/spineapp/components/tab/DashboardTab.vue";
import UploadCertificateFFormMDP from "./UploadCertificateFFormMDP";
import axios from "axios";
import FSnackbar from "@/fsnackbar";
import PartnerDetailsListFDataTableMDP from "./PartnerDetailsListFDataTableMDP";

@Component({
  components: {
    FForm,
    FDataTable,
    "task-tab": DashboardTab,
  },
})
export default class PartnerDetails extends ModelVue {
  activePartnerDetails: any = new Data.Spine.Partner();
  partnerId = this.$route.params.partnerId;
  partnerDetailsList: any = [];
  

  breadcrumbList = [
    {
      title: "Active Partner",
      routerName: "Root.Dashboard.ActivePartnerList",
    },
    {
      title: "Partner Details",
    },
  ];

  public mounted() {
    this.getOnboardedFileList();
    this.findPartnerDetails();
  }

  getOnboardedFileList() {
    Action.Spine.GetOnboardedFileList.execute1(this.partnerId, (output) => {
      this.partnerDetailsList = output;
    });
  }

  findPartnerDetails() {
    Action.Spine.FindPartnerDetails.execute1(this.partnerId, (output) => {
      this.activePartnerDetails = output;
    });
  }

  goto(routerName: string) {
    this.$router.push({ name: routerName });
  }
  // Meta data
  get partnerDetailsListFDataTableMetaData() {
    return new PartnerDetailsListFDataTableMDP({ parent: this }).getMetaData();
  }
}
</script>

<style></style>
