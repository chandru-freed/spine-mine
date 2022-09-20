<template>
  <div class="Home container">
    <div class="row ">
      <div class="col-12 px-6">
        <v-text-field
            label="Search Client"
            single-line
            filled
            rounded
          ></v-text-field>
      </div> 
      <div class="col-4" v-for="item in 3" :key="item">
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                OVERLINE
              </div>
              <v-list-item-title class="text-h5 mb-1">
                Headline 5
              </v-list-item-title>
              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="primary"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <f-btn
              label="Button"
              outlined
              rounded
              text
            >
              
            </f-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>

</template>

<script lang="ts">

import { Vue, Component, Watch } from 'vue-property-decorator';
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';
import FSwitch from "@/components/generic/form/field/FSwitch.vue"
import FBtn from '@/components/generic/FBtn.vue';

@Component({
  components : {
    FSwitch,
    "f-btn":FBtn
  }
})
export default class Home extends Vue {
  public testSwitch = false
  updateTestSwitch(x: any) {
    console.log(x)
    this.testSwitch = x
  }

foo(event: any) {
  console.log("I am in foo")
  console.log(event)
}

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
