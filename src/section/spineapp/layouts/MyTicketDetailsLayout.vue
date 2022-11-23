
<template>
<v-card>
  <router-view name="details"/>
  <router-view/>
</v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MyTicketDetailsLayout extends Vue {
}
</script>

