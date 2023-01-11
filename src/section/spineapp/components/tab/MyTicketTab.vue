<template>
  <component
    :ref="myTicketTabMetaData.myRefName"
    :is="myTicketTabMetaData.componentName"
    v-bind="myTicketTabMetaData.props"
  ></component>
</template>

<script lang="ts">
import FTab from "@/components/generic/FTab.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import MyTicketFTab from "./MyTicketFTabMDP";

@Component({
  components: {
    FTab,
  },
})
export default class MyTicketTab extends Vue {
  get myTicketTabMetaData(): any {
    return new MyTicketFTab({ taskRoot: this }).getMetaData();
  }
}
</script>

<style scoped></style>
