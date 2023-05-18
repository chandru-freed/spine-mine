<template>
  <div class="col">
    DCP Agreement info
  </div>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';

@Component
export default class DCPCFAgreementInfo extends Vue {

  public counter: number = 0 ;

  public oldCounterValue: number = 0;
  public newCounterValue: number = 0;


  public mounted() {

  }

  public created() {

  }

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
