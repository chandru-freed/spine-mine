<template>
  <div class="CreateAgent">
     <component
      :is="addCollectionCreditorFFormMetaData.componentName"
      :ref="addCollectionCreditorFFormMetaData.myRefName"
      :value="selectModel(addCollectionCreditor, undefined)"
      @input="(newValue) => updateModel(addCollectionCreditor, newValue, undefined)"
      v-bind="addCollectionCreditorFFormMetaData.props"
    ></component>
  </div>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import store, * as Store from '@/../src-gen/store';
import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';
import AddCollectionCreditorFFormMDP from './AddCollectionCreditorFFormMDP';
import FForm from '@/components/generic/form/FForm.vue';
import ModelVue from '@/components/generic/ModelVue';
@Component({
  components: {
    FForm
  }
})
export default class CreateAgent extends ModelVue {
  addCollectionCreditor: Data.Spine.AddCollectionCreditorInput = new Data.Spine.AddCollectionCreditorInput();
  public mounted() {

  }

  //Meta data

  get addCollectionCreditorFFormMetaData() {
    return new AddCollectionCreditorFFormMDP({parent: this}).getMetaData();
  }


}

</script>

<style>
</style>
