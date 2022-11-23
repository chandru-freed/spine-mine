<template>
<div>
  <component
    :ref="cfTicketDetailsTabMetaData.myRefName"
    :is="cfTicketDetailsTabMetaData.componentName"
    v-bind="cfTicketDetailsTabMetaData.props"
  ></component>
</div>
</template>

<script lang="ts">
import FTab from "@/components/generic/FTab.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import CFTicketDetailsTabMDP from "./CFTicketDetailsTabMDP";

@Component({
  components: {
    FTab,
  },
})
export default class CFTicketDetailsTab extends Vue {
  get cfTicketDetailsTabMetaData(): any {
    return new CFTicketDetailsTabMDP({ taskRoot: this }).getMetaData();
  }
}
</script>

<style scoped></style>
