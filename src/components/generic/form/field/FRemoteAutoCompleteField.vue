<template>
  <v-autocomplete
    :value="modelValue"
    @input="(newValue) => (modelValue = newValue)"
    :items="fetchedItems"
    :loading="isLoading"
    :search-input.sync="searchValue"
    hide-no-data
    hide-selected
    v-bind="this.$props"
  ></v-autocomplete>
</template>
<script lang="ts">
import axios from "axios";
import { Component, Prop, Watch } from "vue-property-decorator";
import { VAutocomplete, VSelect } from "vuetify/lib";

@Component({
  components: {
    VAutocomplete,
  },
})
export default class FRemoteAutoCompleteField extends VAutocomplete {
  // MODEL VALUE - START
  @Prop()
  value: any;

  @Prop({
    default: "",
  })
  queryUrl: string;

  searchValue: string = "";
  isLoading: boolean = false;
  fetchedItems: any[] = [];

  @Watch("searchValue") onSearchValueChanged(value: string) {
    if (value?.length > 2) {
      this.fetchItems();
    } else {
      this.fetchedItems = [];
    }
  }

  get queryUrlWithSearchQuery(): string {
    return this.queryUrl + this.searchValue;
  }

  async fetchItems() {
    this.isLoading = true;
    try {
      let response = await axios.get(this.queryUrlWithSearchQuery);
      this.fetchedItems = response.data;
    } catch (e) {}
    this.isLoading = false;
  }

  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: any) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END
}
</script>
