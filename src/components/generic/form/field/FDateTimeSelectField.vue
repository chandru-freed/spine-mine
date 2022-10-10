<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateInDisplayFormat"
          persistent-hint
          append-icon="mdi-calendar"
          v-bind="{ ...$props, ...attrs }"
          v-on="on"
          @click:append="menu = !menu"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="timeMenu"
        v-model="time"
        @change="onTimeChange"
        no-title
        scrollable
      ></v-time-picker>
      <v-date-picker
        v-else
        v-model="date"
        @change="() => (timeMenu = true)"
        :min="minDate"
        :max="maxDate"
        no-title
        scrollable
      ></v-date-picker>
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
export default class FDateTimeSelectField extends VTextField {
  menu: boolean = false;
  timeMenu: boolean = false;
  date: any = null;
  time: any = null;
  dateFormatForDateTimePicker: string = "YYYY-MM-DD";

  // MODEL VALUE - START
  @Prop()
  value: any;

  @Prop()
  pastDaysDisabled: boolean;

  @Prop()
  futureDaysDisabled: boolean;

  @Prop({
    default: "DD/MM/YYYY hh:mm:ss A",
  })
  dateDisplayFormat: string;

  get minDate() {
    return this.pastDaysDisabled
      ? moment().format(this.dateFormatForDateTimePicker)
      : null;
  }

  get maxDate() {
    return this.futureDaysDisabled
      ? moment().format(this.dateFormatForDateTimePicker)
      : null;
  }
  get modelValue() {
    return this.value || "";
  }

  get dateInDisplayFormat() {
    return this.modelValue
      ? moment(this.modelValue).format(this.dateDisplayFormat)
      : "";
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", new Date(newModelValue).toISOString());
  }

  onTimeChange() {
    this.menu = false;
    this.timeMenu = false;
    const date = new Date(this.date);
    const hours = this.time.match(/^(\d+)/)[1];
    const mins = this.time.match(/:(\d+)/)[1];
    date.setHours(hours);
    date.setMinutes(mins);
    this.modelValue = date.toString();
  }
  // MODEL VALUE - END
}
</script>