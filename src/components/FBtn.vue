<template>

  <v-btn :disabled="disabled" :outlined="outlined" :color="color" :text="flat" @click="action()">{{ label }}</v-btn>

  
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class FBtn extends Vue {
  @Prop({ default: "" })
  public label!: string;

  @Prop({ default: false })
  public outlined!: boolean;

  @Prop({ default: '' })
  public color!: string;

   @Prop({ default: false })
  public flat!: boolean;

  @Prop({})
  public action!: any;

  @Prop({})
  public formClass!: string;

  @Prop({default: false})
  public disabled!: boolean;

  // private callbackAction(actionId: string) {
  //   console.log("I am in callback action");
  //   // const vm: any = this;

  //   (this.$refs[this.formKey] as any).validate().then((success: boolean) => {
  //     if (success) {
  //       // console.log('success');
  //       this.$emit(actionId);
  //       // console.log( actionId);
  //       // console.log( vm.formData);
  //       return;
  //     } else {
  //       console.log("callbackAction errors");
  //     }
  //   });
  // }
}
</script>
