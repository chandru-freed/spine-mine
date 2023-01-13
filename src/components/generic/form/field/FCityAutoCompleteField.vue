<template>
  <div>
    <v-combobox
      outlined
      :value="modelValue"
      @input="(newValue) => (modelValue = newValue)"
      :items="fetchedItems"
      :loading="isLoading"
      :search-input.sync="searchValue"
      clearable
      item-value="cityName"
      item-text="cityName"
      v-bind="this.$props"
    >
    </v-combobox>
  </div>
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
export default class FCityAutoCompleteField extends VAutocomplete {
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
      this.fetchedItems = response.data.cityAndStateList;
    } catch (e) {}
    this.isLoading = false;
  }

  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: any) {
    this.$emit("input", newModelValue);
    const selectedCityStateObject = this.fetchedItems.find(item => item.cityName===newModelValue);
    this.$emit("citySelected",selectedCityStateObject)
    if (this.onSelect && !!newModelValue) {
      this.onSelect(newModelValue);
    }
  }
  // MODEL VALUE - END
}
</script>
