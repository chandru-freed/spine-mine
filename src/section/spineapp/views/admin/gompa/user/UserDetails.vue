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
      
      <v-card v-if="showAddUserGroupForm" class="py-5 px-2" outlined>
        <v-card-title>Add User Group</v-card-title>
        <component
          :ref="addUserGroupToUserMetaData.myRefName"
          :is="addUserGroupToUserMetaData.componentName"
          :value="selectModel(updateUserGroupInput, undefined)"
          @input="
            (newValue) => updateModel(updateUserGroupInput, newValue, undefined)
          "
          v-bind="addUserGroupToUserMetaData.props"
        ></component>
      </v-card>

      <div class="col d-flex align-center">
        <v-card-title>User Details
          <v-chip color="green" class="mx-3" outlined small v-if="userDetails.active">Active</v-chip>
          <v-chip v-else color="grey" class="mx-3" small outlined>Disabled</v-chip>
          </v-card-title>
        <v-spacer />
        <f-btn
          label="Add User Group"
          :onClick="() => (showAddUserGroupForm = true)"
          color="primary"
          outlined
          class="mx-4"
          dense
          small
        >
        </f-btn>
        <f-btn
          label="Sync LeadSquared Id"
          :onClick="syncLeadSquaredId()"
          color="primary"
          outlined
          dense
          small
        >
        </f-btn>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              dense
              small
              outlined
              class="mx-2"
            >
              Actions
              <v-icon small>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link @click="() => activateUser()">
              <div class="text-caption">Activate</div>
            </v-list-item>

            <v-list-item link @click="() => deActivateUser()">
              <div class="text-caption">Deactivate</div>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <component
        v-if="!!userDetailsFFormMetaData"
        :ref="userDetailsFFormMetaData.myRefName"
        :is="userDetailsFFormMetaData.componentName"
        :value="selectModel(userDetails, undefined)"
        @input="(newValue) => updateModel(userDetails, newValue, undefined)"
        v-bind="userDetailsFFormMetaData.props"
      ></component>

      <f-alert
        v-if="showRemoveUserGroupConfirmation"
        @cancelClick="showRemoveUserGroupConfirmation = false"
        @confirmClick="removeUserGroupClick"
        :message="`Are you sure want to remove '${selectedUserGroupForDelete}' role from this user`"
      />
      <div class="col-12 mx-3">
        <v-toolbar-title
          v-if="userDetails.userGroupList.length > 0"
          class="mb-3"
          >User Groups</v-toolbar-title
        >
        <v-chip
          label
          outlined
          color="primary"
          class="my-2 mr-3"
          v-for="(userGroup, index) of userDetails.userGroupList"
          :key="index"
          @click:close="handleRemoveUGClick(userGroup)"
          close
        >
          {{ userGroup.userGroupName }}
        </v-chip>
      </div>
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
import AddUserGroupToUserFFormMDP from "./AddUserGroupToUserFFormMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FAlert from "@/components/generic/FAlert.vue";
@Component({
  components: {
    FForm,
    "f-btn": FBtn,
    FAlert,
  },
})
export default class UserDetails extends ModelVue {
  public updateUserGroupInput: Data.Spine.UpdateUserGroupInput =
    new Data.Spine.UpdateUserGroupInput();
  public userDetails: Data.Spine.GompaUserDetails =
    new Data.Spine.GompaUserDetails();
  public userGroupList: Data.Spine.UserGroup[] = [];
  showRemoveUserGroupConfirmation: boolean = false;
  showAddUserGroupForm: boolean = false;
  selectedUserGroupForDelete: any;
  userName = this.$route.params.userName;
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

  get addUserGroupToUserMetaData() {
    return new AddUserGroupToUserFFormMDP({
      parent: this,
    }).getMetaData();
  }

  // META DATA

  mounted() {
    this.getUserDetails();
    this.resetUserGroupInput();
    this.getUserGroupList();
  }

  getUserDetails() {
    Action.Spine.GetUserDetails.execute1(this.userName, (output) => {
      console.log(output.active);
      this.userDetails = output;
      this.userDetails.userGroupListString = this.userDetails.userGroupList
        .map((item) => item.userGroupName)
        .toString();
    });
  }

  getUserGroupList() {
    Action.Spine.GetAllUserGroupList.execute((output) => {
      this.userGroupList = output;
    });
  }

  resetUserGroupInput() {
    this.updateUserGroupInput = new Data.Spine.UpdateUserGroupInput();
    this.updateUserGroupInput.userName = this.userName;
    this.showAddUserGroupForm = false;
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
  handleRemoveUGClick(userGroup: any) {
    this.selectedUserGroupForDelete = userGroup.userGroupName;
    this.showRemoveUserGroupConfirmation = true;
  }

  removeUserGroupClick() {
    Action.Spine.RemoveUserFromUserGroup.execute2(
      this.userName,
      this.selectedUserGroupForDelete,
      (output) => {
        this.showRemoveUserGroupConfirmation = false;
        this.getUserDetails();
      }
    );
  }
  deActivateUser() {
    Action.Spine.DeActivateUser.execute1(this.userName, (output) => {
      this.getUserDetails();
    });
  }

  activateUser() {
    Action.Spine.ActivateUser.execute1(this.userName, (output) => {
      this.getUserDetails();
    });
  }
}
</script>

<style>
</style>
