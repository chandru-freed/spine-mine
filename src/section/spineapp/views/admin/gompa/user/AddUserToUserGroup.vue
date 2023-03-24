<template>
  <div class="CreateSalesRep">
    <v-card flat>
      <v-card-title>Create User</v-card-title>
      <component
        v-if="!!addUserToUGFFormMetaData"
        :ref="addUserToUGFFormMetaData.myRefName"
        :is="addUserToUGFFormMetaData.componentName"
        :value="selectModel(addUserInput, undefined)"
        @input="(newValue) => updateModel(addUserInput, newValue, undefined)"
        v-bind="addUserToUGFFormMetaData.props"
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
import AddUserToUGFFormMDP from "./AddUserToUGFFormMDP";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";

@Component({
  components: {
    FForm,
  },
})
export default class AddUserToUserGroup extends ModelVue {
  public addUserInput: Data.Spine.AddUserToUserGroupInput = new Data.Spine.AddUserToUserGroupInput();
  // META DATA
  get addUserToUGFFormMetaData() {
    return new AddUserToUGFFormMDP({
      parent: this,
    }).getMetaData();
  }
  // META DATA


  resetAddUserInput() {
    this.addUserInput = new Data.Spine.AddUserToUserGroupInput();
  }

  prepopulateLeadSquareId(leadSquareId: string) {
    if(leadSquareId) {
    this.addUserInput.leadSquaredUserId = leadSquareId;
    }
  }

  gotoDetailsPage() {
    this.$router.push({name: "Root.Admin.Gompa.UserDetails", params: {userName: this.addUserInput.userName}})
  }
}
</script>

<style>
</style>
