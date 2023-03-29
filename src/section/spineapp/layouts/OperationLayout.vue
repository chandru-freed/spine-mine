
<template>
 <v-card flat min-height="100vh" outlined color="transparent" class="h-100">
  <div class="ml-15">
  <router-view/>
  </div>
   <router-view name="appBar"/> 
   
  <router-view name="leftNav"/> 
 </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class OperationLayout extends Vue {
}
</script>

