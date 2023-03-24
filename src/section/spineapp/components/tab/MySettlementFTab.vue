<template>
  <component
    :ref="mySettlementFTabMetaData.myRefName"
    :is="mySettlementFTabMetaData.componentName"
    v-bind="mySettlementFTabMetaData.props"
  ></component>
</template>

<script lang="ts">
import FTab from "@/components/generic/FTab.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import MySettlementFTabMDP from "./MySettlementFTabMDP";

@Component({
  components: {
    FTab,
  },
})
export default class MySettlementFTab extends Vue {
  get mySettlementFTabMetaData(): any {
    return new MySettlementFTabMDP({ taskRoot: this }).getMetaData();
  }
}
</script>

<style scoped></style>
