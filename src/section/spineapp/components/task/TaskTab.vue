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
import TaskFTabMDP from "./TaskFTabMDP";

@Component({
  components: {
    FTab,
  },
})
export default class TaskTab extends Vue {
  get taskTabMetaData(): any {
    return new TaskFTabMDP({ taskRoot: this }).getMetaData();
  }
}
</script>

<style scoped></style>
