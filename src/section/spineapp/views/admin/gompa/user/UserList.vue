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
  // META DATA
  mounted() {
    this.getUserList();
    Action.Spine.ActivateUser.interested(this.getUserListHandler);
    Action.Spine.DeActivateUser.interested(this.getUserListHandler);
  }

  destroyed() {
    Action.Spine.ActivateUser.notInterested(this.getUserListHandler);
    Action.Spine.DeActivateUser.notInterested(this.getUserListHandler);
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
}
</script>

<style>
</style>
