<template>
  <span>
    {{ accountNumber }}
    <!-- {{ selectModel(modelValue, dataSelectorKey) }} -->
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellAccountNumber extends ModelVue {
  @Prop()
  dataSelectorKey: string;

  mask = (cc: any, num = 4, mask = "*") =>
    ("" + cc).slice(0, -num).replace(/./g, mask) + ("" + cc).slice(-num);

  get accountNumber() {
    return this.mask(this.selectModel(this.modelValue, this.dataSelectorKey));
  }
}
</script>
