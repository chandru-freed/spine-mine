<template>
  <v-card-text>
    <my-ticket-details-tab v-model="tab"></my-ticket-details-tab>
    <ticket-comment />
  </v-card-text>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import MyTicketDetailsTab from '../../../components/tab/MyTicketDetailsTab.vue';
import TicketComment from './TicketComment.vue';
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';

@Component({
  components:{
    TicketComment,
    MyTicketDetailsTab
  }
})
export default class MyTicketCommentList extends Vue {

  public tab: number = 0 ;

}

</script>

<style>
</style>
