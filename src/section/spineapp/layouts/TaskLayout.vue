
<template>
 <div>
  Task Layout
  <router-view/>
   <router-view name="appBar"/> 
 <router-view name="lefNavBar"/> 
 </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TaskLayout extends Vue {
}
</script>

