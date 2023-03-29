<template>
  <component
    :ref="misReportsTabMetaData.myRefName"
    :is="misReportsTabMetaData.componentName"
    v-bind="misReportsTabMetaData.props"
  ></component>
</template>

<script lang="ts">
import FTab from "@/components/generic/FTab.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import MISReportsFTabMDP from "./MISReportsFTabMDP";

@Component({
  components: {
    FTab,
  },
})
export default class MISReportsTab extends Vue {
  // TO_BE_REMOVED
  get misReportsTabMetaData(): any {
    return new MISReportsFTabMDP({ taskRoot: this }).getMetaData();
  }
}
</script>

<style scoped></style>
