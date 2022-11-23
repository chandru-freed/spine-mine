<template>
  <component
    :ref="myTicketDetailsTabMetaData.myRefName"
    :is="myTicketDetailsTabMetaData.componentName"
    v-bind="myTicketDetailsTabMetaData.props"
  ></component>
</template>

<script lang="ts">
import FTab from "@/components/generic/FTab.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import MyTicketDetailsTabMDP from "./MyTicketDetailsTabMDP";

@Component({
  components: {
    FTab,
  },
})
export default class MyTicketDetailsTab extends Vue {
  get myTicketDetailsTabMetaData(): any {
    return new MyTicketDetailsTabMDP({ taskRoot: this }).getMetaData();
  }
}
</script>

<style scoped></style>
