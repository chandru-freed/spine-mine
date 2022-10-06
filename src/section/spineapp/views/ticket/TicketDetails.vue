<template>
  <div>
    <v-card flat outlined>
      <v-card-title>Ticket Details</v-card-title>
      <v-card-text >
        <v-card-title>Add comment</v-card-title>
        <component
          v-if="!!addCommentFormMetaData"
          :ref="addCommentFormMetaData.myRefName"
          :is="addCommentFormMetaData.componentName"
          v-model="addCommentInput"
          v-bind="addCommentFormMetaData.props"
        ></component>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import store, * as Store from "@/../src-gen/store";
import AddCommentFFormMDP from './AddCommentFFormMDP';
import FForm from "@/components/generic/form/FForm.vue";
import * as Snackbar from 'node-snackbar';
@Component({
  components: {
    FForm
  }
})
export default class TicketAssignedToMe extends Vue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;
  addCommentInput: Data.TaskList.AddCommentOnTicketInput = new Data.TaskList.AddCommentOnTicketInput();

  mounted() {
    this.getExecutiveTaskDetails();
  }

  get addCommentFormMetaData() {
    return new AddCommentFFormMDP({root: this}).getMetaData();
  }

  getExecutiveTaskDetails() {
    Action.TaskList.GetExecutiveTaskDetails.execute1(
      this.$route.params.taskId,
      (output) => {
      }
    );
  }

  addComment() {
    this.addCommentInput.taskId = this.$route.params.taskId;
    Action.TaskList.AddCommentOnTicket.execute(this.addCommentInput, output => {
      Snackbar.show({
        text: "Succesfully added a comment",
        pos: "bottom-center"
      });
    });
  }

  goBack() {
    this.$router.back();
  }
}
</script>
