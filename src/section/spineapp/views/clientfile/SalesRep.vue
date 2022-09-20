<template>
  <v-navigation-drawer
    absolute
    permanent
    right
    :width="rightFocused ? '100%' : '49%'"
    v-if="!leftFocused"
  >
    <div>Sales Rep</div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FBtn from "@/components/generic/FBtn.vue";

@Component({
  components: {
    "f-btn": FBtn,
  },
})
export default class SalesRep extends Vue {
  leftFocused = false;
  rightFocused = true;
}
</script>

<style></style>
