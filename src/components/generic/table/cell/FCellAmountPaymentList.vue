<template>
  <span>
    <v-chip
    outlined
    small
    class="mx-1"
    :color="textColor(item)"
      v-for="(item, index) of selectModel(modelValue, dataSelectorKey)"
      :key="index"
    >
      <strong>
        {{ item[itemDataSelectorKey] | toINR }}
        
      </strong>
    </v-chip>
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellAmountPaymentList extends ModelVue {
  @Prop()
  dataSelectorKey: string;

  @Prop()
  itemDataSelectorKey: string;

  @Prop()
  paymentDataSelectorKey: string;
  textColor(item: any): string {
    if (this.paymentDataSelectorKey) {
      return item[this.paymentDataSelectorKey] == true ? "green" : "red";
    }
    return "default";
  }
}
</script>
