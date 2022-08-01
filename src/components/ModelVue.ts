import { Vue, Prop } from "vue-property-decorator";

export default abstract class ModelVue extends Vue {
  // V-MODEL START
  @Prop()
  value!: string;

  get modelValue(): string {
    return this.value;
  }

  set modelValue(newValue) {
    this.$emit("input", newValue);
  }
  // V-MODEL END
}
