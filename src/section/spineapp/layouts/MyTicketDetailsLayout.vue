
<template>
<div>
  <router-view name="details"/>
  <router-view/>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MyTicketDetailsLayout extends Vue {
}
</script>

