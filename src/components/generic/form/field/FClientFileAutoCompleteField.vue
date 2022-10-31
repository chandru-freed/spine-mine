<template>
  <v-autocomplete
    outlined
    :value="modelValue"
    @input="(newValue) => (modelValue = newValue)"
    :items="fetchedItems"
    :loading="isLoading"
    :search-input.sync="searchValue"
    clearable
    v-bind="this.$props"
  >
    
    <template v-slot:item="data">
        <v-list-item-avatar small>
          <v-icon color="secondary">mdi-file-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class=" font-weight-bold secondary--text text-overline">{{data.item.clientFileNumber}}</v-list-item-title>
          <!-- <v-list-item-subtitle v-html="data.item.clientBasicInfo.fullName"></v-list-item-subtitle> -->
        </v-list-item-content>
    </template>
  </v-autocomplete>

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
export default class FClientFileAutoCompleteField extends VAutocomplete {
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
    if(this.onSelect && !!newModelValue) {
      this.onSelect(newModelValue)
    }
  }
  // MODEL VALUE - END
}
</script>
