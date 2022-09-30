<template>
  <v-combobox
    :value="modelValue"
    @keyup="(event) => (modelValue = event.target.value)"
    @change="(newVal) => (modelValue = newVal)"
    :items="fetchedItems"
    :loading="isLoading"
    :search-input.sync="searchValue"
    v-bind="this.$props"
  ></v-combobox>
</template>
<script lang="ts">
import axios from "axios";
import { Component, Prop, Watch } from "vue-property-decorator";
import { VAutocomplete } from "vuetify/lib";
import { VCombobox } from "vuetify/lib/components";

@Component({
  components: {
    VCombobox,
  },
})
export default class FRemoteComboBoxField extends VAutocomplete {
  // MODEL VALUE - START
  @Prop()
  value: any;

  @Prop({
    default: "",
  })
  queryUrl: string;

  @Prop({
    default: 1,
  })
  minSearchValueLength: number;

  

  searchValue: string = "";
  isLoading: boolean = false;
  fetchedItems: any[] = [];

  @Watch("searchValue") onSearchValueChanged(value: string) {
    
      this.fetchItems();
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
    console.log(newModelValue)
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END
}
</script>
