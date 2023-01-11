<template>
  <div>
    <cf-ticket-details-tab v-model="tab"></cf-ticket-details-tab>
    <v-card outlined flat>
      <v-card-text>
        <ticket-comment />
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import TicketComment from "@/section/spineapp/views/ticket/details/TicketComment.vue";
import CFTicketDetailsTab from "@/section/spineapp/components/tab/CFTicketDetailsTab.vue";

// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';

@Component({
  components: {
    TicketComment,
    "cf-ticket-details-tab": CFTicketDetailsTab,
  },
})
export default class CFTicketCommentList extends Vue {
  public tab: number = 0;
}
</script>

<style>
</style>
