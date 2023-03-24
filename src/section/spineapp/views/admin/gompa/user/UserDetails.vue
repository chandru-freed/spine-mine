<template>
  <div class="CreateSalesRep">
    <v-breadcrumbs :items="breadcrumbList" class="pa-0 pb-1 px-1">
      <template v-slot:item="{ item }">
        <v-btn small text class="pa-0" @click="goto(item.routerName)">{{
          item.title
        }}</v-btn>
      </template>
    </v-breadcrumbs>
    <v-card flat>
      <div class="col d-flex align-center justify-space-between">
        <v-card-title>User Details</v-card-title>
        <f-btn
          label="Sync LeadSquared Id"
          :onClick="syncLeadSquaredId()"
          color="primary"
          outlined
        >
        </f-btn>
      </div>
      <component
        v-if="!!userDetailsFFormMetaData"
        :ref="userDetailsFFormMetaData.myRefName"
        :is="userDetailsFFormMetaData.componentName"
        :value="selectModel(userDetails, undefined)"
        @input="(newValue) => updateModel(userDetails, newValue, undefined)"
        v-bind="userDetailsFFormMetaData.props"
      ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import UserDetailsFFormMDP from "./UserDetailsFFormMDP";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FSnackbar from "@/fsnackbar";
import FBtn from "@/components/generic/FBtn.vue";

@Component({
  components: {
    FForm,
    "f-btn": FBtn,
  },
})
export default class UserDetails extends ModelVue {
  public addUserInput: Data.Spine.AddUserInput = new Data.Spine.AddUserInput();
  public userDetails: Data.Spine.GompaUserDetails = new Data.Spine.GompaUserDetails();
  breadcrumbList = [
    {
      title: "User",
      routerName: "Root.Admin.Gompa.UserList",
    },
    {
      title: "User Details",
    },
  ];

  // META DATA
  get userDetailsFFormMetaData() {
    return new UserDetailsFFormMDP({
      parent: this,
    }).getMetaData();
  }
  // META DATA

  mounted() {
    this.getUserDetails();
  }

  getUserDetails() {
    const userName = this.$route.params.userName;
    Action.Spine.GetUserDetails.execute1(userName, (output) => {
      console.log(output);
      this.userDetails = output;
      this.userDetails.userGroupListString = this.userDetails.userGroupList.map(item => item.userGroupName).toString();
    });
  }

  syncLeadSquaredId() {
    return () => {
      console.log(this.userDetails, "this.parent.userDetails");
      Action.Spine.SyncLeadSquareId.execute1(
        this.userDetails.emailId,
        (output) => {
          FSnackbar.success("Successfully synced the leadsquared id");
        }
      );
    };
  }

  goto(routerName: string) {
    this.$router.push({ name: routerName });
  }
}
</script>

<style>
</style>
