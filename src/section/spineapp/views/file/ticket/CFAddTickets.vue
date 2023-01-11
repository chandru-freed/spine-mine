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
import { Prop,Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from 'node-snackbar';

import CFAddTicketFFormMDP from './CFAddTicketFFormMDP';
@Component({
  components:{
    FForm
  }
})
export default class AddTicket extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;
  clientFileId = this.$route.params.clientFileId;
  addTicketInput: Data.Ticket.RaiseATicketInput = new Data.Ticket.RaiseATicketInput();
  get addTicketFormMetaData() {
    return new CFAddTicketFFormMDP({root: this}).getMetaData();
  }

  get clientFileNumber(): string {
    
    return this.clientFileBasicInfo.clientFileNumber;
  }


  mounted() {
    this.getCFBasicInfo();
  }

   getCFBasicInfo() {
    this.addTicketInput.clientFileId = this.clientFileId;
    // Action.ClientFile.GetCFBasicInfo.execute1(
    //   this.clientFileId,
    //   (output) => {
    //     this.addTicketInput.clientFileId = this.clientFileId;
    //   }
    // );
  }

  addTicket() {
    Action.Ticket.RaiseATicket.execute(this.addTicketInput, output => {
      Snackbar.show({
        text: "Succesfully added a ticket",
        pos: "bottom-center"
      });
      this.$router.push({name:"Root.CFile.CFTicket.CFTicketDetailsRedirect", params :{ticketNumber: output.ticketNumber}})
    })
  }
  goBack() {
    this.$router.back();
  }

}

</script>

<style>
</style>
