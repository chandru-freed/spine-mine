<template>
  <div class="CFFileRedirect">
    <h3>Loading</h3>
  </div>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import Helper from "../../../util/Helper";

@Component
export default class MyTicketDetailsRedirect extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  ticketNumber = this.$route.params.ticketNumber;

  mounted() {
    this.findMyTicketId();
  }

  findMyTicketId() {
    Action.Ticket.FindTicketId.execute1(
      this.ticketNumber,
      (output) => {
        setTimeout(() => {
          if(output.ticketId) {
          this.$router.push({name:"Root.MyTicket.MyTicketDetails.MyTicketTaskDetails", params :{myTicketId: output.ticketId}})
          } else {
            this.$router.push({name:"Root.MyTicket.SubscribedTicketList"})
          }
        }, 1000)
        
      }
    );
  }

  

}

</script>

<style>
</style>
