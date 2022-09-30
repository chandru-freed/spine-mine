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
        @input="(newValue) => (modelValue = newValue)"
        no-title
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(modelValue)">
          OK
        </v-btn>
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
    return this.pastDaysDisabled ? moment().format("YYYY-MM-DD") : null;
  }

  get maxDate() {
    return this.futureDaysDisabled ? moment().format("YYYY-MM-DD") : null;
  }
  get modelValue() {
    return this.value ? moment(this.value).format("YYYY-MM-DD") : this.value;
  }

  get dateInDisplayFormat() {
    return this.modelValue
      ? moment(this.modelValue).format(this.dateDisplayFormat)
      : "";
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", new Date(newModelValue).toISOString());
  }
  // MODEL VALUE - END
}
</script>