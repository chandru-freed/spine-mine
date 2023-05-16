<template>
  <v-select
    v-bind="$props"
    :value="modelValue"
    @input="(newValue) => (modelValue = newValue)"
    :items="fetchedItems"
    :loading="isLoading"
  ></v-select>
</template>
<script lang="ts">
import axios from "axios";
import { Component, Prop } from "vue-property-decorator";
import { VSelect } from "vuetify/lib";

@Component({
  components: {
    VSelect,
  },
})
export default class FRemoteSelectField extends VSelect {
  // MODEL VALUE - START
  @Prop()
  value: any;

  get modelValue() {
    return this.value;
  }

  @Prop({
    default: "",
  })
  queryUrl: string;
  fetchedItems: any[] = [];

  isLoading: boolean = false;
  set modelValue(newModelValue: string) {
    this.$emit("input", newModelValue);
  }

  mounted() {
    this.fetchItems();
  }
  // MODEL VALUE - END

  async fetchItems() {
    this.isLoading = true;
    try {
      let response = await axios.get(this.queryUrl);
      this.fetchedItems = response.data;
    } catch (e) {}
    this.isLoading = false;
  }
}
</script>
