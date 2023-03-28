<template>
  <a  :class="`${color}--text`" >
    <v-icon :color="color" v-if="icon" dense small class="mr-1">
      {{ icon }}
    </v-icon>
    <router-link
    v-if="selectModel(modelValue, dataSelectorKey)"
      style="text-decoration: none; color: inherit"
      :to="routerObject"
    >
      {{ selectModel(modelValue, dataSelectorKey) }}
    </router-link>
    <div v-else>--</div>
  </a>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellRouterLink extends ModelVue {
  @Prop()
  dataSelectorKey: string;

  @Prop()
  routerName: string;

  @Prop()
  paramName: string;

  @Prop()
  paramKey: string;

  @Prop({
    default: "default",
  })
  color: string;

   @Prop()
  icon: string;

  get routerObject() {
    const params: any = {};
    if (this.paramName) {
      params[this.paramName] = this.selectModel(
        this.modelValue,
        this.paramKey?this.paramKey:this.dataSelectorKey
      );
    }

    return { name: this.routerName, params: params };
  }
}
</script>
