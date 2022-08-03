<template>
  <v-card
    class="d-flex align-start flex-column mb-6"
    elevation="0"
    outlined
    :min-height="`${minHeight}px`"
  >
    <div class="mb-auto pa-0">
      <FMiniForm v-model="modelValue" v-bind="$props"></FMiniForm>
    </div>

    <div class="d-flex col-12 pa-2">
      <v-text-field
        type="number"
        :label="`TOTAL ${label}`"
        disabled
        hide-details
        v-model="totalAmount"
        v-bind="$props"
      ></v-text-field>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import FMiniForm from "./FMiniForm.vue";

@Component({
  components: {
    FMiniForm,
  },
})
export default class BudgetMiniForm extends FMiniForm {
  get totalAmount() {
    return (Object.values(this.modelValue) as number[]).reduce<number>(
      (accumulator, obj: number) => {
        return accumulator + obj;
      },
      0
    );
  }


  @Prop()
  minHeight: number;
}
</script>
