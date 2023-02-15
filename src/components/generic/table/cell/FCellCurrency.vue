<template>
  <div>
    <strong>
    {{ inrValue | toINR }}
    </strong>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellCurrency extends ModelVue {
  @Prop()
  dataSelectorKey: string;

  @Prop()
  rounded: boolean;

  get inrValue() {
    return this.rounded
      ? Math.round(this.selectModel(this.modelValue, this.dataSelectorKey))
      : this.selectModel(this.modelValue, this.dataSelectorKey);
  }
}
</script>
