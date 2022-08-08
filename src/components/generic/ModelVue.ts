import Vue from "vue";
import { Prop } from "vue-property-decorator";

export default class ModelVue extends Vue {
  @Prop()
  value: string;

  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", newModelValue);
  }
}
