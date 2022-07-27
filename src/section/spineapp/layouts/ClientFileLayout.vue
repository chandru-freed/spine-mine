<template>
  <v-container fluid>
    <!-- <router-view/> -->
    <div clas="row pa-0 ma-0">
      <div class="col-12">
        <router-view name="fileSummary"></router-view>
      </div>
      <div class="col-12">
        <v-card tile height="1200px" class="" flat color="transparent">
          <router-view name="fileDetails"></router-view>
          <router-view ></router-view>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ClientFileSummary from "@/section/spineapp/components/file/ClientFileSummary.vue";

@Component({
  components: {
    "client-file-summary": ClientFileSummary,
  },
})
export default class ClientFileLayout extends Vue {}
</script>
