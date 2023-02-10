<template>
<v-card flat>
  <v-container class="ChangePassword py-5">
    <v-card-title>Change Password</v-card-title>
      <component
      :ref="changePasswordFFormMetaData.myRefName"
      :is="changePasswordFFormMetaData.componentName"
      :value="selectModel(changePasswordInput, undefined)"
      @input="(newValue) => updateModel(changePasswordInput, newValue, undefined)"
      v-bind="changePasswordFFormMetaData.props"
    ></component>
  </v-container>
</v-card>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import store, * as Store from '@/../src-gen/store';
import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';
import ChangePasswordFFormMDP  from './ChangePasswordFFormMDP'
import FForm from '@/components/generic/form/FForm.vue';
import ModelVue from '@/components/generic/ModelVue';
import FSnackbar from '@/fsnackbar';

@Component({
  components: {
    FForm
  }
})
export default class ChangePassword extends ModelVue {
@Store.Getter.Login.LoginDetails.loggedInUser
loggedInUser: Data.Login.LoginDetails;

changePasswordInput: Data.Spine.ChangePasswordInput = new Data.Spine.ChangePasswordInput();

get changePasswordFFormMetaData() {
return new ChangePasswordFFormMDP({parent: this}).getMetaData();
}

resetChangePasswordInput() {
  this.changePasswordInput  = new Data.Spine.ChangePasswordInput();
}


}

</script>

<style>
</style>
