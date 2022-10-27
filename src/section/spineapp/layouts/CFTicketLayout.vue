
<template>
 <div>
  CFTicket Layout
  <router-view/>
   <router-view name="leftNav"/> 
 <router-view name="summary"/> 
 <router-view name="actionNav"/> 
 </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CFTicketLayout extends Vue {
}
</script>

