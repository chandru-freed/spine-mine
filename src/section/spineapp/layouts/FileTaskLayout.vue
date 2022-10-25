
<template>
  <div id="FileTaskLayout"  v-if="showRightPanel" :class="showBothPanel ? 'col-6' : 'col-12'" >
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FileTaskLayout extends Vue {


    panelQSr = this.$route.query.panel || ""
    panelQList = this.panelQSr.split(",")
    get showRightPanel() {
      if(!this.panelQList.includes("rp") &&  !this.panelQList.includes("lp")){ 
        return true
      }
      return this.panelQList.includes("rp")
    }

    get showBothPanel() {
      if(!this.panelQList.includes("rp") &&  !this.panelQList.includes("lp")) {
        return true
      }

      if(this.panelQList.includes("rp") &&  this.panelQList.includes("lp")) {
        return true
      }

      return false
    }
}
</script>

