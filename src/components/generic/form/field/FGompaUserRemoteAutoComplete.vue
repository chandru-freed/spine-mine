<template>
  <v-autocomplete
    :value="modelValue"
    @input="(newValue) => (modelValue = newValue)"
    :items="fetchedItems"
    :loading="isLoading"
    :search-input.sync="searchValue"
    v-bind="this.$props"
  >
    <template v-slot:item="data">
      <div class="d-flex flex-row align-center ">
        <v-list-item>
            <v-icon>mdi-account-circle-outline</v-icon>
        </v-list-item>
        <v-list-item>
          {{ data.item.firstName }}
        </v-list-item>
        <v-list-item>
          {{ data.item.mobile }}
        </v-list-item>
      </div>
    </template>
  </v-autocomplete>
</template>
<script lang="ts">
import axios from "axios";
import { Component, Prop, Watch } from "vue-property-decorator";
import { VAutocomplete } from "vuetify/lib";

@Component({
  components: {
    VAutocomplete,
  },
})
export default class FGompaUserRemoteAutoCompleteField extends VAutocomplete {
  // MODEL VALUE - START
  @Prop()
  value: any;

  @Prop({
    default: "",
  })
  queryUrl: string;

  @Prop({
    default: 3,
  })
  minSearchValueLength: number;

  searchValue: string = "";
  isLoading: boolean = false;
  fetchedItems: any[] = [];

  @Watch("searchValue") onSearchValueChanged(value: string) {
    if (value?.length >= this.minSearchValueLength) {
      this.fetchItems();
    } else {
      if(!this.$props.multiple) {
      this.fetchedItems = [];
      }
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
