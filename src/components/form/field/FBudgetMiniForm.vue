<template>
  <v-card outlined flat >
    <v-row no-gutters>
      <v-col>
        <f-mini-form v-model="modelValue" v-bind="$props"> </f-mini-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mx-6">
        <FCurrencyField
          type="number"
          disabled
          :label="`Total ${label}`"
          outlined
          dense
          :value="totalAmount"
        ></FCurrencyField>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FCurrencyField from "@/components/form/field/FCurrencyField.vue";
import ModelVue from "@/components/ModelVue";
import FMiniForm from "./FMiniForm.vue";

@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    FCurrencyField,
  },
})
export default class FBudgetMiniForm extends FMiniForm {
  get totalAmount() {
    return (Object.values(this.modelValue) as number[]).reduce<number>(
      (accumulator, obj: number) => {
        return accumulator + obj;
      },
      0
    );
  }
}
</script>
