<template>
  <v-autocomplete
    :value="modelValue"
    @input="(newValue) => (modelValue = newValue)"
    :items="fetchedItems"
    :loading="isLoading"
    :search-input.sync="searchValue"
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

  @Prop()
  onSelect: ((value: any) => void) | undefined;

  searchValue: string = "";
  isLoading: boolean = false;
  fetchedItems: any[] = [];

  @Prop({
    default: 1,
  })
  minSearchValueLength: number;

  @Watch("searchValue") onSearchValueChanged(value: string) {
    if (value?.length > this.minSearchValueLength) {
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
    if(this.onSelect) {
      this.onSelect(newModelValue)
    }
  }
  // MODEL VALUE - END
}
</script>
