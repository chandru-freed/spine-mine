<template>
  <div>
    <component
      :ref="searchLayoutTabMetaData.myRefName"
      :is="searchLayoutTabMetaData.componentName"
      v-bind="searchLayoutTabMetaData.props"
    ></component>
    <v-divider></v-divider>
    <router-view />
  </div>
</template>

<script lang="ts">
import FTab from "@/components/generic/FTab.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import SearchLayoutFTabMDP from "./SearchLayoutFTabMDP";

@Component({
  components: {
    FTab,
  },
})
export default class SearchLayout extends Vue {
  get searchLayoutTabMetaData(): any {
    return new SearchLayoutFTabMDP({ taskRoot: this }).getMetaData();
  }
}
</script>
