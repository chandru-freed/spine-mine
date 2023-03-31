<template>
  <v-fab-transition>
    <v-btn
      v-if="showScrollButton"
      @click="gotToTop"
      class="scrollUpBtn"
      fab
      color="primary"
    >
      <v-icon>mdi-chevron-double-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VBtn } from "vuetify/lib/components";

@Component({
  components: {
    VBtn,
  },
})
export default class FScrollUpBtn extends VBtn {
  showScrollButton: boolean = false;

  scrollHandler = (e: Event) => {
    this.handleOnScroll(e);
  };
  mounted() {
    window.addEventListener("scroll", this.scrollHandler);
  }

  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  handleOnScroll(event: any) {
    const top = window.pageYOffset || event.target.scrollTop || 0;
    this.showScrollButton = top > 100;
  }

  gotToTop() {
    this.$vuetify.goTo(0);
  }
}
</script>

<style scoped>
.scrollUpBtn {
  position: fixed;
  right: 25%;
  bottom: 10px;
  z-index: 999;
}
</style>
