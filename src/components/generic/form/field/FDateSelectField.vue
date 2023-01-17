<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="modelValue"
      transition="scale-transition"
      offset-y
      min-width="auto"
      :disabled="$props.readonly || $props.disabled"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="dateInDisplayFormat"
          append-icon="mdi-calendar"
          readonly
          v-bind="{ ...$props, ...attrs }"
          v-on="on"
          @click:append="menu = !menu"
        ></v-text-field>
      </template>
      <v-date-picker
        :min="minDate"
        :max="maxDate"
        :value="modelValue"
        @input="(newValue) => $refs.menu.save(newValue)"
        no-title
        scrollable
      >
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FTextField from "@/components/generic/form/field/FTextField.vue";
import moment from "moment";
import { VTextField } from "vuetify/lib/components";

@Component({
  components: {
    FTextField,
  },
})
export default class FDateSelectField extends VTextField {
  menu: boolean = false;
  dateFormatForDatePicker: string = "YYYY-MM-DD";

  // MODEL VALUE - START
  @Prop()
  value: any;

  @Prop()
  pastDaysDisabled: boolean;

  @Prop()
  futureDaysDisabled: boolean;

  @Prop({
    default: "DD/MM/YYYY",
  })
  dateDisplayFormat: string;

  get minDate() {
    return this.pastDaysDisabled
      ? moment().format(this.dateFormatForDatePicker)
      : null;
  }

  get maxDate() {
    return this.futureDaysDisabled
      ? moment().format(this.dateFormatForDatePicker)
      : null;
  }
  get modelValue() {
    return this.value
      ? moment(this.value).format(this.dateFormatForDatePicker)
      : this.value;
  }

  get dateInDisplayFormat() {
    return this.modelValue
      ? moment(this.modelValue).format(this.dateDisplayFormat)
      : "";
  }

  set modelValue(newModelValue: string) {
    if (newModelValue) {
      this.$emit("input", new Date(newModelValue).toISOString());
    }
  }
  // MODEL VALUE - END
}
</script>