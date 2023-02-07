<template>
  <div class="MonthlySalesReport">
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
import store, * as Store from '@/../src-gen/store';
import * as Data from '@/../src-gen/data';
import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';

@Component
export default class MonthlySalesReport extends Vue {


 mounted() {

 }

}

</script>

<style>
</style>
