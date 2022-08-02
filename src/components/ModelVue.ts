import { Vue, Prop } from "vue-property-decorator";

export default abstract class ModelVue extends Vue {
  // V-MODEL START
  @Prop()
  value!: any;

  get modelValue(): any {
    return this.value;
  }

  set modelValue(newValue: any) {
    this.$emit("input", newValue);
  }
  // V-MODEL END
}
