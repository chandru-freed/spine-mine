<template>
  <component
    :ref="taskTabMetaData.myRefName"
    :is="taskTabMetaData.componentName"
    v-bind="taskTabMetaData.props"
  ></component>
</template>

<script lang="ts">
import FTab from "@/components/generic/FTab.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import CFPaymentPlanFTabMDP from "./CFPaymentPlanFTabMDP";


@Component({
  components: {
    FTab,
  },
})
export default class CFPaymentPlanFTab extends Vue {
  get taskTabMetaData(): any {
    return new CFPaymentPlanFTabMDP({ taskRoot: this }).getMetaData();
  }
}
</script>

<style scoped></style>
