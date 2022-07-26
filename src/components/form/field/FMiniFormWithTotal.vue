<template>
  <v-card elevation="0" outlined class="my-2">
    <v-row no-gutters>
      <v-col class="col-12">
        <f-mini-form v-model="modelValue" v-bind="$props"></f-mini-form>
      </v-col>
      <v-col class="col-12 px-6 pt-0 pb-2">
        <v-text-field
          type="number"
          :label="`TOTAL ${label}`"
          disabled
          hide-details
          v-model="totalAmount"
          v-bind="$props"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FMiniForm from "./FMiniForm.vue";

@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "f-mini-form": FMiniForm,
  },
})
export default class FMiniFormWithTotal extends FMiniForm {
  get totalAmount() {
    return (Object.values(this.miniFormData) as number[]).reduce<number>(
      (accumulator, obj: number) => {
        return accumulator + obj;
      },
      0
    );
  }

  // V-MODEL START
  @Prop({
    default: () => {
      return {};
    },
  })
  declare value: any;

  miniFormData: any = {};

  get modelValue(): any {
    return this.miniFormData;
  }

  set modelValue(value) {
    this.miniFormData = value;
  }

  // WATCH as the MODEL VALUE is a OBJ -
  // And Fields inside the Object if change does not call set of Computed
  @Watch("miniFormData")
  updateMyForm(value: any, oldValue: any) {
    this.$emit("input", value);
  }

  mounted() {
    this.miniFormData = this.value;
  }
  // V-MODEL END
}
</script>
