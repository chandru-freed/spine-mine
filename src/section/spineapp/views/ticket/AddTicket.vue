<template>
  <div>
    <v-card flat outlined>
      <v-card-title>Raise a Ticket</v-card-title>
      <v-card-text >
        <component
          v-if="!!addTicketFormMetaData"
          :ref="addTicketFormMetaData.myRefName"
          :is="addTicketFormMetaData.componentName"
          v-model="addTicketInput"
          v-bind="addTicketFormMetaData.props"
        ></component>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import FForm from "@/components/generic/form/FForm.vue";
import Vue from "vue";
import { Prop,Component } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from 'node-snackbar';

import AddTicketFFormMDP from './AddTicketFFormMDP';
@Component({
  components:{
    FForm
  }
})
export default class AddTicket extends Vue {
  addTicketInput: Data.Ticket.RaiseTicketInput = new Data.Ticket.RaiseTicketInput();
  get addTicketFormMetaData() {
    return new AddTicketFFormMDP({root: this}).getMetaData();
  }

  addTicket() {
    Action.Ticket.RaiseTicket.execute(this.addTicketInput, output => {
      Snackbar.show({
        text: "Succesfully added a ticket",
        pos: "bottom-center"
      });
      this.$router.push({name:"Root.TaskList.TicketAssignedToMe"})
    })
  }
  goBack() {
    this.$router.back();
  }
}
</script>
