<template>
  <div class="CreateSalesRep">
    <v-card v-if="showCreateUserForm" flat>
      <v-card-title>Create User</v-card-title>
      <!-- {{addUserInput}} -->
      <component
        :ref="addUserToUGFFormMetaData.myRefName"
        :is="addUserToUGFFormMetaData.componentName"
        :value="selectModel(addUserInput, undefined)"
        @input="(newValue) => updateModel(addUserInput, newValue, undefined)"
        v-bind="addUserToUGFFormMetaData.props"
      ></component>
    </v-card>

    <v-card v-if="showChangeDetailsForm">
          <component
      :ref="changeUserDetailsFFormMetaData.myRefName"
      :is="changeUserDetailsFFormMetaData.componentName"
      :value="selectModel(changeUserDetailsInput, undefined)"
      @input="(newValue) => updateModel(changeUserDetailsInput, newValue, undefined)"
      v-bind="changeUserDetailsFFormMetaData.props"
    ></component>

      </v-card>

    <v-card flat>
      <component
        v-if="!!userListFDataTableMetaData"
        :ref="userListFDataTableMetaData.myRefName"
        :is="userListFDataTableMetaData.componentName"
        :value="selectModel(userDetailsList, undefined)"
        v-bind="userListFDataTableMetaData.props"
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
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import UserListFDataTableMDP from "./UserListFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import AddUserToUGFFormMDP from "./AddUserToUGFFormMDP";
import ChangeUserDetailsFFormMDP from './ChangeUserDetailsFFormMDP'
@Component({
  components: {
    FForm,
    FDataTable,
  },
})
export default class UserDetails extends ModelVue {
  public userDetailsList: Data.Spine.GompaUser[] = [];
  public showCreateUserForm: boolean = false;
  addUserInput: Data.Spine.AddUserToUserGroupInput =
    new Data.Spine.AddUserToUserGroupInput();

  showChangeDetailsForm: boolean = false;
  showResetPasswordForm: boolean = false;
  
  changeUserDetailsInput: Data.Spine.ChangeUserDetailsInput = new Data.Spine.ChangeUserDetailsInput();
  resetPasswordInput: Data.Spine.ResetPasswordInput = new Data.Spine.ResetPasswordInput();
  // META DATA
  get userListFDataTableMetaData() {
    return new UserListFDataTableMDP({
      parent: this,
    }).getMetaData();
  }

  get addUserToUGFFormMetaData() {
    return new AddUserToUGFFormMDP({
      parent: this,
    }).getMetaData();
  }

  get changeUserDetailsFFormMetaData() {
          return new ChangeUserDetailsFFormMDP({parent: this}).getMetaData()
  }
  // META DATA
  mounted() {
    this.getUserList();
    Action.Spine.ActivateUser.interested(this.getUserListHandler);
    Action.Spine.DeActivateUser.interested(this.getUserListHandler);

    Action.Spine.ChangeUserDetails.interested(this.getUserListHandler);
    Action.Spine.ResetPassword.interested(this.getUserListHandler);
  }

  destroyed() {
    Action.Spine.ActivateUser.notInterested(this.getUserListHandler);
    Action.Spine.DeActivateUser.notInterested(this.getUserListHandler);
    Action.Spine.ChangeUserDetails.notInterested(this.getUserListHandler);
    Action.Spine.ResetPassword.notInterested(this.getUserListHandler);
  }

  getUserListHandler = () => {
    setTimeout(() => {
      this.getUserList();
    }, 2000);
  };
  getUserList() {
    Action.Spine.GetUserDetailsList.execute((output) => {
      this.userDetailsList = output;
    });
  }

  resetAddUserInput() {
    this.addUserInput = new Data.Spine.AddUserToUserGroupInput();
  }

   closeAndResetForms() {
    this.showChangeDetailsForm = false;
    this.showResetPasswordForm = false;
    this.resetPasswordInput = new Data.Spine.ResetPasswordInput();
    this.changeUserDetailsInput = new Data.Spine.ChangeUserDetailsInput();
  }

  prepopulateLeadSquareId(leadSquareId: string) {
    if (leadSquareId) {
      this.addUserInput.leadSquaredUserId = leadSquareId;
    }
  }

  gotoDetailsPage(name: string) {
    this.$router.push({
      name: "Root.Admin.Gompa.UserDetails",
      params: { userName: name },
    });
  }

  handleChangeDetailsClick(item: any) {
    this.showChangeDetailsForm = true;
    this.changeUserDetailsInput = Data.Spine.ChangeUserDetailsInput.fromJson(item);
  }

  handleResetPasswordClick(item: any) {
    this.showResetPasswordForm = true;
    this.resetPasswordInput.userName = item.userName;
  }
}
</script>

<style>
</style>
