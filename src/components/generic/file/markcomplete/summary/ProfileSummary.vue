<template>
  <div class="my-2">
    <v-card outlined>
      <div class="d-flex align-center">
        <v-card-title>Profile</v-card-title>
        <v-spacer />
        <v-btn text @click="goToProfileStep()">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
      <component
        v-if="profileSummaryFFormMetaData"
        :is="profileSummaryFFormMetaData.componentName"
        :value="profileSummaryData"
        v-bind="profileSummaryFFormMetaData.props"
        :ref="profileSummaryFFormMetaData.myRefName"
      />
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import FTextField from "@/components/generic/form/field/FTextField.vue";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import ProfileSummaryFFormMDP from "./ProfileSummaryFFormMDP";
@Component({
  components: {
    FTextField,
    FForm,
  },
})
export default class ProfileSummary extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;



  get profileSummaryData(): object {
    return {
        personalInfo: JSON.parse(this.taskDetails.taskOutput).personalInfo || {},
        clRegistrationDetails: JSON.parse(this.taskDetails.taskInput).clRegistrationDetails,
    };
  }

  get profileSummaryFFormMetaData() {
    return new ProfileSummaryFFormMDP().getMetaData();
  }

  goToProfileStep() {
    this.$router.push({ query: { step: "0" } });
  }
}
</script>