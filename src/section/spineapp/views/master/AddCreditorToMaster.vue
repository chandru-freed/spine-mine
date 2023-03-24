<template>
  <div class="ActivePartnerList">
    
    <v-row no-gutters>
      <v-col md="4" offset-md="4">
        <v-card class="ma-10">
          <div class="d-flex justify-space-between align-center mx-5 pt-5">
            <h4>Add Creditor</h4>
          </div>
          <component
            v-if="!!addCreditorToMasterFFormMetaData"
            :ref="addCreditorToMasterFFormMetaData.myRefName"
            :is="addCreditorToMasterFFormMetaData.componentName"
            :value="selectModel(addCreditorToMasterInput, undefined)"
            @input="
              (newValue) =>
                updateModel(addCreditorToMasterInput, newValue, undefined)
            "
            v-bind="addCreditorToMasterFFormMetaData.props"
          ></component>
        </v-card>
      </v-col>
    </v-row>
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
import ModelVue from "@/components/generic/ModelVue";
import AddCreditorToMasterFFormMDP from "./AddCreditorToMasterFFormMDP";
import FSnackbar from "@/fsnackbar";

@Component({
  components: { FForm },
})
export default class AddCreditorToMaster extends ModelVue {
  addCreditorToMasterInput: Data.Spine.AddCreditorToMasterInput =
    new Data.Spine.AddCreditorToMasterInput();

  get addCreditorToMasterFFormMetaData(): any {
    return new AddCreditorToMasterFFormMDP({ parent: this }).getMetaData();
  }



  resetForm() {
    this.addCreditorToMasterInput = new Data.Spine.AddCreditorToMasterInput();
  }


  gotoActionList() {
    this.$router.push({
      name: "Root.ActionList",
    });
  }
}
</script>

<style></style>
