<template>
  <div class="Dashboard row">
    <div class="col">
    <dashboard-card-1></dashboard-card-1>
    </div>
    <div class="col">
    <dashboard-card-2></dashboard-card-2>
    </div>
    <div class="col">
    <dashboard-card-2></dashboard-card-2>
    </div>
  </div>

</template>

<script lang="ts">

import { Vue, Component, Watch } from 'vue-property-decorator';
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';

import DashboardCard1 from '@/components/DashboardCard1.vue'
import DashboardCard2 from '@/components/DashboardCard2.vue'

@Component({
  components: {
    'dashboard-card-1' : DashboardCard1,
    'dashboard-card-2' : DashboardCard2
  }
})
export default class Dashboard extends Vue {

  public counter = 0 ;

  public oldCounterValue = 0;
  public newCounterValue = 0;


  // public mounted() {

  // }

  // public created() {

  // }  

  @Watch('counter') private onCounterChanged(value: number, oldValue: number) {
    this.oldCounterValue = oldValue;
    this.newCounterValue = value;

  }

  private increment() {
    this.counter += 1;
  }

  private decrement() {
    this.counter -= 1;
  }

  private get computedCounter(): number {
    return this.counter * 2;
  }

}

</script>

<style>
</style>
