<template>
  <div class="CreateSalesRep">
    <v-card flat>
      <v-card-title>Create User</v-card-title>
      <component
        v-if="!!createSalesRepFFormMetaData"
        :ref="createSalesRepFFormMetaData.myRefName"
        :is="createSalesRepFFormMetaData.componentName"
        :value="selectModel(addUserInput, undefined)"
        @input="(newValue) => updateModel(addUserInput, newValue, undefined)"
        v-bind="createSalesRepFFormMetaData.props"
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
import CreateUserFFormMDP from "./CreateUserFFormMDP";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";

@Component({
  components: {
    FForm,
  },
})
export default class CreateUser extends ModelVue {
  public addUserInput: Data.Spine.AddUserInput = new Data.Spine.AddUserInput();
  // META DATA
  get createSalesRepFFormMetaData() {
    return new CreateUserFFormMDP({
      parent: this,
    }).getMetaData();
  }
  // META DATA


  resetAddUserInput() {
    this.addUserInput = new Data.Spine.AddUserInput();
  }
}
</script>

<style>
</style>
