
<template>
 <div>
  Settlement Layout
  <router-view/>
   <router-view name="leftNav"/> 
 <router-view name="summary"/> 
 <router-view name="quickNav"/> 
 </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SettlementLayout extends Vue {
}
</script>

