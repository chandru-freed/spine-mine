<template>
  <v-container fluid>
    <!-- <router-view/> -->
    <div clas="row pa-0 ma-0">
      <div class="col-12">
        <v-card tile class="" flat color="transparent">
          <router-view ></router-view>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
  },
})
export default class ClientLayout extends Vue {}
</script>
