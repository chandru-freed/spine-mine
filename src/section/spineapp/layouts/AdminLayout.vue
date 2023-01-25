
<template>
 <div>
  Admin Layout
  <router-view/>
   <router-view name="appBar"/> 
 <router-view name="lefNavBar"/> 
 </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AdminLayout extends Vue {
}
</script>

