<template>
  <div class="SSADigioCTask">
    <h1>This is the Counter page</h1>
    <h2>Counter: {{counter}}</h2>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <h3> Computed (Double) : {{computedCounter}}</h3>
    <h3> Watching Old Value: {{oldCounterValue}}</h3>
    <h3> Watching New Value: {{newCounterValue}}</h3>
  </div>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';

@Component
export default class FileInfo extends Vue {

  public counter: number = 0 ;

  public oldCounterValue: number = 0;
  public newCounterValue: number = 0;


  public mounted() {

  }

  public created() {

  }

  @Watch('counter') onCounterChanged(value: number, oldValue: number) {
    this.oldCounterValue = oldValue;
    this.newCounterValue = value;

  }

 increment() {
    this.counter += 1;
  }

 decrement() {
    this.counter -= 1;
  }

 get computedCounter(): number {
    return this.counter * 2;
  }

}

</script>

<style>
</style>
